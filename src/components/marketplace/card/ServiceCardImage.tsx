
import { Star, BadgeCheck } from "lucide-react";
import { BadgeAward } from "@/components/ui/badge-award";
import { SecurityScore } from "@/components/trust/security-metrics";

interface ServiceCardImageProps {
  title: string;
  imageUrl?: string;
  category: string;
  rating: number;
  provider: {
    level: "rookie" | "expert" | "verified";
  };
  securityScore: number;
}

export function ServiceCardImage({
  title,
  imageUrl,
  category,
  rating,
  provider,
  securityScore
}: ServiceCardImageProps) {
  // Define consistent high-quality images with theme-aligned gradients for different security categories
  const getCategoryImage = (category: string) => {
    const images = {
      "Smart Contracts": "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1600&auto=format&fit=crop&blend=9b87f5&blend-mode=multiply&sat=-50",
      "DApps": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop&blend=9b87f5&blend-mode=multiply&sat=-30",
      "Protocols": "https://images.unsplash.com/photo-1526378800651-c32d170fe6f8?q=80&w=1600&auto=format&fit=crop&blend=7E69AB&blend-mode=multiply&sat=-40",
      "NFTs": "https://images.unsplash.com/photo-1618044733300-9472054094ee?q=80&w=1600&auto=format&fit=crop&blend=8B5CF6&blend-mode=multiply&sat=-30",
      "Bridges": "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=1600&auto=format&fit=crop&blend=6E59A5&blend-mode=multiply&sat=-40",
      "Infrastructure": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1600&auto=format&fit=crop&blend=9b87f5&blend-mode=multiply&sat=-30",
      "DAOs": "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=1600&auto=format&fit=crop&blend=7E69AB&blend-mode=multiply&sat=-30",
      "ZK Proofs": "https://images.unsplash.com/photo-1633265486064-086b219458ec?q=80&w=1600&auto=format&fit=crop&blend=8B5CF6&blend-mode=multiply&sat=-30",
      "default": "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=1600&auto=format&fit=crop&blend=9b87f5&blend-mode=multiply&sat=-40"
    };
    
    return images[category] || images["default"];
  };

  const displayImage = imageUrl || getCategoryImage(category);
  const altText = `${title} - ${category} security service`;
  
  return (
    <div className="h-48 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10">
        <img 
          src={displayImage} 
          alt={altText} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = getCategoryImage("default");
            target.alt = `Default image for ${category} security service`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" aria-hidden="true"></div>
      </div>
      
      <div className="absolute top-3 right-3 flex space-x-2">
        <BadgeAward 
          variant={provider.level === "rookie" ? "verified" : provider.level} 
          className="font-medium backdrop-blur-sm shadow-lg"
        >
          {provider.level === "rookie" ? "Verified" : provider.level === "expert" ? "Expert" : "Verified"}
        </BadgeAward>
      </div>
      
      <div className="absolute bottom-3 left-3">
        <div className="flex items-center bg-black/60 backdrop-blur-sm rounded-md px-2 py-1" aria-label={`Rating: ${rating.toFixed(1)} out of 5`}>
          <Star className="h-4 w-4 fill-web3-orange text-web3-orange mr-1" aria-hidden="true" />
          <span className="text-sm font-semibold text-white">{rating.toFixed(1)}</span>
        </div>
      </div>
      
      {/* Security score */}
      <div className="absolute bottom-3 right-3">
        <div className="bg-black/60 backdrop-blur-sm rounded-md px-2 py-1">
          <SecurityScore score={securityScore} size="sm" showLabel={false} />
        </div>
      </div>
    </div>
  );
}
