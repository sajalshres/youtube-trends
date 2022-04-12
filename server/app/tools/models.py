from pydantic import BaseModel


class Status(BaseModel):
    status: str

    class Config:
        schema_extra = {"example": {"status": "ok"}}


class DBInfo(BaseModel):
    version: str
    collections: list[str]

    class Config:
        schema_extra = {"example": {"version": "5.0.0", "collections": ["usa", "ca"]}}


class Info(BaseModel):
    app_name: str
    app_version: str
    db: DBInfo

    class Config:
        schema_extra = {
            "example": {
                "app_name": "App Name",
                "app_version": "5.0.0",
                "db": {"version": "5.0.0", "collections": ["usa", "ca"]},
            }
        }


class Country(BaseModel):
    code: str
    name: str

    class Config:
        schema_extra = {"example": {"code": "US", "name": "USA"}}
