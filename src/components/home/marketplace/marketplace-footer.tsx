
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function MarketplaceFooter() {
  return (
    <div className="mt-8 text-center">
      <Link to="/marketplace">
        <Button size="lg" variant="default" className="flex items-center mx-auto">
          Explore Full Marketplace
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}
