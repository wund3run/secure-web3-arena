
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DashboardLoader } from "@/components/admin/dashboard/DashboardLoader";
import { toast } from "sonner";
import { ChevronRight, FileCode, Github, Link } from "lucide-react";

export function SecurityAssessmentForm() {
  const [assessmentType, setAssessmentType] = useState<string>("smart-contract");
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    projectName: "",
    contractAddress: "",
    repositoryUrl: "",
    blockchain: "ethereum",
    codeSnippet: "",
    assessmentDepth: "standard",
    includeGas: true,
    includeFormats: ["solidity", "vyper"]
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleFormatToggle = (format: string) => {
    setFormData(prev => ({
      ...prev,
      includeFormats: prev.includeFormats.includes(format)
        ? prev.includeFormats.filter(f => f !== format)
        : [...prev.includeFormats, format]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate assessment process
    setTimeout(() => {
      setLoading(false);
      toast.success("Security assessment initiated", {
        description: "Your assessment has been started. Results will be available shortly."
      });
    }, 2000);
  };

  return (
    <div>
      {loading ? (
        <div className="py-12">
          <DashboardLoader />
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <Label>Project Name</Label>
              <Input
                name="projectName"
                value={formData.projectName}
                onChange={handleInputChange}
                placeholder="Enter your project name"
                className="mt-1"
                required
              />
            </div>
            
            <div className="space-y-4">
              <Label>Assessment Type</Label>
              <RadioGroup 
                value={assessmentType} 
                onValueChange={setAssessmentType}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="smart-contract" id="smart-contract" />
                  <Label htmlFor="smart-contract" className="flex items-center">
                    <FileCode className="h-4 w-4 mr-2" />
                    Smart Contract Assessment
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="repository" id="repository" />
                  <Label htmlFor="repository" className="flex items-center">
                    <Github className="h-4 w-4 mr-2" />
                    Repository Analysis
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            {assessmentType === "smart-contract" && (
              <div className="space-y-4">
                <div>
                  <Label>Contract Address</Label>
                  <Input
                    name="contractAddress"
                    value={formData.contractAddress}
                    onChange={handleInputChange}
                    placeholder="0x..."
                    className="mt-1 font-mono"
                  />
                </div>
                
                <div>
                  <Label>Blockchain</Label>
                  <Select 
                    value={formData.blockchain}
                    onValueChange={(value) => handleSelectChange("blockchain", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ethereum">Ethereum</SelectItem>
                      <SelectItem value="polygon">Polygon</SelectItem>
                      <SelectItem value="bsc">BSC</SelectItem>
                      <SelectItem value="arbitrum">Arbitrum</SelectItem>
                      <SelectItem value="optimism">Optimism</SelectItem>
                      <SelectItem value="avalanche">Avalanche</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            
            {assessmentType === "repository" && (
              <div>
                <Label>Repository URL</Label>
                <div className="flex mt-1">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                    <Link className="h-4 w-4" />
                  </span>
                  <Input
                    name="repositoryUrl"
                    value={formData.repositoryUrl}
                    onChange={handleInputChange}
                    placeholder="https://github.com/username/repository"
                    className="rounded-l-none"
                  />
                </div>
              </div>
            )}
            
            <div>
              <Label>Code Snippet (Optional)</Label>
              <Textarea
                name="codeSnippet"
                value={formData.codeSnippet}
                onChange={handleInputChange}
                placeholder="Paste specific code you want analyzed..."
                className="mt-1 font-mono h-32"
              />
            </div>
            
            <div>
              <Label>Assessment Depth</Label>
              <Select 
                value={formData.assessmentDepth}
                onValueChange={(value) => handleSelectChange("assessmentDepth", value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic (Fast, surface-level scan)</SelectItem>
                  <SelectItem value="standard">Standard (Comprehensive analysis)</SelectItem>
                  <SelectItem value="deep">Deep (In-depth with formal verification)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Include in Analysis</Label>
              
              <div className="flex items-center space-x-2 mt-2">
                <Checkbox 
                  id="includeGas" 
                  checked={formData.includeGas}
                  onCheckedChange={(checked) => 
                    handleCheckboxChange("includeGas", checked === true)
                  }
                />
                <Label htmlFor="includeGas">Gas optimization analysis</Label>
              </div>
              
              <div className="mt-2">
                <Label className="mb-2 block">Smart Contract Formats</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {["solidity", "vyper", "rust", "cairo"].map(format => (
                    <div 
                      key={format}
                      onClick={() => handleFormatToggle(format)}
                      className={`
                        px-3 py-1 rounded-full text-sm cursor-pointer border
                        ${formData.includeFormats.includes(format) 
                          ? 'bg-primary text-primary-foreground border-primary' 
                          : 'bg-background text-muted-foreground border-border'}
                      `}
                    >
                      {format.charAt(0).toUpperCase() + format.slice(1)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <Button type="submit" className="w-full md:w-auto">
                Start Security Assessment
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
