
import { ArrowRight, Shield, Check, FileText, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function MarketplaceFooter() {
  return (
    <div className="mt-12">
      <div className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-4">
            <Shield className="h-10 w-10 text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-3">Ready to secure your blockchain project?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Protect your smart contracts, DApps, and Web3 infrastructure with our verified security experts. 
            Get detailed vulnerability assessments and comprehensive remediation guidance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/marketplace">
              <Button size="lg" variant="default" className="flex items-center bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                Find Web3 Security Experts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="flex items-center border-primary text-primary hover:bg-primary/10">
                Request Custom Audit
                <FileText className="ml-2 h-4 w-4" />
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
      
      {/* Testimonials for social proof */}
      <div className="mt-12 mb-6">
        <h3 className="text-xl font-bold text-center mb-6">Trusted by Leading Web3 Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card/60 p-6 rounded-lg border border-border/30">
            <div className="flex items-start">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                <span className="font-bold text-primary">D</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground italic mb-3">
                  "Hawkly's security experts found critical vulnerabilities in our DeFi protocol that could have resulted in significant fund loss."
                </p>
                <div>
                  <p className="font-medium text-sm">DeFi Protocol Founder</p>
                  <p className="text-xs text-muted-foreground">DEX with $120M+ TVL</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-card/60 p-6 rounded-lg border border-border/30">
            <div className="flex items-start">
              <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center mr-3 mt-0.5">
                <span className="font-bold text-secondary">N</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground italic mb-3">
                  "The smart contract audit delivered by Hawkly's experts was comprehensive, detailed, and identified issues other auditors missed."
                </p>
                <div>
                  <p className="font-medium text-sm">NFT Marketplace CTO</p>
                  <p className="text-xs text-muted-foreground">50K+ Monthly Users</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-card/60 p-6 rounded-lg border border-border/30">
            <div className="flex items-start">
              <div className="h-8 w-8 rounded-full bg-web3-orange/10 flex items-center justify-center mr-3 mt-0.5">
                <span className="font-bold text-web3-orange">G</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground italic mb-3">
                  "Working with Hawkly's security experts gave us confidence in our code and helped us build trust with our community."
                </p>
                <div>
                  <p className="font-medium text-sm">GameFi Project Lead</p>
                  <p className="text-xs text-muted-foreground">Play-to-Earn Platform</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick links section for better user experience and SEO */}
      <div className="mt-12 border-t border-border/30 pt-8">
        <h4 className="text-lg font-semibold mb-4 text-center">Popular Security Services</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
          <Link to="/marketplace" className="flex items-center p-3 bg-muted/40 rounded-lg hover:bg-muted/60 transition-colors">
            <Check className="h-4 w-4 text-primary mr-2" />
            <span>Smart Contract Audits</span>
          </Link>
          <Link to="/marketplace" className="flex items-center p-3 bg-muted/40 rounded-lg hover:bg-muted/60 transition-colors">
            <Check className="h-4 w-4 text-primary mr-2" />
            <span>DeFi Security Reviews</span>
          </Link>
          <Link to="/marketplace" className="flex items-center p-3 bg-muted/40 rounded-lg hover:bg-muted/60 transition-colors">
            <Check className="h-4 w-4 text-primary mr-2" />
            <span>NFT Contract Security</span>
          </Link>
          <Link to="/contact" className="flex items-center p-3 bg-muted/40 rounded-lg hover:bg-muted/60 transition-colors">
            <Check className="h-4 w-4 text-primary mr-2" />
            <span>Contact Us</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
