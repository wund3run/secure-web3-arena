
import { BadgeAward } from "@/components/ui/badge-award";
import { Star } from "lucide-react";
import { SecurityScore } from "@/components/trust/security-metrics";
import { getCategoryImage } from "../utils/card-image-utils";

interface ServiceCardHeaderProps {
  title: string;
  imageUrl?: string;
  category: string;
  rating: number;
  providerLevel: "rookie" | "expert" | "verified";
  securityScore: number;
}

export function ServiceCardHeader({
  title,
  imageUrl,
  category,
  rating,
  providerLevel,
  securityScore
}: ServiceCardHeaderProps) {
  const displayImage = imageUrl || getCategoryImage(category);

  return (
    <div className="h-48 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10">
        <img 
          src={displayImage} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = getCategoryImage("default");
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60"></div>
      </div>
      
      <div className="absolute top-3 right-3 flex space-x-2">
        <BadgeAward 
          variant={providerLevel === "rookie" ? "verified" : providerLevel} 
          className="font-medium backdrop-blur-sm shadow-lg"
        >
          {providerLevel === "rookie" ? "Verified" : providerLevel === "expert" ? "Expert" : "Verified"}
        </BadgeAward>
      </div>
      
      <div className="absolute bottom-3 left-3">
        <div className="flex items-center bg-black/60 backdrop-blur-sm rounded-md px-2 py-1">
          <Star className="h-4 w-4 fill-web3-orange text-web3-orange mr-1" />
          <span className="text-sm font-semibold text-white">{rating.toFixed(1)}</span>
        </div>
      </div>
      
      <div className="absolute bottom-3 right-3">
        <div className="bg-black/60 backdrop-blur-sm rounded-md px-2 py-1">
          <SecurityScore score={securityScore} size="sm" showLabel={false} />
        </div>
      </div>
    </div>
  );
}
