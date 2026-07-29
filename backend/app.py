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
    app.run(debug=True,
            port=5000)