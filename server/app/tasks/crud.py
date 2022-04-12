import pandas as pd
from database import db


async def get_correlation_likes_and_view(country: str = "us") -> list:
    cursor = db[country].find(
        {}, {"video_id": 1, "view_count": 1, "likes": 1, "_id": 0}
    )

    return await cursor.to_list(length=None)


async def get_avg_hours_of_trending_videos(country: str = "us") -> list:
    cursor = db[country].find(
        {}, {"category": 1, "published_at": 1, "trending_date": 1, "_id": 0}
    )

    # create pandas dataframe
    df = pd.DataFrame(await cursor.to_list(length=None))

    # convert columns to datetime
    df.published_at = pd.to_datetime(df.published_at)
    df.trending_date = pd.to_datetime(df.trending_date)

    # calculate hours to trend
    df["hours_to_trend"] = (df.trending_date - df.published_at) / pd.Timedelta(hours=1)

    # calculate average
    data = {}
    for category in df.category.unique():
        df_by_category = df[df.category == category]
        data[category] = df_by_category.hours_to_trend.mean()

    # generate data
    df = pd.DataFrame({"category": data.keys(), "avg_hours_to_trend": data.values()})
    df = df.sort_values("avg_hours_to_trend")
    return df.to_dict(orient="records")
