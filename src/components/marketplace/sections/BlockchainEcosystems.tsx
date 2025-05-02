
import { toast } from "sonner";

interface BlockchainEcosystem {
  name: string;
  logoUrl: string;
  color: string;
}

interface BlockchainEcosystemsProps {
  ecosystems?: BlockchainEcosystem[];
}

const DEFAULT_ECOSYSTEMS: BlockchainEcosystem[] = [
  {
    name: "Ethereum",
    logoUrl: "/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png",
    color: "#627EEA"
  },
  {
    name: "Solana",
    logoUrl: "/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png",
    color: "#9945FF"
  },
  {
    name: "Polygon",
    logoUrl: "/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png",
    color: "#8247E5"
  },
  {
    name: "Avalanche",
    logoUrl: "/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png",
    color: "#E84142"
  },
  {
    name: "BNB Chain",
    logoUrl: "/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png",
    color: "#F3BA2F"
  },
  {
    name: "Arbitrum",
    logoUrl: "/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png", 
    color: "#28A0F0"
  },
  {
    name: "Optimism",
    logoUrl: "/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png",
    color: "#FF0420"
  },
  {
    name: "Aptos",
    logoUrl: "/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png",
    color: "#277DA1"
  },
  {
    name: "Sui",
    logoUrl: "/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png",
    color: "#6FBCF0"
  }
];

export function BlockchainEcosystems({ ecosystems = DEFAULT_ECOSYSTEMS }: BlockchainEcosystemsProps) {
  const handleEcosystemClick = (ecosystem: string) => {
    toast.info(`${ecosystem} security audits are available`, {
      description: "Contact us for specialized security solutions",
      action: {
        label: "Contact Us",
        onClick: () => {
          window.location.href = '/contact';
        }
      }
    });
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
