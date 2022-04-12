from fastapi import FastAPI

from config import get_settings
from config.router import router

settings = get_settings()

app = FastAPI(
    title=settings.app_name,
    description="An analysis of Youtube trending videos using information visualization techniques",
    version=settings.app_version,
    docs_url="/api/docs",
    redoc_url=None,
    openapi_url="/api/openapi.json",
)

app.include_router(router, prefix="/api")
