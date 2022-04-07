from pydantic import BaseModel


class Status(BaseModel):
    status: str

    class Config:
        schema_extra = {"example": {"status": "ok"}}
