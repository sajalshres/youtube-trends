from pydantic import BaseModel


class CorrelationLikesAndView(BaseModel):
    video_id: str
    view_count: int
    likes: int
