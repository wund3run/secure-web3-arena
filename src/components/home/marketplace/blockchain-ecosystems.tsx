
import { BLOCKCHAIN_ECOSYSTEMS } from "@/data/marketplace-data";

export function BlockchainEcosystems() {
  return (
    <div className="mt-8 mb-8 text-center">
      <h3 className="text-xl font-bold mb-4">Blockchain Ecosystems Supported</h3>
      <div className="flex flex-wrap justify-center gap-4">
        {BLOCKCHAIN_ECOSYSTEMS.map((ecosystem) => (
          <div 
            key={ecosystem.name} 
            className="bg-card hover:bg-card/80 border border-border/50 rounded-lg p-2 flex items-center justify-center hover-lift transition-all duration-300 w-20 h-20"
            title={`${ecosystem.name} Security Audits`}
          >
            <img 
              src={ecosystem.logoUrl} 
              alt={`${ecosystem.name} logo`}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
