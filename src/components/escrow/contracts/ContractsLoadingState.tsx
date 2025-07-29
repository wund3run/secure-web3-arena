
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export function ContractsLoadingState() {
  // Render fewer skeleton elements initially for faster perceived performance
  const skeletonCards = Array(2).fill(null);
  
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
      
      {/* Skeleton cards for contracts with staggered animation */}
      <div className="grid gap-4">
        {skeletonCards.map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <Skeleton 
                    className="h-5 w-40" 
                    style={{ animationDelay: `${index * 100}ms` }}
                  />
                  <Skeleton 
                    className="h-4 w-52" 
                    style={{ animationDelay: `${index * 150}ms` }}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton 
                    className="h-5 w-20" 
                    style={{ animationDelay: `${index * 200}ms` }}
                  />
                  <Skeleton 
                    className="h-8 w-8 rounded-full" 
                    style={{ animationDelay: `${index * 250}ms` }}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="flex justify-between">
                <div className="space-y-2">
                  <Skeleton 
                    className="h-4 w-32" 
                    style={{ animationDelay: `${index * 300}ms` }}
                  />
                  <Skeleton 
                    className="h-4 w-36" 
                    style={{ animationDelay: `${index * 350}ms` }}
                  />
                </div>
                <Skeleton 
                  className="h-5 w-24" 
                  style={{ animationDelay: `${index * 400}ms` }}
                />
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full flex justify-between items-center">
                <Skeleton 
                  className="h-4 w-20" 
                  style={{ animationDelay: `${index * 450}ms` }}
                />
                <Skeleton 
                  className="h-9 w-28" 
                  style={{ animationDelay: `${index * 500}ms` }}
                />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {/* Optimized loading - only add a third card if needed, reduces initial render cost */}
      <Card className="overflow-hidden animate-pulse-delayed" style={{ animationDelay: '600ms' }}>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <Skeleton className="h-12 w-full" />
          </div>
        </CardHeader>
        <CardContent className="pb-3">
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}
