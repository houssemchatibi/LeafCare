from flask import Flask, request, jsonify
from models import User, db
import face_recognition_models
from flask_cors import CORS
import face_recognition
from flask_migrate import Migrate
from routes_model import app as routes_model_app

import numpy as np

app = Flask(__name__)
app.config.from_object('config.Config')
CORS(app)
db.init_app(app)
migrate = Migrate(app, db)

print("hiiii")
import routes
# Register routes from routes_model
app.register_blueprint(routes_model_app)

if __name__ == '__main__':
    app.run(debug=True)