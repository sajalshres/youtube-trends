from fastapi import APIRouter
from fastapi.responses import RedirectResponse

from core.router import router as core_router
from tools.router import router as utils_router
from tasks.router import router as task_router

router = APIRouter()


@router.get("/", include_in_schema=False)
async def root_redirect():
    return RedirectResponse(url="/api/docs")


router.include_router(core_router, prefix="/core", tags=["core"])
router.include_router(utils_router, prefix="/tools", tags=["tools"])
router.include_router(task_router, prefix="/tasks", tags=["tasks"])
