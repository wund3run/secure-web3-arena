
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { auditFormSchema, AuditFormValues } from "./settings-types";

const AuditSettingsForm = () => {
  const form = useForm<AuditFormValues>({
    resolver: zodResolver(auditFormSchema),
    defaultValues: {
      auditLogRetention: "90",
      enableDetailedLogs: true,
      sensitiveActions: true,
      autoExport: false,
    },
  });

  const onSubmit = (values: AuditFormValues) => {
    console.log("Audit settings:", values);
    toast.success("Audit settings updated successfully");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Audit Log Settings</CardTitle>
        <CardDescription>
          Configure how platform actions are tracked and logged
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} id="audit-form" className="space-y-6">
            <FormField
              control={form.control}
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
              control={form.control}
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
              control={form.control}
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
              control={form.control}
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
  );
};

export default AuditSettingsForm;
