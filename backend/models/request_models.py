from pydantic import BaseModel
from datetime import date
from typing import Optional
class Login(BaseModel):
    username: str
    password: str

class NewTask(BaseModel):
    title : str
    description : str
    due_date : date
    priority : str
    status : str

class UpdateTask(BaseModel):
    title : str
    description : str
    due_date : date
    priority : str
    status : str

class AISuggest(BaseModel):
    title:Optional[str]=None