import { useState } from "react";
import { Leaf, RotateCcw, Calculator } from "lucide-react";
import { cropSensitivityData, seasons, states, mockPredict, type PredictResponse } from "@/data/cropData";
import Loader from "@/components/Loader";
import ResultCard from "@/components/ResultCard";
import cropsHeader from "@/assets/crops-header.png";

const CropCalculator = () => {
  const [season, setSeason] = useState("");
  const [state, setState] = useState("");
  const [crop, setCrop] = useState("");
  const [area, setArea] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictResponse | null>(null);

  const availableCrops = state ? cropSensitivityData[state] || [] : [];
  const isFormValid = season && state && crop && area && parseFloat(area) > 0;

  const handleStateChange = (value: string) => {
    setState(value);
    setCrop("");
    setResult(null);
  };

  const handleReset = () => {
    setSeason("");
    setState("");
    setCrop("");
    setArea("");
    setResult(null);
    setLoading(false);
  };

  const handleCalculate = () => {
    if (!isFormValid) return;
    setResult(null);
    setLoading(true);
    setTimeout(() => {
      const res = mockPredict(season, state, crop, parseFloat(area));
      setLoading(false);
      setResult(res);
    }, 1800);
  };

  return (
    <div className="min-h-screen gradient-field flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Card */}
        <div className="bg-card rounded-2xl shadow-elevated p-6 sm:p-8 relative overflow-hidden">
          {/* Decorative top bar */}
          <div className="absolute top-0 left-0 right-0 h-1 gradient-primary" />

          {/* Header */}
          <div className="flex items-center justify-center gap-3 mb-2">
            <img
              src={cropsHeader}
              alt="Crops"
              className="w-12 h-12 object-contain animate-sway"
            />
            <div className="text-center">
              <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-foreground leading-tight">
                Climate Crop Insurance
              </h1>
              <p className="text-xs font-body text-muted-foreground">
                Premium Calculator
              </p>
            </div>
            <Leaf className="w-6 h-6 text-primary animate-sway" style={{ animationDelay: "0.5s" }} />
          </div>

          <div className="h-px bg-border my-5" />

          {/* Form */}
          {!loading && !result && (
            <div className="space-y-4 animate-fade-slide-up">
              {/* Season */}
              <div>
                <label className="block text-sm font-heading font-semibold text-foreground mb-1.5">
                  Season <span className="text-danger">*</span>
                </label>
                <select
                  value={season}
                  onChange={(e) => { setSeason(e.target.value); setResult(null); }}
                  className="w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                >
                  <option value="">Select season</option>
                  {seasons.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-heading font-semibold text-foreground mb-1.5">
                  State / Region <span className="text-danger">*</span>
                </label>
                <select
                  value={state}
                  onChange={(e) => handleStateChange(e.target.value)}
                  className="w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                >
                  <option value="">Select state</option>
                  {states.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Crop */}
              <div>
                <label className="block text-sm font-heading font-semibold text-foreground mb-1.5">
                  Crop <span className="text-danger">*</span>
                </label>
                <select
                  value={crop}
                  onChange={(e) => { setCrop(e.target.value); setResult(null); }}
                  disabled={!state}
                  className="w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all disabled:opacity-50"
                >
                  <option value="">{state ? "Select crop" : "Select a state first"}</option>
                  {availableCrops.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Area */}
              <div>
                <label className="block text-sm font-heading font-semibold text-foreground mb-1.5">
                  Area (Hectares) <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={area}
                  onChange={(e) => { setArea(e.target.value); setResult(null); }}
                  placeholder="Enter area in hectares"
                  className="w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleReset}
                  className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-heading font-semibold text-foreground hover:bg-muted transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
                <button
                  onClick={handleCalculate}
                  disabled={!isFormValid}
                  className="flex-1 flex items-center justify-center gap-2 rounded-lg gradient-primary px-4 py-2.5 text-sm font-heading font-bold text-primary-foreground hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Calculator className="w-4 h-4" />
                  Calculate
                </button>
              </div>
            </div>
          )}

          {/* Loading */}
          {loading && <Loader />}

          {/* Result */}
          {result && !loading && (
            <div>
              <ResultCard crop={crop} area={parseFloat(area)} result={result} />
              <button
                onClick={handleReset}
                className="mt-6 w-full flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-heading font-semibold text-foreground hover:bg-muted transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Calculate Again
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4 font-body">
          Climate-Based Crop Insurance Premium Calculator • Demo
        </p>
      </div>
    </div>
  );
};

export default CropCalculator;
