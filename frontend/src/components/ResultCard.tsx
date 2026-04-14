import { RotateCcw } from "lucide-react";
import { PredictResponse } from "./CropCalculator";

const ResultCard = ({
  result,
  onReset,
}: {
  result: PredictResponse;
  onReset: () => void;
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-primary text-center">
        Insurance Summary
      </h2>

      <div className="bg-muted rounded-xl p-4 space-y-2 text-sm">
        <p><strong>Climate Risk:</strong> {result.climate_risk}</p>
        <p><strong>Crop Risk:</strong> {result.crop_risk}</p>
        <p><strong>Premium Level:</strong> {result.premium_level}</p>
        <p className="font-bold text-lg text-green-600">
          Premium: ₹ {result.premium_amount}
        </p>
        <p><strong>Expected Return:</strong> ₹ {result.expected_return}</p>
      </div>

      <button
        onClick={onReset}
        className="w-full border rounded-lg p-2 flex items-center justify-center gap-2"
      >
        <RotateCcw className="w-4 h-4" />
        Calculate Again
      </button>
    </div>
  );
};

export default ResultCard;
