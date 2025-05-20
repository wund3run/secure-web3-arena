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

export function ServiceProviderOnboardingForm() {
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
      const userType = "auditor";
      await signUp(data.email, data.email, data.name, userType);
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
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="johndoe@example.com" {...register("email")} />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
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
              <p className="text-sm text-red-500">{errors.walletAddress.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              type="url"
              placeholder="https://example.com"
              {...register("website")}
            />
            {errors.website && (
              <p className="text-sm text-red-500">{errors.website.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="githubProfile">GitHub Profile</Label>
            <Input
              id="githubProfile"
              type="url"
              placeholder="https://github.com/johndoe"
              {...register("githubProfile")}
            />
            {errors.githubProfile && (
              <p className="text-sm text-red-500">
                {errors.githubProfile.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="organization">Organization</Label>
              <Input
                id="organization"
                type="text"
                placeholder="Acme Corp"
                {...register("organization")}
              />
              {errors.organization && (
                <p className="text-sm text-red-500">
                  {errors.organization.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="teamSize">Team Size</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select team size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-5">1-5</SelectItem>
                  <SelectItem value="6-10">6-10</SelectItem>
                  <SelectItem value="11-20">11-20</SelectItem>
                  <SelectItem value="21-50">21-50</SelectItem>
                  <SelectItem value="50+">50+</SelectItem>
                </SelectContent>
              </Select>
              {errors.teamSize && (
                <p className="text-sm text-red-500">{errors.teamSize.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="primaryExpertise">Primary Expertise</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select primary expertise" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Smart Contract Audits">
                  Smart Contract Audits
                </SelectItem>
                <SelectItem value="Web3 Security">Web3 Security</SelectItem>
                <SelectItem value="Penetration Testing">
                  Penetration Testing
                </SelectItem>
                <SelectItem value="Security Consulting">
                  Security Consulting
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.primaryExpertise && (
              <p className="text-sm text-red-500">
                {errors.primaryExpertise.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="blockchainExpertise">Blockchain Expertise</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select blockchain expertise" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ethereum">Ethereum</SelectItem>
                <SelectItem value="Solana">Solana</SelectItem>
                <SelectItem value="Cosmos">Cosmos</SelectItem>
                <SelectItem value="Polkadot">Polkadot</SelectItem>
                <SelectItem value="Avalanche">Avalanche</SelectItem>
              </SelectContent>
            </Select>
            {errors.blockchainExpertise && (
              <p className="text-sm text-red-500">
                {errors.blockchainExpertise.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="yearsSince">Years Since Active</Label>
              <Input
                id="yearsSince"
                type="number"
                placeholder="5"
                {...register("yearsSince")}
              />
              {errors.yearsSince && (
                <p className="text-sm text-red-500">
                  {errors.yearsSince.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="completedProjects">Completed Projects</Label>
              <Input
                id="completedProjects"
                type="number"
                placeholder="100"
                {...register("completedProjects")}
              />
              {errors.completedProjects && (
                <p className="text-sm text-red-500">
                  {errors.completedProjects.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="notableClients">Notable Clients</Label>
            <Textarea
              id="notableClients"
              placeholder="List notable clients"
              {...register("notableClients")}
            />
            {errors.notableClients && (
              <p className="text-sm text-red-500">
                {errors.notableClients.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="publicFindings">Public Findings</Label>
            <Textarea
              id="publicFindings"
              placeholder="List public findings"
              {...register("publicFindings")}
            />
            {errors.publicFindings && (
              <p className="text-sm text-red-500">
                {errors.publicFindings.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="servicesOffered">Services Offered</Label>
            <Textarea
              id="servicesOffered"
              placeholder="List services offered"
              {...register("servicesOffered")}
            />
            {errors.servicesOffered && (
              <p className="text-sm text-red-500">
                {errors.servicesOffered.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="methodologies">Methodologies</Label>
            <Textarea
              id="methodologies"
              placeholder="List methodologies"
              {...register("methodologies")}
            />
            {errors.methodologies && (
              <p className="text-sm text-red-500">
                {errors.methodologies.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="customTools">Custom Tools</Label>
            <Textarea
              id="customTools"
              placeholder="List custom tools"
              {...register("customTools")}
            />
            {errors.customTools && (
              <p className="text-sm text-red-500">
                {errors.customTools.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="certifications">Certifications</Label>
            <Textarea
              id="certifications"
              placeholder="List certifications"
              {...register("certifications")}
            />
            {errors.certifications && (
              <p className="text-sm text-red-500">
                {errors.certifications.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="terms" 
                {...register("agreesToTerms")} 
              />
              <div className="grid gap-1.5 leading-none">
                <div className="text-sm text-gray-500 flex items-center">
                  I agree to the 
                  <Dialog open={isTermsOpen} onOpenChange={setIsTermsOpen}>
                    <DialogTrigger asChild>
                      <Button variant="link" className="h-auto p-0 mx-1">
                        Terms of Service
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Terms of Service</DialogTitle>
                        <DialogDescription>
                          Please review our Terms of Service carefully.
                        </DialogDescription>
                      </DialogHeader>
                      <TermsOfService onAccept={() => {
                        form.setValue("agreesToTerms", true);
                        setIsTermsOpen(false);
                      }} />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
            {errors.agreesToTerms && (
              <p className="text-sm text-red-500">{errors.agreesToTerms.message}</p>
            )}

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="codeOfConduct" 
                {...register("agreesToCodeOfConduct")} 
              />
              <div className="grid gap-1.5 leading-none">
                <div className="text-sm text-gray-500 flex items-center">
                  I agree to the 
                  <Dialog open={isCodeOfConductOpen} onOpenChange={setIsCodeOfConductOpen}>
                    <DialogTrigger asChild>
                      <Button variant="link" className="h-auto p-0 mx-1">
                        Code of Conduct
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Code of Conduct</DialogTitle>
                        <DialogDescription>
                          Please review our Code of Conduct carefully.
                        </DialogDescription>
                      </DialogHeader>
                      <CodeOfConduct onAccept={() => {
                        form.setValue("agreesToCodeOfConduct", true);
                        setIsCodeOfConductOpen(false);
                      }} />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
            {errors.agreesToCodeOfConduct && (
              <p className="text-sm text-red-500">{errors.agreesToCodeOfConduct.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full mt-4">Submit Application</Button>
        </form>
      </CardContent>
    </Card>
  );
}
