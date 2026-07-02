from connections.database import get_db
from fastapi import APIRouter
from models.request_models import NewTask,UpdateTask
from typing import Optional
from fastapi import Depends
from authentication.auth import verify_token
router=APIRouter()
@router.get("/tasks")
def get_tasks(status:Optional[str]=None,priority:Optional[str]=None,user=Depends(verify_token)):
    try:
        db=get_db()
        cursor=db.cursor()
        query="select * from tasks"
        values=[]
        if status and priority:
            query+= " where status=%s AND priority=%s"
            values.append(status)
            values.append(priority)
        elif status :
            query+= " where status=%s "
            values.append(status)
        elif priority:
            query+= " where priority=%s"
            values.append(priority)

        cursor.execute(query,tuple(values))
        result=cursor.fetchall()
        return{
            "data":result
        }
    except Exception as e:
        return{
            "error":str(e)
        }
@router.post("/tasks")
def create_task(data: NewTask,user=Depends(verify_token)):
    try:
        db=get_db()
        cursor=db.cursor()
        query="""insert into tasks(title, description, due_date, priority, status)
            values(%s,%s,%s,%s,%s)"""
        cursor.execute(query,(data.title,data.description,data.due_date,data.priority,data.status))
        db.commit()
        return{
            "success":"task created"
        }
              
    except Exception as e:
        return{
            "error":str(e)
        }

@router.get("/tasks/{id}")
def task_by_id(id: int,user=Depends(verify_token)):
    try:
        db=get_db()
        cursor=db.cursor()
        query="select * from tasks where id=%s"
        cursor.execute(query,(id,))
        result=cursor.fetchone()
        return{
            "status":"success",
            "data":result
        }
    except Exception as e:
        return{
            "error":str(e)
        }

@router.delete("/tasks/{id}")
def task_by_id(id: int,user=Depends(verify_token)):
    try:
        db=get_db()
        cursor=db.cursor()
        query="delete from tasks where id=%s"
        cursor.execute(query,(id,))
        db.commit()
        return{
            "status":"deleted",
        }
    except Exception as e:
        return{
            "error":str(e)
        }

@router.put("/tasks/{id}")
def update_tasks(id:int,data: UpdateTask,user=Depends(verify_token)):
    try:
        db=get_db()
        cursor=db.cursor()
        query="""update tasks 
        set title=%s,description=%s,due_date=%s,priority =%s,status=%s
        where id=%s"""
        cursor.execute(query,(data.title,data.description,data.due_date,data.priority,data.status,id))
        db.commit()
        return{
            "status":"success"
        }
    except Exception as e:
        return{
            "error":str(e)
        }
        