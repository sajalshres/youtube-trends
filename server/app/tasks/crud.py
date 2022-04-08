from database import db


async def get_correlation_likes_and_view() -> list:
    cursor = db.us.find({}, {"video_id": 1, "view_count": 1, "likes": 1, "_id": 0})

    return await cursor.to_list(length=None)
