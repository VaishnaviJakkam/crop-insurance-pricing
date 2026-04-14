import { useState, useEffect } from "react";
import { Leaf, RotateCcw, Calculator } from "lucide-react";
import Loader from "@/components/Loader";
import ResultCard from "@/components/ResultCard";
import fieldBg from "@/assets/image.png";

export interface PredictResponse {
  climate_risk: string;
  crop_risk: string;
  premium_level: string;
  premium_amount: number;
  farmer_decision: string;
  expected_return: number;
}

const seasons = ["Rabi", "Kharif"];

const CropCalculator = () => {
  const [season, setSeason] = useState("");
  const [state, setState] = useState("");
  const [crop, setCrop] = useState("");
  const [area, setArea] = useState("");

  const [states, setStates] = useState<string[]>([]);
  const [availableCrops, setAvailableCrops] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictResponse | null>(null);

  const isFormValid =
    season && state && crop && area && parseFloat(area) > 0;

  // Fetch states on load
  useEffect(() => {
    fetch("http://localhost:8000/states")
      .then((res) => res.json())
      .then((data) => setStates(data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch crops when state changes
  useEffect(() => {
    if (!state) return;

    fetch(`http://localhost:8000/crops/${state}`)
      .then((res) => res.json())
      .then((data) => setAvailableCrops(data))
      .catch((err) => console.error(err));

    setCrop("");
  }, [state]);

  const handleReset = () => {
    setSeason("");
    setState("");
    setCrop("");
    setArea("");
    setResult(null);
    setLoading(false);
  };

  const handleCalculate = async () => {
    if (!isFormValid) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          season,
          state,
          crop,
          hectares: parseFloat(area),
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: `url(${fieldBg})` }}>
      <div className="w-full max-w-lg bg-card rounded-2xl shadow-elevated p-8">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Leaf className="text-primary w-6 h-6 animate-sway" />
          <h1 className="text-xl font-bold">
            Crop Insurance Calculator
          </h1>
        </div>

        {!loading && !result && (
          <div className="space-y-4">

            {/* Season */}
            <select
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              className="w-full rounded-lg border p-2"
            >
              <option value="">Select Season</option>
              {seasons.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>

            {/* State */}
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full rounded-lg border p-2"
            >
              <option value="">Select State</option>
              {states.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>

            {/* Crop */}
            <select
              value={crop}
              disabled={!state}
              onChange={(e) => setCrop(e.target.value)}
              className="w-full rounded-lg border p-2"
            >
              <option value="">
                {state ? "Select Crop" : "Select State First"}
              </option>
              {availableCrops.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            {/* Area */}
            <input
              type="number"
              placeholder="Enter Area (Hectares)"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full rounded-lg border p-2"
            />

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="flex-1 border rounded-lg p-2"
              >
                <RotateCcw className="inline w-4 h-4 mr-1" />
                Reset
              </button>

              <button
                onClick={handleCalculate}
                disabled={!isFormValid}
                className="flex-1 bg-primary text-white rounded-lg p-2"
              >
                <Calculator className="inline w-4 h-4 mr-1" />
                Calculate
              </button>
            </div>
          </div>
        )}

        {loading && <Loader />}

        {result && !loading && (
          <ResultCard result={result} onReset={handleReset} />
        )}
      </div>
    </div>
  );
};

export default CropCalculator;
