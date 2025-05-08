
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ServiceCardHeader } from "./card/service-card-header";
import { ServiceCardContent } from "./card/service-card-content";
import { ServiceCardFooter } from "./card/service-card-footer";
import { getCategoryImage } from "./utils/card-image-utils";

export interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  provider: {
    name: string;
    reputation: number;
    isVerified: boolean;
    level: "rookie" | "expert" | "verified";
  };
  pricing: {
    amount: number;
    currency: string;
  };
  rating: number;
  completedJobs: number;
  category: string;
  tags: string[];
  imageUrl?: string;
  securityScore?: number;
  responseTime?: string;
}

export function ServiceCard({
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
}: ServiceCardProps) {
  
  const navigate = useNavigate();

  // Enhanced function to navigate to service details
  const handleViewDetails = () => {
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
  };

  return (
    <Card className="overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300 bg-card h-full flex flex-col group">
      <CardHeader className="p-0">
        <ServiceCardHeader
          title={title}
          imageUrl={imageUrl}
          category={category}
          rating={rating}
          providerLevel={provider.level}
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
          category={category}
        />
      </CardContent>
      
      <CardFooter className="p-0">
        <ServiceCardFooter
          pricing={pricing}
          onViewDetails={handleViewDetails}
        />
      </CardFooter>
    </Card>
  );
}
