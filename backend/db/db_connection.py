import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.pool import QueuePool

# Load environment variables from .env (for local development)
load_dotenv()

# Database URL components
DB_USERNAME = os.getenv("DB_USERNAME")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT", "6543")
DB_NAME = os.getenv("DB_NAME", "postgres")

# Check for required envs
required_envs = [DB_USERNAME, DB_PASSWORD, DB_HOST]
if not all(required_envs):
    missing = [name for name, value in [
        ("DB_USERNAME", DB_USERNAME),
        ("DB_PASSWORD", DB_PASSWORD), 
        ("DB_HOST", DB_HOST)
    ] if not value]
    raise ValueError(f"Missing database environment variables: {missing}")

# Construct Database URL
DATABASE_URL = f"postgresql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# Set up SQLAlchemy Engine optimized for Supabase pooler
engine = create_engine(
    DATABASE_URL,
    poolclass=QueuePool,
    pool_size=3,
    max_overflow=5,
    pool_pre_ping=True,
    pool_recycle=3600,
    echo=False
)

SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

# Create tables automatically when the module is imported
def init_table():
    try:
        Base.metadata.create_all(engine)
        print("✅ Database tables initialized successfully")
    except Exception as e:
        print(f"❌ Error initializing database tables: {e}")
        raise

# Function to get a database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()