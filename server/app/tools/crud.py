from database import db, client


async def get_server_info() -> str:
    server_info = await client.server_info()
    return server_info["version"]


async def get_collection_names() -> list:
    names = await db.list_collection_names()
    return names


async def get_countries() -> list:
    cursor = db.countries.find({})

    return await cursor.to_list(length=None)
