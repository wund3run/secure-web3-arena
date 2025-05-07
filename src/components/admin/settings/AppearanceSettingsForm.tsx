
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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { appearanceFormSchema, AppearanceFormValues } from "./settings-types";

const AppearanceSettingsForm = () => {
  const form = useForm<AppearanceFormValues>({
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

  const onSubmit = (values: AppearanceFormValues) => {
    console.log("Appearance settings:", values);
    toast.success("Appearance settings updated successfully");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance Settings</CardTitle>
        <CardDescription>
          Customize platform appearance and branding
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} id="appearance-form" className="space-y-6">
            <FormField
              control={form.control}
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
              control={form.control}
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
              control={form.control}
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
              control={form.control}
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
              control={form.control}
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
              control={form.control}
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
  );
};

export default AppearanceSettingsForm;
