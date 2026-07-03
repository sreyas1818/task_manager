from fastapi import FastAPI
from authentication.login import router as login_router
from tasks.tasks import router as tasks_router
from ai.suggest import router as ai_router
from fastapi.middleware.cors import CORSMiddleware

app=FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "task-manager-iota-pink.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(login_router)
app.include_router(tasks_router)
app.include_router(ai_router)