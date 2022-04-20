import logging
from fastapi import APIRouter, Query, BackgroundTasks

from tasks.models import (
    CorrelationLikesAndView,
    AvgHoursToTrendModel,
    MostPopularTagsModel,
    TitleLengthFrequencyModel,
    DayOfWeekModel,
)
from tasks import crud
from cache.utils import set_cache, get_cache, remove_cache

logger = logging.getLogger(__name__)

router = APIRouter()


@router.get(
    "/correlation-likes-and-view",
    summary="Correlation between likes and views",
    response_model=list[CorrelationLikesAndView],
)
async def get_correlation_likes_and_view(
    background_tasks: BackgroundTasks, country: str | None = Query("us", max_length=2)
):
    cache_key = f"correlation_likes_and_view:{country}"
    data = await get_cache(key=cache_key)

    if not data:
        logger.info("Cache miss")
        data = await crud.get_correlation_likes_and_view(country=country)
        background_tasks.add_task(set_cache, cache_key, data)

    return data


@router.get(
    "/avg-hours-of-trending-videos",
    summary="Compare average hours of trending video across multiple categories",
    response_model=list[AvgHoursToTrendModel],
)
async def get_avg_hours_of_trending_videos(
    background_tasks: BackgroundTasks, country: str | None = Query("us", max_length=2)
):
    cache_key = f"avg_hours_of_trending_videos:{country}"
    data = await get_cache(key=cache_key)

    if not data:
        print("Cache miss")
        data = await crud.get_avg_hours_of_trending_videos(country=country)
        background_tasks.add_task(set_cache, cache_key, data)

    return data


@router.get(
    "/most-popular-tags",
    summary="Identify most popular tags across countries",
    response_model=MostPopularTagsModel,
)
async def get_most_popular_tags(
    background_tasks: BackgroundTasks, limit: int = 10, refresh: bool | None = False
):
    cache_key = f"most_popular_tags:{limit}"

    if refresh:
        await remove_cache(cache_key)

    data = await get_cache(key=cache_key)

    if not data:
        print("Cache miss")
        data = await crud.get_most_popular_tags(limit=limit)
        background_tasks.add_task(set_cache, cache_key, data)

    return data


@router.get(
    "/frequency-title-length",
    summary="Analyze the frequency of title length for the trending video",
    response_model=TitleLengthFrequencyModel,
)
async def get_frequency_title_length(country: str | None = Query("us", max_length=2)):
    data = await crud.get_frequency_title_length(country)

    return {"frequency": data}


@router.get(
    "/day-of-week",
    summary="Identify the trend over the day of a week with the total number of trending videos",
    response_model=list[DayOfWeekModel],
)
async def get_day_of_week(background_tasks: BackgroundTasks):
    cache_key = "day_of_week"

    data = await get_cache(key=cache_key)

    if not data:
        print("Cache miss")
        data = await crud.get_day_of_week()
        background_tasks.add_task(set_cache, cache_key, data)

    return data
