import pandas as pd

def add_time_features(df):
    # Correct column name
    df['date'] = pd.to_datetime(df['date'])

    # Extract month
    df['month'] = df['date'].dt.month

    # Season mapping
    def get_season(month):
        if month in [6,7,8,9,10]:
            season = "Kharif"
        elif month in [10,11,12,1,2,3]:
            season = "Rabi"
        else:
            season = "Zaid" # optional 
        return season
    df['season'] = df['month'].apply(get_season)

    return df