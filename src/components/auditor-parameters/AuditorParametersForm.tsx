
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Shield,
  CheckCircle,
  Code,
  Award,
  User,
  FileText,
  ArrowRight,
  Calendar,
  Star,
  Briefcase,
  FileCode,
} from "lucide-react";
import { AuditorProfileProgress } from "./AuditorProfileProgress";

// Define form schema
const formSchema = z.object({
  // Basic Information
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  walletAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/, { message: "Invalid Ethereum address" }),
  githubProfile: z.string().url({ message: "Please enter a valid GitHub URL" }).optional().or(z.literal("")),
  personalWebsite: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  
  // Expertise
  yearsExperience: z.enum(["0-1", "1-3", "3-5", "5+"]),
  primaryExpertise: z.array(z.string()).min(1, { message: "Please select at least one area" }),
  blockchainExpertise: z.array(z.string()).min(1, { message: "Please select at least one blockchain" }),
  
  // Skills & Tools
  solidity: z.number().min(0).max(10),
  rust: z.number().min(0).max(10),
  vyper: z.number().min(0).max(10),
  securityTools: z.array(z.string()),
  staticAnalysis: z.boolean().default(false),
  formalVerification: z.boolean().default(false),
  fuzzTesting: z.boolean().default(false),
  
  // Past Experience
  completedAudits: z.number().min(0),
  pastProjects: z.string().optional(),
  experienceTypes: z.array(z.string()),
  
  // Availability & Preferences
  responseTime: z.enum(["24h", "48h", "72h", "1week"]),
  availability: z.enum(["full-time", "part-time", "weekends", "variable"]),
  projectPreference: z.string().optional(),
  
  // Certifications & Credentials
  certifications: z.string().optional(),
  specializedCredentials: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function AuditorParametersForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const [progress, setProgress] = useState(20);
  
  const steps = [
    { title: "Basic Information", icon: <User className="h-5 w-5" /> },
    { title: "Expertise & Skills", icon: <Code className="h-5 w-5" /> },
    { title: "Tools & Methods", icon: <Shield className="h-5 w-5" /> },
    { title: "Experience", icon: <Briefcase className="h-5 w-5" /> },
    { title: "Preferences", icon: <Star className="h-5 w-5" /> },
  ];
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      walletAddress: "",
      githubProfile: "",
      personalWebsite: "",
      yearsExperience: "1-3",
      primaryExpertise: [],
      blockchainExpertise: [],
      solidity: 5,
      rust: 0,
      vyper: 0,
      securityTools: [],
      staticAnalysis: false,
      formalVerification: false,
      fuzzTesting: false,
      completedAudits: 0,
      pastProjects: "",
      experienceTypes: [],
      responseTime: "48h",
      availability: "full-time",
      projectPreference: "",
      certifications: "",
      specializedCredentials: "",
    },
  });

  // Arrays for multi-select options
  const expertiseAreas = [
    { value: "smart-contracts", label: "Smart Contracts" },
    { value: "defi", label: "DeFi" },
    { value: "nft", label: "NFTs & Marketplaces" },
    { value: "bridges", label: "Cross-chain Bridges" },
    { value: "layer2", label: "Layer 2 Solutions" },
    { value: "dao", label: "DAOs" },
    { value: "wallet", label: "Wallet Security" },
    { value: "gamefi", label: "GameFi" },
  ];
  
  const blockchainOptions = [
    { value: "ethereum", label: "Ethereum" },
    { value: "solana", label: "Solana" },
    { value: "polygon", label: "Polygon" },
    { value: "avalanche", label: "Avalanche" },
    { value: "bsc", label: "BSC" },
    { value: "near", label: "NEAR" },
    { value: "polkadot", label: "Polkadot" },
    { value: "cosmos", label: "Cosmos" },
    { value: "other", label: "Other" },
  ];
  
  const securityToolOptions = [
    { value: "mythril", label: "Mythril" },
    { value: "slither", label: "Slither" },
    { value: "manticore", label: "Manticore" },
    { value: "echidna", label: "Echidna" },
    { value: "scribble", label: "Scribble" },
    { value: "securify", label: "Securify" },
    { value: "oyente", label: "Oyente" },
    { value: "custom", label: "Custom Tools" },
  ];
  
  const experienceOptions = [
    { value: "protocol-audits", label: "Protocol Audits" },
    { value: "pre-launch-audits", label: "Pre-Launch Audits" },
    { value: "post-launch-audits", label: "Post-Launch Audits" },
    { value: "bug-bounties", label: "Bug Bounties" },
    { value: "incident-response", label: "Incident Response" },
    { value: "red-team", label: "Red Team Exercises" },
  ];

  const onSubmit = (values: FormValues) => {
    // In a real app, this would send the data to your backend
    console.log(values);
    toast.success("Profile successfully created!", {
      description: "You'll now be matched with projects that fit your expertise.",
    });
    // Navigate to dashboard or homepage after saving
    navigate("/");
  };

  const nextStep = () => {
    setCurrentStep((prev) => {
      const newStep = prev + 1;
      setProgress((newStep + 1) * 20);
      return newStep;
    });
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setCurrentStep((prev) => {
      const newStep = Math.max(0, prev - 1);
      setProgress((newStep + 1) * 20);
      return newStep;
    });
    window.scrollTo(0, 0);
  };

  const handleArrayToggle = (field: string, value: string) => {
    const currentValues = form.getValues(field as any) || [];
    const updatedValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    
    form.setValue(field as any, updatedValues as any);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <AuditorProfileProgress currentStep={currentStep} progress={progress} steps={steps} />
      
      <Card className="border border-border/40 rounded-xl shadow-sm">
        <CardContent className="p-6 md:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Step 1: Basic Information */}
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <User className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">Basic Information</h2>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} className="bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="walletAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ethereum Wallet Address</FormLabel>
                        <FormControl>
                          <Input placeholder="0x..." {...field} className="bg-background" />
                        </FormControl>
                        <FormDescription>
                          This address will be used for identity verification and payments
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="githubProfile"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GitHub Profile (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="https://github.com/username" {...field} className="bg-background" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="personalWebsite"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Personal Website (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="https://example.com" {...field} className="bg-background" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}
              
              {/* Step 2: Expertise & Skills */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Code className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">Expertise & Skills</h2>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="yearsExperience"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Years of Experience in Security Auditing</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-wrap gap-4"
                          >
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="0-1" />
                              </FormControl>
                              <FormLabel className="font-normal">0-1 years</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="1-3" />
                              </FormControl>
                              <FormLabel className="font-normal">1-3 years</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="3-5" />
                              </FormControl>
                              <FormLabel className="font-normal">3-5 years</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="5+" />
                              </FormControl>
                              <FormLabel className="font-normal">5+ years</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="primaryExpertise"
                    render={() => (
                      <FormItem>
                        <FormLabel>Primary Areas of Expertise</FormLabel>
                        <FormDescription>
                          Select all areas where you have significant experience
                        </FormDescription>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                          {expertiseAreas.map((option) => {
                            const currentValues = form.getValues("primaryExpertise") || [];
                            const isSelected = currentValues.includes(option.value);
                            
                            return (
                              <div
                                key={option.value}
                                className={`p-3 border rounded-md cursor-pointer text-center transition-all ${
                                  isSelected
                                    ? "bg-primary/20 border-primary"
                                    : "bg-background hover:bg-muted"
                                }`}
                                onClick={() => handleArrayToggle("primaryExpertise", option.value)}
                              >
                                {option.label}
                              </div>
                            );
                          })}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="blockchainExpertise"
                    render={() => (
                      <FormItem>
                        <FormLabel>Blockchain Experience</FormLabel>
                        <FormDescription>
                          Select all blockchain platforms you're experienced with
                        </FormDescription>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                          {blockchainOptions.map((option) => {
                            const currentValues = form.getValues("blockchainExpertise") || [];
                            const isSelected = currentValues.includes(option.value);
                            
                            return (
                              <div
                                key={option.value}
                                className={`p-3 border rounded-md cursor-pointer text-center transition-all ${
                                  isSelected
                                    ? "bg-primary/20 border-primary"
                                    : "bg-background hover:bg-muted"
                                }`}
                                onClick={() => handleArrayToggle("blockchainExpertise", option.value)}
                              >
                                {option.label}
                              </div>
                            );
                          })}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-4">
                    <div>
                      <FormLabel>Programming Language Proficiency</FormLabel>
                      <FormDescription>Rate your proficiency level from 0-10</FormDescription>
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="solidity"
                      render={({ field: { value, onChange } }) => (
                        <FormItem className="mb-4 space-y-1">
                          <div className="flex justify-between mb-1">
                            <FormLabel className="flex items-center">
                              <FileCode className="h-4 w-4 mr-1" />
                              Solidity
                            </FormLabel>
                            <span className="text-sm font-medium">{value}/10</span>
                          </div>
                          <FormControl>
                            <Slider
                              min={0}
                              max={10}
                              step={1}
                              defaultValue={[value]}
                              onValueChange={(vals) => onChange(vals[0])}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="rust"
                      render={({ field: { value, onChange } }) => (
                        <FormItem className="mb-4 space-y-1">
                          <div className="flex justify-between mb-1">
                            <FormLabel className="flex items-center">
                              <FileCode className="h-4 w-4 mr-1" />
                              Rust
                            </FormLabel>
                            <span className="text-sm font-medium">{value}/10</span>
                          </div>
                          <FormControl>
                            <Slider
                              min={0}
                              max={10}
                              step={1}
                              defaultValue={[value]}
                              onValueChange={(vals) => onChange(vals[0])}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="vyper"
                      render={({ field: { value, onChange } }) => (
                        <FormItem className="mb-4 space-y-1">
                          <div className="flex justify-between mb-1">
                            <FormLabel className="flex items-center">
                              <FileCode className="h-4 w-4 mr-1" />
                              Vyper
                            </FormLabel>
                            <span className="text-sm font-medium">{value}/10</span>
                          </div>
                          <FormControl>
                            <Slider
                              min={0}
                              max={10}
                              step={1}
                              defaultValue={[value]}
                              onValueChange={(vals) => onChange(vals[0])}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}
              
              {/* Step 3: Tools & Methods */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">Tools & Methods</h2>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="securityTools"
                    render={() => (
                      <FormItem>
                        <FormLabel>Security Tools Experience</FormLabel>
                        <FormDescription>
                          Select all security tools you're proficient with
                        </FormDescription>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                          {securityToolOptions.map((option) => {
                            const currentValues = form.getValues("securityTools") || [];
                            const isSelected = currentValues.includes(option.value);
                            
                            return (
                              <div
                                key={option.value}
                                className={`p-3 border rounded-md cursor-pointer text-center transition-all ${
                                  isSelected
                                    ? "bg-primary/20 border-primary"
                                    : "bg-background hover:bg-muted"
                                }`}
                                onClick={() => handleArrayToggle("securityTools", option.value)}
                              >
                                {option.label}
                              </div>
                            );
                          })}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-4">
                    <FormLabel>Auditing Methods</FormLabel>
                    <FormDescription>
                      Select methods you apply in your auditing process
                    </FormDescription>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="staticAnalysis"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-background">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Static Analysis</FormLabel>
                              <FormDescription>
                                Code review and static analysis tools
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="formalVerification"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-background">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Formal Verification</FormLabel>
                              <FormDescription>
                                Mathematical verification of code properties
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="fuzzTesting"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-background">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Fuzz Testing</FormLabel>
                              <FormDescription>
                                Finding vulnerabilities with random inputs
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 4: Experience */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Briefcase className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">Experience & Portfolio</h2>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="completedAudits"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Completed Audits</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={0}
                            className="bg-background"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="experienceTypes"
                    render={() => (
                      <FormItem>
                        <FormLabel>Types of Projects Audited</FormLabel>
                        <FormDescription>
                          Select all that apply to your experience
                        </FormDescription>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                          {experienceOptions.map((option) => {
                            const currentValues = form.getValues("experienceTypes") || [];
                            const isSelected = currentValues.includes(option.value);
                            
                            return (
                              <div
                                key={option.value}
                                className={`p-3 border rounded-md cursor-pointer text-center transition-all ${
                                  isSelected
                                    ? "bg-primary/20 border-primary"
                                    : "bg-background hover:bg-muted"
                                }`}
                                onClick={() => handleArrayToggle("experienceTypes", option.value)}
                              >
                                {option.label}
                              </div>
                            );
                          })}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="pastProjects"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notable Past Projects & Findings</FormLabel>
                        <FormDescription>
                          Describe notable past audits and key findings (public information only)
                        </FormDescription>
                        <FormControl>
                          <Textarea
                            placeholder="E.g., Discovered critical reentrancy vulnerability in XYZ protocol, Audited ABC DeFi platform..."
                            className="min-h-[150px] bg-background"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="certifications"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Certifications & Credentials</FormLabel>
                        <FormDescription>
                          List relevant security or blockchain certifications
                        </FormDescription>
                        <FormControl>
                          <Textarea
                            placeholder="E.g., Certified Ethereum Security Specialist, Security+..."
                            className="min-h-[100px] bg-background"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
              
              {/* Step 5: Preferences */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">Availability & Preferences</h2>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="responseTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Typical Response Time</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background">
                              <SelectValue placeholder="Select your typical response time" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="24h">Within 24 hours</SelectItem>
                            <SelectItem value="48h">Within 48 hours</SelectItem>
                            <SelectItem value="72h">Within 72 hours</SelectItem>
                            <SelectItem value="1week">Within 1 week</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          This helps clients understand when to expect a response
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="availability"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Availability</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-wrap gap-4"
                          >
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="full-time" />
                              </FormControl>
                              <FormLabel className="font-normal">Full-time</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="part-time" />
                              </FormControl>
                              <FormLabel className="font-normal">Part-time</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="weekends" />
                              </FormControl>
                              <FormLabel className="font-normal">Weekends</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="variable" />
                              </FormControl>
                              <FormLabel className="font-normal">Variable</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="projectPreference"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Preferences (Optional)</FormLabel>
                        <FormDescription>
                          Describe any specific project types you prefer to work with
                        </FormDescription>
                        <FormControl>
                          <Textarea
                            placeholder="E.g., I prefer DeFi protocols, NFT marketplaces..."
                            className="min-h-[100px] bg-background"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="specializedCredentials"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Information (Optional)</FormLabel>
                        <FormDescription>
                          Anything else that might help match you with the right projects
                        </FormDescription>
                        <FormControl>
                          <Textarea
                            placeholder="Additional expertise, languages spoken, preferred working methods..."
                            className="min-h-[100px] bg-background"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
              
              <div className="flex justify-between mt-6 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={currentStep === 0 ? () => navigate("/") : prevStep}
                >
                  {currentStep === 0 ? "Cancel" : "Back"}
                </Button>
                
                {currentStep < steps.length - 1 ? (
                  <Button type="button" onClick={nextStep} className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                    Complete Profile
                    <CheckCircle className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
