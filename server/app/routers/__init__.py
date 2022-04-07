from fastapi import APIRouter
from routers.utils import router as utils_router
from routers.tasks import router as task_router

router = APIRouter()
router.include_router(utils_router, prefix="/utils", tags=["utils"])
router.include_router(task_router, prefix="/tasks", tags=["tasks"])
