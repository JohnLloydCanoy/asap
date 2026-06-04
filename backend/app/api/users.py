from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.schemas.user import UserResponse, UserCreate  # <-- Added UserCreate
from app.models.user import User
from app.api.deps import get_current_user, get_db  # <-- Added get_db

# ✅ THIS IS THE MISSING LINE!
from app.core.security import hash_password


router = APIRouter(prefix="/users", tags=["users"])


@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def create_user(user_in: UserCreate, db: Session = Depends(get_db)):
    """
    Creates a new user in the database.
    """

    existing_user = db.query(User).filter(User.email == user_in.email).first()
    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="A user with this email already exists."
        )

    # Now Python knows exactly what this function is!
    hashed_pw = hash_password(user_in.password)

    new_user = User(
        email=user_in.email,
        hashed_password=hashed_pw, 
        first_name=user_in.first_name,
        last_name=user_in.last_name,
        middle_name=user_in.middle_name,
        suffixes=user_in.suffixes,
        cell_number=user_in.cell_number,
        sex=user_in.sex,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


@router.get("/me", response_model=UserResponse)
def get_my_profile(current_user: User = Depends(get_current_user)):
    """
    Fetches the profile of the currently logged-in user.
    Requires a valid JWT Bearer token in the request headers.
    """
    return current_user