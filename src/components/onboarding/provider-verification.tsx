
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, X, FileCheck, LinkIcon, Github, Globe, Shield, ArrowRight, CircleCheck, AlertCircle, Twitter, Code, Award, Building, User, CheckCircle2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BadgeAward } from "@/components/ui/badge-award";

// Define the form schema with enhanced validation and additional fields
const formSchema = z.object({
  // Identity verification
  ethAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/, { message: "Please enter a valid Ethereum address" }),
  fullName: z.string().min(2, { message: "Please enter your full name" }),
  
  // Credentials verification
  githubProfile: z.string().url({ message: "Please enter a valid GitHub URL" }).optional().or(z.literal("")),
  websiteUrl: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  twitterHandle: z.string().optional().or(z.literal("")),
  certifications: z.string().optional(),
  
  // Experience verification
  yearsExperience: z.enum(["0-1", "1-3", "3-5", "5+"]),
  pastAudits: z.string().min(10, { message: "Please provide more details about your past audit experience" }),
  specialization: z.array(z.string()).min(1, { message: "Please select at least one area of specialization" }),
  
  // Additional information
  portfolioLinks: z.string().optional(),
  auditTools: z.string().optional(),
  availability: z.enum(["full-time", "part-time", "weekends", "variable"]),
});

// Define the possible step statuses as a type
type StepStatus = 'pending' | 'in-progress' | 'completed' | 'failed';

interface VerificationStepProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  status: StepStatus;
  children?: React.ReactNode;
}

const VerificationStep = ({ title, description, icon, status, children }: VerificationStepProps) => {
  const statusIcons = {
    "pending": <Shield className="h-5 w-5 text-muted-foreground" />,
    "in-progress": <Shield className="h-5 w-5 text-primary animate-pulse" />,
    "completed": <CircleCheck className="h-5 w-5 text-green-500" />,
    "failed": <AlertCircle className="h-5 w-5 text-red-500" />,
  };

  return (
    <div className={`border rounded-lg p-4 ${status === 'in-progress' ? 'border-primary/50 bg-primary/5' : 'border-border'}`}>
      <div className="flex items-center mb-3">
        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mr-3">
          {icon}
        </div>
        <div className="flex-grow">
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div>
          {statusIcons[status]}
        </div>
      </div>
      {children && <div className={`${status === 'in-progress' ? 'block' : 'hidden'}`}>{children}</div>}
    </div>
  );
};

