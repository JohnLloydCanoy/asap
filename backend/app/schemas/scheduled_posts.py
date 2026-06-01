from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from uuid import UUID
from datetime import datetime

class ScheduledPostBase(BaseModel):
    content: str
    media_urls: List[str] = []
    scheduled_for: Optional[datetime] = None
    is_recurring: bool = False

class ScheduledPostCreate(ScheduledPostBase):
    social_account_id: UUID

class ScheduledPostResponse(ScheduledPostBase):
    id: UUID
    user_id: UUID
    social_account_id: UUID
    platform_post_id: Optional[str] = None
    status: str
    live_url: Optional[str] = None
    failure_reason: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)