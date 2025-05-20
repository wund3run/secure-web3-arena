// Import the correct type for user_type at the top
import { useState } from 'react';
import { useAuth } from '@/contexts/auth';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { providerFormSchema, ProviderFormValues } from './providerTypes';
import { TermsOfService } from "@/components/terms/terms-of-service";
import { CodeOfConduct } from "@/components/terms/code-of-conduct";

// Add a user_type utility type for proper typing
type UserType = "auditor" | "project_owner";

interface ServiceProviderOnboardingFormProps {
  providerType: "auditor" | "service";
}

export function ServiceProviderOnboardingForm({ providerType }: ServiceProviderOnboardingFormProps) {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isCodeOfConductOpen, setIsCodeOfConductOpen] = useState(false);

  const form = useForm<ProviderFormValues>({
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
      agreesToCodeOfConduct: false,
    },
  });

  const { register, handleSubmit, formState: { errors } } = form;

  const onSubmit = async (data: ProviderFormValues) => {
    try {
      // Use the providerType from props as the user_type
      await signUp(data.email, data.email, { 
        full_name: data.name,
        user_type: providerType
      });
      
      toast({
        title: "Application Submitted",
        description: "Your application has been submitted successfully.",
      })
      navigate('/application-submitted');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your submission. Please try again.",
      })
    }
  };
  
  return (
    <Card className="border border-border/40 shadow-sm backdrop-blur-sm bg-white/80">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Security Expert Application
        </CardTitle>
        <CardDescription className="text-center">
          Fill out the form below to apply as a security expert.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" {...register("name")} />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="john.doe@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="walletAddress">Wallet Address</Label>
              <Input
                id="walletAddress"
                placeholder="0x..."
                {...register("walletAddress")}
              />
              {errors.walletAddress && (
                <p className="text-sm text-red-500">
                  {errors.walletAddress.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="website">Website (Optional)</Label>
              <Input
                id="website"
                placeholder="https://example.com"
                {...register("website")}
              />
              {errors.website && (
                <p className="text-sm text-red-500">{errors.website.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="githubProfile">GitHub Profile (Optional)</Label>
            <Input
              id="githubProfile"
              placeholder="https://github.com/johndoe"
              {...register("githubProfile")}
            />
            {errors.githubProfile && (
              <p className="text-sm text-red-500">
                {errors.githubProfile.message}
              </p>
            )}
          </div>

          {/* Service Provider Specific Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="organization">Organization</Label>
              <Input
                id="organization"
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
              <Label htmlFor="teamSize">Team Size (Optional)</Label>
              <Input
                id="teamSize"
                placeholder="e.g., 1-10, 11-50"
                {...register("teamSize")}
              />
              {errors.teamSize && (
                <p className="text-sm text-red-500">{errors.teamSize.message}</p>
              )}
            </div>
          </div>

          {/* Expertise */}
          <div>
            <Label htmlFor="primaryExpertise">Areas of Expertise</Label>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center space-x-2">
                <Input
                  type="checkbox"
                  id="smartContractAudit"
                  value="smart-contract-audit"
                  {...register("primaryExpertise")}
                />
                <Label htmlFor="smartContractAudit">Smart Contract Audit</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="checkbox"
                  id="protocolAudit"
                  value="protocol-audit"
                  {...register("primaryExpertise")}
                />
                <Label htmlFor="protocolAudit">Protocol Audit</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="checkbox"
                  id="penetrationTesting"
                  value="penetration-testing"
                  {...register("primaryExpertise")}
                />
                <Label htmlFor="penetrationTesting">Penetration Testing</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="checkbox"
                  id="codeReview"
                  value="code-review"
                  {...register("primaryExpertise")}
                />
                <Label htmlFor="codeReview">Code Review</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="checkbox"
                  id="architectureReview"
                  value="architecture-review"
                  {...register("primaryExpertise")}
                />
                <Label htmlFor="architectureReview">Architecture Review</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="checkbox"
                  id="securityConsulting"
                  value="security-consulting"
                  {...register("primaryExpertise")}
                />
                <Label htmlFor="securityConsulting">Security Consulting</Label>
              </div>
            </div>
            {errors.primaryExpertise && (
              <p className="text-sm text-red-500">
                {errors.primaryExpertise.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="blockchainExpertise">Blockchain Expertise</Label>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center space-x-2">
                <Input
                  type="checkbox"
                  id="ethereum"
                  value="ethereum"
                  {...register("blockchainExpertise")}
                />
                <Label htmlFor="ethereum">Ethereum</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="checkbox"
                  id="polygon"
                  value="polygon"
                  {...register("blockchainExpertise")}
                />
                <Label htmlFor="polygon">Polygon</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="checkbox"
                  id="binanceSmartChain"
                  value="binance-smart-chain"
                  {...register("blockchainExpertise")}
                />
                <Label htmlFor="binanceSmartChain">Binance Smart Chain</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="checkbox"
                  id="solana"
                  value="solana"
                  {...register("blockchainExpertise")}
                />
                <Label htmlFor="solana">Solana</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="checkbox"
                  id="avalanche"
                  value="avalanche"
                  {...register("blockchainExpertise")}
                />
                <Label htmlFor="avalanche">Avalanche</Label>
              </div>
            </div>
            {errors.blockchainExpertise && (
              <p className="text-sm text-red-500">
                {errors.blockchainExpertise.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="yearsSince">Years of Experience</Label>
            <Input
              id="yearsSince"
              placeholder="e.g., 3+, 5+"
              {...register("yearsSince")}
            />
            {errors.yearsSince && (
              <p className="text-sm text-red-500">{errors.yearsSince.message}</p>
            )}
          </div>

          {/* Experience */}
          <div>
            <Label htmlFor="completedProjects">Completed Projects</Label>
            <Input
              id="completedProjects"
              type="number"
              placeholder="e.g., 10, 50"
              {...register("completedProjects", { valueAsNumber: true })}
            />
            {errors.completedProjects && (
              <p className="text-sm text-red-500">
                {errors.completedProjects.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="notableClients">Notable Clients (Optional)</Label>
            <Input
              id="notableClients"
              placeholder="e.g., Company A, Project B"
              {...register("notableClients")}
            />
            {errors.notableClients && (
              <p className="text-sm text-red-500">
                {errors.notableClients.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="publicFindings">
              Links to Public Findings/Audits (Optional)
            </Label>
            <Input
              id="publicFindings"
              placeholder="e.g., link1, link2"
              {...register("publicFindings")}
            />
            {errors.publicFindings && (
              <p className="text-sm text-red-500">
                {errors.publicFindings.message}
              </p>
            )}
          </div>

          {/* Services Offered */}
          <div>
            <Label htmlFor="servicesOffered">Services Offered</Label>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center space-x-2">
                <Input
                  type="checkbox"
                  id="smartContractAuditService"
                  value="smart-contract-audit"
                  {...register("servicesOffered")}
                />
                <Label htmlFor="smartContractAuditService">
                  Smart Contract Audit
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="checkbox"
                  id="protocolAuditService"
                  value="protocol-audit"
                  {...register("servicesOffered")}
                />
                <Label htmlFor="protocolAuditService">Protocol Audit</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="checkbox"
                  id="penetrationTestingService"
                  value="penetration-testing"
                  {...register("servicesOffered")}
                />
                <Label htmlFor="penetrationTestingService">
                  Penetration Testing
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="checkbox"
                  id="codeReviewService"
                  value="code-review"
                  {...register("servicesOffered")}
                />
                <Label htmlFor="codeReviewService">Code Review</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="checkbox"
                  id="architectureReviewService"
                  value="architecture-review"
                  {...register("servicesOffered")}
                />
                <Label htmlFor="architectureReviewService">
                  Architecture Review
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="checkbox"
                  id="securityConsultingService"
                  value="security-consulting"
                  {...register("servicesOffered")}
                />
                <Label htmlFor="securityConsultingService">
                  Security Consulting
                </Label>
              </div>
            </div>
            {errors.servicesOffered && (
              <p className="text-sm text-red-500">
                {errors.servicesOffered.message}
              </p>
            )}
          </div>

          {/* Methodologies */}
          <div>
            <Label htmlFor="methodologies">Methodologies Used</Label>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center space-x-2">
                <Input
                  type="checkbox"
                  id="staticAnalysis"
                  value="static-analysis"
                  {...register("methodologies")}
                />
                <Label htmlFor="staticAnalysis">Static Analysis</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="checkbox"
                  id="dynamicAnalysis"
                  value="dynamic-analysis"
                  {...register("methodologies")}
                />
                <Label htmlFor="dynamicAnalysis">Dynamic Analysis</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="checkbox"
                  id="manualReview"
                  value="manual-review"
                  {...register("methodologies")}
                />
                <Label htmlFor="manualReview">Manual Review</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="checkbox"
                  id="fuzzing"
                  value="fuzzing"
                  {...register("methodologies")}
                />
                <Label htmlFor="fuzzing">Fuzzing</Label>
              </div>
            </div>
            {errors.methodologies && (
              <p className="text-sm text-red-500">
                {errors.methodologies.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="customTools">Custom Tools (Optional)</Label>
            <Input
              id="customTools"
              placeholder="e.g., Tool A, Tool B"
              {...register("customTools")}
            />
            {errors.customTools && (
              <p className="text-sm text-red-500">{errors.customTools.message}</p>
            )}
          </div>

          {/* Verification */}
          <div>
            <Label htmlFor="certifications">Certifications (Optional)</Label>
            <Input
              id="certifications"
              placeholder="e.g., Cert A, Cert B"
              {...register("certifications")}
            />
            {errors.certifications && (
              <p className="text-sm text-red-500">
                {errors.certifications.message}
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <Input
                type="checkbox"
                id="agreesToTerms"
                {...register("agreesToTerms")}
              />
              <Label htmlFor="agreesToTerms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
                I agree to the <Button variant="link" onClick={() => setIsTermsOpen(true)}>Terms of Service</Button>
              </Label>
            </div>
            {errors.agreesToTerms && (
              <p className="text-sm text-red-500">
                {errors.agreesToTerms.message}
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <Input
                type="checkbox"
                id="agreesToCodeOfConduct"
                {...register("agreesToCodeOfConduct")}
              />
              <Label htmlFor="agreesToCodeOfConduct" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
                I agree to the <Button variant="link" onClick={() => setIsCodeOfConductOpen(true)}>Code of Conduct</Button>
              </Label>
            </div>
            {errors.agreesToCodeOfConduct && (
              <p className="text-sm text-red-500">
                {errors.agreesToCodeOfConduct.message}
              </p>
            )}
          </div>

          <Button className="w-full" type="submit">
            Submit Application
          </Button>
        </form>
      </CardContent>
      
      <TermsOfService open={isTermsOpen} onOpenChange={setIsTermsOpen} />
      <CodeOfConduct open={isCodeOfConductOpen} onOpenChange={setIsCodeOfConductOpen} />
    </Card>
  );
}
