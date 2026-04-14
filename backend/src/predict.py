import pandas as pd
import joblib
from config import FEATURES

# Load trained model
rf = joblib.load("models/random_forest.pkl")

# Load crop sensitivity table
crop_table = pd.read_csv("crop_table/crop_sensitivity.csv")

# Risk mapping
RISK_MAP = {
    0: "Low",
    1: "Medium",
    2: "High"
}

def predict_risk(location, month, crop, rainfall, temp_max, temp_min, wind):

    # Derive average temperature
    temp_avg = (temp_max + temp_min) / 2

    # Prepare input as per FEATURES
    X = pd.DataFrame(
        [[temp_max, temp_min, temp_avg, rainfall, wind, month]],
        columns=FEATURES
    )

    # Predict climate risk
    pred = rf.predict(X)[0]
    risk_label = RISK_MAP[pred]

    # Get crop sensitivity
    crop_row = crop_table[
        crop_table['crop_name'].str.lower() == crop.lower()
    ]

    if crop_row.empty:
        return f"Crop '{crop}' not found in crop table"

    crop_row = crop_row.iloc[0]

    return {
        "Location": location,
        "Month": month,
        "Crop": crop,
        "Predicted_Climate_Risk": risk_label,
        "Drought_Sensitivity": crop_row['drought_severity'],
        "Flood_Sensitivity": crop_row['flood_severity'],
        "Heat_Sensitivity": crop_row['heatwave_severity']
    }