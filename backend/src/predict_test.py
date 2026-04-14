import pandas as pd
from predict_risk import predict_user_risk
from nash_game import find_nash_equilibrium

# Load crop table
crop_table = pd.read_csv("crop_table/crop_sensitivity.csv")

# -----------------------------
# User Inputs
# -----------------------------
city = input("Enter city: ")
month = int(input("Enter month (1-12): "))
crop = input("Enter crop: ")
hectares = float(input("Enter area in hectares: "))

# -----------------------------
# Step 1: Predict Risk
# -----------------------------
risk_output = predict_user_risk(city, month, crop)

if isinstance(risk_output, str):
    print(risk_output)
else:
    print("\n--- RISK PREDICTION ---")
    print("Climate Risk:", risk_output["Climate Risk"])
    print("Crop Risk:", risk_output["Crop Risk"])

    # -----------------------------
    # Step 2: Nash Pricing
    # -----------------------------
    pricing_output = find_nash_equilibrium(
        city,
        crop,
        risk_output["Crop Risk"],
        hectares,
        crop_table
    )

    print("\n--- INSURANCE PRICING (NASH EQUILIBRIUM) ---")
    print("Premium Level:", pricing_output["Premium Level"])
    print("Premium Amount: ₹", pricing_output["Premium Amount"])
    print("Farmer Decision:", pricing_output["Farmer Decision"])
    print("Expected Return to Farmer: ₹", pricing_output["Expected Return to Farmer"])
