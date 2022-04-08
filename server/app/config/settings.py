from pydantic import BaseSettings, Field


class Settings(BaseSettings):
    app_name: str = Field(..., env="APP_NAME")
    app_version: str = Field(..., env="APP_VERSION")
    mongodb_uri: str = Field(..., env="APP_MONGODB_URI")
    database_name: str = Field(..., env="APP_DATABASE_NAME")
