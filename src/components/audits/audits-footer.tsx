
import { ArrowRight, FileText, ShieldCheck, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { BetaWarning } from "@/components/ui/beta-warning";

export function AuditsFooter() {
  return (
    <div className="mt-12 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-8 text-center">
      <div className="max-w-3xl mx-auto">
        <div className="inline-flex items-center justify-center mb-4">
          <div className="p-3 bg-primary/20 rounded-full">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-1 flex items-center justify-center gap-2">
          Secure Your Web3 Project Today
          <Badge variant="outline" className="text-xs bg-amber-50 border-amber-300 text-amber-700">
            BETA
          </Badge>
        </h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Don't leave your smart contract security to chance. Our expert auditors will identify vulnerabilities
          before they can be exploited in production.
        </p>
        
        <div className="mb-6">
          <BetaWarning
            title="Beta Service Notice"
            size="default"
            showIcon={true}
            variant="subtle"
          >
            <p>
              Our audit service is currently in beta. While we strive for accuracy and thoroughness in all security assessments, 
              we recommend complementary security measures for critical applications.
            </p>
          </BetaWarning>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
            <FileText className="mr-2 h-5 w-5" />
            Request an Audit
          </Button>
          <Link to="/leaderboard">
            <Button size="lg" variant="outline" className="group border-secondary">
              Find Top Security Experts
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
