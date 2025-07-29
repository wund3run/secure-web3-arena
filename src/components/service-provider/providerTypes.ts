
import { z } from "zod";

// Define the form schema with conditional fields based on provider type
export const providerFormSchema = z.object({
  // Basic Info - Common fields
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  walletAddress: z.string().min(5, { message: "Please enter a valid wallet address" }),
  website: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  githubProfile: z.string().url({ message: "Please enter a valid GitHub URL" }).optional().or(z.literal("")),

  // Service provider specific fields
  organization: z.string().min(2, { message: "Organization name is required" }).optional(),
  teamSize: z.string().optional(),

  // Expertise
  primaryExpertise: z.array(z.string()).min(1, { message: "Please select at least one area of expertise" }),
  blockchainExpertise: z.array(z.string()).min(1, { message: "Please select at least one blockchain" }),
  yearsSince: z.string(),
  
  // Experience
  completedProjects: z.number().min(0),
  notableClients: z.string().optional(),
  publicFindings: z.string().optional(),
  
  // Services (for service providers) or Methodology (for auditors)
  servicesOffered: z.array(z.string()).optional(),
  methodologies: z.array(z.string()).optional(),
  customTools: z.string().optional(),
  
  // Verification
  certifications: z.string().optional(),
  agreesToTerms: z.boolean().refine(val => val === true, { message: "You must agree to the terms and conditions" }),
  agreesToCodeOfConduct: z.boolean().refine(val => val === true, { message: "You must agree to the code of conduct" }),
});

export type ProviderFormValues = z.infer<typeof providerFormSchema>;

export const serviceTypeOptions = [
  { value: "smart-contract-audit", label: "Smart Contract Audit" },
  { value: "protocol-audit", label: "Protocol Audit" },
  { value: "penetration-testing", label: "Penetration Testing" },
  { value: "code-review", label: "Code Review" },
  { value: "architecture-review", label: "Architecture Review" },
  { value: "security-consulting", label: "Security Consulting" },
  { value: "threat-modeling", label: "Threat Modeling" },
  { value: "incident-response", label: "Incident Response" },
  { value: "security-training", label: "Security Training" },
  { value: "continuous-monitoring", label: "Continuous Monitoring" },
];
