
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function AuditFilters() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-3">Audit Filters</h3>
        <Button variant="outline" size="sm" className="w-full">Reset Filters</Button>
      </div>
      
      <Accordion type="multiple" defaultValue={["status", "severity", "type"]}>
        <AccordionItem value="status">
          <AccordionTrigger>Status</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="status-completed" />
                <Label htmlFor="status-completed">Completed</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="status-in-progress" />
                <Label htmlFor="status-in-progress">In Progress</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="status-requested" />
                <Label htmlFor="status-requested">Requested</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="severity">
          <AccordionTrigger>Risk Severity</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="severity-critical" />
                <Label htmlFor="severity-critical">Critical</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="severity-high" />
                <Label htmlFor="severity-high">High</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="severity-medium" />
                <Label htmlFor="severity-medium">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="severity-low" />
                <Label htmlFor="severity-low">Low</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="severity-none" />
                <Label htmlFor="severity-none">None</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="type">
          <AccordionTrigger>Project Type</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="type-defi" />
                <Label htmlFor="type-defi">DeFi Protocol</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="type-nft" />
                <Label htmlFor="type-nft">NFT Protocol</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="type-dao" />
                <Label htmlFor="type-dao">DAO</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="type-bridge" />
                <Label htmlFor="type-bridge">Cross-Chain Bridge</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="type-wallet" />
                <Label htmlFor="type-wallet">Wallet</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="type-other" />
                <Label htmlFor="type-other">Other</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="date">
          <AccordionTrigger>Date Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="date-last-week" />
                <Label htmlFor="date-last-week">Last Week</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="date-last-month" />
                <Label htmlFor="date-last-month">Last Month</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="date-last-quarter" />
                <Label htmlFor="date-last-quarter">Last Quarter</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="date-last-year" />
                <Label htmlFor="date-last-year">Last Year</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="auditor">
          <AccordionTrigger>Auditor Verification</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="auditor-verified" />
                <Label htmlFor="auditor-verified">Verified Auditors</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="auditor-unverified" />
                <Label htmlFor="auditor-unverified">All Auditors</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <Button className="w-full">Apply Filters</Button>
    </div>
  );
}
