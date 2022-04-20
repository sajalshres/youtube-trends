import pandas as pd

from database import db
from tasks.utils import get_tags


async def get_correlation_likes_and_view(country: str = "us") -> list:
    cursor = db[country].find({}, {"view_count": 1, "likes": 1, "_id": 0})

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


async def get_most_popular_tags(limit: int = 10):
    response = {"name": "Top Tags", "children": []}
    countries = await db.countries.find({}).to_list(length=None)

    for country in countries:
        country_code = country["code"].lower()
        data = pd.DataFrame(data=await db[country_code].find({}).to_list(length=None))

        tags = get_tags(data=data)
        data = {"name": list(tags.keys()), "count": list(tags.values())}

        df = pd.DataFrame(data=data)
        df = df.sort_values(by=["count"], ascending=False)
        df = df.head(limit)

        response["children"].append(
            {"name": country["name"], "children": df.to_dict(orient="records")}
        )
    return response


async def get_frequency_title_length(country: str = "us"):
    cursor = db[country].find({}, {"title": 1, "_id": 0})
    frequency = [len(record["title"]) async for record in cursor]

    return frequency


async def get_day_of_week():
    data = []
    countries = await db.countries.find({}).to_list(length=None)

    for country in countries:
        country_code = country["code"].lower()

        df = pd.DataFrame(data=await db[country_code].find({}).to_list(length=None))
        df["trending_date"] = pd.to_datetime(df["trending_date"])
        df["trending_day"] = df["trending_date"].dt.day_name()

        res_df = df.groupby(["trending_day"], as_index=False).agg(
            view_count=("view_count", "sum")
        )
        print(res_df.to_dict(orient="records"))

        data.append({"id": country["name"], "data": res_df.to_dict(orient="records")})

    return data
