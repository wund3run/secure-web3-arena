import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { providerFormSchema, ProviderFormValues } from "./providerTypes";
import { 
  expertiseAreas, 
  blockchainOptions, 
  securityToolOptions, 
  experienceOptions,
  serviceTypeOptions
} from "@/components/auditor-parameters/formOptions";
import { OnboardingProgress } from "./OnboardingProgress";
import { ServiceProviderSteps } from "./ServiceProviderSteps";

interface ServiceProviderOnboardingFormProps {
  providerType: "auditor" | "service";
}

export function ServiceProviderOnboardingForm({ providerType }: ServiceProviderOnboardingFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [selectedBlockchains, setSelectedBlockchains] = useState<string[]>([]);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [progress, setProgress] = useState(20);
  const navigate = useNavigate();
  
  const steps = [
    "Basic Info",
    "Expertise",
    "Experience",
    providerType === "service" ? "Services" : "Methodology",
    "Verification"
  ];
  
  const form = useForm<ProviderFormValues>({
    resolver: zodResolver(providerFormSchema),
    defaultValues: {
      // Basic Info
      name: "",
      email: "",
      walletAddress: "",
      website: "",
      githubProfile: "",
      organization: providerType === "service" ? "" : undefined,
      teamSize: providerType === "service" ? undefined : undefined,
      
      // Expertise
      primaryExpertise: [],
      blockchainExpertise: [],
      yearsSince: "",
      
      // Experience
      completedProjects: 0,
      notableClients: "",
      publicFindings: "",
      
      // Services / Methodology
      servicesOffered: providerType === "service" ? [] : undefined,
      methodologies: providerType === "auditor" ? [] : undefined,
      customTools: "",
      
      // Verification
      certifications: "",
      agreesToTerms: false,
      agreesToCodeOfConduct: false,
    },
  });
  
  const onSubmit = (values: ProviderFormValues) => {
    console.log(values);
    // In a real app, this would send data to an API
    toast.success("Application submitted successfully!", {
      description: "We'll review your application and get back to you soon.",
    });
    navigate("/application-submitted");
  };

  const handleArrayToggle = (field: keyof ProviderFormValues, value: string) => {
    // Get the current values array
    const currentValues = form.getValues(field) as string[] || [];
    
    // Toggle the value
    const updatedValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    // Set the updated values in the form
    form.setValue(field as any, updatedValues as any);
    
    // Update the local state for the badges display
    if (field === 'primaryExpertise') setSelectedExpertise(updatedValues);
    if (field === 'blockchainExpertise') setSelectedBlockchains(updatedValues);
    if (field === 'methodologies') setSelectedTools(updatedValues);
    if (field === 'servicesOffered') setSelectedServices(updatedValues);
  };

  const nextStep = () => {
    // Validate the current step fields before proceeding
    const fieldsToValidate = getFieldsForCurrentStep();
    
    form.trigger(fieldsToValidate as any[]).then(isValid => {
      if (isValid) {
        setCurrentStep(prev => {
          const newStep = prev + 1;
          setProgress((newStep + 1) * 20);
          return newStep;
        });
        window.scrollTo(0, 0);
      }
    });
  };

  const prevStep = () => {
    setCurrentStep(prev => {
      const newStep = Math.max(0, prev - 1);
      setProgress((newStep + 1) * 20);
      return newStep;
    });
    window.scrollTo(0, 0);
  };
  
  // Helper to determine which fields should be validated for the current step
  const getFieldsForCurrentStep = () => {
    switch (currentStep) {
      case 0: // Basic Info
        return providerType === 'service' 
          ? ['name', 'email', 'walletAddress', 'organization', 'teamSize'] 
          : ['name', 'email', 'walletAddress'];
      case 1: // Expertise
        return ['primaryExpertise', 'blockchainExpertise', 'yearsSince'];
      case 2: // Experience
        return ['completedProjects', 'notableClients'];
      case 3: // Services / Methodology
        return providerType === 'service' ? ['servicesOffered'] : ['methodologies'];
      case 4: // Verification
        return ['agreesToTerms', 'agreesToCodeOfConduct'];
      default:
        return [];
    }
  };
  
  // Render each step of the form
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Your email address" {...field} />
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
                  <FormLabel>Wallet Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Your blockchain wallet address" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter any blockchain wallet address you use (Ethereum, Solana, etc.)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {providerType === "service" && (
              <>
                <FormField
                  control={form.control}
                  name="organization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your company or organization name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="teamSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Team Size</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select team size" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1-5">1-5 people</SelectItem>
                          <SelectItem value="6-20">6-20 people</SelectItem>
                          <SelectItem value="21-50">21-50 people</SelectItem>
                          <SelectItem value="50+">50+ people</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://your-website.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="githubProfile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub Profile (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://github.com/yourusername" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
        
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <FormLabel>Primary Areas of Expertise</FormLabel>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {expertiseAreas.map(area => (
                  <div key={area.value} className="flex items-start space-x-2">
                    <Checkbox 
                      id={`expertise-${area.value}`}
                      checked={selectedExpertise.includes(area.value)}
                      onCheckedChange={() => handleArrayToggle('primaryExpertise', area.value)}
                    />
                    <label 
                      htmlFor={`expertise-${area.value}`} 
                      className="text-sm cursor-pointer leading-tight"
                    >
                      {area.label}
                    </label>
                  </div>
                ))}
              </div>
              <div className="mt-2">
                <div className="flex flex-wrap gap-1 my-2">
                  {selectedExpertise.map(exp => (
                    <Badge 
                      key={exp} 
                      variant="outline"
                      className="cursor-pointer bg-primary/10"
                      onClick={() => handleArrayToggle('primaryExpertise', exp)}
                    >
                      {expertiseAreas.find(a => a.value === exp)?.label}
                    </Badge>
                  ))}
                </div>
              </div>
              {form.formState.errors.primaryExpertise && (
                <p className="text-sm font-medium text-destructive mt-2">
                  {form.formState.errors.primaryExpertise.message}
                </p>
              )}
            </div>
            
            <div>
              <FormLabel>Blockchain Expertise</FormLabel>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {blockchainOptions.map(bc => (
                  <div key={bc.value} className="flex items-start space-x-2">
                    <Checkbox 
                      id={`bc-${bc.value}`}
                      checked={selectedBlockchains.includes(bc.value)}
                      onCheckedChange={() => handleArrayToggle('blockchainExpertise', bc.value)}
                    />
                    <label 
                      htmlFor={`bc-${bc.value}`} 
                      className="text-sm cursor-pointer leading-tight"
                    >
                      {bc.label}
                    </label>
                  </div>
                ))}
              </div>
              <div className="mt-2">
                <div className="flex flex-wrap gap-1 my-2">
                  {selectedBlockchains.map(bc => (
                    <Badge 
                      key={bc} 
                      variant="outline"
                      className="cursor-pointer bg-secondary/10"
                      onClick={() => handleArrayToggle('blockchainExpertise', bc)}
                    >
                      {blockchainOptions.find(a => a.value === bc)?.label}
                    </Badge>
                  ))}
                </div>
              </div>
              {form.formState.errors.blockchainExpertise && (
                <p className="text-sm font-medium text-destructive mt-2">
                  {form.formState.errors.blockchainExpertise.message}
                </p>
              )}
            </div>
            
            <FormField
              control={form.control}
              name="yearsSince"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience in Security</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select years of experience" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0-1">Less than 1 year</SelectItem>
                      <SelectItem value="1-3">1-3 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="5+">5+ years</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        
      case 2:
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="completedProjects"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Completed Security Projects</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0" 
                      placeholder="Number of completed audits/projects"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)} 
                    />
                  </FormControl>
                  <FormDescription>
                    How many blockchain security projects have you worked on?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="notableClients"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notable Clients (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="List some of your notable clients or projects"
                      className="resize-y min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Separate each client or project with a new line
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="publicFindings"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Public Findings (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Links to public security findings, bug reports, etc."
                      className="resize-y min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Share links to your public findings, vulnerability disclosures, or research
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
        
      case 3:
        if (providerType === "service") {
          return (
            <div className="space-y-6">
              <div>
                <FormLabel>Services Offered</FormLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  {serviceTypeOptions.map(service => (
                    <div key={service.value} className="flex items-start space-x-2">
                      <Checkbox 
                        id={`service-${service.value}`}
                        checked={selectedServices.includes(service.value)}
                        onCheckedChange={() => handleArrayToggle('servicesOffered', service.value)}
                      />
                      <label 
                        htmlFor={`service-${service.value}`} 
                        className="text-sm cursor-pointer leading-tight"
                      >
                        {service.label}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="mt-2">
                  <div className="flex flex-wrap gap-1 my-2">
                    {selectedServices.map(service => (
                      <Badge 
                        key={service} 
                        variant="outline"
                        className="cursor-pointer bg-primary/10"
                        onClick={() => handleArrayToggle('servicesOffered', service)}
                      >
                        {serviceTypeOptions.find(a => a.value === service)?.label}
                      </Badge>
                    ))}
                  </div>
                </div>
                {form.formState.errors.servicesOffered && (
                  <p className="text-sm font-medium text-destructive mt-2">
                    {form.formState.errors.servicesOffered?.message}
                  </p>
                )}
              </div>
              
              <FormField
                control={form.control}
                name="customTools"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Custom Tools & Methodologies (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe any proprietary tools or methodologies your team uses"
                        className="resize-y min-h-[100px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          );
        } else {
          return (
            <div className="space-y-6">
              <div>
                <FormLabel>Security Tools & Methods Used</FormLabel>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {securityToolOptions.map(tool => (
                    <div key={tool.value} className="flex items-start space-x-2">
                      <Checkbox 
                        id={`tool-${tool.value}`}
                        checked={selectedTools.includes(tool.value)}
                        onCheckedChange={() => handleArrayToggle('methodologies', tool.value)}
                      />
                      <label 
                        htmlFor={`tool-${tool.value}`} 
                        className="text-sm cursor-pointer leading-tight"
                      >
                        {tool.label}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="mt-2">
                  <div className="flex flex-wrap gap-1 my-2">
                    {selectedTools.map(tool => (
                      <Badge 
                        key={tool} 
                        variant="outline"
                        className="cursor-pointer bg-secondary/10"
                        onClick={() => handleArrayToggle('methodologies', tool)}
                      >
                        {securityToolOptions.find(a => a.value === tool)?.label}
                      </Badge>
                    ))}
                  </div>
                </div>
                {form.formState.errors.methodologies && (
                  <p className="text-sm font-medium text-destructive mt-2">
                    {form.formState.errors.methodologies.message}
                  </p>
                )}
              </div>
              
              <FormField
                control={form.control}
                name="customTools"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Tools & Techniques (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe any other tools or techniques you use"
                        className="resize-y min-h-[100px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          );
        }
        
      case 4:
        return (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="certifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Certifications & Credentials (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="List relevant security certifications or credentials"
                      className="resize-y min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Include security certifications, relevant educational background, or other credentials
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-4 pt-4 border-t">
              <FormField
                control={form.control}
                name="agreesToTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I agree to the Hawkly Terms of Service and Privacy Policy
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="agreesToCodeOfConduct"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I agree to follow the Hawkly Ethical Security Provider Code of Conduct
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">What happens next?</h3>
                <ol className="list-decimal pl-5 space-y-1 text-sm text-muted-foreground">
                  <li>Our team will review your application within 3-5 business days</li>
                  <li>You may be contacted for additional verification or a brief interview</li>
                  <li>Once approved, your profile will be activated on the marketplace</li>
                  <li>You'll start receiving project matches based on your expertise</li>
                </ol>
              </CardContent>
            </Card>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <OnboardingProgress 
          currentStep={currentStep} 
          progress={progress} 
          steps={steps} 
        />
        
        <ServiceProviderSteps 
          providerType={providerType}
          currentStep={currentStep}
          totalSteps={steps.length}
        />
        
        <div className="mt-6 space-y-6">
          {renderStepContent()}
                
          <div className="flex justify-between pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={currentStep === 0 ? () => navigate("/") : prevStep}
            >
              {currentStep === 0 ? "Cancel" : "Back"}
            </Button>
            
            {currentStep < steps.length - 1 ? (
              <Button 
                type="button" 
                onClick={nextStep} 
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              >
                Continue
              </Button>
            ) : (
              <Button 
                type="submit" 
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              >
                Submit Application
              </Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
}
