import { Brain, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface BrainMascotProps {
  className?: string;
  showSparkles?: boolean;
  animate?: boolean;
}

export const BrainMascot = ({ 
  className, 
  showSparkles = true, 
  animate = true 
}: BrainMascotProps) => {
  return (
    <div className={cn(
      "relative flex items-center justify-center",
      animate && "brain-bounce",
      className
    )}>
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-xl opacity-30 scale-110" />
      
      {/* Main Brain */}
      <div className="relative bg-gradient-to-br from-primary to-secondary p-4 rounded-full">
        <Brain className="w-8 h-8 text-white" />
      </div>
      
      {/* Sparkles */}
      {showSparkles && (
        <>
          <Sparkles className="absolute -top-2 -right-2 w-4 h-4 text-warning animate-pulse" />
          <Sparkles className="absolute -bottom-1 -left-2 w-3 h-3 text-success animate-pulse delay-300" />
          <Sparkles className="absolute top-1 -right-4 w-2 h-2 text-secondary animate-pulse delay-700" />
        </>
      )}
    </div>
  );
};