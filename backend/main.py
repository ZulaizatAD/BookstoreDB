import os
from fastapi import FastAPI, HTTPException
from contextlib import asynccontextmanager
import logging
from db.db_connection import init_table
from routers.book_router import router as book_router
from middleware import setup_all_middleware

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("Starting up...")
    try:
        init_table()
        logger.info("Database initialized successfully")
    except Exception as e:
        logger.error(f"Failed to initialize database: {e}")
        raise

    yield

    # Shutdown
    logger.info("Shutting down...")


app = FastAPI(
    title="Book Management API",
    description="A FastAPI application for managing books",
    version="1.0.0",
    lifespan=lifespan,
)

# Setup all middleware
setup_all_middleware(app)

@app.get("/")
def read_root():
    return {"message": "Book Management API running on Render", "status": "healthy"}


@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "book-api"}


app.include_router(book_router, prefix="/api/books", tags=["books"])

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)