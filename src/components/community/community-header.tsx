
import { ArrowRight, MessageSquare, ShieldCheck, Users, Shield, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BetaWarning } from "@/components/ui/beta-warning";

export function CommunityHeader() {
  return (
    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Bold, clear headline */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center bg-primary/10 px-5 py-2 rounded-full text-primary mb-6">
            <Users className="h-6 w-6 mr-2" />
            <span className="font-bold text-lg">Connect & Collaborate</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Web3 Security Community
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Join a community of blockchain security experts and project owners
          </p>
        </div>

        {/* Single, prominent CTA button - focused on community joining */}
        <div className="flex justify-center mb-12">
          <Link to="/auth">
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 group text-lg py-6 px-8 shadow-lg">
              <Users className="mr-2 h-6 w-6" />
              Join the Security Circle
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Beta notice with proper separation */}
        <div className="mb-12">
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
        
        {/* Clear user paths with visual distinction */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* For Project Owners */}
          <div className="glass-card p-8 rounded-xl shadow-lg transition-all border border-border/40 bg-card/80 hover:shadow-xl">
            <div className="flex items-center mb-6">
              <div className="p-4 bg-primary/10 rounded-full mr-4">
                <ShieldCheck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">For Project Owners</h3>
            </div>
            
            <ul className="mb-8 space-y-4">
              <li className="flex items-start">
                <div className="rounded-full bg-green-500/10 p-2 mr-3 mt-1">
                  <div className="rounded-full bg-green-500 w-2 h-2"></div>
                </div>
                <span className="text-lg">Connect with security experts in the blockchain space</span>
              </li>
              <li className="flex items-start">
                <div className="rounded-full bg-green-500/10 p-2 mr-3 mt-1">
                  <div className="rounded-full bg-green-500 w-2 h-2"></div>
                </div>
                <span className="text-lg">Get community feedback on security challenges</span>
              </li>
              <li className="flex items-start">
                <div className="rounded-full bg-green-500/10 p-2 mr-3 mt-1">
                  <div className="rounded-full bg-green-500 w-2 h-2"></div>
                </div>
                <span className="text-lg">Stay updated on the latest security best practices</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <Link to="/marketplace">
                <Button size="lg" className="group w-full py-5">
                  Find Security Experts
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
          
          {/* For Security Experts */}
          <div className="glass-card p-8 rounded-xl shadow-lg transition-all border border-border/40 bg-card/80 hover:shadow-xl">
            <div className="flex items-center mb-6">
              <div className="p-4 bg-secondary/10 rounded-full mr-4">
                <MessageSquare className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold">For Security Experts</h3>
            </div>
            
            <ul className="mb-8 space-y-4">
              <li className="flex items-start">
                <div className="rounded-full bg-secondary/10 p-2 mr-3 mt-1">
                  <div className="rounded-full bg-secondary w-2 h-2"></div>
                </div>
                <span className="text-lg">Showcase your expertise and build your reputation</span>
              </li>
              <li className="flex items-start">
                <div className="rounded-full bg-secondary/10 p-2 mr-3 mt-1">
                  <div className="rounded-full bg-secondary w-2 h-2"></div>
                </div>
                <span className="text-lg">Collaborate with other security professionals</span>
              </li>
              <li className="flex items-start">
                <div className="rounded-full bg-secondary/10 p-2 mr-3 mt-1">
                  <div className="rounded-full bg-secondary w-2 h-2"></div>
                </div>
                <span className="text-lg">Access exclusive security resources and challenges</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <Link to="/audits">
                <Button size="lg" variant="outline" className="group w-full border-secondary text-secondary hover:bg-secondary/10 py-5">
                  View Public Audit Reports
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
