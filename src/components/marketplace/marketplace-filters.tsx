
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export function MarketplaceFilters() {
  return (
    <div className="glass-card p-6 rounded-xl space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Price Range</h3>
        <div className="flex gap-2 items-center">
          <Input type="number" placeholder="Min" className="w-24" />
          <span className="text-muted-foreground">to</span>
          <Input type="number" placeholder="Max" className="w-24" />
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Provider Level</h3>
        <div className="space-y-2">
          {["Expert", "Verified", "Rookie"].map((level) => (
            <div key={level} className="flex items-center space-x-2">
              <Checkbox id={level} />
              <Label htmlFor={level}>{level}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Service Type</h3>
        <div className="space-y-2">
          {[
            "Smart Contract Audit",
            "DApp Security",
            "Protocol Review",
            "NFT Security",
            "DeFi Security"
          ].map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox id={type} />
              <Label htmlFor={type}>{type}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Features</h3>
        <div className="space-y-2">
          {[
            "24/7 Support",
            "Fast Turnaround",
            "Multiple Revisions",
            "Live Consultation"
          ].map((feature) => (
            <div key={feature} className="flex items-center space-x-2">
              <Checkbox id={feature} />
              <Label htmlFor={feature}>{feature}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
