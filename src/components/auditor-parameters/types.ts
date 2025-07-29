
import { z } from "zod";

// Define form schema
export const formSchema = z.object({
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
  staticAnalysis: z.boolean(),
  formalVerification: z.boolean(),
  fuzzTesting: z.boolean(),
  
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

export type FormValues = z.infer<typeof formSchema>;

// Option type for multi-select inputs
export interface SelectOption {
  value: string;
  label: string;
}
