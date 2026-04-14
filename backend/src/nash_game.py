import pandas as pd

# -----------------------------
# Risk to Probability Mapping
# -----------------------------
RISK_PROB = {
    "Low": 0.1,
    "Medium": 0.3,
    "High": 0.6
}

# Premium percentage levels
PREMIUM_LEVELS = {
    "Low": 0.05,     # 5%
    "Medium": 0.10,  # 10%
    "High": 0.20     # 20%
}

COVERAGE_RATE = 0.7  # Updated to 70%


def get_crop_value(city, crop, crop_table):
    row = crop_table[
        (crop_table['city'].str.lower() == city.lower()) &
        (crop_table['crop_name'].str.lower() == crop.lower())
    ]

    if row.empty:
        return None

    return row.iloc[0]['crop_value']


def compute_payoff_matrix(city, crop, crop_risk, hectares, crop_table):

    crop_value_per_hectare = get_crop_value(city, crop, crop_table)

    if crop_value_per_hectare is None:
        return None

    # Total value depends on land size
    total_crop_value = crop_value_per_hectare * hectares

    loss_prob = RISK_PROB[crop_risk]
    expected_loss = loss_prob * total_crop_value

    payoff_matrix = {}

    for level, percent in PREMIUM_LEVELS.items():

        premium = total_crop_value * percent

        # Farmer
        reduced_loss = expected_loss * (1 - COVERAGE_RATE)

        farmer_buy = total_crop_value - premium - reduced_loss
        farmer_not_buy = total_crop_value - expected_loss

        # Insurer
        insurer_buy = premium - (expected_loss * COVERAGE_RATE)
        insurer_not_buy = 0

        payoff_matrix[level] = {
            "Buy": (farmer_buy, insurer_buy),
            "Not Buy": (farmer_not_buy, insurer_not_buy),
            "Premium": premium
        }

    return payoff_matrix


def find_nash_equilibrium(city, crop, crop_risk, hectares, crop_table):

    payoffs = compute_payoff_matrix(city, crop, crop_risk, hectares, crop_table)

    if payoffs is None:
        return "Crop not found"

    best_result = None
    best_insurer_profit = float('-inf')

    for level in payoffs:

        farmer_buy = payoffs[level]["Buy"][0]
        farmer_not_buy = payoffs[level]["Not Buy"][0]
        premium = payoffs[level]["Premium"]

        # Farmer best response
        if farmer_buy >= farmer_not_buy:
            farmer_strategy = "Buy Insurance"
            farmer_return = farmer_buy
            insurer_profit = payoffs[level]["Buy"][1]
        else:
            farmer_strategy = "Do Not Buy"
            farmer_return = farmer_not_buy
            insurer_profit = 0

        # Insurer chooses premium that maximizes profit
        if insurer_profit > best_insurer_profit:
            best_insurer_profit = insurer_profit
            best_result = {
                "Crop Risk": crop_risk,
                "Area (hectares)": hectares,
                "Premium Level": level,
                "Premium Amount": round(premium, 2),
                "Farmer Decision": farmer_strategy,
                "Expected Return to Farmer": round(farmer_return, 2)
            }

    return best_result