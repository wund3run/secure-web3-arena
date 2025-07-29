
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Bug, Award, Clock, Bell, Check } from "lucide-react";

type Achievement = {
  id: string;
  name: string;
  description: string;
  criteria: string[];
  icon: React.ElementType;
  color: string;
  bgColor: string;
  borderColor: string;
  category: "audit" | "security" | "community" | "response";
  rarity: "common" | "uncommon" | "rare" | "legendary";
};

export function AchievementsList() {
  // Comprehensive list of achievements
  const achievements: Achievement[] = [
    {
      id: "smart-contract-pro",
      name: "Smart Contract Pro",
      description: "Recognized expertise in smart contract security auditing",
      criteria: [
        "Complete 50+ smart contract audits",
        "Maintain a 4.7+ rating on completed audits",
        "Find at least 10 critical vulnerabilities"
      ],
      icon: Shield,
      color: "text-indigo-500",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
      category: "audit",
      rarity: "uncommon"
    },
    {
      id: "bug-hunter",
      name: "Bug Hunter",
      description: "Elite vulnerability detection skills",
      criteria: [
        "Find 100+ critical vulnerabilities",
        "Successfully demonstrate exploits in test environments",
        "Provide comprehensive remediation recommendations"
      ],
      icon: Bug,
      color: "text-cyan-500",
      bgColor: "bg-cyan-50",
      borderColor: "border-cyan-200",
      category: "security",
      rarity: "rare"
    },
    {
      id: "first-response",
      name: "First Response",
      description: "Exceptional responsiveness to security incidents",
      criteria: [
        "Be first to respond to critical security incidents",
        "Provide initial assessment within 1 hour of incident report",
        "Successfully mitigate 10+ security incidents"
      ],
      icon: Bell,
      color: "text-rose-500",
      bgColor: "bg-rose-50",
      borderColor: "border-rose-200",
      category: "response",
      rarity: "uncommon"
    },
    {
      id: "protocol-expert",
      name: "Protocol Expert",
      description: "Deep understanding of blockchain protocol security",
      criteria: [
        "Complete audits across 5+ different protocols",
        "Author technical papers on protocol security",
        "Receive endorsements from protocol developers"
      ],
      icon: Shield,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      category: "audit",
      rarity: "rare"
    },
    {
      id: "fast-responder",
      name: "Fast Responder",
      description: "Consistently quick to address security concerns",
      criteria: [
        "Average response time under 2 hours",
        "Complete preliminary assessments within 24 hours",
        "Maintain responsiveness rating of 4.8+"
      ],
      icon: Clock,
      color: "text-amber-500",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      category: "response",
      rarity: "common"
    },
    {
      id: "community-helper",
      name: "Community Helper",
      description: "Valuable contributor to the security community",
      criteria: [
        "Answer 50+ questions in community forums",
        "Host or participate in 5+ security webinars",
        "Contribute to open source security tools"
      ],
      icon: Award,
      color: "text-emerald-500",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      category: "community",
      rarity: "common"
    },
    {
      id: "nft-specialist",
      name: "NFT Specialist",
      description: "Expert in NFT-related smart contract security",
      criteria: [
        "Complete 20+ NFT project audits",
        "Identify NFT-specific vulnerabilities",
        "Develop security standards for NFT projects"
      ],
      icon: Shield,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      category: "audit",
      rarity: "uncommon"
    },
    {
      id: "rising-star",
      name: "Rising Star",
      description: "Promising new security professional",
      criteria: [
        "Complete first 10 successful audits",
        "Maintain perfect 5.0 rating on first 5 projects",
        "Find at least one critical vulnerability"
      ],
      icon: Award,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      category: "audit",
      rarity: "common"
    },
    {
      id: "vulnerability-master",
      name: "Vulnerability Master",
      description: "Advanced expertise in finding complex vulnerabilities",
      criteria: [
        "Find vulnerabilities across 10+ security categories",
        "Successfully identify novel attack vectors",
        "Document vulnerability patterns for community reference"
      ],
      icon: Bug,
      color: "text-red-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      category: "security",
      rarity: "legendary"
    },
    {
      id: "dapp-specialist",
      name: "DApp Specialist",
      description: "Specialized expertise in decentralized application security",
      criteria: [
        "Complete 30+ DApp security audits",
        "Create security guidelines for DApp development",
        "Identify DApp-specific vulnerabilities"
      ],
      icon: Shield,
      color: "text-teal-500",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200",
      category: "audit",
      rarity: "uncommon"
    },
    {
      id: "security-evangelist",
      name: "Security Evangelist",
      description: "Promotes security best practices in the community",
      criteria: [
        "Publish 20+ educational articles on security",
        "Present at 5+ security conferences",
        "Create tutorials with 10,000+ views"
      ],
      icon: Award,
      color: "text-pink-500",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
      category: "community",
      rarity: "rare"
    },
    {
      id: "defi-guardian",
      name: "DeFi Guardian",
      description: "Expert in DeFi protocol security",
      criteria: [
        "Complete 30+ DeFi protocol audits",
        "Prevent $1M+ in potential DeFi exploits",
        "Build DeFi security tools or frameworks"
      ],
      icon: Shield,
      color: "text-green-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      category: "audit",
      rarity: "legendary"
    }
  ];

  // Group achievements by category
  const categories = {
    audit: { title: "Audit Expertise", achievements: achievements.filter(a => a.category === "audit") },
    security: { title: "Security Excellence", achievements: achievements.filter(a => a.category === "security") },
    response: { title: "Response Time", achievements: achievements.filter(a => a.category === "response") },
    community: { title: "Community Contribution", achievements: achievements.filter(a => a.category === "community") }
  };

  const rarityBadge = (rarity: Achievement["rarity"]) => {
    const rarityStyles = {
      common: "bg-slate-100 text-slate-700 border-slate-200",
      uncommon: "bg-blue-100 text-blue-700 border-blue-200",
      rare: "bg-purple-100 text-purple-700 border-purple-200",
      legendary: "bg-amber-100 text-amber-700 border-amber-200",
    };

    return (
      <Badge variant="outline" className={`${rarityStyles[rarity]} ml-2`}>
        {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-12">
      {Object.entries(categories).map(([key, category]) => (
        <div key={key} className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            {category.title}
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              {category.achievements.length} badges
            </Badge>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.achievements.map((achievement) => (
              <Card key={achievement.id} className="border overflow-hidden hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-0">
                  <div className={`p-6 ${achievement.bgColor} border-b ${achievement.borderColor}`}>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 bg-white rounded-lg ${achievement.borderColor} border`}>
                        <achievement.icon className={`h-6 w-6 ${achievement.color}`} />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-bold text-lg">{achievement.name}</h3>
                          {rarityBadge(achievement.rarity)}
                        </div>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-sm font-semibold mb-2">Criteria to Earn</h4>
                    <ul className="text-sm space-y-1">
                      {achievement.criteria.map((criterion, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{criterion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
