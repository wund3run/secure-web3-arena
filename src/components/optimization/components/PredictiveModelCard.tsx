
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { PredictiveModel } from "../types";

interface PredictiveModelCardProps {
  model: PredictiveModel;
}

export function PredictiveModelCard({ model }: PredictiveModelCardProps) {
  const chartData = model.currentTrend.map((value, idx) => ({
    day: idx + 1,
    current: value,
    predicted: model.predictedTrend[idx]
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{model.metric} Prediction</span>
          <Badge variant="secondary">{model.accuracy}% accuracy</Badge>
        </CardTitle>
        <CardDescription>
          Predictive model showing current trends vs. optimized projections
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="current" 
                stroke="#8884d8" 
                strokeDasharray="0"
                name="Current Trend"
              />
              <Line 
                type="monotone" 
                dataKey="predicted" 
                stroke="#82ca9d" 
                strokeDasharray="5 5"
                name="Predicted with Optimizations"
              />
            </LineChart>
          </ResponsiveContainer>
          
          <div>
            <h5 className="font-medium mb-2">Key Influencing Factors:</h5>
            <div className="flex flex-wrap gap-2">
              {model.factors.map((factor) => (
                <Badge key={factor} variant="outline">
                  {factor}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
