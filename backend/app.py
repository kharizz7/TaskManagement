import os
from flask import Flask
from flask_cors import CORS

from routes.task_routes import task_bp
from routes.ai_routes import ai_bp
from routes.auth_routes import auth_bp

app = Flask(__name__)

CORS(app)

app.register_blueprint(task_bp, url_prefix="/api")
app.register_blueprint(ai_bp, url_prefix="/api")
app.register_blueprint(auth_bp, url_prefix="/api")

@app.route("/")
def home():
    return {
        "message": "Task Management API Running"
    }


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(
        host="0.0.0.0",
        port=port,
        debug=False
    )