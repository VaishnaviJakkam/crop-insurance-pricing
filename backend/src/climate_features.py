def add_climate_features(df):
    # Temperature
    df['temperature_max'] = df['temperature_2m_max']
    df['temperature_min'] = df['temperature_2m_min']
    df['temperature_avg'] = (
        df['temperature_2m_max'] + df['temperature_2m_min']
    ) / 2

    # Rainfall
    df['rainfall'] = df['rain_sum'].fillna(df['precipitation_sum'])

    # Wind
    df['wind_speed'] = df['wind_speed_10m_max']

    return df