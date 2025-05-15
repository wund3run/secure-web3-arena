
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from 'date-fns';

interface SecurityScoreCardProps {
  score: number;
  projectName: string;
  lastScan: string;
}

export function SecurityScoreCard({ score, projectName, lastScan }: SecurityScoreCardProps) {
  // Determine color and rating based on score
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500";
    if (score >= 70) return "text-blue-500";
    if (score >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreRating = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 70) return "Good";
    if (score >= 50) return "Fair";
    return "Poor";
  };

  const formattedDate = format(new Date(lastScan), 'MMM d, yyyy HH:mm');

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Security Score</CardTitle>
        <CardDescription>{projectName}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center py-6">
        <div className="relative">
          <svg className="w-36 h-36" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-muted/30"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeDasharray={`${score * 2.51} 251`}
              strokeDashoffset="0"
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
              className={getScoreColor(score)}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-4xl font-bold ${getScoreColor(score)}`}>{score}</span>
            <span className="text-sm text-muted-foreground mt-1">{getScoreRating(score)}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          Last scan: {formattedDate}
        </p>
      </CardContent>
    </Card>
  );
}
