import os
import json

from openai import OpenAI

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)


def generate_task(prompt):

    response = client.responses.create(

        model="gpt-5",

        input=[

            {
                "role": "system",
                "content": """
You are an AI Task Management Assistant.

Convert the user's request into JSON.

Return ONLY valid JSON.

Schema:

{
"title":"",
"description":"",
"category":"",
"priority":"",
"status":"Pending",
"dueDate":"",
"tags":[]
}
"""
            },

            {
                "role": "user",
                "content": prompt
            }

        ]

    )

    return json.loads(response.output_text)