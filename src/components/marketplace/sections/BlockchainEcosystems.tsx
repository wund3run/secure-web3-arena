
import { toast } from "sonner";
import { BlockchainEcosystem } from "../hooks/types/marketplace-types";

interface BlockchainEcosystemsProps {
  ecosystems?: BlockchainEcosystem[];
  onEcosystemClick?: (ecosystem: string) => void; // Add this prop for custom handling
}

const DEFAULT_ECOSYSTEMS: BlockchainEcosystem[] = [
  {
    id: "ethereum",
    name: "Ethereum",
    logoUrl: "/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png",
    projectCount: 1245,
    color: "#627EEA"
  },
  {
    id: "solana",
    name: "Solana",
    logoUrl: "/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png",
    projectCount: 789,
    color: "#9945FF"
  },
  {
    id: "polygon",
    name: "Polygon",
    logoUrl: "/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png",
    projectCount: 652,
    color: "#8247E5"
  },
  {
    id: "avalanche",
    name: "Avalanche",
    logoUrl: "/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png",
    projectCount: 367,
    color: "#E84142"
  },
  {
    id: "bnbchain",
    name: "BNB Chain",
    logoUrl: "/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png",
    projectCount: 654,
    color: "#F3BA2F"
  },
  {
    id: "arbitrum",
    name: "Arbitrum",
    logoUrl: "/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png",
    projectCount: 321,
    color: "#28A0F0"
  },
  {
    id: "optimism",
    name: "Optimism",
    logoUrl: "/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png",
    projectCount: 287,
    color: "#FF0420"
  },
  {
    id: "aptos",
    name: "Aptos",
    logoUrl: "/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png",
    projectCount: 154,
    color: "#277DA1"
  },
  {
    id: "sui",
    name: "Sui",
    logoUrl: "/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png",
    projectCount: 126,
    color: "#6FBCF0"
  }
];

export function BlockchainEcosystems({ ecosystems = DEFAULT_ECOSYSTEMS, onEcosystemClick }: BlockchainEcosystemsProps) {
  const handleEcosystemClick = (ecosystem: string) => {
    // Use custom handler if provided, otherwise use default behavior
    if (onEcosystemClick) {
      onEcosystemClick(ecosystem);
    } else {
      toast.info(`${ecosystem} security audits are available`, {
        description: "Contact us for specialized security solutions",
        action: {
          label: "Contact Us",
          onClick: () => {
            window.location.href = '/contact';
          }
        }
      });
    }
  };

  return (
    <div className="mb-10">
      <h3 className="text-xl font-bold mb-4">Blockchain Ecosystems</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3">
        {ecosystems.map((ecosystem) => (
          <div 
            key={ecosystem.name} 
            className="bg-card hover:bg-card/90 border border-border/40 rounded-lg p-3 flex flex-col items-center justify-center hover:shadow-md transition-all duration-300 cursor-pointer"
            title={`${ecosystem.name} Security Audits`}
            onClick={() => handleEcosystemClick(ecosystem.name)}
          >
            <div 
              className="h-14 w-14 mb-2 flex items-center justify-center rounded-full"
              style={{ 
                background: `linear-gradient(135deg, ${ecosystem.color}30, ${ecosystem.color}10)`,
                boxShadow: `0 0 10px ${ecosystem.color}40` 
              }}
            >
              {/* Use a colored circle with the first letter as the fallback */}
              <div 
                className="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: ecosystem.color }}
              >
                {ecosystem.name.charAt(0)}
              </div>
            </div>
            <h4 className="font-medium text-xs text-center">{ecosystem.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
