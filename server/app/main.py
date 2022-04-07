from typing import Optional

from fastapi import FastAPI

from routers import router

app = FastAPI(
    title="Youtube Trends Analysis",
    description="An analysis of Youtube trending videos using information visualization techniques",
    version="0.0.1",
    docs_url="/api/docs",
    redoc_url=None,
    openapi_url="/api/openapi.json",
)

app.include_router(router, prefix="/api")
