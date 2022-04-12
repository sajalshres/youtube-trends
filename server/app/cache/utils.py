import json
import logging
from cache import redis

logger = logging.getLogger(__name__)


async def set_cache(key: str, value: dict | list) -> None:
    await redis.set(name=key, value=json.dumps(value))


async def get_cache(key: str) -> dict | list | None:
    data = await redis.get(name=key)

    if data:
        return json.loads(data)

    logger.info(f"Data for {key} not found in cache")
    return None
