
import { TrustIndicators } from "../trust-indicators";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

interface MobileCardContentProps {
  title: string;
  description: string;
  provider: {
    securityScore: number;
    verificationLevel: "verified" | "expert" | "elite";
    completedProjects: number;
  };
  pricing: {
    amount: number;
    currency: string;
  };
  tags: string[];
}

export function MobileCardContent({
  title,
  description,
  provider,
  pricing,
  tags
}: MobileCardContentProps) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center gap-1 mb-1">
        <div className="text-base font-bold text-gradient bg-gradient-to-r from-primary to-primary/80">
          {pricing.amount} {pricing.currency}
        </div>
        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 text-xs ml-2">
          Basic
        </Badge>
      </div>
      
      <h3 className="font-bold text-sm line-clamp-2 min-h-[2.5rem]">{title}</h3>
      
      <TrustIndicators 
        securityScore={provider.securityScore}
        verificationLevel={provider.verificationLevel}
        completedProjects={provider.completedProjects}
        size="sm" 
      />
      
      <div className="flex items-center text-xs text-muted-foreground">
        <Users className="h-3 w-3 mr-1" />
        <span>{provider.completedProjects} completed</span>
      </div>
      
      <div className="text-xs text-muted-foreground line-clamp-2 min-h-[2rem]">
        {description}
      </div>
      
      <TagsList tags={tags} />
    </div>
  );
}

function TagsList({ tags }: { tags: string[] }) {
  const getTagColor = (tag: string) => {
    const tagColors: Record<string, string> = {
      "Solidity": "bg-blue-100 text-blue-700 border-blue-200",
      "DeFi": "bg-green-100 text-green-700 border-green-200",
      "NFT": "bg-purple-100 text-purple-700 border-purple-200",
      "Smart Contract": "bg-amber-100 text-amber-700 border-amber-200",
      "Layer 2": "bg-cyan-100 text-cyan-700 border-cyan-200",
      "ZK": "bg-indigo-100 text-indigo-700 border-indigo-200",
      "ERC20": "bg-blue-100 text-blue-700 border-blue-200",
      "ERC721": "bg-purple-100 text-purple-700 border-purple-200",
      "Cross-chain": "bg-cyan-100 text-cyan-700 border-cyan-200",
      "Privacy": "bg-green-100 text-green-700 border-green-200",
      "Lending": "bg-amber-100 text-amber-700 border-amber-200",
      "Yield": "bg-yellow-100 text-yellow-700 border-yellow-200",
      "ZK-SNARKs": "bg-indigo-100 text-indigo-700 border-indigo-200",
      "ZK-STARKs": "bg-violet-100 text-violet-700 border-violet-200",
      "Optimistic Rollups": "bg-orange-100 text-orange-700 border-orange-200",
    };
    
    // Return color scheme if defined for tag, otherwise return default
    return tagColors[tag] || "bg-primary/5 border border-primary/20";
  };

  return (
    <div className="flex flex-wrap gap-1 mt-1">
      {tags.slice(0, 2).map((tag) => (
        <Badge 
          key={tag} 
          variant="outline"
          className={`px-1.5 py-0.5 rounded-full text-xs font-medium shadow-sm ${getTagColor(tag)}`}
        >
          {tag}
        </Badge>
      ))}
      {tags.length > 2 && (
        <Badge variant="outline" className="px-1.5 py-0.5 rounded-full text-xs font-medium text-muted-foreground shadow-sm bg-muted/80">
          +{tags.length - 2}
        </Badge>
      )}
    </div>
  );
}
