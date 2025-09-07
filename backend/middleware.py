from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI

def setup_cors_middleware(app: FastAPI):
    """
    Configure CORS middleware for the FastAPI application
    """
    # Define allowed origins
    allowed_origins = [
        "bookstore-db-f17ed.web.app",
        "bookstore-db-f17ed.firebaseapp.com",
        "http://localhost:3000",  # React development server
        "http://localhost:5173",  # Vite development server
        "http://localhost:8080",  # Local testing
        "http://127.0.0.1:3000",  # Alternative localhost
        "http://127.0.0.1:5173",  # Alternative localhost
    ]
    
    app.add_middleware(
        CORSMiddleware,
        allow_origins=allowed_origins,
        allow_credentials=True,
        allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allow_headers=["*"],
    )

def setup_all_middleware(app: FastAPI):
    """
    Setup all middleware for the application
    """
    setup_cors_middleware(app)
    