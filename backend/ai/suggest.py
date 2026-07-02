from fastapi import APIRouter
from models.request_models import AISuggest
from groq import Groq
from dotenv import load_dotenv
import os
import json
load_dotenv()
router = APIRouter()
client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)
@router.post("/ai/suggest")
def ai_suggest(data: AISuggest):
    prompt = f"""
    The user entered the following task title:
    {data.title}
    Generate:
    1. A professional task description.
    2. Suggest a priority (Low, Medium, High)
    Return ONLY valid JSON.
    Example:
    {{
        "description":"......",
        "priority":"High"
    }}
    """
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.4,
        response_format={"type": "json_object"}
    )

    result = response.choices[0].message.content
    print(result)
    data = json.loads(result)

    return {
        "description": data["description"],
        "priority": data["priority"]
    } 