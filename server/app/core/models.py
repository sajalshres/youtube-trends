from mimetypes import init
from pydantic import BaseModel


class CountryModel(BaseModel):
    code: str
    name: str

    class Config:
        schema_extra = {"example": {"code": "US", "name": "USA"}}


class StatsModel(BaseModel):
    countries: int
    categories: int
    videos: int
    channels: int

    class Config:
        schema_extra = {
            "example": {
                "countries": 9,
                "categories": 19,
                "videos": 20000,
                "channels": 2000,
            }
        }
