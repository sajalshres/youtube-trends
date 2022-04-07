import imp
from fastapi import APIRouter
from models import Status

router = APIRouter()


@router.get(
    "/status",
    response_model=Status,
    responses={
        200: {
            "content": {"status": "ok"},
            "description": "Returns the status of server",
        }
    },
)
def get_status():
    return {"status": "OK"}
