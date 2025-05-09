
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

export function MarketplaceFooter() {
  return (
    <div className="mt-16 py-10 px-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">
        Ready to Join the Hawkly Security Circle?
      </h2>
      <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
        Whether you're an independent security researcher or part of an established auditing firm,
        we invite you to join our growing network of security professionals.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link to="/service-provider-onboarding">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-[#9b87f5] to-[#33C3F0] hover:opacity-90 flex items-center gap-2"
          >
            <Shield className="h-5 w-5" />
            Join as a Security Provider
          </Button>
        </Link>
        <Link to="/marketplace">
          <Button size="lg" variant="outline">
            Explore the Marketplace
          </Button>
        </Link>
      </div>
    </div>
  );
}
