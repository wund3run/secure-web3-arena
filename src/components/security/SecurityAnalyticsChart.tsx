import React from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const securityData = [
  { name: 'Week 1', alerts: 12, vulnerabilities: 8, mitigations: 5 },
  { name: 'Week 2', alerts: 19, vulnerabilities: 12, mitigations: 8 },
  { name: 'Week 3', alerts: 14, vulnerabilities: 9, mitigations: 11 },
  { name: 'Week 4', alerts: 28, vulnerabilities: 15, mitigations: 12 },
  { name: 'Week 5', alerts: 22, vulnerabilities: 13, mitigations: 18 },
  { name: 'Week 6', alerts: 16, vulnerabilities: 9, mitigations: 14 },
  { name: 'Week 7', alerts: 12, vulnerabilities: 6, mitigations: 11 },
];

export const SecurityAnalyticsChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={securityData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorAlerts" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorVulnerabilities" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorMitigations" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis 
          dataKey="name" 
          stroke="#6b7280"
          fontSize={12}
        />
        <YAxis 
          stroke="#6b7280"
          fontSize={12}
        />
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <Tooltip 
          contentStyle={{
            backgroundColor: '#1f2937', 
            borderColor: '#374151',
            borderRadius: '0.375rem',
            color: '#e5e7eb'
          }}
        />
        <Legend wrapperStyle={{ fontSize: '12px', color: '#9ca3af' }} />
        <Area 
          type="monotone" 
          dataKey="alerts" 
          name="Security Alerts"
          stroke="#3b82f6" 
          fillOpacity={1} 
          fill="url(#colorAlerts)" 
        />
        <Area 
          type="monotone" 
          dataKey="vulnerabilities" 
          name="Vulnerabilities" 
          stroke="#f97316" 
          fillOpacity={1} 
          fill="url(#colorVulnerabilities)" 
        />
        <Area 
          type="monotone" 
          dataKey="mitigations" 
          name="Mitigations" 
          stroke="#22c55e" 
          fillOpacity={1} 
          fill="url(#colorMitigations)" 
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
