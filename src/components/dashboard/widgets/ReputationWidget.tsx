
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";

export function ReputationWidget() {
  return (
    <Card className="h-full">
      <CardContent className="pt-6 space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Overall Rating</h3>
            <div className="flex items-center">
              <span className="font-bold mr-1">4.8</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < 4 ? "text-yellow-400 fill-yellow-400" : i === 4 ? "text-yellow-400 fill-yellow-400 opacity-80" : "text-gray-300"}`} 
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-sm">Technical Accuracy</span>
              <span className="text-sm font-medium">98%</span>
            </div>
            <Progress value={98} />
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-sm">Communication</span>
              <span className="text-sm font-medium">90%</span>
            </div>
            <Progress value={90} />
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-sm">On-time Delivery</span>
              <span className="text-sm font-medium">92%</span>
            </div>
            <Progress value={92} />
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-sm">Documentation Quality</span>
              <span className="text-sm font-medium">95%</span>
            </div>
            <Progress value={95} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
