import * as z from "zod";

export const securityFormSchema = z.object({
  twoFactorAuth: z.boolean(),
  sessionTimeout: z.string().min(1, { message: "Session timeout is required" }),
  passwordExpiry: z.string().min(1, { message: "Password expiry is required" }),
  ipRestriction: z.boolean(),
  loginAttempts: z.string().min(1, { message: "Max login attempts is required" }),
  otpExpiryTime: z.string().min(1, { message: "OTP expiry time is required" }),
});

export const auditFormSchema = z.object({
  auditLogRetention: z.string().min(1, { message: "Audit log retention is required" }),
  enableDetailedLogs: z.boolean(),
  sensitiveActions: z.boolean(),
  autoExport: z.boolean(),
});

export const appearanceFormSchema = z.object({
  platformName: z.string().min(1, { message: "Platform name is required" }),
  logoUrl: z.string().optional(),
  primaryColor: z.string().min(1, { message: "Primary color is required" }),
  darkMode: z.boolean(),
  termsContent: z.string().optional(),
  privacyContent: z.string().optional(),
});

export type SecurityFormValues = z.infer<typeof securityFormSchema>;
export type AuditFormValues = z.infer<typeof auditFormSchema>;
export type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;
