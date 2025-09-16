import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient?: string;
  children?: ReactNode;
}

export const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  gradient = "from-primary to-secondary",
  children 
}: FeatureCardProps) => {
  return (
    <div className="card-feature">
      {/* Icon with gradient background */}
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      
      {/* Content */}
      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
        {description}
      </p>
      
      {children}
    </div>
  );
};