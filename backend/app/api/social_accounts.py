from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.api.deps import get_current_user
from app.models.user import User
from app.models.social_account import SocialAccount
from app.schemas.social_account import SocialAccountCreate, SocialAccountResponse

router = APIRouter(prefix="/social-accounts", tags=["Social Accounts"])

@router.post("/", response_model=SocialAccountResponse, status_code=status.HTTP_201_CREATED)
def connect_social_account(
    account_in: SocialAccountCreate, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user) # The Bouncer!
):
    """
    Connects a new social media account (e.g., Facebook, Twitter) to the currently logged-in user.
    """

    new_account = SocialAccount(
        platform=account_in.platform,
        account_handle=account_in.account_handle,
        access_token=account_in.access_token,
        refresh_token=account_in.refresh_token,
        expires_at=account_in.expires_at,
        scopes=account_in.scopes,
        user_id=current_user.id 
    )
    

    db.add(new_account)
    db.commit()
    db.refresh(new_account)
    
    return new_account

@router.get("/", response_model=List[SocialAccountResponse])
def get_my_social_accounts(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Fetches all social media accounts connected to the currently logged-in user.
    """

    accounts = db.query(SocialAccount).filter(SocialAccount.user_id == current_user.id).all()
    return accounts