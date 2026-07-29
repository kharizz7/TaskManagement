from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash

from database.mongo import users_collection

auth_bp = Blueprint("auth_bp", __name__)


# ==========================
# Register
# ==========================
@auth_bp.route("/auth/register", methods=["POST"])
def register():

    try:

        data = request.get_json()

        name = data.get("name")
        email = data.get("email")
        password = data.get("password")

        if not name or not email or not password:
            return jsonify({
                "message": "All fields are required"
            }), 400

        existing_user = users_collection.find_one({
            "email": email
        })

        if existing_user:
            return jsonify({
                "message": "Email already registered"
            }), 409

        hashed_password = generate_password_hash(password)

        user = {
            "name": name,
            "email": email,
            "password": hashed_password,
            "provider": "local"
        }

        result = users_collection.insert_one(user)

        return jsonify({
            "message": "Registration Successful",
            "userId": str(result.inserted_id)
        }), 201

    except Exception as e:

        return jsonify({
            "message": str(e)
        }), 500


# ==========================
# Login
# ==========================
@auth_bp.route("/auth/login", methods=["POST"])
def login():

    try:

        data = request.get_json()

        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return jsonify({
                "message": "Email and Password are required"
            }), 400

        user = users_collection.find_one({
            "email": email
        })

        if not user:
            return jsonify({
                "message": "User not found"
            }), 404

        if not check_password_hash(user["password"], password):
            return jsonify({
                "message": "Invalid Password"
            }), 401

        return jsonify({
            "message": "Login Successful",
            "user": {
                "id": str(user["_id"]),
                "name": user["name"],
                "email": user["email"]
            }
        }), 200

    except Exception as e:

        return jsonify({
            "message": str(e)
        }), 500