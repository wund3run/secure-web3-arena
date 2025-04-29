
import { ArrowRight, Shield, Star, Users, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

export function MarketplaceEnhancedFooter() {
  return (
    <div className="bg-card border-t border-border/20 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2 className="text-3xl font-bold mb-4">Ready to secure your Web3 project?</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Connect with top security professionals who understand the complexities of blockchain technology and can help protect your assets.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 group">
                  Post Security Request
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Link to="/auditors">
                  <Button variant="outline" size="lg" className="group">
                    Browse Auditors
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:grid grid-cols-2 gap-4">
              <div className="bg-background rounded-lg p-5 border border-border/40 hover:border-primary/30 transition-colors">
                <div className="mb-3 p-2 bg-primary/10 rounded-lg w-fit">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">For Project Owners</h3>
                <p className="text-sm text-muted-foreground">
                  Get your smart contracts, DApps, and protocols audited by security experts.
                </p>
                <Link to="/marketplace" className="text-primary text-sm flex items-center mt-3 group">
                  Learn more
                  <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
              <div className="bg-background rounded-lg p-5 border border-border/40 hover:border-secondary/30 transition-colors">
                <div className="mb-3 p-2 bg-secondary/10 rounded-lg w-fit">
                  <Star className="h-5 w-5 text-secondary" />
                </div>
                <h3 className="text-lg font-medium mb-2">For Security Experts</h3>
                <p className="text-sm text-muted-foreground">
                  Offer your security services, find clients, and build your reputation.
                </p>
                <Link to="/auditors/register" className="text-secondary text-sm flex items-center mt-3 group">
                  Join as auditor
                  <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Resources Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          <div>
            <h3 className="text-lg font-bold mb-4">Security Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/blog/security-best-practices" className="text-muted-foreground hover:text-primary flex items-center">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Web3 Security Best Practices
                </Link>
              </li>
              <li>
                <Link to="/blog/audit-checklist" className="text-muted-foreground hover:text-primary flex items-center">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Smart Contract Audit Checklist
                </Link>
              </li>
              <li>
                <Link to="/vulnerabilities" className="text-muted-foreground hover:text-primary flex items-center">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Common Vulnerabilities Database
                </Link>
              </li>
              <li>
                <Link to="/blog/security-tools" className="text-muted-foreground hover:text-primary flex items-center">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Security Tools for Developers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Join Our Community</h3>
            <p className="text-muted-foreground mb-4">
              Connect with security professionals, developers, and project owners in our vibrant community.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm" className="group">
                <MessageSquare className="mr-2 h-4 w-4" />
                Discord
                <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="sm" className="group">
                <Users className="mr-2 h-4 w-4" />
                Forum
                <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Need Help?</h3>
            <p className="text-muted-foreground mb-4">
              Our security experts are ready to assist you with any questions about audits or security services.
            </p>
            <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 group">
              Contact Support
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
        
        <Separator className="mb-8" />
        
        {/* Testimonials */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold">Trusted by Leading Web3 Projects</h2>
            <p className="text-muted-foreground mt-2">See what our clients say about our security services</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card border border-border/40 rounded-lg p-6 hover:border-primary/30 transition-colors">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-muted mr-4 overflow-hidden">
                    <img 
                      src={`https://randomuser.me/api/portraits/men/${20 + i}.jpg`} 
                      alt="User profile" 
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://placeholder.svg";
                      }}
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">John Doe {i}</h4>
                    <p className="text-xs text-muted-foreground">CTO at Web3 Project {i}</p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">
                  "The audit process was thorough and professional. The team identified several critical vulnerabilities that could have resulted in significant losses if exploited."
                </p>
                <div className="flex items-center mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 text-web3-orange fill-web3-orange" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <div className="inline-flex items-center text-sm text-muted-foreground">
            <Shield className="h-4 w-4 mr-2" />
            <span>Security is our top priority. All audits follow industry best practices and standards.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
