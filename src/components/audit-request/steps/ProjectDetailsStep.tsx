
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, FileText } from "lucide-react";
import { BlockchainEcosystems } from "@/components/marketplace/sections/BlockchainEcosystems";
import { Badge } from "@/components/ui/badge";
import { AuditFormData } from '@/types/audit-request.types';

interface ProjectDetailsStepProps {
  formData: AuditFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  projectType: string;
  setProjectType: (value: string) => void;
  handleEcosystemClick: (ecosystem: string) => void;
  nextStep: () => void;
}

const ProjectDetailsStep: React.FC<ProjectDetailsStepProps> = ({
  formData,
  handleChange,
  projectType,
  setProjectType,
  handleEcosystemClick,
  nextStep
}) => {
  const [showCustomBlockchain, setShowCustomBlockchain] = useState(formData.blockchain === "Other");
  
  const handleBlockchainSelection = (blockchain: string) => {
    if (blockchain === "Other") {
      setShowCustomBlockchain(true);
      handleEcosystemClick("Other");
    } else {
      setShowCustomBlockchain(false);
      handleEcosystemClick(blockchain);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <FileText className="mr-2 h-5 w-5 text-primary" /> Project Details
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label htmlFor="projectName" className="text-sm font-medium">Project Name *</label>
          <Input 
            id="projectName" 
            name="projectName" 
            placeholder="e.g., DeFi Protocol X" 
            value={formData.projectName}
            onChange={handleChange}
            required 
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="contactName" className="text-sm font-medium">Contact Name *</label>
          <Input 
            id="contactName" 
            name="contactName" 
            placeholder="Your full name" 
            value={formData.contactName}
            onChange={handleChange}
            required 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label htmlFor="contactEmail" className="text-sm font-medium">Contact Email *</label>
          <Input 
            id="contactEmail" 
            name="contactEmail" 
            type="email" 
            placeholder="your-email@example.com" 
            value={formData.contactEmail}
            onChange={handleChange}
            required 
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Project Type *</label>
          <Select 
            value={projectType} 
            onValueChange={(value) => setProjectType(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select project type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="defi">DeFi Protocol</SelectItem>
              <SelectItem value="nft">NFT Project</SelectItem>
              <SelectItem value="dao">DAO</SelectItem>
              <SelectItem value="wallet">Wallet/Custody Solution</SelectItem>
              <SelectItem value="bridge">Cross-Chain Bridge</SelectItem>
              <SelectItem value="lending">Lending Protocol</SelectItem>
              <SelectItem value="game">GameFi</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="projectDescription" className="text-sm font-medium">Project Description *</label>
        <Textarea 
          id="projectDescription" 
          name="projectDescription" 
          placeholder="Please provide a brief description of your project, its purpose and functionality..." 
          className="min-h-[120px]"
          value={formData.projectDescription}
          onChange={handleChange}
          required
        />
        <p className="text-xs text-muted-foreground">
          A detailed description helps auditors understand your project's context and security requirements.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium block mb-2">Blockchain Ecosystem *</label>
          <p className="text-xs text-muted-foreground mb-3">
            Select the primary blockchain your project is built on. Click on the relevant ecosystem or select "Other" below.
          </p>
          
          {/* Use the BlockchainEcosystems component with custom onClick handler */}
          <div className="mt-2 mb-6">
            <BlockchainEcosystems
              ecosystems={[
                { name: "Ethereum", logoUrl: "/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png", color: "#627EEA" },
                { name: "Solana", logoUrl: "/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png", color: "#9945FF" },
                { name: "Polygon", logoUrl: "/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png", color: "#8247E5" },
                { name: "Avalanche", logoUrl: "/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png", color: "#E84142" },
                { name: "BNB Chain", logoUrl: "/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png", color: "#F3BA2F" },
                { name: "Arbitrum", logoUrl: "/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png", color: "#28A0F0" },
                { name: "Optimism", logoUrl: "/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png", color: "#FF0420" },
                { name: "Aptos", logoUrl: "/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png", color: "#277DA1" },
                { name: "Sui", logoUrl: "/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png", color: "#6FBCF0" }
              ]}
              onEcosystemClick={handleBlockchainSelection}
            />
          </div>
          
          <div className="flex items-center gap-3 mb-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleBlockchainSelection("Other")}
              className={`${formData.blockchain === "Other" ? "bg-primary/10 border-primary" : ""}`}
            >
              Other Blockchain
            </Button>
            
            <Badge variant="outline" className="bg-primary/5 border-primary/30 text-primary px-3 py-1.5">
              Selected: <span className="font-semibold ml-1">{formData.blockchain}</span>
            </Badge>
          </div>
          
          {showCustomBlockchain && (
            <div className="mt-2">
              <Input
                id="customBlockchain"
                name="customBlockchain"
                placeholder="Enter blockchain name"
                value={formData.customBlockchain || ""}
                onChange={handleChange}
                className="max-w-xs"
              />
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-end mt-8">
        <Button 
          type="button" 
          onClick={nextStep}
          className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
        >
          Next Step: Technical Information
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ProjectDetailsStep;
