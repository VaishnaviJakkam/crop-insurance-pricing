import pandas as pd

# Convert qualitative severity to numeric weight
SEVERITY_MAP = {
    "Low": 1,
    "Medium": 2,
    "High": 3
}

def label_climate_risk(df, crop_table):

    def assign_risk(row):
        risk_score = 0

        # Get rainfall safely
        rainfall = row['rain_sum'] if not pd.isna(row['rain_sum']) else row['precipitation_sum']

        # Get crop sensitivities
        crop_row = crop_table[
            (crop_table['city'].str.lower() == row['city'].lower())
        ]

        if crop_row.empty:
            return 0  # default low if no crop match

        drought_weight = SEVERITY_MAP[crop_row.iloc[0]['drought_severity']]
        flood_weight = SEVERITY_MAP[crop_row.iloc[0]['flood_severity']]
        heat_weight = SEVERITY_MAP[crop_row.iloc[0]['heatwave_severity']]

        # -------------------------
        # Rainfall Stress
        # -------------------------
        if rainfall < 2:
            risk_score += drought_weight

        elif rainfall > 80:  # slightly increased flood threshold
            risk_score += flood_weight

        # -------------------------
        # Heat Stress
        # -------------------------
        if row['temperature_2m_max'] > 38:
            risk_score += heat_weight

        # -------------------------
        # Wind Stress (generic)
        # -------------------------
        if row['wind_speed_10m_max'] > 30:
            risk_score += 1

        if row['wind_gusts_10m_max'] > 40:
            risk_score += 1

        # -------------------------
        # Final Label
        # -------------------------
        if risk_score <= 3:
            return 0
        elif risk_score <= 6:
            return 1
        else:
            return 2

    df['risk_label'] = df.apply(assign_risk, axis=1)

    return df
