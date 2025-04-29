
export function ComprehensiveSecurity() {
  return (
    <div className="mt-8 mb-8">
      <h3 className="text-xl font-bold text-center mb-4">Comprehensive Security Services</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card border border-border/50 rounded-lg p-4 hover-lift">
          <h4 className="text-lg font-bold mb-1">API Security</h4>
          <p className="text-sm text-muted-foreground">Secure connection between Web2 backends and Web3 contracts</p>
        </div>
        <div className="bg-card border border-border/50 rounded-lg p-4 hover-lift">
          <h4 className="text-lg font-bold mb-1">Key Management</h4>
          <p className="text-sm text-muted-foreground">Secure wallet key storage and private key handling</p>
        </div>
        <div className="bg-card border border-border/50 rounded-lg p-4 hover-lift">
          <h4 className="text-lg font-bold mb-1">Infrastructure</h4>
          <p className="text-sm text-muted-foreground">Secure blockchain nodes, RPC endpoints, and indexers</p>
        </div>
      </div>
    </div>
  );
}
