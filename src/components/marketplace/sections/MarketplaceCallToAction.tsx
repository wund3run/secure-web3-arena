
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function MarketplaceCallToAction() {
  return (
    <div className="mt-12 p-6 bg-card border border-border/40 rounded-xl bg-gradient-to-br from-card to-card/80">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-bold mb-2">Need a Custom Security Solution?</h3>
          <p className="text-muted-foreground">Post your requirements and get matched with the perfect security expert for your project.</p>
        </div>
        <Link to="/requests">
          <Button size="lg" variant="default" className="flex items-center whitespace-nowrap group">
            Post Security Request
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
