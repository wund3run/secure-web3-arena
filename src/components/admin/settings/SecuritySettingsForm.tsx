import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
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
import { securityFormSchema, SecurityFormValues } from "./settings-types";

const SecuritySettingsForm = () => {
  const form = useForm<SecurityFormValues>({
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

  const onSubmit: SubmitHandler<SecurityFormValues> = (values: SecurityFormValues) => {
    console.log("Security settings:", values);
    toast.success("Security settings updated successfully");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
        <CardDescription>
          Configure security preferences for the platform
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} id="security-form" className="space-y-6">
            <FormField
              control={form.control}
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
              control={form.control}
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
              control={form.control}
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
              control={form.control}
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
              control={form.control}
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
              control={form.control}
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
  );
};

export default SecuritySettingsForm;
