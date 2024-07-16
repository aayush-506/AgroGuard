from ultralytics.engine.results import Results
from werkzeug.utils import secure_filename
from flask import Flask, jsonify, request
from utils import isFileAllowed
from typing import Dict, Any
from models import model
import numpy as np
import json
import os

app = Flask(__name__)
app.config["secret"] = "SECRET_KEY_HERE"
app.config["UPLOAD_FOLDER"] = "./uploads"


def predict_image(image_src: str, confidence: int = 0.5) -> str | None:
    """Predict class from the image using the custom trained model.

    Args:
        image_src (str): Path to the image which is to be predicted.

    Returns:
        str | None: Classname of the predicted image.
    """
    results: Results = model(image_src)

    for result in results:
        names = result.names
        probs = result.probs.data.tolist()
        max_prob_index = np.argmax(probs)
        
        if probs[max_prob_index] < confidence:
            return None
        print(names[max_prob_index], type(names[max_prob_index]))
        return names[max_prob_index]


@app.errorhandler(404)
def handlePageMissing(e):
    return f"<strong>{e}</strong>"


@app.route("/")
def home():
    return jsonify({"status": True, "message": "Connected to the server."}), 200


@app.route("/disease/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return (
            jsonify(
                {"status": False, "message": "No file part is attached to the request."}
            ),
            400,
        )

    file = request.files["image"]
    if file.filename == "":
        return (
            jsonify(
                {
                    "status": False,
                    "message": "Please select an image before sending the request.",
                }
            ),
            400,
        )

    # print(file.mimetype)
    if file and "image" in file.mimetype.lower():
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        file.save(filepath)

        disease_id = predict_image(filepath, confidence=0.7)
        if disease_id is None:
            return (
                jsonify(
                    {
                        "status": False,
                        "message": "Cannot predict the disease in the image.",
                    }
                ),
                422,
            )
        print("Disaese ID", disease_id)
        # if "Healthy" in disease_id:
        #     return jsonify({"status": True, "data": {"status": "healthy"}})
        with open("./data/disease_treatments.json") as json_file:
            json_data = json.load(json_file)
            try:
                disease_data: Dict = json_data[disease_id]
            except KeyError:
                return jsonify({"status": False, "message": "Disease Not Found in our database"}), 404

            return jsonify({"status": True, "data": disease_data}), 200
    return (
        jsonify({"status": False, "message": "Only images are allowed to upload."}),
        415,
    )


if __name__ == "__main__":
    os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)
    app.run(debug=True)
