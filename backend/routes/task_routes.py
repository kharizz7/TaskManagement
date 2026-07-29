from flask import Blueprint, request, jsonify
from database.mongo import tasks_collection

task_bp = Blueprint("task_bp", __name__)


# ==========================
# Create Task
# ==========================
@task_bp.route("/tasks", methods=["POST"])
def create_task():

    try:

        data = request.get_json()

        user_id = data.get("userId")

        if not user_id:
            return jsonify({
                "message": "User ID is required"
            }), 400

        task = {
            "userId": user_id,
            "title": data.get("title"),
            "description": data.get("description"),
            "category": data.get("category"),
            "priority": data.get("priority"),
            "status": data.get("status"),
            "dueDate": data.get("dueDate"),
            "tags": data.get("tags", [])
        }

        result = tasks_collection.insert_one(task)

        return jsonify({
            "message": "Task Created Successfully",
            "id": str(result.inserted_id)
        }), 201

    except Exception as e:

        return jsonify({
            "message": str(e)
        }), 500


# ==========================
# Get Tasks
# ==========================
@task_bp.route("/tasks", methods=["GET"])
def get_tasks():

    try:

        user_id = request.args.get("userId")

        if not user_id:
            return jsonify({
                "message": "User ID is required"
            }), 400

        tasks = []

        for task in tasks_collection.find({
            "userId": user_id
        }):

            task["_id"] = str(task["_id"])

            tasks.append(task)

        return jsonify(tasks), 200

    except Exception as e:

        return jsonify({
            "message": str(e)
        }), 500