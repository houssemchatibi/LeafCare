import os
import numpy as np
from flask import Blueprint, jsonify
from keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array

# Define a blueprint
model_routes = Blueprint('routes_model', __name__)

# Load the model
model_path = "../model.h5" # Adjust the path if needed
if not os.path.exists(model_path):
    raise FileNotFoundError(f"Model file not found at {model_path}")

model = load_model(model_path)

# Labels
labels = {0: 'Healthy', 1: 'Powdery', 2: 'Rust'}

# Helper function for prediction
def getResult(image_path):
    img = load_img(image_path, target_size=(225, 225))
    x = img_to_array(img)
    x = x.astype('float32') / 255.0
    x = np.expand_dims(x, axis=0)
    predictions = model.predict(x)[0]
    return predictions

# Route for predictions
@model_routes.route('/predict', methods=['GET', 'POST'])
def upload():
    file_path = "image-asset.jpeg"  # Change this to the correct file path
    if not os.path.exists(file_path):
        return jsonify({"error": "File not found"}), 404

    predictions = getResult(file_path)
    predicted_label = labels[np.argmax(predictions)]
    return jsonify({"result": str(predicted_label)}), 200
