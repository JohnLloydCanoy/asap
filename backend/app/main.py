from fastapi import FastAPI, Depends
from app.api import auth, users, social_accounts
from sqlalchemy.orm import Session
from .core.database import get_db
from app.api import auth
import app.models

app = FastAPI(title="ASAP API")
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(social_accounts.router)

app.include_router(users.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the ASAP API!"}