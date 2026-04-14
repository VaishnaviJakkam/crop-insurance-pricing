import joblib
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from config import FEATURES, TARGET, TEST_SIZE, RANDOM_STATE

def train_all_models(df):

    # Features & target
    X = df[FEATURES]
    y = df[TARGET]   # already 0,1,2

    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=TEST_SIZE,
        random_state=RANDOM_STATE,
        stratify=y
    )

    # ------------------------
    # Logistic Regression
    # ------------------------
    lr = LogisticRegression(max_iter=1000)
    lr.fit(X_train, y_train)

    # ------------------------
    # Decision Tree
    # ------------------------
    dt = DecisionTreeClassifier(
        max_depth=6,
        random_state=RANDOM_STATE
    )
    dt.fit(X_train, y_train)

    # ------------------------
    # Random Forest
    # ------------------------
    rf = RandomForestClassifier(
        n_estimators=200,
        max_depth=10,
        random_state=RANDOM_STATE
    )
    rf.fit(X_train, y_train)

    # ------------------------
    # Save models
    # ------------------------
    joblib.dump(lr, "models/logistic_model.pkl")
    joblib.dump(dt, "models/decision_tree.pkl")
    joblib.dump(rf, "models/random_forest.pkl")

    return X_test, y_test
