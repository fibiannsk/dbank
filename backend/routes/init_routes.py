from flask import Blueprint, jsonify, current_app  # ✅ include current_app
import hashlib  # ✅ used for password hashing
from pymongo import MongoClient

init_bp = Blueprint('init_bp', __name__)

# ✅ Hash function for test passwords
#def hash_password(password):
#    return hashlib.sha256(password.encode()).hexdigest()

#@init_bp.route('/init-db', methods=['GET'])
#def init_db():
#    mongo = current_app.mongo  # ✅ Access mongo from app context
#    db = mongo.db

 #   admin_data = {
 #       "username": "admin",
 #       "password": hash_password("admin123"),  # ✅ Securely store hashed password
 #       "role": "admin"
 #   }

 #   result = db.admin.insert_one(admin_data)

 #   return jsonify({
 #       "message": "Database initialized!",
 #       "admin_id": str(result.inserted_id)
 #   })


#@init_bp.route('/', methods=['GET'])
#def check_db_connection():
#   mongo_uri = "mongodb+srv://venturafibi:fibian2455@bnkin.54imti7.mongodb.net/?retryWrites=true&w=majority&appName=bnkin"
#    try:
 #       client = MongoClient(mongo_uri)
#       client.admin.command("ping")
#        return jsonify({"status": "success", "message": "MongoDB is connected and working"}), 200
#    except Exception as e:
#        return jsonify({"status": "error", "message": f"Failed to connect to MongoDB: {str(e)}"}), 500 