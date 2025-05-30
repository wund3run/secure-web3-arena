
export const getImpactColor = (impact: string): "default" | "destructive" | "secondary" | "outline" | "success" | "warning" => {
  switch (impact) {
    case "high":
      return "destructive";
    case "medium":
      return "secondary";
    case "low":
      return "outline";
    default:
      return "outline";
  }
};

export const getEffortColor = (effort: string): "default" | "destructive" | "secondary" | "outline" | "success" | "warning" => {
  switch (effort) {
    case "low":
      return "default";
    case "medium":
      return "secondary";
    case "high":
      return "destructive";
    default:
      return "outline";
  }
};
