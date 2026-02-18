import type { PredictResponse } from "@/data/cropData";

interface ResultCardProps {
  crop: string;
  area: number;
  result: PredictResponse;
}

const riskColor = (risk: "Low" | "Medium" | "High") => {
  switch (risk) {
    case "Low":
      return "bg-success/15 text-success border-success/30";
    case "Medium":
      return "bg-warning/15 text-warning border-warning/30";
    case "High":
      return "bg-danger/15 text-danger border-danger/30";
  }
};

const ResultCard = ({ crop, area, result }: ResultCardProps) => {
  return (
    <div className="animate-fade-slide-up">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl">🌾</span>
        <h2 className="text-xl font-heading font-bold text-foreground">
          Insurance Summary
        </h2>
      </div>

      {/* Summary Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="rounded-lg bg-muted/50 p-4">
          <p className="text-xs font-body text-muted-foreground mb-1">Crop</p>
          <p className="font-heading font-bold text-foreground">{crop}</p>
        </div>
        <div className="rounded-lg bg-muted/50 p-4">
          <p className="text-xs font-body text-muted-foreground mb-1">Area</p>
          <p className="font-heading font-bold text-foreground">{area} Hectares</p>
        </div>
        <div className="rounded-lg bg-primary/10 p-4 border border-primary/20">
          <p className="text-xs font-body text-muted-foreground mb-1">Premium Amount</p>
          <p className="font-heading font-extrabold text-primary text-lg">
            ₹{result.premiumAmount.toLocaleString()}
          </p>
        </div>
        <div className="rounded-lg bg-muted/50 p-4">
          <p className="text-xs font-body text-muted-foreground mb-1">Expected Return</p>
          <p className="font-heading font-bold text-foreground">
            ₹{result.expectedReturn.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Risk Badges */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-xs font-body text-muted-foreground">Climate Risk:</span>
          <span className={`text-xs font-bold px-3 py-1 rounded-full border ${riskColor(result.climateRisk)}`}>
            {result.climateRisk}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-body text-muted-foreground">Crop Risk:</span>
          <span className={`text-xs font-bold px-3 py-1 rounded-full border ${riskColor(result.cropRisk)}`}>
            {result.cropRisk}
          </span>
        </div>
      </div>

      {/* Decision */}
      <div className="rounded-lg bg-secondary p-4 border border-accent/20">
        <p className="text-xs font-body text-muted-foreground mb-1">Farmer Decision</p>
        <p className="font-body font-medium text-foreground text-sm">
          {result.farmerDecision}
        </p>
      </div>
    </div>
  );
};

export default ResultCard;
