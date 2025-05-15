
import { Calendar, MessageCircle, Users, Trophy, Star, Shield, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { HawklyLogo } from "@/components/layout/hawkly-logo";

export function CommunityHeader() {
  return (
    <div className="bg-gradient-to-r from-primary/5 to-secondary/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-4">
          <HawklyLogo variant="large" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gradient">
          Security Community Hub
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Connect with security researchers, auditors, and developers. Learn, collaborate, 
          and build a safer Web3 ecosystem together.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <Link to="/register">
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
              Join the Community
            </Button>
          </Link>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 max-w-4xl mx-auto">
          <div className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-card transition-colors">
            <div className="bg-primary/10 rounded-full p-3">
              <MessageCircle className="h-5 w-5 text-primary" />
            </div>
            <span className="text-sm font-medium">Forums</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-card transition-colors">
            <div className="bg-web3-orange/10 rounded-full p-3">
              <Calendar className="h-5 w-5 text-web3-orange" />
            </div>
            <span className="text-sm font-medium">Events</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-card transition-colors">
            <div className="bg-secondary/10 rounded-full p-3">
              <Trophy className="h-5 w-5 text-secondary" />
            </div>
            <span className="text-sm font-medium">Challenges</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-card transition-colors">
            <div className="bg-green-600/10 rounded-full p-3">
              <Users className="h-5 w-5 text-green-600" />
            </div>
            <span className="text-sm font-medium">Groups</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-card transition-colors">
            <div className="bg-purple-600/10 rounded-full p-3">
              <Shield className="h-5 w-5 text-purple-600" />
            </div>
            <span className="text-sm font-medium">Audits</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-card transition-colors">
            <div className="bg-blue-600/10 rounded-full p-3">
              <Flag className="h-5 w-5 text-blue-600" />
            </div>
            <span className="text-sm font-medium">Bounties</span>
          </div>
        </div>
      </div>
    </div>
  );
}
