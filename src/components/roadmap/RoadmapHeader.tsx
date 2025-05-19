
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileCode, Shield, Users } from "lucide-react";

export function RoadmapHeader() {
  return (
    <div className="text-center mb-12">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
        Hawkly Product Roadmap
      </h1>
      <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
        Our mission to secure the Web3 ecosystem continues to evolve. 
        Explore our planned features and milestones, and help shape our future 
        through community feedback and participation.
      </p>
      
      <div className="flex flex-wrap justify-center gap-6 mt-8">
        <div className="flex flex-col items-center max-w-[200px]">
          <div className="bg-primary/10 p-4 rounded-full mb-3">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-medium">Enhanced Security</h3>
          <p className="text-sm text-muted-foreground text-center">
            Blockchain-based transparency and advanced protection
          </p>
        </div>
        
        <div className="flex flex-col items-center max-w-[200px]">
          <div className="bg-primary/10 p-4 rounded-full mb-3">
            <FileCode className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-medium">Innovative Tools</h3>
          <p className="text-sm text-muted-foreground text-center">
            AI-assisted auditing and automated vulnerability scanning
          </p>
        </div>
        
        <div className="flex flex-col items-center max-w-[200px]">
          <div className="bg-primary/10 p-4 rounded-full mb-3">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-medium">Community Governance</h3>
          <p className="text-sm text-muted-foreground text-center">
            DAO-based decision making and decentralized dispute resolution
          </p>
        </div>
      </div>
      
      <div className="mt-10">
        <Button asChild>
          <Link to="/request-audit">
            Request Security Audit
          </Link>
        </Button>
      </div>
    </div>
  );
}
