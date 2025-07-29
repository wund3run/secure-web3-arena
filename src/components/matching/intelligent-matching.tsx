
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Star, Clock } from "lucide-react";

interface MatchCardProps {
  name: string;
  matchScore: number;
  expertise: string[];
  completedAudits: number;
  responseTime: string;
  reputation: number;
}

const MatchCard = ({ 
  name, 
  matchScore, 
  expertise, 
  completedAudits, 
  responseTime, 
  reputation 
}: MatchCardProps) => {
  return (
    <Card className="border border-border/30 hover:border-primary/50 transition-all">
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-bold text-lg">{name}</h3>
            <div className="flex items-center mt-1">
              <Star className="h-4 w-4 text-web3-orange fill-web3-orange mr-1" />
              <span className="text-sm">{reputation.toFixed(1)} reputation</span>
            </div>
          </div>
          <div className="bg-primary/10 rounded-full p-2 px-3 text-primary font-medium">
            {matchScore}% match
          </div>
        </div>
        
        <Progress value={matchScore} className="h-1.5 mb-4" />
        
        <div className="space-y-3 mb-4">
          <div className="flex flex-wrap gap-2">
            {expertise.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-1" />
              <span>{completedAudits} audits</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{responseTime} response</span>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button size="sm" className="w-full">Contact</Button>
          <Button size="sm" variant="outline" className="w-full">View Profile</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export function IntelligentMatching() {
  const [activeTab, setActiveTab] = useState("recommended");
  
  const recommendedMatches = [
    {
      name: "CryptoShield Security",
      matchScore: 97,
      expertise: ["Solidity", "DeFi", "Zero-Knowledge Proofs"],
      completedAudits: 124,
      responseTime: "2h avg",
      reputation: 4.9
    },
    {
      name: "BlockSafe Auditors",
      matchScore: 94,
      expertise: ["Smart Contracts", "NFT Security", "Upgradeable Contracts"],
      completedAudits: 87,
      responseTime: "4h avg",
      reputation: 4.7
    },
    {
      name: "SecureLabs",
      matchScore: 89,
      expertise: ["Formal Verification", "DeFi", "Cross-Chain"],
      completedAudits: 53,
      responseTime: "6h avg",
      reputation: 4.8
    }
  ];
  
  const specialistsMatches = [
    {
      name: "DeFi Guard",
      matchScore: 96,
      expertise: ["AMMs", "Lending Protocols", "Yield Farming"],
      completedAudits: 42,
      responseTime: "3h avg",
      reputation: 4.8
    },
    {
      name: "NFT Security Pro",
      matchScore: 92,
      expertise: ["NFT Standards", "Metadata Security", "Royalties"],
      completedAudits: 68,
      responseTime: "5h avg",
      reputation: 4.6
    },
    {
      name: "ZK Shields",
      matchScore: 87,
      expertise: ["ZK-Proofs", "Privacy Protocols", "ZK-Rollups"],
      completedAudits: 31,
      responseTime: "4h avg",
      reputation: 4.7
    }
  ];

  return (
    <div className="w-full space-y-6">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold">Find Your Perfect Security Match</h2>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Our intelligent matching system pairs your project with the most suitable security experts
        </p>
      </div>
      
      <Tabs defaultValue="recommended" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-center">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="specialists">Specialists</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="recommended" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedMatches.map((match, index) => (
              <MatchCard key={index} {...match} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="specialists" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialistsMatches.map((match, index) => (
              <MatchCard key={index} {...match} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
