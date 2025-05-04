
import { Shield, Award, ArrowRight, Star, Users, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { HawklyLogo } from "@/components/layout/hawkly-logo";

export function LeaderboardHeader() {
  return (
    <div className="bg-gradient-to-r from-primary/5 to-secondary/5 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <HawklyLogo variant="large" />
          </div>
          <div className="inline-flex items-center justify-center bg-[#8A73E2]/10 px-4 py-2 rounded-full text-[#8A73E2] mb-4">
            <Award className="h-5 w-5 mr-2" />
            <span className="font-medium">Security Excellence</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-gradient">
            Security Expert Leaderboard
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover top-rated security auditors in our ecosystem. Experts are ranked based on audit quality, 
            vulnerability discoveries, and community contributions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* For Project Owners */}
          <div className="glass-card p-6 rounded-lg hover:shadow-lg transition-shadow border border-border/40 bg-card/80">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full mr-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Find Elite Auditors</h3>
            </div>
            <p className="mb-4 text-muted-foreground">
              Connect with top-ranked security experts who have proven track records in securing Web3 projects.
              Our leaderboard helps you identify the best talent for your audit needs.
            </p>
            <div className="mt-6">
              <Link to="/marketplace">
                <Button className="group">
                  Find Security Experts
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
          
          {/* For Security Experts */}
          <div className="glass-card p-6 rounded-lg hover:shadow-lg transition-shadow border border-border/40 bg-card/80">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-secondary/10 rounded-full mr-4">
                <Trophy className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-bold">Climb The Ranks</h3>
            </div>
            <p className="mb-4 text-muted-foreground">
              Showcase your security expertise, earn rewards, and build your reputation.
              Each successful audit and vulnerability found increases your rank and visibility.
            </p>
            <div className="mt-6">
              <Link to="/audits">
                <Button variant="outline" className="group border-secondary text-secondary hover:bg-secondary/10">
                  Start Auditing
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mt-8 text-sm text-muted-foreground bg-muted/20 rounded-lg p-3">
          <Star className="h-4 w-4 fill-web3-orange text-web3-orange mr-2" />
          <span>Updated hourly with real-time audit performance and security contributions</span>
        </div>
      </div>
    </div>
  );
}
