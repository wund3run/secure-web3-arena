
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export function SecurityScoreWidget() {
  // Sample data for demonstration
  const securityScore = 85;
  const previousScore = 78;
  const improvement = securityScore - previousScore;

  // Determine color based on score
  const getScoreColor = (score: number) => {
    if (score >= 90) return '#10b981'; // Green
    if (score >= 70) return '#3b82f6'; // Blue
    if (score >= 50) return '#f59e0b'; // Amber
    return '#ef4444'; // Red
  };

  return (
    <Card className="h-full">
      <CardContent className="pt-6 flex flex-col items-center justify-center h-full">
        <div className="w-40 h-40 mb-4">
          <CircularProgressbar
            value={securityScore}
            text={`${securityScore}%`}
            styles={buildStyles({
              textSize: '16px',
              pathColor: getScoreColor(securityScore),
              textColor: getScoreColor(securityScore),
              trailColor: '#e5e7eb',
              pathTransitionDuration: 0.5,
            })}
          />
        </div>
        
        <div className="text-center">
          <h4 className="text-sm font-medium text-muted-foreground">Overall Security Rating</h4>
          
          <div className="mt-2 flex justify-center items-center space-x-1">
            <span className="text-sm font-medium">Previous: {previousScore}%</span>
            <span className={`text-sm font-medium ${
              improvement > 0 
                ? 'text-green-500' 
                : improvement < 0 
                  ? 'text-red-500' 
                  : ''
            }`}>
              {improvement > 0 ? `(+${improvement}%)` : improvement < 0 ? `(${improvement}%)` : '(No change)'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
