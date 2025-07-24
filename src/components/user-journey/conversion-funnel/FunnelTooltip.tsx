import React from "react";

// Define proper interfaces for tooltip props
interface TooltipPayload {
  payload: {
    name: string;
    value: number;
    dropoff: number;
    action: string;
  };
}

interface TooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
}

export function renderTooltip(props: TooltipProps) {
  const { active, payload } = props;
  if (active && payload && payload.length > 0) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 rounded-md shadow-md border border-border text-sm">
        <p className="font-medium">{data.name}</p>
        <p className="text-muted-foreground">Retention: {data.value}%</p>
        <p className="text-muted-foreground">Dropoff: {data.dropoff}%</p>
        <p className="text-primary font-medium mt-1">{data.action}</p>
      </div>
    );
  }
  return null;
}
