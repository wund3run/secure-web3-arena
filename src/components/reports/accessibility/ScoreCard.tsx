
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart2 } from "lucide-react";

interface ScoreCardProps {
  score: number;
  grade: string;
  color: string;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ score, grade, color }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Overall Score</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div>
            <div className={`text-4xl font-bold tracking-tight ${color}`}>{score}</div>
            <div className={`text-xl font-semibold ${color}`}>Grade: {grade}</div>
          </div>
          <div className="rounded-full bg-muted p-2">
            <BarChart2 className="h-6 w-6 text-muted-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
