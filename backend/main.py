from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from db.db_connection import init_table
from routers.book_router import router as book_router

init_table()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,         
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello World"}

app.include_router(book_router, prefix="/books", tags=["books"])