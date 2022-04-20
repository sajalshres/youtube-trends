import logging
from database import db

logger = logging.getLogger(__name__)


async def get_countries() -> list:
    cursor = db.countries.find({})

    return await cursor.to_list(length=None)


async def get_stats():
    countries = await db.countries.find({}).to_list(length=None)

    videos = []
    channels = []
    for country in countries:
        videos.append(len(await db[country["code"].lower()].distinct("video_id")))
        channels.append(len(await db[country["code"].lower()].distinct("channel_id")))

    return {
        "countries": len(countries),
        "categories": len(await db.us.distinct("category")),
        "videos": sum(videos),
        "channels": sum(channels),
    }
