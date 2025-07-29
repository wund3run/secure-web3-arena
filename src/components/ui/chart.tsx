import React from 'react';
import {
  LineChart,
  AreaChart,
  BarChart,
  PieChart,
  RadialBarChart,
  Pie,
  Line,
  Area,
  Bar,
  RadialBar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config?: Record<string, { label: string; color?: string }>;
  children: React.ReactElement;
}

export const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('', className)} {...props}>
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    );
  }
);
ChartContainer.displayName = 'ChartContainer';

export const ChartTooltip = Tooltip;

export const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    active?: boolean;
    payload?: Array<{ value: string | number; name: string; color: string }>;
    label?: string;
  }
>(({ className, active, payload, label, ...props }, ref) => {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cn(
        'rounded-lg border bg-background p-2 shadow-sm',
        className
      )}
      {...props}
    >
      {label && (
        <div className="mb-2 font-medium">{label}</div>
      )}
      <div className="grid gap-2">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm">{entry.name}: {entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
});
ChartTooltipContent.displayName = 'ChartTooltipContent';

interface ChartProps {
  data: unknown[];
  type: 'line' | 'area' | 'bar' | 'pie' | 'radial' | 'donut';
  title?: string;
  description?: string;
  height?: number;
  className?: string;
  colors?: string[];
  showLegend?: boolean;
  showGrid?: boolean;
  animate?: boolean;
  gradient?: boolean;
}

const DEFAULT_COLORS = [
  '#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1', 
  '#d084d0', '#ffb347', '#87ceeb', '#dda0dd', '#98fb98'
];

const SEVERITY_COLORS = {
  critical: '#ef4444',
  high: '#f97316', 
  medium: '#eab308',
  low: '#22c55e',
  info: '#3b82f6'
};

export function Chart({ 
  data, 
  type, 
  title, 
  description, 
  height = 300, 
  className,
  colors = DEFAULT_COLORS,
  showLegend = true,
  showGrid = true,
  animate = true,
  gradient = false
}: ChartProps) {
  const renderChart = (): React.ReactElement => {
    switch (type) {
      case 'line':
        return (
          <LineChart data={data} width={800} height={height}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" className="opacity-30" />}
            <XAxis dataKey="name" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px'
              }}
            />
            {showLegend && <Legend />}
            {Object.keys(data[0] || {}).filter(key => key !== 'name').map((key, index) => (
              <Line 
                key={key}
                type="monotone" 
                dataKey={key} 
                stroke={colors[index % colors.length]}
                strokeWidth={2}
                dot={{ fill: colors[index % colors.length], strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: colors[index % colors.length], strokeWidth: 2 }}
                animationDuration={animate ? 1000 : 0}
              />
            ))}
          </LineChart>
        );

      case 'area':
        return (
          <AreaChart data={data} width={800} height={height}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" className="opacity-30" />}
            <XAxis dataKey="name" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px'
              }}
            />
            {showLegend && <Legend />}
            {Object.keys(data[0] || {}).filter(key => key !== 'name').map((key, index) => (
              <Area 
                key={key}
                type="monotone" 
                dataKey={key} 
                stackId="1"
                stroke={colors[index % colors.length]}
                fill={gradient ? `url(#gradient${index})` : colors[index % colors.length]}
                fillOpacity={0.6}
                animationDuration={animate ? 1000 : 0}
              />
            ))}
            {gradient && (
              <defs>
                {colors.map((color, index) => (
                  <linearGradient key={index} id={`gradient${index}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={color} stopOpacity={0.1}/>
                  </linearGradient>
                ))}
              </defs>
            )}
          </AreaChart>
        );

      case 'bar':
        return (
          <BarChart data={data} width={800} height={height}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" className="opacity-30" />}
            <XAxis dataKey="name" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px'
              }}
            />
            {showLegend && <Legend />}
            {Object.keys(data[0] || {}).filter(key => key !== 'name').map((key, index) => (
              <Bar 
                key={key}
                dataKey={key} 
                fill={colors[index % colors.length]}
                radius={[4, 4, 0, 0]}
                animationDuration={animate ? 1000 : 0}
              />
            ))}
          </BarChart>
        );

      case 'pie':
        return (
          <PieChart width={800} height={height}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={height / 3}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              animationDuration={animate ? 1000 : 0}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px'
              }}
            />
          </PieChart>
        );

      case 'donut':
        return (
          <PieChart width={800} height={height}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={height / 4}
              outerRadius={height / 3}
              fill="#8884d8"
              dataKey="value"
              animationDuration={animate ? 1000 : 0}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px'
              }}
            />
            {showLegend && <Legend />}
          </PieChart>
        );

      case 'radial':
        return (
          <RadialBarChart width={800} height={height} data={data}>
            <RadialBar 
              dataKey="value" 
              cornerRadius={10} 
              fill={colors[0]}
              animationDuration={animate ? 1000 : 0}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px'
              }}
            />
          </RadialBarChart>
        );

      default:
        return <div className="flex items-center justify-center h-full text-muted-foreground">Unsupported chart type</div>;
    }
  };

  return (
    <Card className={cn("w-full", className)}>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle className="text-lg font-semibold">{title}</CardTitle>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </CardHeader>
      )}
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          {renderChart()}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

// Specialized chart components for audit data
export function VulnerabilityChart({ vulnerabilities, className }: { vulnerabilities: any[], className?: string }) {
  const data = vulnerabilities.reduce((acc: any, vuln: any) => {
    const severity = vuln?.severity?.toLowerCase() || 'unknown';
    acc[severity] = (acc[severity] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(data).map(([severity, count]) => ({
    name: severity.charAt(0).toUpperCase() + severity.slice(1),
    value: count,
    color: SEVERITY_COLORS[severity as keyof typeof SEVERITY_COLORS] || '#6b7280'
  }));

  return (
    <Chart
      data={chartData}
      type="donut"
      title="Vulnerability Distribution"
      description="Breakdown of vulnerabilities by severity level"
      colors={chartData.map(item => item.color)}
      className={className}
      height={250}
    />
  );
}

export function AuditProgressChart({ audits, className }: { audits: any[], className?: string }) {
  const data = audits.map((audit: any) => ({
    name: (audit?.name || 'Unknown').substring(0, 10) + '...',
    progress: audit?.progress || 0,
    completed: audit?.completed_tasks || 0,
    total: audit?.total_tasks || 0
  }));

  return (
    <Chart
      data={data}
      type="bar"
      title="Audit Progress"
      description="Current progress across active audits"
      className={className}
      height={300}
      colors={['#22c55e', '#3b82f6']}
    />
  );
}

export function SecurityScoreChart({ scores, className }: { scores: any[], className?: string }) {
  const data = scores.map((score: any) => ({
    name: score?.date || 'Unknown',
    score: score?.value || 0,
    trend: score?.trend || 0
  }));

  return (
    <Chart
      data={data}
      type="area"
      title="Security Score Trend"
      description="Security score evolution over time"
      className={className}
      height={250}
      gradient={true}
      colors={['#8b5cf6']}
    />
  );
}

export function AuditMetricsChart({ metrics, className }: { metrics: any[], className?: string }) {
  return (
    <Chart
      data={metrics}
      type="line"
      title="Audit Metrics"
      description="Key performance indicators for audit activities"
      className={className}
      height={300}
      colors={['#3b82f6', '#10b981', '#f59e0b', '#ef4444']}
    />
  );
} 