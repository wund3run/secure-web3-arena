
import { TrustIndicators } from "../trust-indicators";

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
    <div className="space-y-2">
      <h3 className="font-bold text-sm line-clamp-2 min-h-[2.5rem]">{title}</h3>
      
      <div className="flex items-center space-x-2">
        <div className="text-base font-bold text-gradient bg-gradient-to-r from-primary to-primary/80">
          {pricing.amount} {pricing.currency}
        </div>
      </div>
      
      <TrustIndicators 
        securityScore={provider.securityScore}
        verificationLevel={provider.verificationLevel}
        completedProjects={provider.completedProjects}
        size="sm" 
      />
      
      <div className="text-xs text-muted-foreground line-clamp-2 min-h-[2rem]">
        {description}
      </div>
      
      <TagsList tags={tags} />
    </div>
  );
}

function TagsList({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-1 mt-1">
      {tags.slice(0, 2).map((tag) => (
        <span 
          key={tag} 
          className="inline-flex bg-secondary/30 border border-secondary/40 px-1.5 py-0.5 rounded text-xs font-medium text-secondary-foreground shadow-sm"
        >
          {tag}
        </span>
      ))}
      {tags.length > 2 && (
        <span className="inline-flex bg-muted/80 px-1.5 py-0.5 rounded text-xs font-medium text-muted-foreground shadow-sm">
          +{tags.length - 2}
        </span>
      )}
    </div>
  );
}
