from pydantic import BaseModel


class CorrelationLikesAndView(BaseModel):
    video_id: str
    view_count: int
    likes: int


class AvgHoursToTrendModel(BaseModel):
    category: str
    avg_hours_to_trend: float
