from flask import Flask, request, jsonify
from models import User, db
import face_recognition_models
from flask_cors import CORS
import face_recognition
from flask_migrate import Migrate
from routes_model import model_routes
from routes import routes_blueprint

import numpy as np

app = Flask(__name__)
app.config.from_object('config.Config')
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
db.init_app(app)
migrate = Migrate(app, db)

print("hiiii")

# Register routes from routes_model
app.register_blueprint(routes_blueprint, url_prefix="/api")
app.register_blueprint(model_routes, url_prefix="/api")

if __name__ == '__main__':
    app.run(debug=True)