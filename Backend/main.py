from ultralytics.engine.results import Results
from werkzeug.utils import secure_filename
from flask import Flask, jsonify, request
from utils import isFileAllowed
from typing import Dict, Any
from models import model
import os

app = Flask(__name__)
app.config["secret"] = "SECRET_KEY_HERE"
app.config["UPLOAD_FOLDER"] = "./uploads"


def predict_image(image_src: str) -> str | None:
    """Predict class from the image using the custom trained model.

    Args:
        image_src (str): Path to the image which is to be predicted.

    Returns:
        str | None: Classname of the predicted image.
    """
    results: Results = model(image_src)

    for result in results:
        probs = result.probs
        classes: Dict[int, str | Any] = result.names

        class_ = classes.get(probs.top1, None)
        if isinstance(class_, str):
            return class_

        return None


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
        
        disease = predict_image(filepath)
        if disease is None:
            return jsonify({
                "status": False,
                "message": "Cannot predict the disease in the image."
            }), 422

        species, disease = disease.split("__")
        # print(os.path.join(app.config["UPLOAD_FOLDER"], filename))
        return (
            jsonify(
                {
                    "status": True,
                    "data": {
                        "disease": f"{disease.replace("_", " ").strip()} ({species.strip()})",
                        "treatments": [
                            "Lorem ipsum dolor sit amet, qui minim labore adipisicing.",
                            "Minim sint cillum sint consectetur cupidatat.",
                        ],
                    },
                }
            ),
            200,
        )
    return (
        jsonify({"status": False, "message": "Only images are allowed to upload."}),
        415,
    )


if __name__ == "__main__":
    os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)
    app.run(debug=True)
