
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { MultiSelect } from "@/components/ui/multi-select";

// Define schema for the form
const serviceSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }).max(100),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }).max(2000),
  category: z.string().min(1, { message: "Please select a category" }),
  blockchain_ecosystems: z.array(z.string()).min(1, { message: "Select at least one blockchain" }),
  delivery_time: z.number().int().positive(),
  price_range: z.object({
    min: z.number().int().positive(),
    max: z.number().int().positive(),
  }),
  portfolio_link: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  requirements: z.string().max(1000).optional(),
});

type ServiceFormValues = z.infer<typeof serviceSchema>;

// Category options
const CATEGORIES = [
  { label: "Smart Contract Audit", value: "smart-contract-audit" },
  { label: "Protocol Audit", value: "protocol-audit" },
  { label: "DApp Security Review", value: "dapp-review" },
  { label: "Formal Verification", value: "formal-verification" },
  { label: "Penetration Testing", value: "penetration-testing" },
  { label: "Code Review", value: "code-review" },
  { label: "Security Consulting", value: "security-consulting" },
];

// Blockchain options
const BLOCKCHAIN_OPTIONS = [
  { label: "Ethereum", value: "ethereum" },
  { label: "Solana", value: "solana" },
  { label: "Binance Smart Chain", value: "bsc" },
  { label: "Avalanche", value: "avalanche" },
  { label: "Polygon", value: "polygon" },
  { label: "Near", value: "near" },
  { label: "Polkadot", value: "polkadot" },
  { label: "Cosmos", value: "cosmos" },
  { label: "Arbitrum", value: "arbitrum" },
  { label: "Optimism", value: "optimism" },
  { label: "Base", value: "base" },
  { label: "Other", value: "other" },
];

export function ServiceSubmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  // Initialize the form
  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      blockchain_ecosystems: [],
      delivery_time: 7,
      price_range: {
        min: 1000,
        max: 5000,
      },
      portfolio_link: "",
      requirements: "",
    },
  });
  
  const onSubmit = async (values: ServiceFormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, you would send this to your API
      console.log("Submitting service:", values);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Service submitted successfully", {
        description: "Your service is now pending approval by our team."
      });
      
      // Redirect to application submitted page
      navigate("/application-submitted");
    } catch (error) {
      console.error("Error submitting service:", error);
      toast.error("Failed to submit service", {
        description: "Please try again later or contact support."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Title</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g., Comprehensive Smart Contract Security Audit" {...field} />
                    </FormControl>
                    <FormDescription>
                      A clear, concise title that describes your security service.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe your security service in detail, including your methodology, deliverables, and what sets you apart..." 
                        className="min-h-[150px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Be detailed about what you offer, your process, and the value clients can expect.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {CATEGORIES.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select the category that best describes your service.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="blockchain_ecosystems"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Supported Blockchain Ecosystems</FormLabel>
                      <FormControl>
                        <MultiSelect
                          options={BLOCKCHAIN_OPTIONS}
                          selected={field.value}
                          onChange={field.onChange}
                          placeholder="Select blockchains..."
                        />
                      </FormControl>
                      <FormDescription>
                        Select all blockchain ecosystems you support.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="delivery_time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estimated Delivery (Days)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min={1} 
                          {...field} 
                          onChange={e => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormDescription>
                        Average time to complete the service.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="price_range.min"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimum Price (USD)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min={0}
                          {...field} 
                          onChange={e => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormDescription>
                        Starting price for your service.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="price_range.max"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum Price (USD)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min={0}
                          {...field} 
                          onChange={e => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormDescription>
                        Upper price limit for complex projects.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="portfolio_link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Portfolio Link (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://your-website.com/portfolio" {...field} />
                    </FormControl>
                    <FormDescription>
                      Link to examples of your previous security work.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="requirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Requirements (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Any specific requirements or prerequisites needed from clients..." 
                        className="min-h-[100px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Specify any additional information or materials you need from clients.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end">
          <Button type="submit" className="min-w-[150px]" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Service"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
