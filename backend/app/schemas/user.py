from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Optional
from uuid import UUID
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    first_name: str
    last_name: str
    middle_name: str
    suffixes: Optional[str] = None
    cell_number: Optional[str] = None
    sex: Optional[str] = None
    time_zone: str = "UTC"


class UserCreate(UserBase):
    password: str 

class UserResponse(UserBase):
    id: UUID
    created_at: datetime
    updated_at: datetime


    model_config = ConfigDict(from_attributes=True)