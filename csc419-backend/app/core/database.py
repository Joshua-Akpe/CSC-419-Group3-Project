from sqlmodel import SQLModel, create_engine, Session
from app.core.config import DATABASE_URL

# Check if DATABASE_URL is loaded to prevent runtime crashes
if not DATABASE_URL:
    raise ValueError("DATABASE_URL is not set. Check your .env file or environment variables.")

engine = create_engine(DATABASE_URL, echo=True)

def get_session():
    with Session(engine) as session:
        yield session