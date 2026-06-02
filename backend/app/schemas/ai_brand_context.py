from pydantic import BaseModel, ConfigDict
from typing import List
from uuid import UUID
from datetime import datetime

class AIBrandContextBase(BaseModel):
    brand_bio: str
    preferred_tones: List[str] = []
    banned_keywords: List[str] = []

class AIBrandContextCreate(AIBrandContextBase):
    pass

class AIBrandContextResponse(AIBrandContextBase):
    id: UUID
    user_id: UUID
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)