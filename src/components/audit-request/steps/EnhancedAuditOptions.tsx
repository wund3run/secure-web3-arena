
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, Shield, Users, Clock, Layers, Star, FileCode } from "lucide-react";
import { AuditFormData, AuditFormErrors } from "@/types/audit-request.types";

interface EnhancedAuditOptionsProps {
  formData: AuditFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleCheckboxChange: (name: keyof AuditFormData, checked: boolean) => void;
  handleSelectChange: (name: keyof AuditFormData, value: string) => void;
  formErrors: AuditFormErrors;
}

export default function EnhancedAuditOptions({
  formData,
  handleChange,
  handleCheckboxChange,
  handleSelectChange,
  formErrors
}: EnhancedAuditOptionsProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            Enhanced Audit Options
            <Badge variant="outline" className="ml-2 bg-primary/10 text-primary border-primary/20">
              New
            </Badge>
          </CardTitle>
          <CardDescription>
            Select specialized audit methods to better meet your project's security needs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Collaborative Audit Option */}
          <div className="flex items-start space-x-3 bg-card border border-border/40 rounded-lg p-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium">Collaborative Audit</h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>Multiple auditors work together on your audit, bringing diverse expertise and perspectives.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="collaborativeAudit" 
                    checked={formData.collaborativeAudit || false} 
                    onCheckedChange={(checked) => handleCheckboxChange("collaborativeAudit", checked === true)}
                  />
                  <Label htmlFor="collaborativeAudit">Enable</Label>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Enables multiple auditors to collaborate, ensuring comprehensive coverage through diverse expertise.
              </p>
            </div>
          </div>

          {/* Continuous Auditing Option */}
          <div className="flex items-start space-x-3 bg-card border border-border/40 rounded-lg p-4">
            <div className="bg-web3-teal/10 p-2 rounded-full">
              <Clock className="h-5 w-5 text-web3-teal" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium">Continuous Auditing</h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>Ongoing security monitoring with regular assessments as your project evolves.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="continuousAuditing" 
                    checked={formData.continuousAuditing || false} 
                    onCheckedChange={(checked) => handleCheckboxChange("continuousAuditing", checked === true)}
                  />
                  <Label htmlFor="continuousAuditing">Enable</Label>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Provides ongoing security monitoring with real-time vulnerability detection, ideal for dynamic projects.
              </p>
            </div>
          </div>

          {/* Hybrid Model Option */}
          <div className="flex items-start space-x-3 bg-card border border-border/40 rounded-lg p-4">
            <div className="bg-web3-orange/10 p-2 rounded-full">
              <Layers className="h-5 w-5 text-web3-orange" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium">Hybrid Audit Model</h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>Combines competitive and traditional audit methodologies for comprehensive coverage.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="hybridModel" 
                    checked={formData.hybridModel || false} 
                    onCheckedChange={(checked) => handleCheckboxChange("hybridModel", checked === true)}
                  />
                  <Label htmlFor="hybridModel">Enable</Label>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Combines competitive and traditional audit approaches to maximize finding high-impact vulnerabilities.
              </p>
            </div>
          </div>

          {/* Specialized Audit Type */}
          <div className="flex items-start space-x-3 bg-card border border-border/40 rounded-lg p-4">
            <div className="bg-web3-purple/10 p-2 rounded-full">
              <FileCode className="h-5 w-5 text-web3-purple" />
            </div>
            <div className="flex-1">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium">Specialized Audit Type</h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>Select a specialized audit focused on your specific technology stack.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Select
                  value={formData.specializedAuditType || "Standard"}
                  onValueChange={(value) => handleSelectChange("specializedAuditType", value)}
                >
                  <SelectTrigger id="specializedAuditType">
                    <SelectValue placeholder="Select specialized audit type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Standard">Standard Audit</SelectItem>
                    <SelectItem value="zk-proofs">Zero-Knowledge Proofs</SelectItem>
                    <SelectItem value="layer2">Layer 2 Solutions</SelectItem>
                    <SelectItem value="ai-driven">AI-Driven Smart Contracts</SelectItem>
                    <SelectItem value="cross-chain">Cross-Chain Applications</SelectItem>
                    <SelectItem value="defi">DeFi Protocol</SelectItem>
                    <SelectItem value="nft">NFT Projects</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Tailors audit methodologies to your specific technology or use case for focused security review.
              </p>
            </div>
          </div>

          {/* Accountability Preference */}
          <div className="flex items-start space-x-3 bg-card border border-border/40 rounded-lg p-4">
            <div className="bg-secondary/10 p-2 rounded-full">
              <Star className="h-5 w-5 text-secondary" />
            </div>
            <div className="flex-1">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium">Accountability Model</h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>Choose how auditors are held accountable for their audit quality.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Select
                  value={formData.accountabilityPreference || "standard"}
                  onValueChange={(value) => handleSelectChange("accountabilityPreference", value)}
                >
                  <SelectTrigger id="accountabilityPreference">
                    <SelectValue placeholder="Select accountability model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard Rating</SelectItem>
                    <SelectItem value="mutual">Mutual Rating System</SelectItem>
                    <SelectItem value="staking">Stake-Based Accountability</SelectItem>
                    <SelectItem value="reputation">Reputation-Weighted</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Defines how auditors are evaluated and held accountable for the quality of their work.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
