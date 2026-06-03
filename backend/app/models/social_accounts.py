import uuid
from sqlalchemy import Column, String, Text, ForeignKey, CheckConstraint, TIMESTAMP
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..core.database import Base


class SocialAccount(Base):
    """
    SQLAlchemy model representing the 'social_accounts' table.
    Stores OAuth credentials and platform connections for ASAP users.
    """
    __tablename__ = "social_accounts"

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
        nullable=False
    )

    # Platform Details
    platform = Column(String(50), nullable=False)
    account_handle = Column(String(100), nullable=False)
    
    # OAuth Credentials (Ensure access_token is encrypted before saving in your API logic!)
    access_token = Column(Text, nullable=False)
    refresh_token = Column(Text, nullable=True)
    
    # Metadata & Tracking
    expires_at = Column(TIMESTAMP(timezone=True), nullable=True)
    created_at = Column(
        TIMESTAMP(timezone=True), 
        nullable=False, 
        default=func.now(), 
        server_default=func.now()
    )
    scopes = Column(JSONB, nullable=False, default=list, server_default='[]')

    # Database Level Constraints
    __table_args__ = (
        CheckConstraint(
            "platform IN ('Bluesky', 'Discord', 'Telegram', 'Mastodon', 'Slack', 'Nostr')", 
            name="check_valid_social_platform"
        ),
    )

    # ORM Relationships
    user = relationship("User", back_populates="social_accounts")
    scheduled_posts = relationship("ScheduledPost", back_populates="social_account", cascade="all, delete-orphan")