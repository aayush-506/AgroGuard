from typing import Tuple, Any
from ultralytics import YOLO
import sys
import os

# ? Pretrained Model
YOLO_MODEL = "yolov8n-cls.pt"


def training(pretrained_model: str, datasets: str, epochs: int = 10) -> Any | None:
    """Train new model

    Args:
        pretrained_model (str): Path to pretrained model (Recommended for training).
        datasets (str): Path to datasets
        epochs (int, optional): Number of epochs. Defaults to 10.

    Returns:
        Any | None: Result of model training
    """
    model = YOLO(model=pretrained_model)
    
    dataset_abs_path = os.path.abspath(datasets)
    results = model.train(data=dataset_abs_path, epochs=epochs)
    
    return results


def predict(model_path: str, target_asset: str) -> YOLO:
    """Predict/Test the custom trained model.

    Args:
        model_path (str): Path to the custom model.
        target_asset (str): Image or video on which predict is to be performed.

    Returns:
        YOLO: Result of the prediction.
    """
    model = YOLO(model_path)
    results = model(target_asset)
    return results


def validation(model_path: str) -> Tuple[Any, Any]:
    """Validate the custom trained model.

    Args:
        model_path (str): Path to the modle being validated.

    Returns:
        Tuple[Any, Any]: Top 1 and Top 5 accuracy of the model.
    """
    model = YOLO(model_path)

    # ? No argument is required for val as dataset and settings are remembered.
    metrics = model.val()
    return metrics.top1, metrics.top5


if __name__ == "__main__":
    if "train" in sys.argv:
        training(YOLO_MODEL, "./datasets", epochs=2)
    elif "predict" in sys.argv:
        predict("/runs/classify/train2/weights/last.pt", "/path/to/test/image[.jpg]")
    elif "validate" in sys.argv:
        validation("/runs/classify/train2/weights/best.pt")
    else:
        print(
            "Command Line Arguments:\n\n'train'\t\tFor training new model\n'predict'\tFor predicting new data\n'validate'\tFor validating your custom trained model"
        )
