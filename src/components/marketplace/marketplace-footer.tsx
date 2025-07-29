
import { ArrowRight, FileSearch, Check, Mail, Shield, Award, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function MarketplaceFooter() {
  return (
    <div className="mt-12">
      {/* Primary CTA Section */}
      <div className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-4">
            <Shield className="h-10 w-10 text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Ready to secure your blockchain project?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Protect your smart contracts, DApps, and Web3 infrastructure with our verified security experts. 
            Get detailed vulnerability assessments and comprehensive remediation guidance.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/request-audit">
              <Button size="lg" variant="default" className="flex items-center bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                <FileSearch className="mr-2 h-5 w-5" />
                Get a Security Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/service-provider-onboarding">
              <Button size="lg" variant="outline" className="flex items-center border-primary text-primary hover:bg-primary/10">
                <Award className="mr-2 h-5 w-5" />
                Join as a Security Expert
              </Button>
            </Link>
          </div>
          
          {/* Unified Platform Statistics */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="flex flex-col items-center p-3 bg-background/60 rounded-lg">
              <span className="text-2xl font-bold text-primary">500+</span>
              <span className="text-sm text-muted-foreground">Security Experts</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-background/60 rounded-lg">
              <span className="text-2xl font-bold text-secondary">$350M+</span>
              <span className="text-sm text-muted-foreground">Assets Protected</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-background/60 rounded-lg">
              <span className="text-2xl font-bold text-web3-orange">2,500+</span>
              <span className="text-sm text-muted-foreground">Projects Secured</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-background/60 rounded-lg">
              <span className="text-2xl font-bold text-web3-teal">12,800+</span>
              <span className="text-sm text-muted-foreground">Vulnerabilities Found</span>
            </div>
          </div>
          
          {/* Contact Email */}
          <div className="mt-6 flex items-center justify-center text-sm text-muted-foreground">
            <Mail className="h-4 w-4 mr-2" />
            <span>Questions? Contact us: <a href="mailto:join@hawkly.com" className="hover:text-primary underline">join@hawkly.com</a></span>
          </div>
        </div>
      </div>
      
      {/* Testimonials for social proof */}
      <div className="mt-12 mb-6">
        <h3 className="text-2xl font-bold text-center mb-6">Trusted by Leading Web3 Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card/60 p-6 rounded-lg border border-border/30">
            <div className="flex items-start">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                <span className="font-bold text-primary">DH</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground italic mb-3">
                  "Hawkly's security experts found critical vulnerabilities in our DeFi protocol that could have resulted in significant fund loss."
                </p>
                <div>
                  <p className="font-medium text-sm">Daniel Hernandez</p>
                  <p className="text-xs text-muted-foreground">Lead Developer at DeFiChain</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-card/60 p-6 rounded-lg border border-border/30">
            <div className="flex items-start">
              <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center mr-3 mt-0.5">
                <span className="font-bold text-secondary">NP</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground italic mb-3">
                  "The smart contract audit delivered by Hawkly's experts was comprehensive, detailed, and identified issues other auditors missed."
                </p>
                <div>
                  <p className="font-medium text-sm">Natalie Patel</p>
                  <p className="text-xs text-muted-foreground">CTO at MetaCollect NFT Marketplace</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-card/60 p-6 rounded-lg border border-border/30">
            <div className="flex items-start">
              <div className="h-8 w-8 rounded-full bg-web3-orange/10 flex items-center justify-center mr-3 mt-0.5">
                <span className="font-bold text-web3-orange">GS</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground italic mb-3">
                  "Working with Hawkly's security experts gave us confidence in our code and helped us build trust with our community."
                </p>
                <div>
                  <p className="font-medium text-sm">Gabriel Santos</p>
                  <p className="text-xs text-muted-foreground">Project Lead at BlockQuest Gaming</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Consolidated Service Links - More Visually Distinguished */}
      <div className="mt-12 border-t border-border/30 pt-8">
        <h4 className="text-xl font-semibold text-center mb-4">Popular Security Services</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
          <Link to="/marketplace" className="flex items-center p-3 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors">
            <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
            <span>Smart Contract Audits</span>
          </Link>
          <Link to="/marketplace" className="flex items-center p-3 bg-secondary/5 rounded-lg hover:bg-secondary/10 transition-colors">
            <Check className="h-4 w-4 text-secondary mr-2 flex-shrink-0" />
            <span>DeFi Security Reviews</span>
          </Link>
          <Link to="/service-provider-onboarding" className="flex items-center p-3 bg-web3-teal/5 rounded-lg hover:bg-web3-teal/10 transition-colors">
            <Shield className="h-4 w-4 text-web3-teal mr-2 flex-shrink-0" />
            <span>Apply as an Auditor</span>
          </Link>
          <Link to="/request-audit" className="flex items-center p-3 bg-web3-orange/5 rounded-lg hover:bg-web3-orange/10 transition-colors">
            <FileSearch className="h-4 w-4 text-web3-orange mr-2 flex-shrink-0" />
            <span>Security Assessment</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
