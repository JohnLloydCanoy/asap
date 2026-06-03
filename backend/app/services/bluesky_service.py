import httpx
import logging
from typing import Dict, Optional
from app.core.config import Settings

logger = logging.getLogger(__name__)

class BlueskyService:
    def __init__(self):
        self.base_url = Settings().BLUESKY_BASE_URL
        
        
    def publish_post(self, handle: str, app_password: str, content: str) -> Optional[str]:
        """
        Authenticates with Bluesky, creates a record, and returns the live post URL.
        """
        # Sanitize inputs: remove whitespaces and hidden control characters
        handle = "".join(ch for ch in handle if ch.isprintable()).strip()
        app_password = "".join(ch for ch in app_password if ch.isprintable()).strip()

        try:
            with httpx.Client() as client:
                # 1. Create a session to get an access token
                logger.info(f"🔑 Authenticating session for Bluesky handle: '{handle}'")
                session_res = client.post(
                    f"{self.base_url}/com.atproto.server.createSession",
                    json={"identifier": handle, "password": app_password}
                )
                
                if session_res.status_code != 200:
                    logger.error(f"❌ Authentication failed: {session_res.text}")
                    return None
                
                session_data = session_res.json()
                access_token = session_data["accessJwt"]
                did = session_data["did"] # The unique decentralized identifier for the user

                headers = {"Authorization": f"Bearer {access_token}"}


                from datetime import datetime, timezone
                now_iso = datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")

                post_record = {
                    "repo": did,
                    "collection": "app.bsky.feed.post",
                    "record": {
                        "$type": "app.bsky.feed.post",
                        "text": content,
                        "createdAt": now_iso
                    }
                }


                logger.info("📤 Broadcasting post content to the AT Protocol network...")
                post_res = client.post(
                    f"{self.base_url}/com.atproto.repo.createRecord",
                    json=post_record,
                    headers=headers
                )

                if post_res.status_code != 200:
                    logger.error(f"❌ Failed to broadcast post: {post_res.text}")
                    return None

                post_data = post_res.json()

                rkey = post_data["uri"].split("/")[-1]
                live_url = f"https://bsky.app/profile/{handle}/post/{rkey}"
                
                return live_url

        except Exception as e:
            logger.error(f"❌ Critical exception inside BlueskyService: {e}")
            return None