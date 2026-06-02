import uuid
from sqlalchemy import Column, String, Integer, ForeignKey, CheckConstraint, TIMESTAMP
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..core.database import Base


class SystemExecutionLog(Base):
    """
    SQLAlchemy model representing the 'system_execution_logs' table.
    Tracks internal background worker performance and task execution states.
    """
    __tablename__ = "system_execution_logs"

    # Core Identifier
    id = Column(
        UUID(as_uuid=True), 
        primary_key=True, 
        default=uuid.uuid4, 
        server_default=func.gen_random_uuid()
    )
    
    # Notice ondelete="SET NULL" and nullable=True here!
    user_id = Column(
        UUID(as_uuid=True), 
        ForeignKey("users.id", ondelete="SET NULL"), 
        nullable=True
    )

    # Execution Metadata
    task_name = Column(String(100), nullable=False, index=True)
    status = Column(String(20), nullable=False, index=True)
    
    # Payload for debugging and metrics
    payload = Column(JSONB, nullable=True)
    execution_time_ms = Column(Integer, nullable=True)

    # Timestamp
    trigger_at = Column(
        TIMESTAMP(timezone=True), 
        nullable=False, 
        default=func.now(), 
        server_default=func.now()
    )

    # Database Level Constraints
    __table_args__ = (
        CheckConstraint(
            "status IN ('SUCCESS', 'FAILURE')", 
            name="check_valid_log_status"
        ),
    )

    # ORM Relationship
    user = relationship("User", back_populates="execution_logs")