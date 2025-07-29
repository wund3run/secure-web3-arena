
import { Shield, Lock, Server, Code, Database, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

export function ComprehensiveSecurity() {
  return (
    <div className="mt-10 mb-10">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">Comprehensive Web3 Security Services</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Protect your blockchain applications with our end-to-end security solutions across all layers of Web3 architecture
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border/50 rounded-lg p-6 hover-lift">
          <div className="flex items-center mb-3">
            <Code className="h-5 w-5 text-primary mr-2" />
            <h4 className="text-lg font-bold">Smart Contract Security</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            Comprehensive audits for Solidity, Rust, and Move smart contracts to prevent exploits and vulnerabilities
          </p>
          <ul className="text-xs text-muted-foreground space-y-1 mt-3">
            <li className="flex items-center">
              <Shield className="h-3 w-3 text-primary mr-1" />
              <span>Reentrancy protection</span>
            </li>
            <li className="flex items-center">
              <Shield className="h-3 w-3 text-primary mr-1" />
              <span>Access control validation</span>
            </li>
            <li className="flex items-center">
              <Shield className="h-3 w-3 text-primary mr-1" />
              <span>Logic optimization</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-card border border-border/50 rounded-lg p-6 hover-lift">
          <div className="flex items-center mb-3">
            <Server className="h-5 w-5 text-secondary mr-2" />
            <h4 className="text-lg font-bold">Infrastructure Security</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            Secure blockchain nodes, RPC endpoints, indexers, and Web3 infrastructure components
          </p>
          <ul className="text-xs text-muted-foreground space-y-1 mt-3">
            <li className="flex items-center">
              <Shield className="h-3 w-3 text-secondary mr-1" />
              <span>Node configuration hardening</span>
            </li>
            <li className="flex items-center">
              <Shield className="h-3 w-3 text-secondary mr-1" />
              <span>RPC endpoint protection</span>
            </li>
            <li className="flex items-center">
              <Shield className="h-3 w-3 text-secondary mr-1" />
              <span>DDoS mitigation strategies</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-card border border-border/50 rounded-lg p-6 hover-lift">
          <div className="flex items-center mb-3">
            <Lock className="h-5 w-5 text-web3-orange mr-2" />
            <h4 className="text-lg font-bold">Key Management</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            Secure wallet key storage, private key handling, and multi-signature implementation
          </p>
          <ul className="text-xs text-muted-foreground space-y-1 mt-3">
            <li className="flex items-center">
              <Shield className="h-3 w-3 text-web3-orange mr-1" />
              <span>Hardware security modules</span>
            </li>
            <li className="flex items-center">
              <Shield className="h-3 w-3 text-web3-orange mr-1" />
              <span>Multi-sig architecture</span>
            </li>
            <li className="flex items-center">
              <Shield className="h-3 w-3 text-web3-orange mr-1" />
              <span>Key rotation protocols</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-card border border-border/50 rounded-lg p-6 hover-lift">
          <div className="flex items-center mb-3">
            <Database className="h-5 w-5 text-primary mr-2" />
            <h4 className="text-lg font-bold">Oracle Security</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            Protection against price manipulation, data source verification, and oracle failure safeguards
          </p>
          <ul className="text-xs text-muted-foreground space-y-1 mt-3">
            <li className="flex items-center">
              <Shield className="h-3 w-3 text-primary mr-1" />
              <span>Price feed validation</span>
            </li>
            <li className="flex items-center">
              <Shield className="h-3 w-3 text-primary mr-1" />
              <span>Multiple data source integration</span>
            </li>
            <li className="flex items-center">
              <Shield className="h-3 w-3 text-primary mr-1" />
              <span>Heartbeat monitoring</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-card border border-border/50 rounded-lg p-6 hover-lift">
          <div className="flex items-center mb-3">
            <ExternalLink className="h-5 w-5 text-secondary mr-2" />
            <h4 className="text-lg font-bold">API Security</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            Secure connection between Web2 backends and Web3 contracts with proper authentication
          </p>
          <ul className="text-xs text-muted-foreground space-y-1 mt-3">
            <li className="flex items-center">
              <Shield className="h-3 w-3 text-secondary mr-1" />
              <span>Message signing verification</span>
            </li>
            <li className="flex items-center">
              <Shield className="h-3 w-3 text-secondary mr-1" />
              <span>Rate limiting implementation</span>
            </li>
            <li className="flex items-center">
              <Shield className="h-3 w-3 text-secondary mr-1" />
              <span>Authentication best practices</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-card border border-border/50 rounded-lg p-6 hover-lift">
          <div className="flex items-center mb-3">
            <Shield className="h-5 w-5 text-web3-orange mr-2" />
            <h4 className="text-lg font-bold">Front-end DApp Security</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            Protection for web interfaces, wallet connections, and user interaction with contracts
          </p>
          <ul className="text-xs text-muted-foreground space-y-1 mt-3">
            <li className="flex items-center">
              <Shield className="h-3 w-3 text-web3-orange mr-1" />
              <span>Wallet connection validation</span>
            </li>
            <li className="flex items-center">
              <Shield className="h-3 w-3 text-web3-orange mr-1" />
              <span>Transaction simulation</span>
            </li>
            <li className="flex items-center">
              <Shield className="h-3 w-3 text-web3-orange mr-1" />
              <span>User interface safeguards</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="text-center mt-8">
        <p className="text-sm text-muted-foreground mb-2">
          <Link to="/marketplace" className="text-primary hover:underline">Explore our full range of specialized security services</Link>
        </p>
      </div>
    </div>
  );
}
