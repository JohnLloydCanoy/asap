from sqlalchemy import Column, Integer, ForeignKey, CheckConstraint, TIMESTAMP
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..core.database import Base


class PostAnalytics(Base):
    """
    SQLAlchemy model representing the 'post_analytics' table.
    Tracks real-time performance and engagement telemetry for deployed posts.
    """
    __tablename__ = "post_analytics"

    # Core Identifier & One-to-One Foreign Key Link
    post_id = Column(
        UUID(as_uuid=True), 
        ForeignKey("scheduled_posts.id", ondelete="CASCADE"), 
        primary_key=True,  # Acts as both the Foreign Key and Primary Key
        nullable=False
    )

    # Engagement Telemetry Counters
    likes = Column(Integer, nullable=False, default=0, server_default="0")
    shares = Column(Integer, nullable=False, default=0, server_default="0")
    comments = Column(Integer, nullable=False, default=0, server_default="0")

    # Sync Tracking Timestamp
    last_synced_at = Column(
        TIMESTAMP(timezone=True), 
        nullable=False, 
        default=func.now(), 
        server_default=func.now(), 
        onupdate=func.now()
    )

    # Database Level Constraints (Prevents negative counts)
    __table_args__ = (
        CheckConstraint("likes >= 0", name="check_likes_non_negative"),
        CheckConstraint("shares >= 0", name="check_shares_non_negative"),
        CheckConstraint("comments >= 0", name="check_comments_non_negative"),
    )

    # ORM Relationship
    post = relationship("ScheduledPost", back_populates="analytics")