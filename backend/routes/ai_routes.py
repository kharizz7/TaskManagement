from flask import Blueprint, request, jsonify
from services.ai_service import generate_task
from database.mongo import tasks_collection

ai_bp = Blueprint("ai_bp", __name__)

@ai_bp.route("/ai/create-task", methods=["POST"])
def ai_create_task():

    try:

        data = request.get_json()

        prompt = data.get("prompt")
        user_id = data.get("userId")

        if not prompt:
            return jsonify({"message": "Prompt is required"}), 400

        if not user_id:
            return jsonify({"message": "User ID is required"}), 400

        task = generate_task(prompt)

        task["userId"] = user_id

        result = tasks_collection.insert_one(task)

        task["_id"] = str(result.inserted_id)

        return jsonify({
            "message": "Task Created Successfully",
            "task": task
        }), 201

    except Exception as e:

        return jsonify({
            "message": str(e)
        }), 500