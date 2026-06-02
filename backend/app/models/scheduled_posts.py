import uuid
from sqlalchemy import Column, String, Text, Boolean, ForeignKey, CheckConstraint, TIMESTAMP, Index
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..core.database import Base


class ScheduledPost(Base):
    """
    SQLAlchemy model representing the 'scheduled_posts' table.
    The core queue for the ASAP automation and AI content engine.
    """
    __tablename__ = "scheduled_posts"

    # Core Identifiers & Foreign Keys
    id = Column(
        UUID(as_uuid=True), 
        primary_key=True, 
        default=uuid.uuid4, 
        server_default=func.gen_random_uuid()
    )
    user_id = Column(
        UUID(as_uuid=True), 
        ForeignKey("users.id", ondelete="CASCADE"), 
        nullable=False
    )
    social_account_id = Column(
        UUID(as_uuid=True), 
        ForeignKey("social_accounts.id", ondelete="CASCADE"), 
        nullable=False
    )

    # External Platform Mapping
    platform_post_id = Column(String(255), nullable=True, unique=True, index=True)

    # Content & Media
    content = Column(Text, nullable=False)
    media_urls = Column(JSONB, nullable=False, default=list, server_default='[]')

    # Execution State & Queue Mechanics
    status = Column(
        String(20), 
        nullable=False, 
        default="DRAFT", 
        server_default="DRAFT", 
        index=True
    )
    scheduled_for = Column(TIMESTAMP(timezone=True), nullable=True, index=True)
    live_url = Column(String(512), nullable=True)
    failure_reason = Column(Text, nullable=True)
    is_recurring = Column(Boolean, nullable=False, default=False, server_default="false")

    # Audit Timestamps
    created_at = Column(
        TIMESTAMP(timezone=True), 
        nullable=False, 
        default=func.now(), 
        server_default=func.now()
    )
    updated_at = Column(
        TIMESTAMP(timezone=True), 
        nullable=False, 
        default=func.now(), 
        server_default=func.now(), 
        onupdate=func.now()
    )

    # Database Level Constraints
    __table_args__ = (
        CheckConstraint(
            "status IN ('DRAFT', 'PENDING', 'PUBLISHED', 'FAILED')", 
            name="check_valid_post_status"
        ),
    )

    # ORM Relationships
    # ORM Relationships
    user = relationship("User", back_populates="scheduled_posts")
    social_account = relationship("SocialAccount", back_populates="scheduled_posts")
    analytics = relationship("PostAnalytics", back_populates="post", uselist=False, cascade="all, delete-orphan")