
import { Shield } from "lucide-react";

export function MarketplaceHeader() {
  return (
    <div className="text-center mb-6">
      <div className="inline-flex items-center justify-center mb-2">
        <Shield className="h-6 w-6 text-primary mr-2" />
        <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
          Security Services
        </h2>
      </div>
      <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
        Browse top security services from verified providers
      </p>
    </div>
  );
}
