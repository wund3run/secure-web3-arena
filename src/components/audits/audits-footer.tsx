
import { ArrowRight, FileText, ShieldCheck, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
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
        <h2 className="text-2xl font-bold mb-1">
          Secure Your Web3 Project Today
        </h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Connect with expert auditors who will identify vulnerabilities before they can be exploited.
        </p>
        
        <div className="mb-6">
          <BetaWarning
            title="Beta Service Notice"
            size="default"
            showIcon={true}
            variant="subtle"
          >
            <p>
              Our audit service is currently in beta. We recommend complementary security measures for critical applications.
            </p>
          </BetaWarning>
        </div>
        
        {/* Blockchain ecosystem badges */}
        <div className="mb-6 flex flex-wrap justify-center gap-2">
          {["Ethereum", "Solana", "Polygon", "Avalanche", "BNB Chain", "Arbitrum", "Optimism", "Aptos", "Sui"].map((chain, index) => (
            <span 
              key={chain} 
              className={`px-3 py-1 rounded-full text-xs font-medium`}
              style={{ 
                backgroundColor: [
                  "#627EEA", "#9945FF", "#8247E5", "#E84142", "#F3BA2F", 
                  "#28A0F0", "#FF0420", "#277DA1", "#6FBCF0"
                ][index] + "20",
                color: [
                  "#627EEA", "#9945FF", "#8247E5", "#E84142", "#F3BA2F", 
                  "#28A0F0", "#FF0420", "#277DA1", "#6FBCF0"
                ][index] 
              }}
            >
              {chain}
            </span>
          ))}
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/contact">
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all">
              <FileText className="mr-2 h-5 w-5" />
              Request an Audit
            </Button>
          </Link>
          <Link to="/leaderboard">
            <Button size="lg" variant="outline" className="group border-secondary transition-all">
              Find Security Experts
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Contact Email */}
        <div className="mt-6 flex items-center justify-center text-sm text-muted-foreground">
          <Mail className="h-4 w-4 mr-2" />
          <span>Contact us: <a href="mailto:join@hawkly.com" className="hover:text-primary">join@hawkly.com</a></span>
        </div>
      </div>
    </div>
  );
}
