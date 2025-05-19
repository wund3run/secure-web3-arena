
import React from "react";
import { completedMilestones } from "./roadmapData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function CompletedMilestones() {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-semibold mb-6">Completed Milestones</h2>
      
      <Carousel className="w-full">
        <CarouselContent className="-ml-4">
          {completedMilestones.map((milestone, index) => (
            <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <Card className="h-full flex flex-col">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      <CalendarIcon className="h-3 w-3 mr-1" />
                      {milestone.date}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{milestone.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{milestone.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex flex-col h-full">
                    <div className="flex-grow">
                      <div className="mb-4 h-[120px] rounded-md bg-muted overflow-hidden">
                        {milestone.image && (
                          <img 
                            src={milestone.image} 
                            alt={milestone.title} 
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-1">Impact</h4>
                        <p className="text-sm text-muted-foreground">{milestone.impact}</p>
                      </div>
                    </div>
                    {milestone.caseStudyLink && (
                      <Button asChild variant="link" className="p-0 justify-start mt-auto">
                        <Link to={milestone.caseStudyLink}>
                          Read case study
                          <ArrowRightIcon className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:flex justify-end gap-2 mt-4">
          <CarouselPrevious className="position-static h-8 w-8 rounded-full" />
          <CarouselNext className="position-static h-8 w-8 rounded-full" />
        </div>
      </Carousel>
    </div>
  );
}
