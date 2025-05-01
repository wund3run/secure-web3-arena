
import { ArrowRight, FileText, ShieldCheck } from "lucide-react";
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
        
        {/* Added blockchain ecosystem badges */}
        <div className="mb-6 flex flex-wrap justify-center gap-2">
          <span className="px-3 py-1 bg-[#627EEA]/10 text-[#627EEA] rounded-full text-xs font-medium">Ethereum</span>
          <span className="px-3 py-1 bg-[#9945FF]/10 text-[#9945FF] rounded-full text-xs font-medium">Solana</span>
          <span className="px-3 py-1 bg-[#8247E5]/10 text-[#8247E5] rounded-full text-xs font-medium">Polygon</span>
          <span className="px-3 py-1 bg-[#E84142]/10 text-[#E84142] rounded-full text-xs font-medium">Avalanche</span>
          <span className="px-3 py-1 bg-[#F3BA2F]/10 text-[#F3BA2F] rounded-full text-xs font-medium">BNB Chain</span>
          <span className="px-3 py-1 bg-[#28A0F0]/10 text-[#28A0F0] rounded-full text-xs font-medium">Arbitrum</span>
          <span className="px-3 py-1 bg-[#FF0420]/10 text-[#FF0420] rounded-full text-xs font-medium">Optimism</span>
          <span className="px-3 py-1 bg-[#277DA1]/10 text-[#277DA1] rounded-full text-xs font-medium">Aptos</span>
          <span className="px-3 py-1 bg-[#6FBCF0]/10 text-[#6FBCF0] rounded-full text-xs font-medium">Sui</span>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all">
            <FileText className="mr-2 h-5 w-5" />
            Request an Audit
          </Button>
          <Link to="/leaderboard">
            <Button size="lg" variant="outline" className="group border-secondary transition-all">
              Find Security Experts
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
