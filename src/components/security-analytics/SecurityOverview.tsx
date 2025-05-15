
import React from 'react';
import { Card } from "@/components/ui/card";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { SecurityScoreCard } from './dashboard-components/SecurityScoreCard';
import { RiskBreakdown } from './dashboard-components/RiskBreakdown';

// Define the allowed risk levels as a type
type RiskLevel = "critical" | "high" | "medium" | "low" | "info";

// Define the interface for risk areas
interface RiskArea {
  name: string;
  score: number;
  risk: RiskLevel;
}

// Mock data with the correct risk levels
const riskAreas: RiskArea[] = [
  { name: "Smart Contract Logic", score: 65, risk: "medium" },
  { name: "Access Controls", score: 40, risk: "high" },
  { name: "External Dependencies", score: 85, risk: "low" },
  { name: "Oracle Security", score: 30, risk: "high" },
  { name: "Gas Optimization", score: 92, risk: "low" }
];

// Vulnerability counts for the past 30 days
const vulnerabilityTrends = [
  { name: "Week 1", critical: 3, high: 5, medium: 8, low: 12 },
  { name: "Week 2", critical: 2, high: 4, medium: 7, low: 10 },
  { name: "Week 3", critical: 1, high: 3, medium: 9, low: 14 },
  { name: "Week 4", critical: 0, high: 2, medium: 6, low: 9 }
];

export function SecurityOverview() {
  // Calculate the overall security score (average of all risk areas)
  const overallScore = Math.round(
    riskAreas.reduce((sum, area) => sum + area.score, 0) / riskAreas.length
  );

  // Determine the security level based on the score
  const getSecurityLevel = (score: number) => {
    if (score >= 80) return "Good";
    if (score >= 60) return "Moderate";
    return "At Risk";
  };

  // Color mapping for the security level
  const getSecurityColor = (score: number) => {
    if (score >= 80) return "#22c55e";
    if (score >= 60) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Security Score Card */}
        <SecurityScoreCard score={overallScore} />

        {/* Audit History */}
        <Card className="p-6">
          <h3 className="font-medium text-lg mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span>Audit completed</span>
              <span className="text-muted-foreground">2 days ago</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>Vulnerability patched</span>
              <span className="text-muted-foreground">5 days ago</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>Security scan</span>
              <span className="text-muted-foreground">1 week ago</span>
            </div>
          </div>
        </Card>

        {/* Risk Breakdown */}
        <RiskBreakdown riskAreas={riskAreas} />
      </div>

      {/* Vulnerability Trends */}
      <Card className="p-6">
        <h3 className="font-medium text-lg mb-6">Vulnerability Trends (30 Days)</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={vulnerabilityTrends}
              margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
              stackOffset="sign"
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="critical" name="Critical" stackId="a" fill="#ef4444" />
              <Bar dataKey="high" name="High" stackId="a" fill="#f97316" />
              <Bar dataKey="medium" name="Medium" stackId="a" fill="#f59e0b" />
              <Bar dataKey="low" name="Low" stackId="a" fill="#84cc16" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-medium text-lg mb-4">Recommendations</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 p-1 rounded-full flex-shrink-0 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </span>
              <span>Update access control implementation to follow principle of least privilege</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 p-1 rounded-full flex-shrink-0 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </span>
              <span>Implement multiple oracle sources to mitigate oracle manipulation risks</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 p-1 rounded-full flex-shrink-0 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </span>
              <span>Conduct comprehensive smart contract audit focusing on reentrancy vulnerabilities</span>
            </li>
          </ul>
        </Card>

        <Card className="p-6">
          <h3 className="font-medium text-lg mb-4">Security Compliance</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">OWASP Top 10 for Smart Contracts</span>
                <span className="text-sm font-medium">70%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Gas Optimization</span>
                <span className="text-sm font-medium">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Formal Verification</span>
                <span className="text-sm font-medium">45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-red-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
