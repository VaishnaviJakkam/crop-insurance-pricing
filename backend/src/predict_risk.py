import pandas as pd
import joblib

# -----------------------------
# Load trained model
# -----------------------------
rf_model = joblib.load("models/random_forest.pkl")

# -----------------------------
# Load processed climate data
# -----------------------------
df = pd.read_csv("data/processed/climate_with_risk.csv")

# -----------------------------
# Load crop sensitivity table
# -----------------------------
crop_table = pd.read_csv("crop_table/crop_sensitivity.csv")

# -----------------------------
# Risk label mapping
# -----------------------------
RISK_MAP = {
    0: "Low",
    1: "Medium",
    2: "High"
}

SEVERITY_ORDER = ["Low", "Medium", "High"]

# -----------------------------
# Prediction function
# -----------------------------
def predict_user_risk(city, month, crop):

    # Filter dataset for user city and month
    df_filtered = df[
        (df['city'].str.lower() == city.lower()) &
        (df['month'] == month)
    ]

    if df_filtered.empty:
        return f"No data available for {city} in month {month}"

    # -----------------------------
    # Features used by the model
    # (these are already derived in climate_with_risk.csv)
    # -----------------------------
    feature_cols = [
        'temperature_max',
        'temperature_min',
        'temperature_avg',
        'rainfall',
        'wind_speed',
        'month'
    ]

    X = df_filtered[feature_cols]

    # -----------------------------
    # Predict climate risk
    # -----------------------------
    preds = rf_model.predict(X)

    # Take majority vote
    climate_risk_num = pd.Series(preds).mode()[0]
    climate_risk = RISK_MAP[climate_risk_num]

    # -----------------------------
    # Map to crop-specific risk
    # -----------------------------
    crop_row = crop_table[
        crop_table['crop_name'].str.lower() == crop.lower()
    ]

    if crop_row.empty:
        return f"Crop '{crop}' not found in crop table"

    drought = crop_row.iloc[0]['drought_severity']
    flood = crop_row.iloc[0]['flood_severity']
    heat = crop_row.iloc[0]['heatwave_severity']

    if climate_risk == "Low":
        crop_risk = min(
            [drought, flood, heat],
            key=lambda x: SEVERITY_ORDER.index(x)
        )
    elif climate_risk == "Medium":
        crop_risk = "Medium"
    else:
        crop_risk = max(
            [drought, flood, heat],
            key=lambda x: SEVERITY_ORDER.index(x)
        )

    # -----------------------------
    # Final output
    # -----------------------------
    return {
        "City": city,
        "Month": month,
        "Crop": crop,
        "Climate Risk": climate_risk,
        "Crop Risk": crop_risk
    }
