
export const getImpactColor = (impact: string): "default" | "error" | "secondary" | "outline" | "success" | "warning" => {
  switch (impact) {
    case "high":
      return "error";
    case "medium":
      return "secondary";
    case "low":
      return "outline";
    default:
      return "outline";
  }
};
