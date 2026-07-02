from connections.database import get_db
from models.request_models import Login
from fastapi import APIRouter
from authentication.auth import create_access_token
router = APIRouter()
@router.post("/login")
def login(data: Login):
    db = get_db()
    cursor = db.cursor()
    query = """
        SELECT id, username
        FROM users
        WHERE username=%s
        AND password=%s
    """
    cursor.execute(query, (data.username, data.password))
    result = cursor.fetchone()
    if result:
        token = create_access_token({
            "sub": result["username"],
            "id": result["id"]
        })
        return {
            "result": "success",
            "access_token": token,
            "token_type": "Bearer"
        }
    return {

        "result": "invalid details"

    }