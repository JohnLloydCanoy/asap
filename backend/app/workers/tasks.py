import logging
from sqlalchemy.orm import Session
from datetime import datetime, timezone

from app.core.database import SessionLocal
from app.models.scheduled_posts import ScheduledPost
from app.services.bluesky_service import BlueskyService

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

bluesky_service = BlueskyService()

def process_pending_posts():
    """
    This function runs every 60 seconds. It looks for posts that are due,
    locks them so no other worker can touch them, and publishes them to Bluesky.
    """
    logger.info("🕰️ Worker waking up: Checking for pending posts...")
    
    db: Session = SessionLocal()
    
    try:
        current_time = datetime.now(timezone.utc)
        
        due_posts = db.query(ScheduledPost).filter(
            ScheduledPost.status == "PENDING",
            ScheduledPost.scheduled_for <= current_time
        ).with_for_update(skip_locked=True).all()
        
        if not due_posts:
            logger.info("💤 No posts due right now. Going back to sleep.")
            return

        for post in due_posts:
            logger.info(f"🚀 Found post {post.id} ready to go!")
            
            # Grab the associated social account data
            account = post.social_account
            
            if not account:
                logger.error(f"❌ Post {post.id} references a missing social account relation.")
                post.status = "FAILED"
                post.failure_reason = "Linked social account record not found."
                continue
                
            live_url = bluesky_service.publish_post(
                handle=account.account_handle,  
                app_password=account.access_token, 
                content=post.content
            )
            
            if live_url:
                post.status = "PUBLISHED"
                post.live_url = live_url
                post.failure_reason = None
                logger.info(f"✅ Post successfully went LIVE at: {live_url}")
            else:
                post.status = "FAILED"
                post.failure_reason = "Bluesky platform API rejected authentication or transaction request."
                logger.error(f"❌ Automation failed for post {post.id}")

        db.commit()

    except Exception as e:
        logger.error(f"❌ Worker encountered an error: {e}")
        db.rollback()
    finally:
        db.close()