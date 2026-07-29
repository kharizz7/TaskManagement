from pymongo import MongoClient
from config import MONGO_URI, DATABASE_NAME

client = MongoClient(
    MONGO_URI,
    serverSelectionTimeoutMS=5000
)

try:
    client.admin.command("ping")
    print("✅ MongoDB Connected Successfully")
except Exception as e:
    print("❌ MongoDB Connection Failed:", repr(e))
    raise

db = client[DATABASE_NAME]

tasks_collection = db["tasks"]
users_collection = db["users"]