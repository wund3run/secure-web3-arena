
import React from 'react';
import { Button } from "@/components/ui/button";
import { AuditFormData } from "@/types/audit-request.types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  Users, 
  Clock, 
  Layers, 
  FileCode, 
  Star, 
  CheckSquare 
} from "lucide-react";

interface ReviewStepProps {
  formData: AuditFormData;
  prevStep: () => void;
  isSubmitting: boolean;
}

export default function ReviewStep({ 
  formData, 
  prevStep,
  isSubmitting 
}: ReviewStepProps) {
  // Helper function to format the blockchain text
  const formatBlockchain = () => {
    if (formData.blockchain === "Other" && formData.customBlockchain) {
      return formData.customBlockchain;
    }
    return formData.blockchain;
  };

  // Get specialized audit type display name
  const getSpecializedAuditName = () => {
    const specializedTypes: Record<string, string> = {
      'zk-proofs': 'Zero-Knowledge Proofs',
      'layer2': 'Layer 2 Solutions',
      'ai-driven': 'AI-Driven Smart Contracts',
      'cross-chain': 'Cross-Chain Applications',
      'defi': 'DeFi Protocol',
      'nft': 'NFT Projects'
    };
    
    return formData.specializedAuditType ? 
      specializedTypes[formData.specializedAuditType] || formData.specializedAuditType : 
      'Standard Audit';
  };

  // Get accountability preference display name
  const getAccountabilityName = () => {
    const accountabilityTypes: Record<string, string> = {
      'standard': 'Standard Rating',
      'mutual': 'Mutual Rating System',
      'staking': 'Stake-Based Accountability',
      'reputation': 'Reputation-Weighted'
    };
    
    return accountabilityTypes[formData.accountabilityPreference || 'standard'] || 'Standard Rating';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Review Your Request</h2>
        <p className="text-muted-foreground">Please review your audit request details before submitting.</p>
      </div>
      
      <div className="space-y-6">
        {/* Project Information */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">{formData.projectName}</h3>
              <Badge className="bg-primary">{formatBlockchain()}</Badge>
            </div>
            <p className="text-muted-foreground mb-4 whitespace-pre-wrap">{formData.projectDescription}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium block">Repository URL:</span>
                <span className="text-muted-foreground">{formData.repositoryUrl || "Not provided"}</span>
              </div>
              <div>
                <span className="font-medium block">Contract Count:</span>
                <span className="text-muted-foreground">{formData.contractCount}</span>
              </div>
              <div>
                <span className="font-medium block">Lines of Code:</span>
                <span className="text-muted-foreground">{formData.linesOfCode}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Contact Information */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-bold mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium block">Contact Name:</span>
                <span className="text-muted-foreground">{formData.contactName}</span>
              </div>
              <div>
                <span className="font-medium block">Contact Email:</span>
                <span className="text-muted-foreground">{formData.contactEmail}</span>
              </div>
              <div>
                <span className="font-medium block">Preferred Communication:</span>
                <span className="text-muted-foreground">{formData.preferredCommunication || "Not specified"}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Audit Requirements */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-bold mb-4">Audit Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <span className="font-medium block">Timeline:</span>
                <span className="text-muted-foreground">{formData.deadline}</span>
              </div>
              <div>
                <span className="font-medium block">Budget:</span>
                <span className="text-muted-foreground">{formData.budget}</span>
              </div>
            </div>
            
            <div className="mt-4">
              <span className="font-medium block">Audit Scope:</span>
              <p className="text-muted-foreground mt-1 whitespace-pre-wrap">{formData.auditScope}</p>
            </div>
            
            <div className="mt-4">
              <span className="font-medium block">Specific Concerns:</span>
              <p className="text-muted-foreground mt-1 whitespace-pre-wrap">{formData.specificConcerns}</p>
            </div>
            
            <div className="mt-4">
              <span className="font-medium">Prior Audits:</span>
              <span className="text-muted-foreground ml-1">
                {formData.previousAudits ? "Yes" : "No"}
              </span>
              {formData.previousAudits && formData.previousAuditLinks && (
                <div className="mt-1">
                  <span className="font-medium block">Previous Audit Links:</span>
                  <span className="text-muted-foreground">{formData.previousAuditLinks}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Audit Options */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-bold mb-4 flex items-center">
              Enhanced Audit Features
              <Badge variant="outline" className="ml-2 bg-primary/10 text-primary border-primary/20">
                New
              </Badge>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="font-medium">Collaborative Audit:</span>
                <span className="text-muted-foreground">
                  {formData.collaborativeAudit ? "Enabled" : "Disabled"}
                </span>
                {formData.collaborativeAudit && <CheckCircle2 className="h-4 w-4 text-green-500" />}
              </div>
              
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-web3-teal" />
                <span className="font-medium">Continuous Auditing:</span>
                <span className="text-muted-foreground">
                  {formData.continuousAuditing ? "Enabled" : "Disabled"}
                </span>
                {formData.continuousAuditing && <CheckCircle2 className="h-4 w-4 text-green-500" />}
              </div>
              
              <div className="flex items-center space-x-2">
                <Layers className="h-4 w-4 text-web3-orange" />
                <span className="font-medium">Hybrid Model:</span>
                <span className="text-muted-foreground">
                  {formData.hybridModel ? "Enabled" : "Disabled"}
                </span>
                {formData.hybridModel && <CheckCircle2 className="h-4 w-4 text-green-500" />}
              </div>
            </div>
            
            <div className="space-y-2 mt-4">
              <div className="flex items-center space-x-2">
                <FileCode className="h-4 w-4 text-web3-purple" />
                <span className="font-medium">Specialized Audit Type:</span>
                <span className="text-muted-foreground">
                  {getSpecializedAuditName()}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-secondary" />
                <span className="font-medium">Accountability Model:</span>
                <span className="text-muted-foreground">
                  {getAccountabilityName()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between space-x-4 pt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={prevStep}
          disabled={isSubmitting}
        >
          Back
        </Button>
        <Button 
          type="submit"
          disabled={isSubmitting}
        >
          Submit Audit Request
        </Button>
      </div>
    </div>
  );
}
