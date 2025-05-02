import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroSection() {
  
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 z-0" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Empowering Web3 Security
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Connect with top-tier security providers, streamline your audit process, and secure your blockchain projects.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            
            
            <Link to="/service-provider-onboarding">
              <Button variant="outline" className="bg-white hover:bg-white/80">
                <Shield className="mr-2 h-4 w-4" />
                Join as Security Provider
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      
    </div>
  );
}
