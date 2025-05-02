
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { 
  Shield, 
  ArrowRight, 
  FileText, 
  Calendar, 
  Code, 
  Github,
  Briefcase,
  DollarSign,
  Clock,
  FileCheck,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { BlockchainEcosystems } from "@/components/marketplace/sections/BlockchainEcosystems";

const RequestAudit = () => {
  const [formStep, setFormStep] = useState(1);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [projectType, setProjectType] = useState("");
  const [formData, setFormData] = useState({
    projectName: "",
    projectDescription: "",
    contactEmail: "",
    contactName: "",
    blockchain: "Ethereum",
    repositoryUrl: "",
    contractCount: "",
    linesOfCode: "",
    deadline: "",
    budget: "",
    auditScope: "",
    previousAudits: false,
    specificConcerns: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData({ ...formData, [name]: checked });
  };

  const handleEcosystemClick = (ecosystem: string) => {
    setFormData({ ...formData, blockchain: ecosystem });
    toast.success(`Selected ${ecosystem} as your blockchain ecosystem`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Audit request submitted successfully!", {
      description: "Our AI will match you with the perfect auditors for your project.",
    });
    setFormSubmitted(true);
    // In a real app, this would send the form data to a backend
  };

  const nextStep = () => {
    window.scrollTo(0, 0);
    setFormStep(formStep + 1);
  };

  const prevStep = () => {
    window.scrollTo(0, 0);
    setFormStep(formStep - 1);
  };

  // Render the success message after form submission
  if (formSubmitted) {
    return (
      <>
        <Helmet>
          <title>Request Submitted | Hawkly</title>
          <meta name="description" content="Your audit request has been submitted. We'll match you with the best security experts." />
        </Helmet>
        <Navbar />
        <main className="min-h-screen bg-gradient-to-br from-white via-primary/5 to-secondary/5 pt-10 pb-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 bg-card border border-border/40 rounded-xl p-10 shadow-sm">
              <div className="inline-flex items-center justify-center mb-6">
                <div className="p-4 bg-green-100 rounded-full">
                  <CheckCircle2 className="h-12 w-12 text-green-600" />
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-4">Audit Request Submitted!</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Thank you for requesting a security audit. Our AI-powered system is now analyzing your project requirements to find the best security experts for your needs.
              </p>
              <div className="space-y-6 mb-8">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold mb-2">What happens next?</h3>
                  <ol className="space-y-2 text-left list-decimal pl-5">
                    <li>Our AI system matches your project with qualified security experts</li>
                    <li>You'll receive an email within 24 hours with auditor recommendations</li>
                    <li>Review the suggested auditors and their expertise</li>
                    <li>Select your preferred auditor to begin the security audit process</li>
                  </ol>
                </div>
              </div>
              
              <div className="flex justify-center gap-4">
                <Button 
                  onClick={() => window.location.href = '/'}
                  variant="outline"
                  size="lg"
                >
                  Return to Home
                </Button>
                <Button
                  onClick={() => window.location.href = '/marketplace'}
                  className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                  size="lg"
                >
                  Explore Web3 Security Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                Questions? Contact our support team at <a href="mailto:join@hawkly.com" className="text-primary hover:underline">join@hawkly.com</a>
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Request an Audit | Hawkly</title>
        <meta name="description" content="Request a comprehensive security audit for your Web3 project. Connect with top security experts." />
      </Helmet>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-white via-primary/5 to-secondary/5 pt-10 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center mb-4">
              <div className="p-3 bg-primary/20 rounded-full">
                <Shield className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">Request a Security Audit</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complete the form below to request a comprehensive security audit for your Web3 project. 
              Our AI will match you with the perfect auditors based on your requirements.
            </p>
          </div>

          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Step {formStep} of 3</span>
              <span className="text-sm text-muted-foreground">{formStep === 1 ? 'Project Details' : formStep === 2 ? 'Technical Information' : 'Requirements & Submission'}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(formStep / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-card border border-border/40 rounded-xl p-6 md:p-8 shadow-sm">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Project Details */}
              {formStep === 1 && (
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

                  <div>
                    <label className="text-sm font-medium block mb-2">Blockchain Ecosystem *</label>
                    <p className="text-xs text-muted-foreground mb-3">
                      Select the primary blockchain your project is built on. Click on the relevant ecosystem.
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
                      />
                    </div>
                    <p className="text-sm">Selected blockchain: <span className="font-semibold">{formData.blockchain}</span></p>
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
              )}

              {/* Step 2: Technical Information */}
              {formStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <Code className="mr-2 h-5 w-5 text-primary" /> Technical Information
                  </h2>
                  
                  <div className="space-y-2">
                    <label htmlFor="repositoryUrl" className="text-sm font-medium">
                      Repository URL <span className="text-muted-foreground text-xs">(Private repos will require access arrangements)</span>
                    </label>
                    <Input 
                      id="repositoryUrl" 
                      name="repositoryUrl" 
                      placeholder="https://github.com/your-organization/your-repo" 
                      value={formData.repositoryUrl}
                      onChange={handleChange}
                    />
                    <p className="text-xs text-muted-foreground">
                      We'll keep your code confidential and can sign an NDA if required.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="contractCount" className="text-sm font-medium">Number of Smart Contracts *</label>
                      <Select 
                        value={formData.contractCount} 
                        onValueChange={(value) => handleSelectChange("contractCount", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select number of contracts" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-3">1-3 contracts</SelectItem>
                          <SelectItem value="4-10">4-10 contracts</SelectItem>
                          <SelectItem value="11-20">11-20 contracts</SelectItem>
                          <SelectItem value="20+">More than 20 contracts</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="linesOfCode" className="text-sm font-medium">Approximate Lines of Code *</label>
                      <Select 
                        value={formData.linesOfCode} 
                        onValueChange={(value) => handleSelectChange("linesOfCode", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select code size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="<1000">Less than 1,000 lines</SelectItem>
                          <SelectItem value="1000-5000">1,000 - 5,000 lines</SelectItem>
                          <SelectItem value="5001-15000">5,001 - 15,000 lines</SelectItem>
                          <SelectItem value="15000+">More than 15,000 lines</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="auditScope" className="text-sm font-medium">Audit Scope *</label>
                    <Textarea 
                      id="auditScope" 
                      name="auditScope" 
                      placeholder="Describe which parts of your codebase need to be audited and any specific areas of focus..." 
                      className="min-h-[120px]"
                      value={formData.auditScope}
                      onChange={handleChange}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Clearly defining the scope helps ensure the audit focuses on the most critical components.
                    </p>
                  </div>

                  <div className="flex items-start space-x-2 mt-4">
                    <Checkbox 
                      id="previousAudits"
                      checked={formData.previousAudits}
                      onCheckedChange={(checked) => handleCheckboxChange("previousAudits", checked === true)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="previousAudits"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Previous audits conducted
                      </label>
                      <p className="text-sm text-muted-foreground">
                        Check this if your code has been audited before. You'll be able to upload previous audit reports in the next step.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-8">
                    <Button 
                      type="button" 
                      onClick={prevStep}
                      variant="outline"
                    >
                      Back
                    </Button>
                    <Button 
                      type="button" 
                      onClick={nextStep}
                      className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                    >
                      Next Step: Requirements
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Requirements & Submission */}
              {formStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <Briefcase className="mr-2 h-5 w-5 text-primary" /> Requirements & Preferences
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="budget" className="text-sm font-medium">Estimated Budget Range *</label>
                      <Select 
                        value={formData.budget} 
                        onValueChange={(value) => handleSelectChange("budget", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="<5k">Less than $5,000</SelectItem>
                          <SelectItem value="5k-15k">$5,000 - $15,000</SelectItem>
                          <SelectItem value="15k-50k">$15,000 - $50,000</SelectItem>
                          <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                          <SelectItem value="100k+">More than $100,000</SelectItem>
                          <SelectItem value="flexible">Flexible / Not sure</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="deadline" className="text-sm font-medium">Expected Timeline/Deadline *</label>
                      <Select 
                        value={formData.deadline} 
                        onValueChange={(value) => handleSelectChange("deadline", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="urgent">Urgent (less than 1 week)</SelectItem>
                          <SelectItem value="1-2weeks">1-2 weeks</SelectItem>
                          <SelectItem value="2-4weeks">2-4 weeks</SelectItem>
                          <SelectItem value="1-2months">1-2 months</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="specificConcerns" className="text-sm font-medium">Specific Security Concerns</label>
                    <Textarea 
                      id="specificConcerns" 
                      name="specificConcerns" 
                      placeholder="Are there any specific security concerns or areas you want the auditors to focus on?" 
                      className="min-h-[100px]"
                      value={formData.specificConcerns}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4 mt-6">
                    <h3 className="text-sm font-medium flex items-center mb-2">
                      <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
                      How Our AI Matching Works
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Our advanced AI system analyzes your project details and matches you with the most suitable security experts based on their expertise, reputation, and past performance with similar projects. For optimal matching results, please provide as much detail as possible.
                    </p>
                  </div>

                  <div className="flex items-start space-x-2 mt-6">
                    <Checkbox id="terms" required />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the terms and conditions *
                      </label>
                      <p className="text-sm text-muted-foreground">
                        By submitting this form, you agree to our <a href="/terms" className="text-primary hover:underline">Terms of Service</a> and <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-8">
                    <Button 
                      type="button" 
                      onClick={prevStep}
                      variant="outline"
                    >
                      Back
                    </Button>
                    <Button 
                      type="submit"
                      className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                    >
                      Submit Audit Request
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Questions? Contact our support team at <a href="mailto:join@hawkly.com" className="text-primary hover:underline">join@hawkly.com</a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default RequestAudit;
