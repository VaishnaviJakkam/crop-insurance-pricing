# Integrating Machine Learning and Nash Equilibrium for Better Crop Insurance Pricing 

---

## Project Overview
Agriculture is highly affected by unpredictable environmental conditions such as droughts, floods, and extreme temperatures. Traditional insurance systems often fail to provide fair pricing, either overcharging farmers or reducing insurer profitability.

This project introduces a smart solution that:

Predicts climate and crop risk using Machine Learning
Calculates optimal insurance premiums using Nash Equilibrium

The system promotes fairness, transparency, and better decision-making in agricultural insurance.

---

## Key Features

- **Climate Risk Prediction**
This feature uses machine learning models to analyze weather and environmental data such as rainfall, temperature, and wind speed. The system classifies overall climate risk into categories like low, medium, or high based on historical patterns and model predictions.

- **Crop Sensitivity Analysis**
Different crops respond differently to climate conditions. This feature evaluates how vulnerable each crop is to drought, flood, and heatwaves. It helps the system determine how climate risk affects each crop type specifically.

- **Risk-to-Loss Conversion**
The predicted risk levels are converted into a numerical probability of crop loss. Using this probability and the crop’s market value, the system estimates how much financial loss a farmer may face under certain conditions.

- **Dynamic Premium Calculation**
Instead of using fixed or generalized premiums, this feature calculates an insurance premium based on expected crop loss and crop value. This ensures more accurate and personalized pricing for farmers.

- **Nash Equilibrium–Based Fair Pricing**
This feature applies principles of game theory to determine the most fair premium. A payoff matrix is created for both farmer and insurer strategies, and Nash Equilibrium is used to find a premium where neither side benefits from changing their decision unilaterally.

---
## Prerequisites

Ensure the following packages and tools are installed:
- HTML
- CSS
- JavaScript
- React
- Python 
- Scikit-learn
- Pandas
- NumPy
- Nash Equilibrium

---

## How to Run

This repository contains:
Backend: python -m uvicorn main:app --reload --app-dir .
Frontend: npm run dev

Usage (in VS Code or terminal)
---

1.Clone the repository
   ```bash
      git clone https://github.com/VaishnaviJakkam/crop-insurance-premium.git
```
2.Navigate to the project directory
   ```bash
      cd crop-insurance-premium
```
3.Set up Python environment and install dependencies
   ```bash
      pip install -r requirements.txt
```
4.Ensure your trained ML model exists
The file model.pkl should be located inside the backend/ folder.
If not, retrain using the notebooks and export the model.
   ```bash
      cd backend
      python app.py
```

5.Run the Flask backend
   ```bash
    cd backend
    python app.py
```
6.Access the backend API
Once the server starts, it will run on:
      http://localhost:5000/
The backend will expose endpoints for:
Climate risk prediction
Crop loss estimation
Premium calculation

7.Use with any frontend or testing tool
You may test using:
- **Postman**
- **cURL**
- **A frontend React application (optional)**
  
## Project Structure
```text
crop-insurance-premium/
├── backend/
│   ├── app.py
│   ├── model.pkl
│   ├── utils.py
│   └── __pycache__/
├── crop_table/
│   └── crop_sensitivity.csv
├── data/
│   ├── climate_data.csv
│   └── processed_data.csv
├── models/
│   ├── risk_model.pkl
│   └── scaler.pkl
├── notebooks/
│   ├── Climate_Risk_Model.ipynb
│   └── Premium_Calculation.ipynb
├── src/
│   ├── main.py
│   └── helpers.py
├── frontend/
│   ├── public/
│   │   ├── placeholder.svg
│   │   └── robots.txt
│   └── src/
│       └── App.tsx
├── requirements.txt
├── .gitignore
└── README.md
```
## Usage Guide
## Climate Risk Prediction
- **Input: Temperature, rainfall, wind speed, seasonal indicators**
- **Output: Climate risk level (Low, Medium, High)**
## Crop Sensitivity Analysis
- **Input: Crop type, region, vulnerability factors**
- **Output: Crop sensitivity score for drought, flood, and heatwaves**
## Risk-to-Loss Conversion
- **Input: Predicted climate risk, crop sensitivity, crop value per hectare, cultivated area**
- **Output: Probability of crop loss and expected financial loss**
## Premium Calculation
- **Input: Expected loss, crop value, payoff values for farmer and insurer**
- **Output: Candidate premium levels (Low, Medium, High)**
## Nash Equilibrium Premium Selection
- **Input: Payoff matrix (farmer strategy vs. insurer strategy)**
- **Output: Fair and stable insurance premium using Nash Equilibrium**

## Contributors

**Team:**


- [A. Sirisahasra](https://github.com/Sirisahasra-Annamaneni)
- [J.Vaishnavi](https://github.com/VaishnaviJakkam)
- [P. Nishitha](https://github.com/Nishitha-25)   
- [M. Varshini](https://github.com/VarshiniMallidi)

