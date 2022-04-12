import aioredis
from config import get_settings

settings = get_settings()

redis = aioredis.from_url(settings.redis_uri, decode_responses=True)
