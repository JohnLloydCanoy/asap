from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.api.deps import get_current_user
from app.models.user import User
from app.models.social_accounts import SocialAccount
from app.models.scheduled_posts import ScheduledPost
from app.schemas.scheduled_posts import ScheduledPostCreate, ScheduledPostResponse

router = APIRouter(prefix="/scheduled-posts", tags=["Scheduled Posts"])

@router.post("/", response_model=ScheduledPostResponse, status_code=status.HTTP_201_CREATED)
def create_scheduled_post(
    post_in: ScheduledPostCreate, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user) 
):
    """
    Creates a new scheduled post and links it to a specific social account.
    """

    social_account = db.query(SocialAccount).filter(
        SocialAccount.id == post_in.social_account_id,
        SocialAccount.user_id == current_user.id
    ).first()
    
    if not social_account:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="Social account not found or does not belong to you."
        )

    new_post = ScheduledPost(
        content=post_in.content,
        media_urls=post_in.media_urls,
        scheduled_for=post_in.scheduled_for,
        is_recurring=post_in.is_recurring,
        status="PENDING",
        social_account_id=social_account.id,
        user_id=current_user.id
    )
    
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    
    return new_post

@router.get("/", response_model=List[ScheduledPostResponse])
def get_my_scheduled_posts(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Fetches all posts scheduled by the currently logged-in user.
    """
    posts = db.query(ScheduledPost).filter(ScheduledPost.user_id == current_user.id).all()
    return posts