
import { Shield, Star } from "lucide-react";

export function MarketplaceHeader() {
  return (
    <div className="text-center mb-10">
      <div className="inline-flex items-center justify-center bg-primary/10 px-4 py-2 rounded-full text-primary mb-4">
        <Shield className="h-5 w-5 mr-2" />
        <span className="font-medium">Top-rated Security Services</span>
      </div>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4">
        Security Services Marketplace
      </h2>
      <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
        Connect with verified security experts who can help protect your Web3 projects
      </p>
      <div className="flex items-center justify-center mt-4 text-sm text-muted-foreground">
        <Star className="h-4 w-4 fill-web3-orange text-web3-orange mr-1" />
        <span>Showing top-rated services from our marketplace</span>
      </div>
    </div>
  );
}
