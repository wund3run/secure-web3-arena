
import { memo, useCallback } from "react";
import { Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MobileCardImageProps {
  imageUrl?: string;
  title: string;
  category: string;
  isFavorite: boolean;
  toggleFavorite: (e: React.MouseEvent) => void;
}

export const MobileCardImage = memo(function MobileCardImage({
  imageUrl,
  title,
  category,
  isFavorite,
  toggleFavorite
}: MobileCardImageProps) {
  // Generate themed images for different categories
  const getFallbackImage = (category: string) => {
    const images: Record<string, string> = {
      "Smart Contracts": "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1600&auto=format&fit=crop&blend=9b87f5&blend-mode=multiply&sat=-50",
      "DApps": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop&blend=9b87f5&blend-mode=multiply&sat=-30",
      "Protocols": "https://images.unsplash.com/photo-1526378800651-c32d170fe6f8?q=80&w=1600&auto=format&fit=crop&blend=7E69AB&blend-mode=multiply&sat=-40",
      "NFTs": "https://images.unsplash.com/photo-1618044733300-9472054094ee?q=80&w=1600&auto=format&fit=crop&blend=8B5CF6&blend-mode=multiply&sat=-30",
      "Bridges": "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=1600&auto=format&fit=crop&blend=6E59A5&blend-mode=multiply&sat=-40",
      "Infrastructure": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1600&auto=format&fit=crop&blend=9b87f5&blend-mode=multiply&sat=-30",
      "DAOs": "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=1600&auto=format&fit=crop&blend=7E69AB&blend-mode=multiply&sat=-30",
      "ZK Proofs": "https://images.unsplash.com/photo-1633265486064-086b219458ec?q=80&w=1600&auto=format&fit=crop&blend=8B5CF6&blend-mode=multiply&sat=-30",
    };

    return images[category] || "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=1600&auto=format&fit=crop&blend=9b87f5&blend-mode=multiply&sat=-40";
  };

  const altText = `${title} - ${category} security service`;

  // Memoize the toggle favorite handler
  const handleToggleFavorite = useCallback((e: React.MouseEvent) => {
    toggleFavorite(e);
  }, [toggleFavorite]);

  return (
    <div className="relative h-32 rounded-t-lg overflow-hidden">
      {imageUrl ? (
        <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10">
          <img 
            src={imageUrl} 
            alt={altText} 
            className="w-full h-full object-cover" 
            loading="lazy"
            decoding="async"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = getFallbackImage(category);
              target.alt = `Default image for ${category} security service`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" aria-hidden="true"></div>
        </div>
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
          <Shield className="h-12 w-12 text-primary/50" aria-hidden="true" />
          <span className="sr-only">{category} security service</span>
        </div>
      )}
      
      <div className="absolute top-2 right-2 flex space-x-2">
        <div className="bg-sky-100/80 text-sky-700 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium shadow-sm">
          24h response
        </div>
      </div>
      
      <div className="absolute bottom-2 left-2">
        <Badge className="bg-black/70 text-white hover:bg-black/80 backdrop-blur-sm px-2 py-0.5 text-xs font-medium">
          {category}
        </Badge>
      </div>
      
      <div className="absolute top-2 left-2">
        <button
          className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white touch-manipulation z-10 flex items-center justify-center focus:ring-2 focus:ring-primary/50 focus:outline-none"
          onClick={handleToggleFavorite}
          aria-pressed={isFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={isFavorite ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
            aria-hidden="true"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>
      </div>
    </div>
  );
});
