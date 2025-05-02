
import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Brain, Zap, ArrowRight, Star } from "lucide-react";
import { toast } from "sonner";

interface AIMatchingJourneyProps {
  formData: {
    projectName: string;
    blockchain: string;
    customBlockchain?: string;
    projectDescription: string;
    contractCount: string;
    linesOfCode: string;
    auditScope: string;
    deadline: string;
    budget: string;
    previousAudits: boolean;
    specificConcerns: string;
  };
  onProceed: () => void;
}

export const AIMatchingJourney: React.FC<AIMatchingJourneyProps> = ({ formData, onProceed }) => {
  const [stage, setStage] = useState<number>(1);
  const [analyzing, setAnalyzing] = useState<boolean>(true);
  const [matchResults, setMatchResults] = useState<any[]>([]);
  const [projectRisk, setProjectRisk] = useState<string>("medium");
  const [projectScope, setProjectScope] = useState<string>("standard");
  const [selectedMatch, setSelectedMatch] = useState<number | null>(null);
  
  // Determine blockchain
  const blockchainName = formData.blockchain === "Other" && formData.customBlockchain
    ? formData.customBlockchain
    : formData.blockchain;

  // Simulate AI analysis process
  useEffect(() => {
    if (stage === 1) {
      const timer = setTimeout(() => {
        setAnalyzing(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
    
    if (stage === 2) {
      // Determine project complexity based on contract count and lines of code
      const contractCount = parseInt(formData.contractCount || "0");
      const linesOfCode = parseInt(formData.linesOfCode || "0");
      
      if (contractCount > 10 || linesOfCode > 5000) {
        setProjectRisk("high");
      } else if (contractCount > 5 || linesOfCode > 2000) {
        setProjectRisk("medium");
      } else {
        setProjectRisk("low");
      }
      
      // Determine project scope based on deadline and budget
      if (formData.deadline === "urgent" || formData.budget === "100k+") {
        setProjectScope("comprehensive");
      } else if (formData.deadline === "flexible" && formData.budget === "<5k") {
        setProjectScope("basic");
      } else {
        setProjectScope("standard");
      }
      
      // Generate mock audit matches based on project attributes
      const mockMatches = [
        {
          id: 1,
          name: "Elite Security Team",
          rating: 4.9,
          matchScore: 98,
          completedAudits: 124,
          specializations: ["DeFi", blockchainName, "Smart Contracts"],
          responseTime: "< 24 hours"
        },
        {
          id: 2,
          name: "Blockchain Defense Group",
          rating: 4.8,
          matchScore: 92,
          completedAudits: 87,
          specializations: ["NFT Security", blockchainName, "Game Security"],
          responseTime: "1-2 days"
        },
        {
          id: 3,
          name: "CryptoShield Auditors",
          rating: 4.7,
          matchScore: 88,
          completedAudits: 156,
          specializations: ["Cross-chain", "Bridge Security", "Smart Contracts"],
          responseTime: "2-3 days"
        }
      ];
      
      // Simulate loading of results
      const timer = setTimeout(() => {
        setMatchResults(mockMatches);
        setAnalyzing(false);
      }, 2500);
      
      return () => clearTimeout(timer);
    }
  }, [stage, formData.contractCount, formData.linesOfCode, formData.deadline, formData.budget, blockchainName]);

  // Proceed to next stage of the journey
  const nextStage = () => {
    setStage(stage + 1);
    setAnalyzing(true);
  };

  // Select a match and proceed
  const selectMatch = (id: number) => {
    setSelectedMatch(id);
    toast.success("Auditor match selected successfully!");
    setTimeout(() => {
      onProceed();
    }, 1000);
  };

  // Render the risk badge with appropriate color
  const renderRiskBadge = (risk: string) => {
    switch (risk) {
      case "high":
        return <Badge variant="destructive">High Risk</Badge>;
      case "medium":
        return <Badge variant="warning">Medium Risk</Badge>;
      case "low":
        return <Badge variant="success">Low Risk</Badge>;
      default:
        return <Badge>Unknown Risk</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold flex items-center justify-center gap-2">
          <Brain className="h-6 w-6 text-primary" />
          AI Matching System
        </h2>
        <p className="text-muted-foreground mt-1">
          Finding the perfect security experts for your project
        </p>
      </div>
      
      {/* Stage progress indicator */}
      <div className="flex justify-between mb-8">
        <div className="w-full max-w-3xl mx-auto flex items-center">
          {[1, 2, 3].map((step) => (
            <React.Fragment key={step}>
              <div className="relative flex items-center justify-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center 
                  ${step === stage ? 'bg-primary text-white' : 
                    step < stage ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                  {step}
                </div>
                <div className="absolute -bottom-6 whitespace-nowrap text-xs font-medium">
                  {step === 1 ? 'Analyzing Project' : 
                   step === 2 ? 'Finding Matches' : 'Review Options'}
                </div>
              </div>
              {step < 3 && (
                <div className={`h-1 flex-1 mx-2 
                  ${step < stage ? 'bg-primary' : 'bg-muted'}`}>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      <div className="mt-12">
        {/* Stage 1: Project Analysis */}
        {stage === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="relative mb-8">
              <div className="w-24 h-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Brain className="h-12 w-12 text-primary" />
              </div>
              {analyzing && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full border-4 border-t-primary border-primary/20 animate-spin"></div>
                </div>
              )}
            </div>
            
            <h3 className="text-xl font-medium mb-4">
              {analyzing ? "Analyzing Your Project..." : "Analysis Complete"}
            </h3>
            
            {analyzing ? (
              <div className="space-y-4 max-w-md mx-auto">
                <div className="h-8 bg-muted rounded animate-pulse"></div>
                <div className="h-8 bg-muted rounded animate-pulse w-3/4 mx-auto"></div>
                <div className="h-8 bg-muted rounded animate-pulse w-1/2 mx-auto"></div>
              </div>
            ) : (
              <>
                <div className="bg-card border border-border/40 rounded-lg p-4 mb-6 max-w-md mx-auto">
                  <div className="grid grid-cols-2 gap-4 text-left">
                    <div>
                      <p className="text-sm text-muted-foreground">Project Name</p>
                      <p className="font-medium">{formData.projectName || "Unnamed Project"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Blockchain</p>
                      <p className="font-medium">{blockchainName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Contract Count</p>
                      <p className="font-medium">{formData.contractCount || "Not specified"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Lines of Code</p>
                      <p className="font-medium">{formData.linesOfCode || "Not specified"}</p>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={nextStage}
                  className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                >
                  Find Optimal Security Matches 
                  <Sparkles className="ml-2 h-4 w-4" />
                </Button>
              </>
            )}
          </motion.div>
        )}
        
        {/* Stage 2: Match Finding */}
        {stage === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-center mb-8">
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto rounded-full bg-secondary/10 flex items-center justify-center">
                  <Zap className="h-10 w-10 text-secondary" />
                </div>
                {analyzing && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-28 h-28 rounded-full border-4 border-t-secondary border-secondary/20 animate-spin"></div>
                  </div>
                )}
              </div>
              
              <h3 className="text-xl font-medium mb-2">
                {analyzing ? "Finding Your Optimal Matches..." : "Matches Found!"}
              </h3>
              
              {!analyzing && (
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div>
                    <Badge className="bg-primary">{projectScope} scope</Badge>
                  </div>
                  <div>
                    {renderRiskBadge(projectRisk)}
                  </div>
                </div>
              )}
            </div>
            
            {analyzing ? (
              <div className="space-y-4">
                <div className="h-24 bg-muted rounded animate-pulse"></div>
                <div className="h-24 bg-muted rounded animate-pulse"></div>
                <div className="h-24 bg-muted rounded animate-pulse"></div>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {matchResults.map((match) => (
                    <motion.div
                      key={match.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: match.id * 0.2 }}
                    >
                      <Card className={`border transition-all hover:shadow-md 
                        ${match.matchScore > 95 ? 'border-primary/50 bg-primary/5' : 'border-border'}`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center">
                                <h4 className="font-semibold">
                                  {match.name}
                                </h4>
                                {match.matchScore > 95 && (
                                  <Badge variant="outline" className="ml-2 bg-primary/10 border-primary/30">
                                    Top Match
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center mt-1 text-sm text-muted-foreground">
                                <Star className="h-3.5 w-3.5 fill-yellow-400 stroke-yellow-400 mr-1" />
                                <span>{match.rating} • {match.completedAudits} audits completed</span>
                              </div>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {match.specializations.map((spec: string, i: number) => (
                                  <Badge key={i} variant="outline" className="bg-muted/50">
                                    {spec}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="text-right flex flex-col items-end">
                              <div className="text-xl font-bold text-primary">
                                {match.matchScore}%
                                <span className="text-xs text-muted-foreground ml-1">match</span>
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                Response time: {match.responseTime}
                              </div>
                              <Button 
                                size="sm" 
                                onClick={() => selectMatch(match.id)}
                                className={`mt-2 ${match.matchScore > 95 ? 
                                  'bg-gradient-to-r from-primary to-secondary hover:opacity-90' : 
                                  'bg-primary hover:bg-primary/90'}`}
                              >
                                Select Match <ArrowRight className="ml-1 h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                <div className="text-center mt-6">
                  <Button variant="outline" onClick={onProceed}>
                    Continue Without Selection
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AIMatchingJourney;
