import { Sprout } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12 animate-fade-slide-up">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-20 h-20 rounded-full border-4 border-muted animate-spin" style={{ borderTopColor: 'hsl(var(--primary))' }} />
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Sprout className="w-8 h-8 text-primary animate-sway" />
        </div>
      </div>
      <p className="text-muted-foreground font-body text-sm animate-pulse">
        Analyzing crop & climate data...
      </p>
    </div>
  );
};

export default Loader;
