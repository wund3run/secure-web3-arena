import { useState } from "react";
import { useAuth } from "@/contexts/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { providerFormSchema } from "./providerTypes";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { TermsOfService } from "@/components/layout/TermsOfService";
import { CodeOfConduct } from "@/components/layout/CodeOfConduct";

interface ServiceProviderOnboardingFormProps {
  providerType: "auditor" | "service";
}

export function ServiceProviderOnboardingForm({ providerType }: ServiceProviderOnboardingFormProps) {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isCodeOfConductOpen, setIsCodeOfConductOpen] = useState(false);
  
  const form = useForm({
    resolver: zodResolver(providerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      walletAddress: "",
      website: "",
      githubProfile: "",
      organization: "",
      teamSize: "",
      primaryExpertise: [],
      blockchainExpertise: [],
      yearsSince: "",
      completedProjects: 0,
      notableClients: "",
      publicFindings: "",
      servicesOffered: [],
      methodologies: [],
      customTools: "",
      certifications: "",
      agreesToTerms: false,
      agreesToCodeOfConduct: false
    }
  });
  
  const { register, handleSubmit, formState: { errors } } = form;
  
  const onSubmit = async (data: any) => {
    try {
      // Use the providerType prop to set the user type
      const userType = providerType === "auditor" ? "auditor" : "project_owner";
      
      // Create metadata with user information
      const metadata = {
        full_name: data.name,
        user_type: userType,
        wallet_address: data.walletAddress,
        website: data.website
      };
      
      // Fixed: Pass parameters properly according to the function signature
      await signUp(data.email, data.email, metadata);
      
      toast({
        title: "Application Submitted",
        description: "Your application has been submitted successfully."
      });
      
      navigate("/application-submitted");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your submission. Please try again."
      });
    }
  };
  
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Service Provider Onboarding</CardTitle>
        <CardDescription>
          Fill out the form below to apply as a service provider on our platform.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="grid gap-6">
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" type="text" placeholder="John Doe" {...register("name")} />
              {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message as string}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="johndoe@example.com" {...register("email")} />
              {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message as string}</p>
              )}
            </div>
          </div>
          
          <div>
            <Label htmlFor="walletAddress">Wallet Address</Label>
            <Input 
              id="walletAddress" 
              type="text" 
              placeholder="0x..." 
              {...register("walletAddress")} 
            />
            {errors.walletAddress && (
            <p className="text-sm text-red-500">{errors.walletAddress.message as string}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="website">Website URL (optional)</Label>
            <Input id="website" type="url" placeholder="https://" {...register("website")} />
            {errors.website && (
            <p className="text-sm text-red-500">{errors.website.message as string}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="githubProfile">GitHub Profile URL (optional)</Label>
            <Input id="githubProfile" type="url" placeholder="https://github.com/" {...register("githubProfile")} />
            {errors.githubProfile && (
            <p className="text-sm text-red-500">{errors.githubProfile.message as string}</p>
            )}
          </div>
          
          {providerType === "service" && (
            <>
              <div>
                <Label htmlFor="organization">Organization Name</Label>
                <Input id="organization" type="text" placeholder="Security Firm Inc." {...register("organization")} />
                {errors.organization && (
                <p className="text-sm text-red-500">{errors.organization.message as string}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="teamSize">Team Size</Label>
                <Select>
                  <SelectTrigger id="teamSize">
                    <SelectValue placeholder="Select team size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-5">1-5 members</SelectItem>
                    <SelectItem value="6-15">6-15 members</SelectItem>
                    <SelectItem value="16-50">16-50 members</SelectItem>
                    <SelectItem value="50+">50+ members</SelectItem>
                  </SelectContent>
                </Select>
                {errors.teamSize && (
                <p className="text-sm text-red-500">{errors.teamSize.message as string}</p>
                )}
              </div>
            </>
          )}
          
          <div>
            <Label htmlFor="experience">Years of Experience</Label>
            <Input id="experience" type="number" min="0" max="50" {...register("yearsSince")} />
            {errors.yearsSince && (
            <p className="text-sm text-red-500">{errors.yearsSince.message as string}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="completedProjects">Completed Security Projects</Label>
            <Input id="completedProjects" type="number" min="0" {...register("completedProjects")} />
            {errors.completedProjects && (
            <p className="text-sm text-red-500">{errors.completedProjects.message as string}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="certifications">Relevant Certifications (optional)</Label>
            <Textarea 
              id="certifications" 
              placeholder="List any relevant security certifications" 
              className="min-h-[80px]"
              {...register("certifications")} 
            />
            {errors.certifications && (
            <p className="text-sm text-red-500">{errors.certifications.message as string}</p>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="termsAccepted" 
                  {...register("agreesToTerms")} 
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="termsAccepted"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                  >
                    I agree to the 
                    <Dialog open={isTermsOpen} onOpenChange={setIsTermsOpen}>
                      <DialogTrigger asChild>
                        <Button variant="link" className="h-auto p-0 px-1">Terms of Service</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
                        <DialogHeader>
                          <DialogTitle>Terms of Service</DialogTitle>
                          <DialogDescription>
                            Please read our terms of service carefully
                          </DialogDescription>
                        </DialogHeader>
                        <TermsOfService />
                      </DialogContent>
                    </Dialog>
                  </label>
                </div>
              </div>
              {errors.agreesToTerms && (
                <p className="text-sm text-red-500">{errors.agreesToTerms.message as string}</p>
              )}
            </div>
            
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="conductAccepted" 
                  {...register("agreesToCodeOfConduct")} 
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="conductAccepted"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                  >
                    I agree to the 
                    <Dialog open={isCodeOfConductOpen} onOpenChange={setIsCodeOfConductOpen}>
                      <DialogTrigger asChild>
                        <Button variant="link" className="h-auto p-0 px-1">Code of Conduct</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
                        <DialogHeader>
                          <DialogTitle>Code of Conduct</DialogTitle>
                          <DialogDescription>
                            Please review our code of conduct before proceeding
                          </DialogDescription>
                        </DialogHeader>
                        <CodeOfConduct />
                      </DialogContent>
                    </Dialog>
                  </label>
                </div>
              </div>
              {errors.agreesToCodeOfConduct && (
                <p className="text-sm text-red-500">{errors.agreesToCodeOfConduct.message as string}</p>
              )}
            </div>
          </div>
          
          <Button type="submit" className="mt-4">Submit Application</Button>
        </form>
      </CardContent>
    </Card>
  );
}
