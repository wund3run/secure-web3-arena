
import { ArrowRight, MessageSquare, ShieldCheck, Users, Shield, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BetaWarning } from "@/components/ui/beta-warning";

export function CommunityHeader() {
  return (
    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-14 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-primary/10 px-4 py-2 rounded-full text-primary mb-4">
            <Users className="h-5 w-5 mr-2" />
            <span className="font-medium">Connect & Collaborate</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Web3 Security Community
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Join a community of blockchain security experts and project owners. Share insights, 
            participate in discussions, and build your reputation in the Web3 security space.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
          <Link to="/join">
            <Button className="w-full md:w-auto bg-gradient-to-r from-primary to-secondary hover:opacity-90 group">
              <Shield className="mr-2 h-5 w-5" />
              Join the Circle
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link to="/request-audit">
            <Button variant="outline" className="w-full md:w-auto border-primary text-primary hover:bg-primary/10">
              <FileText className="mr-2 h-5 w-5" />
              Request for Audit
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <BetaWarning 
            variant="subtle" 
            showIcon={true} 
            title="Community Features in Development" 
            size="sm"
          >
            <p className="text-sm">
              Our community features are still being developed. We're working to create a rich environment for collaboration.
            </p>
          </BetaWarning>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {/* For Project Owners */}
          <div className="glass-card p-8 rounded-xl hover:shadow-lg transition-all border border-border/40 bg-card/80 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full mr-4">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">For Project Owners</h3>
            </div>
            <ul className="mb-6 space-y-3">
              <li className="flex items-start">
                <div className="rounded-full bg-green-500/10 p-1 mr-2 mt-1">
                  <div className="rounded-full bg-green-500 w-2 h-2"></div>
                </div>
                <span>Connect with security experts in the blockchain space</span>
              </li>
              <li className="flex items-start">
                <div className="rounded-full bg-green-500/10 p-1 mr-2 mt-1">
                  <div className="rounded-full bg-green-500 w-2 h-2"></div>
                </div>
                <span>Get community feedback on security challenges</span>
              </li>
              <li className="flex items-start">
                <div className="rounded-full bg-green-500/10 p-1 mr-2 mt-1">
                  <div className="rounded-full bg-green-500 w-2 h-2"></div>
                </div>
                <span>Stay updated on the latest security best practices</span>
              </li>
            </ul>
            <div className="mt-6">
              <Link to="/marketplace">
                <Button className="group">
                  Find Security Partners
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
          
          {/* For Security Experts */}
          <div className="glass-card p-8 rounded-xl hover:shadow-lg transition-all border border-border/40 bg-card/80 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center mb-4">
              <div className="p-3 bg-secondary/10 rounded-full mr-4">
                <MessageSquare className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold">For Security Experts</h3>
            </div>
            <ul className="mb-6 space-y-3">
              <li className="flex items-start">
                <div className="rounded-full bg-secondary/10 p-1 mr-2 mt-1">
                  <div className="rounded-full bg-secondary w-2 h-2"></div>
                </div>
                <span>Showcase your expertise and build your reputation</span>
              </li>
              <li className="flex items-start">
                <div className="rounded-full bg-secondary/10 p-1 mr-2 mt-1">
                  <div className="rounded-full bg-secondary w-2 h-2"></div>
                </div>
                <span>Collaborate with other security professionals</span>
              </li>
              <li className="flex items-start">
                <div className="rounded-full bg-secondary/10 p-1 mr-2 mt-1">
                  <div className="rounded-full bg-secondary w-2 h-2"></div>
                </div>
                <span>Access exclusive security resources and challenges</span>
              </li>
            </ul>
            <div className="mt-6">
              <Link to="/join">
                <Button variant="outline" className="group border-secondary text-secondary hover:bg-secondary/10">
                  Join the Circle
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3 justify-center mt-8">
          <div className="flex items-center bg-muted/50 rounded-full px-4 py-1.5">
            <span className="text-muted-foreground">Join our growing community</span>
          </div>
        </div>
      </div>
    </div>
  );
}
