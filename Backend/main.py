from flask import Flask, jsonify, request
from werkzeug.utils import secure_filename
from utils import isFileAllowed
import os

app = Flask(
    __name__,
)
UPLOAD_FOLDER = "./uploads"
app.config["secret"] = "SECRET_KEY_HERE"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER


@app.errorhandler(404)
def handlePageMissing(e):
    return f"<strong>{e}</strong>"


@app.route("/")
def home():
    return jsonify({"status": True, "message": "Connected to the server."}), 200


@app.route("/disease/predict", methods=["POST"])
def predict():
    print(request.form)
    if "image" not in request.files:
        return (
            jsonify({"status": False, "message": "No file part."}),
            400,
        )

    file = request.files["image"]
    if file.filename == "":
        return jsonify({"status": False, "message": "No selected file"}), 400

    if file and "image" in file.mimetype.lower():
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))
        print(os.path.join(app.config["UPLOAD_FOLDER"], filename))
        return (
            jsonify(
                {
                    "status": True,
                    "data": {
                        "disease": "Hocust Leaf",
                        "treatments": [
                            "Do anything you want with it.",
                            "I don't care what you do with your plants.",
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
    print(os.path.abspath(app.config["UPLOAD_FOLDER"]))
    app.run(debug=True)
