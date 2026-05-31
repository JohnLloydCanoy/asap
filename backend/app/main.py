from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from .core.database import get_db

app = FastAPI()

@app.get("/items/")
def read_items(db: Session = Depends(get_db)):
    # Database Logic
    return {"message": "Database session successfully injected!"}