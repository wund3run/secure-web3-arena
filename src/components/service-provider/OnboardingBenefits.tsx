
import React from "react";
import {
  Shield,
  Briefcase,
  Users,
  Award,
  Star,
  Zap,
  TrendingUp,
  BadgeCheck,
  Globe
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function OnboardingBenefits() {
  const benefits = [
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Premier Projects",
      description: "Access to high-quality projects from leading Web3 protocols and DeFi platforms"
    },
    {
      icon: <Briefcase className="h-8 w-8 text-primary" />,
      title: "Consistent Work",
      description: "Steady stream of security assessments matched to your expertise"
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Elite Network",
      description: "Join a community of the world's top security researchers and auditors"
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: "Reputation Building",
      description: "Build your profile with verified findings and client ratings"
    },
    {
      icon: <Star className="h-8 w-8 text-primary" />,
      title: "Escrow Protection",
      description: "Secure payment system with milestone-based releases"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      title: "Growth Opportunities",
      description: "Increase your visibility in the rapidly expanding Web3 security market"
    }
  ];

  const stats = [
    { value: "$24M+", label: "Funds Protected" },
    { value: "560+", label: "Critical Vulns Found" },
    { value: "90+", label: "Active Clients" },
    { value: "$165K", label: "Avg. Monthly Earnings" }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-xl border border-border/40 p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <BadgeCheck className="mr-2 h-5 w-5 text-primary" />
          Why Join Hawkly?
        </h2>
        <div className="space-y-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start">
              <div className="mr-4 mt-1">{benefit.icon}</div>
              <div>
                <h3 className="font-medium">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Card className="overflow-hidden border-primary/20">
        <CardContent className="p-0">
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6">
            <div className="flex items-center mb-3">
              <Zap className="h-5 w-5 text-primary mr-2" />
              <h3 className="font-semibold">Hawkly by the Numbers</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-3 bg-white/80 backdrop-blur-sm rounded-lg">
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-4 flex items-center justify-center bg-white">
            <Globe className="h-5 w-5 text-muted-foreground mr-2" />
            <span className="text-sm text-muted-foreground">Global coverage with auditors in 32+ countries</span>
          </div>
        </CardContent>
      </Card>

      <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-xl border border-border/40 p-6">
        <h2 className="text-xl font-semibold mb-4">Approval Process</h2>
        <ol className="space-y-3 list-decimal pl-5">
          <li className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Submit your application</span> with your expertise and credentials
          </li>
          <li className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Verification review</span> by the Hawkly security council
          </li>
          <li className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Skills assessment</span> to validate your security expertise
          </li>
          <li className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Profile activation</span> and introduction to the marketplace
          </li>
        </ol>
        <div className="mt-4 text-xs text-muted-foreground italic">
          Average approval time: 3-5 business days
        </div>
      </div>
    </div>
  );
}
