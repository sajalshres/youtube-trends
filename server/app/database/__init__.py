from fastapi import Depends
from motor.motor_asyncio import AsyncIOMotorClient
from config import get_settings, Settings

settings = get_settings()

client = AsyncIOMotorClient(settings.mongodb_uri)
db = client[settings.database_name]
