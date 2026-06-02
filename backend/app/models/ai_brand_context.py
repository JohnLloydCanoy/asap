import uuid
from sqlalchemy import Column, Text, ForeignKey, TIMESTAMP
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

# Import the shared Base engine instance from your core folder
from ..core.database import Base


class AIBrandContext(Base):
    """
    SQLAlchemy model representing the 'ai_brand_contexts' table.
    Stores the AI persona, tone constraints, and brand identity for a user.
    """
    __tablename__ = "ai_brand_contexts"

    # Core Identifiers
    id = Column(
        UUID(as_uuid=True), 
        primary_key=True, 
        default=uuid.uuid4, 
        server_default=func.gen_random_uuid()
    )

    user_id = Column(
        UUID(as_uuid=True), 
        ForeignKey("users.id", ondelete="CASCADE"), 
        unique=True, 
        nullable=False
    )

    # AI Prompt Modifiers
    brand_bio = Column(Text, nullable=False)
    
    # JSONB columns allow passing flexible arrays directly to your Gemini API prompts
    preferred_tones = Column(JSONB, nullable=False, default=list, server_default='[]')
    banned_keywords = Column(JSONB, nullable=False, default=list, server_default='[]')
    
    # Audit Timestamp
    updated_at = Column(
        TIMESTAMP(timezone=True), 
        nullable=False, 
        default=func.now(), 
        server_default=func.now(), 
        onupdate=func.now()
    )

    # ORM Relationships
    user = relationship("User", back_populates="brand_contexts")