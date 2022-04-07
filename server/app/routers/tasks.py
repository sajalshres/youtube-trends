from fastapi import APIRouter

router = APIRouter()


@router.get(
    "/correlation-likes-and-view", summary="Correlation between likes and views"
)
def get_correlation_likes_and_view():
    return {"status": "not implemented"}


@router.get(
    "/avg-hours-of-trending-videos",
    summary="Compare average hours of trending video across multiple categories",
)
def get_avg_hours_of_trending_videos():
    return {"status": "not implemented"}


@router.get("/most-popular-tags", summary="Identify most popular tags across countries")
def get_most_popular_tags():
    return {"status": "not implemented"}


@router.get(
    "/frequency-title-length",
    summary="Analyze the frequency of title length for the trending video",
)
def get_frequency_title_length():
    return {"status": "not implemented"}


@router.get(
    "/day-of-week",
    summary="Identify the trend over the day of a week with the total number of trending videos",
)
def get_day_of_week():
    return {"status": "not implemented"}
