DATA_PATH = "data/raw/india_weather_2000_2024.csv"
PROCESSED_PATH = "data/processed/climate_with_risk.csv"

# Final ML features AFTER feature engineering
FEATURES = [
    'temperature_max',
    'temperature_min',
    'temperature_avg',
    'rainfall',
    'wind_speed',
    'month'
]

TARGET = 'risk_label'
RANDOM_STATE = 42
TEST_SIZE = 0.2
