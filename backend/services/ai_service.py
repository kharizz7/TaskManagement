import os
import json
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def generate_task(prompt):

    system_prompt = """
You are an AI Task Assistant.

Convert the user's request into ONLY valid JSON.

Return exactly this format:

{
    "title":"",
    "description":"",
    "category":"",
    "priority":"High",
    "status":"Pending",
    "dueDate":"",
    "tags":[]
}

Rules:
- Return ONLY JSON.
- No markdown.
- No explanation.
- status must always be "Pending".
"""

    response = client.models.generate_content(
        model="gemini-flash-latest",
        contents=f"{system_prompt}\n\nUser Request: {prompt}"
    )

    text = response.text.strip()

    if text.startswith("```json"):
        text = text.replace("```json", "").replace("```", "").strip()

    elif text.startswith("```"):
        text = text.replace("```", "").strip()

    return json.loads(text)