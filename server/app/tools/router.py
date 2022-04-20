import logging
from fastapi import APIRouter, Depends, Response, status

from config import get_settings, Settings
from cache.utils import remove_cache
from tools.models import Status, Info
from tools import crud

router = APIRouter()


@router.get(
    "/status",
    response_model=Status,
    responses={
        200: {
            "content": {"status": "ok"},
            "description": "Returns the status of server",
        }
    },
)
def get_status():
    return {"status": "ok"}


@router.get(
    "/info",
    response_model=Info,
)
async def get_info(settings: Settings = Depends(get_settings)):
    return {
        "app_name": settings.app_name,
        "app_version": settings.app_version,
        "db": {
            "version": await crud.get_server_info(),
            "collections": await crud.get_collection_names(),
        },
    }


@router.get("/clear-cache")
async def clear_clear(response: Response, key: str | None = None):
    if not key:
        response.status_code = status.HTTP_422_UNPROCESSABLE_ENTITY
        return {"status": "not implemented"}

    await remove_cache(key)

    return {"status": "ok"}
