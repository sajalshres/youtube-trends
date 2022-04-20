import logging
from fastapi import APIRouter, BackgroundTasks

from core import crud
from core.models import StatsModel, CountryModel
from cache.utils import set_cache, get_cache

logger = logging.getLogger(__name__)

router = APIRouter()


@router.get("/stats", response_model=StatsModel)
async def get_stats(background_tasks: BackgroundTasks):
    cache_key = "core:stats"

    data = await get_cache(key=cache_key)

    if not data:
        logger.info("Cache missed for %s", cache_key)
        data = await crud.get_stats()
        background_tasks.add_task(set_cache, cache_key, data)

    return data


@router.get("/countries", response_model=list[CountryModel])
async def get_countries():
    data = await crud.get_countries()
    return data
