
import { Shield, Lock, Server } from "lucide-react";

export function ComprehensiveServices() {
  return (
    <div className="mt-12 mb-10">
      <h3 className="text-xl font-bold mb-6">Comprehensive Web2 + Web3 Security Services</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border/50 rounded-lg p-6 hover-lift transition-all hover:border-primary/50">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <h4 className="text-xl font-bold mb-2">API Security</h4>
          <p className="text-muted-foreground">Secure the bridge between your Web2 backends and Web3 smart contracts with comprehensive API security testing.</p>
        </div>
        <div className="bg-card border border-border/50 rounded-lg p-6 hover-lift transition-all hover:border-primary/50">
          <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
            <Lock className="h-6 w-6 text-secondary" />
          </div>
          <h4 className="text-xl font-bold mb-2">Key Management</h4>
          <p className="text-muted-foreground">Secure implementation of wallet key management, seed phrase storage, and private key handling in your applications.</p>
        </div>
        <div className="bg-card border border-border/50 rounded-lg p-6 hover-lift transition-all hover:border-primary/50">
          <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
            <Server className="h-6 w-6 text-accent" />
          </div>
          <h4 className="text-xl font-bold mb-2">Infrastructure Security</h4>
          <p className="text-muted-foreground">Ensure your blockchain nodes, RPC endpoints, and indexers are secured against attacks and downtime.</p>
        </div>
      </div>
    </div>
  );
}
