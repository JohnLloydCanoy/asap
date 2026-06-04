import os
from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from apscheduler.schedulers.background import BackgroundScheduler
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from app.api import auth, users, social_accounts, scheduled_posts
from app.workers.tasks import process_pending_posts
from .core.database import get_db
import app.models


load_dotenv()


@asynccontextmanager
async def lifespan(app: FastAPI):

    print("⏳ Starting background worker...")
    scheduler = BackgroundScheduler()

    scheduler.add_job(process_pending_posts, 'interval', seconds=60)
    scheduler.start()
    
    yield 


    print("🛑 Shutting down background worker...")
    scheduler.shutdown()


app = FastAPI(title="ASAP API", lifespan=lifespan)


origins = [origin.strip() for origin in os.getenv("CORS_ORIGINS", "").split(",") if origin]

if not origins:
    origins = ["http://localhost:3000", "http://127.0.0.1:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(social_accounts.router)
app.include_router(scheduled_posts.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the ASAP API!"}