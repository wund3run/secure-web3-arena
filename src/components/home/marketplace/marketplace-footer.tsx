
import { ArrowRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function MarketplaceFooter() {
  return (
    <div className="mt-12 text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-8">
      <div className="max-w-xl mx-auto">
        <div className="flex justify-center mb-4">
          <Shield className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Ready to secure your Web3 project?</h3>
        <p className="text-muted-foreground mb-6">
          Explore our full marketplace with hundreds of security services from verified experts
        </p>
        <Link to="/marketplace">
          <Button size="lg" variant="default" className="flex items-center mx-auto bg-gradient-to-r from-primary to-secondary hover:opacity-90">
            Explore Full Marketplace
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
