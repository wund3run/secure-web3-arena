
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { formatCurrency } from "../utils/formatters";

interface RevenueTrendChartProps {
  trends: Array<{ name: string; value: number }>;
}

export function RevenueTrendChart({ trends }: RevenueTrendChartProps) {
  return (
    <ChartContainer 
      config={{
        revenue: {
          label: "Revenue",
          color: "hsl(var(--primary))"
        }
      }}
      className="h-48"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={trends}
          margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
        >
          <ChartTooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <ChartTooltipContent
                    label={payload[0].payload.name}
                  >
                    {formatCurrency(payload[0].value as number)}
                  </ChartTooltipContent>
                )
              }
              return null
            }}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="hsl(var(--primary))" 
            strokeWidth={2} 
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
