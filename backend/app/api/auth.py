from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm 
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse
from app.core.security import hash_password, verify_password, create_access_token

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register_user(user_in: UserCreate, db: Session = Depends(get_db)):
    """
    Registers a new user in the ASAP database.
    Hashes the password securely and prevents duplicate emails.
    """

    existing_user = db.query(User).filter(User.email == user_in.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A user with this email already exists."
        )
    hashed_pwd = hash_password(user_in.password)
    
    new_user = User(
        email=user_in.email,
        hashed_password=hashed_pwd, # Notice we pass the HASH, not the raw password!
        first_name=user_in.first_name,
        last_name=user_in.last_name,
        middle_name=user_in.middle_name,
        suffixes=user_in.suffixes,
        cell_number=user_in.cell_number,
        sex=user_in.sex,
        time_zone=user_in.time_zone
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user) # Refreshes the object to grab the auto-generated UUID and created_at timestamps

    return new_user


@router.post("/login")
def login_user(
    form_data: OAuth2PasswordRequestForm = Depends(), 
    db: Session = Depends(get_db)
):
    """
    Authenticates a user via email (username) and password.
    Returns a secure JWT access token upon successful authentication.
    """

    user = db.query(User).filter(User.email == form_data.username).first()

    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(subject=user.id)
    

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }