
import { Target, Shield, TrendingUp, Zap, Brain } from "lucide-react";

export const getCategoryIcon = (category: string) => {
  const icons = {
    optimization: Target,
    security: Shield,
    growth: TrendingUp,
    efficiency: Zap
  };
  const Icon = icons[category as keyof typeof icons] || Brain;
  return <Icon className="h-4 w-4" />;
};
