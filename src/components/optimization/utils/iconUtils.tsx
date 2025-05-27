
import { Target, Zap, Users, Clock, TrendingUp } from "lucide-react";

export const getCategoryIcon = (category: string) => {
  const icons = {
    conversion: Target,
    performance: Zap,
    engagement: Users,
    retention: Clock
  };
  const Icon = icons[category as keyof typeof icons] || TrendingUp;
  return <Icon className="h-4 w-4" />;
};
