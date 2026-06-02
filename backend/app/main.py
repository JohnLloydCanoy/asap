from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from .core.database import get_db
from app.api import auth
import app.models

app = FastAPI(title="ASAP API")
app.include_router(auth.router)


@app.get("/")
def read_root():
    return {"message": "Welcome to the ASAP API!"}