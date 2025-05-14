
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export function ContractsLoadingState() {
  // Create an array with 3 items to render 3 skeleton cards
  const skeletonCards = Array(3).fill(null);
  
  return (
    <div className="space-y-4">
      {/* Skeleton for filters */}
      <div className="flex justify-between">
        <div className="flex space-x-2">
          <Skeleton className="h-10 w-[180px]" />
          <Skeleton className="h-10 w-[180px]" />
        </div>
        <Skeleton className="h-10 w-10" />
      </div>
      
      {/* Skeleton cards for contracts */}
      <div className="grid gap-4">
        {skeletonCards.map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-52" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="flex justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-36" />
                </div>
                <Skeleton className="h-5 w-24" />
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full flex justify-between items-center">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-9 w-28" />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
