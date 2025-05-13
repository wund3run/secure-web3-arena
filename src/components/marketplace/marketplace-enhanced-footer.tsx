
import { ArrowRight, Shield, Star, Users, MessageSquare, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function MarketplaceEnhancedFooter() {
  return (
    <div className="bg-card border-t border-border/20 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Unified Stats Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            The Leading Web3 Security Marketplace
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-primary/5 to-primary/20 p-6 rounded-xl shadow-sm hover-lift transition-all duration-300 text-center">
              <div className="text-3xl md:text-4xl font-extrabold text-primary mb-2">
                500+
              </div>
              <div className="text-muted-foreground font-medium">Security Experts</div>
            </div>
            <div className="bg-gradient-to-br from-secondary/5 to-secondary/20 p-6 rounded-xl shadow-sm hover-lift transition-all duration-300 text-center">
              <div className="text-3xl md:text-4xl font-extrabold text-secondary mb-2">
                $350M+
              </div>
              <div className="text-muted-foreground font-medium">Assets Protected</div>
            </div>
            <div className="bg-gradient-to-br from-web3-orange/5 to-web3-orange/20 p-6 rounded-xl shadow-sm hover-lift transition-all duration-300 text-center">
              <div className="text-3xl md:text-4xl font-extrabold text-web3-orange mb-2">
                2,500+
              </div>
              <div className="text-muted-foreground font-medium">Projects Secured</div>
            </div>
            <div className="bg-gradient-to-br from-web3-teal/5 to-web3-teal/20 p-6 rounded-xl shadow-sm hover-lift transition-all duration-300 text-center">
              <div className="text-3xl md:text-4xl font-extrabold text-web3-teal mb-2">
                12,800+
              </div>
              <div className="text-muted-foreground font-medium">Vulnerabilities Found</div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <Card className="mb-16 overflow-hidden">
          <div className="bg-gradient-to-r from-primary via-secondary to-web3-orange h-1"></div>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <h2 className="text-3xl font-bold mb-4">Ready to secure your Web3 project?</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Connect with top security professionals who understand blockchain technology and can protect your assets.
                </p>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <BadgeCheck className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Comprehensive smart contract audits with in-depth analysis</span>
                  </li>
                  <li className="flex items-start">
                    <BadgeCheck className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Vulnerability identification before deployment</span>
                  </li>
                  <li className="flex items-start">
                    <BadgeCheck className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Expert remediation guidance</span>
                  </li>
                </ul>
                
                <Link to="/request-audit">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 group">
                    Start Your Security Assessment
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
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
                  <Link to="/service-provider-onboarding" className="text-secondary text-sm flex items-center mt-3 group">
                    Join as auditor
                    <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Resources and Testimonials (visually differentiated) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gradient-to-br from-background to-primary/5 p-6 rounded-lg border border-border/30">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <Shield className="h-5 w-5 text-primary mr-2" />
              Security Resources
            </h3>
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
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-background to-secondary/5 p-6 rounded-lg border border-border/30">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <MessageSquare className="h-5 w-5 text-secondary mr-2" />
              Join Our Community
            </h3>
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
          
          <div className="bg-gradient-to-br from-background to-web3-orange/5 p-6 rounded-lg border border-border/30">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <Shield className="h-5 w-5 text-web3-orange mr-2" />
              Need Help?
            </h3>
            <p className="text-muted-foreground mb-4">
              Our security experts are ready to assist you with any questions about audits or security services.
            </p>
            <Link to="/contact">
              <Button className="w-full bg-gradient-to-r from-web3-orange/70 to-web3-orange hover:opacity-90 group">
                Contact Support
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
        
        <Separator className="mb-8" />
        
        {/* Testimonials - Visually enhanced */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold">Trusted by Leading Web3 Projects</h2>
            <p className="text-muted-foreground mt-2">See what our clients say about our security services</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "James Wilson",
                role: "CTO at DeFi Protocol",
                image: "https://randomuser.me/api/portraits/men/22.jpg",
                quote: "The audit process was thorough and professional. The team identified several critical vulnerabilities that could have resulted in significant losses if exploited.",
                color: "primary"
              },
              {
                name: "Elena Rodriguez",
                role: "Lead Developer at NFT Platform",
                image: "https://randomuser.me/api/portraits/women/23.jpg",
                quote: "Hawkly's security experts provided clear explanations of vulnerabilities and helped us implement effective fixes. Their guidance has been invaluable.",
                color: "secondary"
              },
              {
                name: "Michael Chang",
                role: "Founder at Web3 Startup",
                image: "https://randomuser.me/api/portraits/men/24.jpg",
                quote: "We appreciate the thoroughness and professionalism of the security audit. The detailed report helped us strengthen our smart contract implementation significantly.",
                color: "web3-orange"
              }
            ].map((testimonial, i) => (
              <div key={i} className={`bg-gradient-to-br from-card to-${testimonial.color}/5 border border-border/40 rounded-lg p-6 hover:shadow-md transition-all`}>
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-muted mr-4 overflow-hidden">
                    <img 
                      src={testimonial.image} 
                      alt={`${testimonial.name} profile`} 
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://via.placeholder.com/150";
                      }}
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">
                  "{testimonial.quote}"
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