// New component for displaying uploaded documents
const DocumentPreview = ({ name, size, onRemove }: { name: string; size: string; onRemove: () => void }) => {
  return (
    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg mb-2">
      <div className="flex items-center">
        <FileCheck className="h-5 w-5 text-primary mr-2" />
        <div>
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs text-muted-foreground">{size}</p>
        </div>
      </div>
      <Button variant="ghost" size="sm" onClick={onRemove} className="h-8 w-8 p-0" aria-label="Remove file">
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

interface ProviderVerificationProps {
  onComplete: () => void;
  onCancel: () => void;
}

export function ProviderVerification({ onComplete, onCancel }: ProviderVerificationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(25);
  const [uploadedDocuments, setUploadedDocuments] = useState<Array<{name: string, size: string}>>([]);
  
  // Update the type for verificationSteps state to include all possible statuses
  const [verificationSteps, setVerificationSteps] = useState<Array<{ id: string; status: StepStatus }>>([
    { id: 'identity', status: 'in-progress' },
    { id: 'credentials', status: 'pending' },
    { id: 'experience', status: 'pending' },
    { id: 'review', status: 'pending' }
  ]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ethAddress: "",
      fullName: "",
      githubProfile: "",
      websiteUrl: "",
      twitterHandle: "",
      certifications: "",
      pastAudits: "",
      yearsExperience: "1-3",
      specialization: [],
      portfolioLinks: "",
      auditTools: "",
      availability: "full-time",
    },
  });

  const updateStepStatus = (stepId: string, status: StepStatus) => {
    setVerificationSteps(steps => 
      steps.map(step => 
        step.id === stepId ? { ...step, status } : step
      )
    );
  };

  const handleStepChange = (stepIndex: number) => {
    // Complete current step
    updateStepStatus(verificationSteps[currentStep].id, 'completed');
    
    // Set next step as in-progress
    if (stepIndex >= 0 && stepIndex < verificationSteps.length) {
      updateStepStatus(verificationSteps[stepIndex].id, 'in-progress');
      setCurrentStep(stepIndex);
      setProgress((stepIndex + 1) * 25);
    }
  };

  const handleDocumentUpload = () => {
    // In a real application, this would handle actual file uploads
    // For demo purposes, we're adding a fake document
    const newDoc = {
      name: `audit-report-${Math.floor(Math.random() * 1000)}.pdf`,
      size: `${Math.floor(Math.random() * 5) + 1} MB`
    };
    
    setUploadedDocuments(prev => [...prev, newDoc]);
    toast.success("Document uploaded successfully");
  };

  const removeDocument = (index: number) => {
    setUploadedDocuments(docs => docs.filter((_, i) => i !== index));
    toast.info("Document removed");
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // In a real app, this would send the data to your backend
    console.log(values, uploadedDocuments);
    
    // Complete the current step
    updateStepStatus(verificationSteps[currentStep].id, 'completed');
    
    // If this is the last step, call onComplete
    if (currentStep === verificationSteps.length - 1) {
      toast.success("Verification submitted successfully!", {
        description: "We'll review your information and get back to you soon."
      });
      onComplete();
    } else {
      // Move to the next step
      const nextStep = verificationSteps[currentStep + 1];
      updateStepStatus(nextStep.id, 'in-progress');
      setCurrentStep(currentStep + 1);
      setProgress((currentStep + 2) * 25);
    }
  };

  const specializationOptions = [
    { value: "solidity", label: "Solidity" },
    { value: "rust", label: "Rust" },
    { value: "vyper", label: "Vyper" },
    { value: "evm", label: "EVM" },
    { value: "defi", label: "DeFi" },
    { value: "nft", label: "NFTs" },
    { value: "dao", label: "DAOs" },
    { value: "bridges", label: "Cross-chain Bridges" },
    { value: "wallet", label: "Wallet Security" }
  ];

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Security Provider Verification</CardTitle>
        <CardDescription>
          Complete the verification process to establish your credentials and build trust with potential clients
        </CardDescription>
        <Progress value={progress} className="h-2 mt-4" />
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${currentStep >= 0 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>1</div>
            <Separator className={`w-12 h-1 mx-2 ${currentStep > 0 ? 'bg-primary' : 'bg-muted'}`} />
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>2</div>
            <Separator className={`w-12 h-1 mx-2 ${currentStep > 1 ? 'bg-primary' : 'bg-muted'}`} />
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>3</div>
            <Separator className={`w-12 h-1 mx-2 ${currentStep > 2 ? 'bg-primary' : 'bg-muted'}`} />
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>4</div>
          </div>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Step 1: Identity Verification */}
            {currentStep === 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Identity Verification</h3>
                <p className="text-muted-foreground">Provide your personal details to verify your identity</p>
                
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-md mb-4">
                  <h4 className="text-sm font-medium text-blue-800 flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-blue-600" />
                    Why we verify identity
                  </h4>
                  <p className="text-xs text-blue-700 mt-1">
                    Identity verification helps establish trust on our platform and ensures the security of all participants.
                  </p>
                </div>
                
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-9" placeholder="John Doe" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="ethAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ethereum Address</FormLabel>
                      <FormControl>
                        <Input placeholder="0x..." {...field} />
                      </FormControl>
                      <FormDescription>
                        This address will be used for identity verification and payments
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            
            {/* Step 2: Credentials */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Professional Credentials</h3>
                <p className="text-muted-foreground">Link your professional accounts and websites</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="githubProfile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GitHub Profile</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Github className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-9" placeholder="https://github.com/username" {...field} />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Link to your GitHub profile with security-related repositories
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="websiteUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Personal/Company Website</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Globe className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-9" placeholder="https://yourwebsite.com" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="twitterHandle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Twitter Handle (optional)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Twitter className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-9" placeholder="@username" {...field} />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Your Twitter presence in the web3 security community
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="certifications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Certifications</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="List any relevant certifications (e.g., CISSP, CEH, Web3 Security Expert)" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Enter any certifications relevant to security and blockchain
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="mt-2">
                  <p className="text-sm font-medium mb-2">Popular Certifications</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary/10" onClick={() => {
                      const current = form.getValues("certifications");
                      form.setValue("certifications", current ? `${current}, CISSP` : "CISSP");
                    }}>CISSP</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary/10" onClick={() => {
                      const current = form.getValues("certifications");
                      form.setValue("certifications", current ? `${current}, CEH` : "CEH");
                    }}>CEH</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary/10" onClick={() => {
                      const current = form.getValues("certifications");
                      form.setValue("certifications", current ? `${current}, Security+` : "Security+");
                    }}>Security+</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary/10" onClick={() => {
                      const current = form.getValues("certifications");
                      form.setValue("certifications", current ? `${current}, OSCP` : "OSCP");
                    }}>OSCP</Badge>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 3: Experience Verification */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Experience Verification</h3>
                <p className="text-muted-foreground">Provide details about your past security audit experience</p>
                
                <FormField
                  control={form.control}
                  name="yearsExperience"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Years of Experience in Security</FormLabel>
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
                  name="specialization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Areas of Specialization</FormLabel>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {specializationOptions.map(option => (
                          <div 
                            key={option.value}
                            className={`p-2 border rounded-md cursor-pointer text-center text-sm transition-all ${
                              field.value.includes(option.value) 
                                ? 'bg-primary text-primary-foreground border-primary' 
                                : 'bg-background hover:bg-muted'
                            }`}
                            onClick={() => {
                              const currentValues = new Set(field.value);
                              if (currentValues.has(option.value)) {
                                currentValues.delete(option.value);
                              } else {
                                currentValues.add(option.value);
                              }
                              field.onChange(Array.from(currentValues));
                            }}
                          >
                            {option.label}
                          </div>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="pastAudits"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Past Audit Experience</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your past security audit experience, including projects, findings, and outcomes" 
                          className="min-h-[150px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Include links to public audit reports, if available
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="portfolioLinks"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Portfolio Links (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Add links to published audit reports or other security work you've done"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Separate multiple links with a new line
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="auditTools"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Security Tools Experience (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="List security tools you're experienced with (e.g., MythX, Slither, Echidna)"
                          {...field} 
                        />
                      </FormControl>
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
                
                <div className="mt-4 p-4 bg-muted/40 rounded-lg">
                  <h4 className="text-sm font-medium flex items-center">
                    <FileCheck className="h-4 w-4 mr-2 text-primary" />
                    Upload Supporting Documents
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1 mb-3">
                    Upload proof of previous audits, certifications, or other relevant documents
                  </p>
                  
                  {uploadedDocuments.length > 0 && (
                    <div className="mb-3">
                      {uploadedDocuments.map((doc, index) => (
                        <DocumentPreview 
                          key={index}
                          name={doc.name}
                          size={doc.size}
                          onRemove={() => removeDocument(index)}
                        />
                      ))}
                    </div>
                  )}
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full h-24 border-dashed flex flex-col"
                    onClick={handleDocumentUpload}
                  >
                    <LinkIcon className="h-6 w-6 mb-2" />
                    <span>Click to upload or drag files</span>
                    <span className="text-xs text-muted-foreground mt-1">PDF, PNG, JPG up to 5MB each</span>
                  </Button>
                </div>
              </div>
            )}
            
            {/* Step 4: Review & Submit */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Review & Submit</h3>
                <p className="text-muted-foreground">Review your information before submitting for verification</p>
                
                <div className="space-y-4 mt-4">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-sm text-muted-foreground">Full Name</span>
                    <span className="text-sm font-medium">{form.getValues("fullName")}</span>
                  </div>
                  
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-sm text-muted-foreground">Ethereum Address</span>
                    <span className="text-sm font-medium">{form.getValues("ethAddress")}</span>
                  </div>
                  
                  {form.getValues("githubProfile") && (
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-sm text-muted-foreground">GitHub Profile</span>
                      <a href={form.getValues("githubProfile")} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:underline">
                        {form.getValues("githubProfile")}
                      </a>
                    </div>
                  )}
                  
                  {form.getValues("websiteUrl") && (
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-sm text-muted-foreground">Website</span>
                      <a href={form.getValues("websiteUrl")} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:underline">
                        {form.getValues("websiteUrl")}
                      </a>
                    </div>
                  )}
                  
                  {form.getValues("twitterHandle") && (
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-sm text-muted-foreground">Twitter Handle</span>
                      <span className="text-sm font-medium">{form.getValues("twitterHandle")}</span>
                    </div>
                  )}
                  
                  {form.getValues("certifications") && (
                    <div className="border-b pb-2">
                      <span className="text-sm text-muted-foreground">Certifications</span>
                      <p className="text-sm mt-1">{form.getValues("certifications")}</p>
                    </div>
                  )}
                  
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-sm text-muted-foreground">Experience</span>
                    <span className="text-sm font-medium">{form.getValues("yearsExperience")} years</span>
                  </div>
                  
                  <div className="border-b pb-2">
                    <span className="text-sm text-muted-foreground">Specialization</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {form.getValues("specialization").map((spec) => {
                        const option = specializationOptions.find(o => o.value === spec);
                        return (
                          <BadgeAward key={spec} variant="expert" className="text-xs">
                            {option?.label || spec}
                          </BadgeAward>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="border-b pb-2">
                    <span className="text-sm text-muted-foreground">Availability</span>
                    <p className="text-sm mt-1 capitalize">{form.getValues("availability")}</p>
                  </div>
                  
                  <div className="border-b pb-2">
                    <span className="text-sm text-muted-foreground">Past Audit Experience</span>
                    <p className="text-sm mt-1">{form.getValues("pastAudits")}</p>
                  </div>
                  
                  {uploadedDocuments.length > 0 && (
                    <div className="border-b pb-2">
                      <span className="text-sm text-muted-foreground">Uploaded Documents</span>
                      <div className="mt-2">
                        {uploadedDocuments.map((doc, index) => (
                          <div key={index} className="flex items-center mb-1">
                            <FileCheck className="h-4 w-4 mr-2 text-green-500" />
                            <span className="text-sm">{doc.name}</span>
                            <span className="text-xs text-muted-foreground ml-2">({doc.size})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 p-4 rounded-lg bg-green-50 border border-green-100">
                  <div className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 mr-2" />
                    <div>
                      <h4 className="text-sm font-medium text-green-800">Verification Process</h4>
                      <p className="text-xs text-green-700 mt-1">
                        After submission, our team will review your information within 2-3 business days. You'll receive an email notification when your verification is complete.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-md mt-2">
                  <p className="text-sm text-amber-800 flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                    By submitting this verification request, you agree to our verification process which may include manual review of your credentials. Your information will be handled according to our privacy policy.
                  </p>
                </div>
              </div>
            )}
            
            <div className="flex justify-between pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  if (currentStep === 0) {
                    onCancel();
                  } else {
                    // Go back to previous step
                    updateStepStatus(verificationSteps[currentStep].id, 'pending');
                    updateStepStatus(verificationSteps[currentStep - 1].id, 'in-progress');
                    setCurrentStep(currentStep - 1);
                    setProgress((currentStep) * 25);
                  }
                }}
              >
                {currentStep === 0 ? "Cancel" : "Previous"}
              </Button>
              <Button type="submit">
                {currentStep === verificationSteps.length - 1 ? "Submit Verification" : "Continue"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
