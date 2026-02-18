// Mock crop sensitivity data mapped by city/region -> crops
export const cropSensitivityData: Record<string, string[]> = {
  "Andhra Pradesh": ["Rice", "Groundnut", "Cotton", "Sugarcane", "Maize"],
  "Bihar": ["Rice", "Wheat", "Maize", "Lentil", "Mustard"],
  "Gujarat": ["Cotton", "Groundnut", "Castor", "Bajra", "Wheat"],
  "Haryana": ["Wheat", "Rice", "Mustard", "Cotton", "Sugarcane"],
  "Karnataka": ["Rice", "Ragi", "Jowar", "Cotton", "Sugarcane"],
  "Kerala": ["Rice", "Coconut", "Rubber", "Pepper", "Cardamom"],
  "Madhya Pradesh": ["Soybean", "Wheat", "Gram", "Rice", "Cotton"],
  "Maharashtra": ["Sugarcane", "Cotton", "Soybean", "Jowar", "Rice"],
  "Odisha": ["Rice", "Groundnut", "Jute", "Sugarcane", "Maize"],
  "Punjab": ["Wheat", "Rice", "Cotton", "Maize", "Sugarcane"],
  "Rajasthan": ["Bajra", "Wheat", "Mustard", "Gram", "Groundnut"],
  "Tamil Nadu": ["Rice", "Sugarcane", "Groundnut", "Cotton", "Banana"],
  "Telangana": ["Rice", "Cotton", "Maize", "Soybean", "Turmeric"],
  "Uttar Pradesh": ["Wheat", "Rice", "Sugarcane", "Mustard", "Potato"],
  "West Bengal": ["Rice", "Jute", "Potato", "Mustard", "Wheat"],
};

export const seasons = ["Kharif", "Rabi"];

export const states = Object.keys(cropSensitivityData);

// Simulated predict response
export interface PredictResponse {
  climateRisk: "Low" | "Medium" | "High";
  cropRisk: "Low" | "Medium" | "High";
  premiumAmount: number;
  farmerDecision: string;
  expectedReturn: number;
}

export function mockPredict(
  season: string,
  state: string,
  crop: string,
  hectares: number
): PredictResponse {
  // Simulate risk based on inputs
  const riskSeed = (season.length + state.length + crop.length) % 3;
  const risks: Array<"Low" | "Medium" | "High"> = ["Low", "Medium", "High"];
  const climateRisk = risks[riskSeed];
  const cropRisk = risks[(riskSeed + 1) % 3];

  const baseRate = riskSeed === 0 ? 1200 : riskSeed === 1 ? 1800 : 2500;
  const premiumAmount = Math.round(baseRate * hectares * 100) / 100;
  const expectedReturn = Math.round(premiumAmount * (3.5 + Math.random() * 2) * 100) / 100;

  const decisions = [
    "Recommended to insure — favorable risk-to-premium ratio",
    "Insurance advised — moderate risk detected in region",
    "Strongly recommended — high climate variability expected",
  ];

  return {
    climateRisk,
    cropRisk,
    premiumAmount,
    farmerDecision: decisions[riskSeed],
    expectedReturn,
  };
}
