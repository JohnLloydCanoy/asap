import uuid
from sqlalchemy import Column, String, CheckConstraint, Index
from sqlalchemy import TIMESTAMP
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..core.database import Base


class User(Base):
    """
    SQLAlchemy model representing the 'users' table.
    Handles core account details, authentication, and regional metadata.
    """
    __tablename__ = "users"

    # Core Identifiers & Credentials
    id = Column(
        UUID(as_uuid=True), 
        primary_key=True, 
        default=uuid.uuid4, 
        server_default=func.gen_random_uuid()
    )
    email = Column(String(255), nullable=False, unique=True)
    hashed_password = Column(String(255), nullable=False)

    # Personal Attributes
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    middle_name = Column(String(50), nullable=False)  
    suffixes = Column(String(50), nullable=True)    
    cell_number = Column(String(20), nullable=True, unique=True)
    sex = Column(String(10), nullable=True)

    # Regional & Audit Telemetry
    time_zone = Column(String(50), nullable=False, default="UTC", server_default="UTC")
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

    # Database Level Constraints & Explicit Performance Indexes
    __table_args__ = (
        CheckConstraint(
            "sex IN ('Male', 'Female', 'Other')", 
            name="check_user_sex_validity"
        ),
        Index("ix_users_email", "email"),  
    )


    # ORM Relationships
    social_accounts = relationship("SocialAccount", back_populates="user", cascade="all, delete-orphan")
    scheduled_posts = relationship("ScheduledPost", back_populates="user", cascade="all, delete-orphan")
    brand_contexts = relationship("AIBrandContext", back_populates="user", uselist=False, cascade="all, delete-orphan")
    execution_logs = relationship("SystemExecutionLog", back_populates="user", cascade="all, delete-orphan")