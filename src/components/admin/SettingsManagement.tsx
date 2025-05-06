import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

const securityFormSchema = z.object({
  twoFactorAuth: z.boolean().default(false),
  sessionTimeout: z.string().min(1, { message: "Session timeout is required" }),
  passwordExpiry: z.string().min(1, { message: "Password expiry is required" }),
  ipRestriction: z.boolean().default(false),
  loginAttempts: z.string().min(1, { message: "Max login attempts is required" }),
  otpExpiryTime: z.string().min(1, { message: "OTP expiry time is required" }),
});

const auditFormSchema = z.object({
  auditLogRetention: z.string().min(1, { message: "Audit log retention is required" }),
  enableDetailedLogs: z.boolean().default(true),
  sensitiveActions: z.boolean().default(true),
  autoExport: z.boolean().default(false),
});

const appearanceFormSchema = z.object({
  platformName: z.string().min(1, { message: "Platform name is required" }),
  logoUrl: z.string().optional(),
  primaryColor: z.string().min(1, { message: "Primary color is required" }),
  darkMode: z.boolean().default(false),
  termsContent: z.string().optional(),
  privacyContent: z.string().optional(),
});

const SettingsManagement = () => {
  const [activeTab, setActiveTab] = useState("security");

  // Security form
  const securityForm = useForm<z.infer<typeof securityFormSchema>>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      twoFactorAuth: false,
      sessionTimeout: "30",
      passwordExpiry: "90",
      ipRestriction: false,
      loginAttempts: "5",
      otpExpiryTime: "5", // 5 minutes default
    },
  });

  // Audit form
  const auditForm = useForm<z.infer<typeof auditFormSchema>>({
    resolver: zodResolver(auditFormSchema),
    defaultValues: {
      auditLogRetention: "90",
      enableDetailedLogs: true,
      sensitiveActions: true,
      autoExport: false,
    },
  });

  // Appearance form
  const appearanceForm = useForm<z.infer<typeof appearanceFormSchema>>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: {
      platformName: "Hawkly",
      logoUrl: "",
      primaryColor: "#5E35B1",
      darkMode: false,
      termsContent: "",
      privacyContent: "",
    },
  });

  const onSecuritySubmit = (values: z.infer<typeof securityFormSchema>) => {
    console.log("Security settings:", values);
    toast.success("Security settings updated successfully");
  };

  const onAuditSubmit = (values: z.infer<typeof auditFormSchema>) => {
    console.log("Audit settings:", values);
    toast.success("Audit settings updated successfully");
  };

  const onAppearanceSubmit = (values: z.infer<typeof appearanceFormSchema>) => {
    console.log("Appearance settings:", values);
    toast.success("Appearance settings updated successfully");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground mt-2">
          Manage your platform settings and preferences.
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-3 lg:max-w-md">
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure security preferences for the platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Form {...securityForm}>
                <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)} id="security-form" className="space-y-6">
                  <FormField
                    control={securityForm.control}
                    name="twoFactorAuth"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between">
                        <div className="space-y-0.5">
                          <FormLabel>Two Factor Authentication</FormLabel>
                          <FormDescription>
                            Require admins to use 2FA when logging in
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={securityForm.control}
                    name="sessionTimeout"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Session Timeout (minutes)</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" min="1" />
                        </FormControl>
                        <FormDescription>
                          How long before inactive users are logged out
                        </FormDescription>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={securityForm.control}
                    name="passwordExpiry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password Expiry (days)</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" min="1" />
                        </FormControl>
                        <FormDescription>
                          How often users must change their passwords
                        </FormDescription>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={securityForm.control}
                    name="otpExpiryTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>OTP Expiry Time (minutes)</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" min="1" max="15" />
                        </FormControl>
                        <FormDescription>
                          How long before OTP codes expire (recommended: 5-15 minutes)
                        </FormDescription>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={securityForm.control}
                    name="ipRestriction"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between">
                        <div className="space-y-0.5">
                          <FormLabel>IP Restriction</FormLabel>
                          <FormDescription>
                            Limit admin access to specific IP addresses
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={securityForm.control}
                    name="loginAttempts"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Max Login Attempts</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" min="1" />
                        </FormControl>
                        <FormDescription>
                          Number of failed attempts before account lockout
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
            <CardFooter>
              <Button form="security-form" type="submit">Save Security Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Audit Log Settings */}
        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Audit Log Settings</CardTitle>
              <CardDescription>
                Configure how platform actions are tracked and logged
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Form {...auditForm}>
                <form onSubmit={auditForm.handleSubmit(onAuditSubmit)} id="audit-form" className="space-y-6">
                  <FormField
                    control={auditForm.control}
                    name="auditLogRetention"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Log Retention Period (days)</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" min="1" />
                        </FormControl>
                        <FormDescription>
                          How long to keep audit logs before deletion
                        </FormDescription>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={auditForm.control}
                    name="enableDetailedLogs"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between">
                        <div className="space-y-0.5">
                          <FormLabel>Enable Detailed Logging</FormLabel>
                          <FormDescription>
                            Capture comprehensive details for all actions
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={auditForm.control}
                    name="sensitiveActions"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between">
                        <div className="space-y-0.5">
                          <FormLabel>Log Sensitive Actions</FormLabel>
                          <FormDescription>
                            Track high-security operations separately
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={auditForm.control}
                    name="autoExport"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between">
                        <div className="space-y-0.5">
                          <FormLabel>Automatic Log Export</FormLabel>
                          <FormDescription>
                            Schedule regular exports of audit logs
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
            <CardFooter>
              <Button form="audit-form" type="submit">Save Audit Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize platform appearance and branding
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Form {...appearanceForm}>
                <form onSubmit={appearanceForm.handleSubmit(onAppearanceSubmit)} id="appearance-form" className="space-y-6">
                  <FormField
                    control={appearanceForm.control}
                    name="platformName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Platform Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          Your platform's display name
                        </FormDescription>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={appearanceForm.control}
                    name="logoUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Logo URL</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://example.com/logo.png" />
                        </FormControl>
                        <FormDescription>
                          URL to your platform logo image
                        </FormDescription>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={appearanceForm.control}
                    name="primaryColor"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Primary Color</FormLabel>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-6 h-6 rounded border" 
                            style={{ backgroundColor: field.value }}
                          />
                          <FormControl>
                            <Input {...field} type="text" />
                          </FormControl>
                        </div>
                        <FormDescription>
                          Hex code for your main brand color
                        </FormDescription>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={appearanceForm.control}
                    name="darkMode"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between">
                        <div className="space-y-0.5">
                          <FormLabel>Dark Mode Default</FormLabel>
                          <FormDescription>
                            Set dark mode as the default appearance
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Separator />
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Legal Content</h3>
                    <p className="text-sm text-muted-foreground">
                      Update your platform's legal documents
                    </p>
                  </div>

                  <FormField
                    control={appearanceForm.control}
                    name="termsContent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Terms & Conditions</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Enter your Terms & Conditions content here"
                            className="min-h-[150px]"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={appearanceForm.control}
                    name="privacyContent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Privacy Policy</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Enter your Privacy Policy content here"
                            className="min-h-[150px]"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
            <CardFooter>
              <Button form="appearance-form" type="submit">Save Appearance Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsManagement;
