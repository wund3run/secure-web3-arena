import { toast } from "sonner";

interface BlockchainEcosystem {
  name: string;
  logoUrl: string;
  color: string;
}

interface BlockchainEcosystemsProps {
  ecosystems: BlockchainEcosystem[];
}

export function BlockchainEcosystems({ ecosystems }: BlockchainEcosystemsProps) {
  const handleEcosystemClick = (ecosystem: string) => {
    toast.info(`${ecosystem} security audits are available`, {
      description: "Contact us for specialized security solutions",
      action: {
        label: "Browse Services",
        onClick: () => {
          // This would update category in the parent component
          // We're keeping the same toast notification as in the original implementation
        }
      }
    });
  };

  return (
    <div className="mb-10">
      <h3 className="text-xl font-bold mb-4">Blockchain Ecosystems</h3>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
        {ecosystems.map((ecosystem) => (
          <div 
            key={ecosystem.name} 
            className="bg-card hover:bg-card/90 border border-border/40 rounded-lg p-4 flex flex-col items-center justify-center hover:shadow-md transition-all duration-300 cursor-pointer"
            title={`${ecosystem.name} Security Audits`}
            onClick={() => handleEcosystemClick(ecosystem.name)}
          >
            <div 
              className="h-16 w-16 mb-2 flex items-center justify-center rounded-full bg-gradient-to-br from-white/80 to-white/20" 
              style={{ boxShadow: `0 0 15px ${ecosystem.color}40` }}
            >
              <img 
                src={ecosystem.logoUrl} 
                alt={`${ecosystem.name} logo`}
                className="h-10 w-10 object-contain animate-float"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://cryptologos.cc/logos/generic/token.png";
                  target.onerror = null;
                }}
              />
            </div>
            <h4 className="font-medium text-sm text-center">{ecosystem.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
