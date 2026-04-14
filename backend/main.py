import sys
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SRC_DIR = os.path.join(BASE_DIR, "src")
sys.path.insert(0, SRC_DIR)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd

from predict_risk import predict_user_risk
from nash_game import find_nash_equilibrium

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Load crop table
crop_table = pd.read_csv("crop_table/crop_sensitivity.csv")


# ---------------------------
# Request Model
# ---------------------------
class PredictRequest(BaseModel):
    season: str
    state: str
    crop: str
    hectares: float


# ---------------------------
# 1️⃣ Get All States
# ---------------------------
@app.get("/states")
def get_states():
    states = crop_table["city"].unique().tolist()
    return states


# ---------------------------
# 2️⃣ Get Crops By State
# ---------------------------
@app.get("/crops/{state}")
def get_crops(state: str):
    crops = crop_table[
        crop_table["city"].str.lower() == state.lower()
    ]["crop_name"].unique().tolist()

    return crops


# ---------------------------
# 3️⃣ Predict Premium
# ---------------------------
@app.post("/predict")
def predict(data: PredictRequest):

    # Convert season to representative month
    month = 1 if data.season == "Rabi" else 7

    risk_output = predict_user_risk(
        city=data.state,
        month=month,
        crop=data.crop
    )

    if isinstance(risk_output, str):
        return {"error": risk_output}

    crop_risk = risk_output["Crop Risk"]
    climate_risk = risk_output["Climate Risk"]

    pricing_output = find_nash_equilibrium(
        city=data.state,
        crop=data.crop,
        crop_risk=crop_risk,
        hectares=data.hectares,
        crop_table=crop_table
    )

    return {
        "climate_risk": climate_risk,
        "crop_risk": crop_risk,
        "premium_level": pricing_output["Premium Level"],
        "premium_amount": pricing_output["Premium Amount"],
        "farmer_decision": pricing_output["Farmer Decision"],
        "expected_return": pricing_output["Expected Return to Farmer"]
    }
