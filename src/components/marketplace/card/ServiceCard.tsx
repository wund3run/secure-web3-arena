
import { memo, useCallback } from "react";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ServiceCardProps } from "./ServiceCardProps";
import { ServiceCardImage } from "./ServiceCardImage";
import { ServiceCardContent } from "./ServiceCardContent";
import { ServiceCardFooter } from "./ServiceCardFooter";

export const ServiceCard = memo(function ServiceCard({
  id,
  title,
  description,
  provider,
  pricing,
  rating,
  completedJobs,
  category,
  tags,
  imageUrl,
  securityScore = 85,
  responseTime = "24h",
  onClick
}: ServiceCardProps) {
  const navigate = useNavigate();

  // Memoize the function to navigate to service details
  const handleViewDetails = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    
    if (onClick) {
      onClick();
    } else {
      navigate(`/service/${id}`, { 
        state: { 
          serviceDetail: {
            id,
            title,
            description,
            provider,
            pricing,
            rating,
            completedJobs,
            category,
            tags,
            imageUrl,
            securityScore,
            responseTime
          }
        }
      });
    }
  }, [id, title, description, provider, pricing, rating, completedJobs, category, tags, imageUrl, securityScore, responseTime, onClick, navigate]);

  return (
    <Card 
      className="overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300 bg-card h-full flex flex-col group cursor-pointer" 
      onClick={handleViewDetails}
    >
      <CardHeader className="p-0">
        <ServiceCardImage 
          title={title}
          imageUrl={imageUrl}
          category={category}
          rating={rating}
          provider={provider}
          securityScore={securityScore}
        />
      </CardHeader>
      
      <CardContent className="p-0 flex-grow">
        <ServiceCardContent
          title={title}
          description={description}
          provider={provider}
          completedJobs={completedJobs}
          tags={tags}
          responseTime={responseTime}
        />
      </CardContent>
      
      <CardFooter className="p-0">
        <ServiceCardFooter
          pricing={pricing}
          onViewDetails={(e) => handleViewDetails(e)}
        />
      </CardFooter>
    </Card>
  );
});
