import logging
from sqlalchemy.orm import Session
from datetime import datetime, timezone

from app.core.database import SessionLocal
from app.models.scheduled_posts import ScheduledPost

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def process_pending_posts():
    """
    This function runs every 60 seconds. It looks for posts that are due,
    locks them so no other worker can touch them, and prepares to publish them.
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
            
            post.status = "PUBLISHED"
            post.live_url = "https://simulated-url.com/post/123"
            logger.info(f"✅ Successfully 'published' post {post.id}!")

        db.commit()

    except Exception as e:
        logger.error(f"❌ Worker encountered an error: {e}")
        db.rollback()
    finally:
        db.close() 