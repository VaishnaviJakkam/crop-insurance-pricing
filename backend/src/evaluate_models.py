import joblib
from sklearn.metrics import accuracy_score, classification_report

def evaluate(X_test, y_test):

    lr = joblib.load("models/logistic_model.pkl")
    dt = joblib.load("models/decision_tree.pkl")
    rf = joblib.load("models/random_forest.pkl")

    models = {
        "Logistic Regression": lr,
        "Decision Tree": dt,
        "Random Forest": rf
    }

    for name, model in models.items():
        preds = model.predict(X_test)
        acc = accuracy_score(y_test, preds)

        print(f"\n{name} Accuracy: {acc:.4f}")
        print(
            classification_report(
                y_test,
                preds,
                target_names=["Low", "Medium", "High"]
            )
        )