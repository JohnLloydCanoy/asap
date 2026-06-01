from pydantic import BaseModel, ConfigDict
from uuid import UUID
from datetime import datetime

class PostAnalyticsBase(BaseModel):
    likes: int = 0
    shares: int = 0
    comments: int = 0

class PostAnalyticsResponse(PostAnalyticsBase):
    post_id: UUID
    last_synced_at: datetime

    model_config = ConfigDict(from_attributes=True)