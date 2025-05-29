
export const getImpactColor = (impact: string) => {
  switch (impact) {
    case 'high':
      return 'destructive';
    case 'medium':
      return 'warning';
    case 'low':
      return 'success';
    default:
      return 'outline';
  }
};

export const getEffortColor = (effort: string) => {
  switch (effort) {
    case 'high':
      return 'destructive';
    case 'medium':
      return 'warning';
    case 'low':
      return 'success';
    default:
      return 'outline';
  }
};
