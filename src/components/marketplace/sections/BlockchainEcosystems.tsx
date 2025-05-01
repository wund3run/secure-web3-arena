
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
    logoUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    color: "#627EEA"
  },
  {
    name: "Solana",
    logoUrl: "https://cryptologos.cc/logos/solana-sol-logo.png",
    color: "#9945FF"
  },
  {
    name: "Polygon",
    logoUrl: "https://cryptologos.cc/logos/polygon-matic-logo.png",
    color: "#8247E5"
  },
  {
    name: "Avalanche",
    logoUrl: "https://cryptologos.cc/logos/avalanche-avax-logo.png",
    color: "#E84142"
  },
  {
    name: "BNB Chain",
    logoUrl: "https://cryptologos.cc/logos/bnb-bnb-logo.png",
    color: "#F3BA2F"
  },
  {
    name: "Arbitrum",
    logoUrl: "https://cryptologos.cc/logos/arbitrum-arb-logo.png", 
    color: "#28A0F0"
  },
  {
    name: "Optimism",
    logoUrl: "https://cryptologos.cc/logos/optimism-ethereum-op-logo.png",
    color: "#FF0420"
  },
  {
    name: "Aptos",
    logoUrl: "https://cryptologos.cc/logos/aptos-apt-logo.png",
    color: "#277DA1"
  },
  {
    name: "Sui",
    logoUrl: "https://cryptologos.cc/logos/sui-sui-logo.png",
    color: "#6FBCF0"
  }
];

export function BlockchainEcosystems({ ecosystems = DEFAULT_ECOSYSTEMS }: BlockchainEcosystemsProps) {
  const handleEcosystemClick = (ecosystem: string) => {
    toast.info(`${ecosystem} security audits are available`, {
      description: "Contact us for specialized security solutions",
      action: {
        label: "Browse Services",
        onClick: () => {
          // This would update category in the parent component
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
              className="h-14 w-14 mb-2 flex items-center justify-center rounded-full bg-gradient-to-br from-white/80 to-white/20" 
              style={{ boxShadow: `0 0 10px ${ecosystem.color}40` }}
            >
              <img 
                src={ecosystem.logoUrl} 
                alt={`${ecosystem.name} logo`}
                className="h-8 w-8 object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/lovable-uploads/65e03f83-0c8d-4b03-949b-60b5e384317d.png";
                  target.onerror = null;
                }}
              />
            </div>
            <h4 className="font-medium text-xs text-center">{ecosystem.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
