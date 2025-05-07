
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigate } from "react-router-dom";
import { InfoIcon } from "lucide-react";

// Define service categories and blockchain ecosystems
const SERVICE_CATEGORIES = [
  "Smart Contracts",
  "DApps",
  "Protocols",
  "NFTs",
  "Bridges",
  "Infrastructure",
  "DAOs",
  "ZK Proofs"
];

const BLOCKCHAIN_ECOSYSTEMS = [
  "Ethereum",
  "Solana",
  "Polkadot",
  "Avalanche",
  "Cosmos",
  "zkSync",
  "Arbitrum",
  "Optimism",
  "BSC",
  "Polygon"
];

// Form schema
const serviceSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  category: z.string().refine((val) => SERVICE_CATEGORIES.includes(val), "Please select a valid category"),
  tags: z.string().transform(val => val.split(",").map(tag => tag.trim()).filter(tag => tag.length > 0)),
  blockchainEcosystems: z.array(z.string()).min(1, "Select at least one blockchain ecosystem"),
  priceAmount: z.string().transform(val => Number(val)),
  priceCurrency: z.string().default("ETH"),
  imageUrl: z.string().optional(),
  termsAccepted: z.boolean().refine(val => val === true, "You must accept the terms"),
});

type ServiceFormValues = z.infer<typeof serviceSchema>;

export function ServiceSubmissionForm() {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedBlockchains, setSelectedBlockchains] = useState<string[]>([]);

  // Initialize form with default values
  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      tags: "",
      blockchainEcosystems: [],
      priceAmount: "",
      priceCurrency: "ETH",
      imageUrl: "",
      termsAccepted: false,
    }
  });

  // Check if user is authenticated
  if (!user) {
    toast.error("Authentication required", {
      description: "You need to sign in to submit a service."
    });
    return <Navigate to="/auth" replace />;
  }

  const onSubmit = async (values: ServiceFormValues) => {
    setIsSubmitting(true);
    try {
      // Format the data for Supabase
      const serviceData = {
        title: values.title,
        description: values.description,
        provider_id: user.id,
        category: values.category,
        tags: values.tags,
        blockchain_ecosystems: values.blockchainEcosystems,
        price_range: {
          amount: values.priceAmount,
          currency: values.priceCurrency
        },
        imageUrl: values.imageUrl,
        status: "pending", // All new services start as pending
      };
      
      // Insert into services table
      const { error } = await supabase
        .from('services')
        .insert(serviceData);
        
      if (error) throw error;
      
      toast.success("Service submitted successfully", {
        description: "Your service will appear on the marketplace after admin approval"
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting service:", error);
      toast.error("Failed to submit service", {
        description: "Please try again or contact support if the problem persists"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle blockchain ecosystem selection
  const toggleBlockchain = (blockchain: string) => {
    setSelectedBlockchains(current => {
      const updated = current.includes(blockchain)
        ? current.filter(item => item !== blockchain)
        : [...current, blockchain];
      
      form.setValue('blockchainEcosystems', updated);
      return updated;
    });
  };

  // Show success message if submitted
  if (isSubmitted) {
    return (
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Service Submitted!</CardTitle>
          <CardDescription className="text-center">
            Your service has been submitted for review
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="bg-green-50 text-green-800 p-6 rounded-lg mb-6">
            <svg
              className="mx-auto h-12 w-12 text-green-600 mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="font-bold text-lg mb-2">Thank You!</h3>
            <p className="mb-4">
              Your service submission is now pending approval. Our admin team will review it shortly.
            </p>
            <p className="text-sm">
              Once approved, your service will be published on the marketplace.
              You will receive a notification when your service is live.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={() => window.location.href = "/dashboard"}>
            Go to Dashboard
          </Button>
        </CardFooter>
      </Card>
    );
  }

  // Render form
  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Submit a Security Service</CardTitle>
        <CardDescription>
          Fill out the form below to submit your security service for the marketplace
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              {/* Service Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Smart Contract Security Audit" {...field} />
                    </FormControl>
                    <FormDescription>
                      A clear and concise title for your service
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Service Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe your service in detail..." 
                        className="min-h-32"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Service Category */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SERVICE_CATEGORIES.map((category) => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tags */}
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g. ERC20, DeFi, Solidity, Vyper (comma separated)" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Enter comma-separated tags that describe your service
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Blockchain Ecosystems */}
              <FormField
                control={form.control}
                name="blockchainEcosystems"
                render={() => (
                  <FormItem>
                    <FormLabel>Blockchain Ecosystems</FormLabel>
                    <div className="flex flex-wrap gap-2">
                      {BLOCKCHAIN_ECOSYSTEMS.map((blockchain) => (
                        <Badge
                          key={blockchain}
                          variant={selectedBlockchains.includes(blockchain) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => toggleBlockchain(blockchain)}
                        >
                          {blockchain}
                        </Badge>
                      ))}
                    </div>
                    <FormDescription>
                      Select all blockchains your service supports
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Pricing */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="priceAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price Amount</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" step="0.1" placeholder="0.0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="priceCurrency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ETH">ETH</SelectItem>
                          <SelectItem value="USDC">USDC</SelectItem>
                          <SelectItem value="DAI">DAI</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Image URL */}
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Image URL (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/image.jpg" {...field} />
                    </FormControl>
                    <FormDescription>
                      Provide a URL to an image representing your service
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Terms and Conditions */}
              <FormField
                control={form.control}
                name="termsAccepted"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Terms and Conditions</FormLabel>
                      <FormDescription>
                        I confirm that my service complies with platform guidelines and I accept the 
                        <a href="/terms" className="text-primary hover:underline"> terms and conditions</a>.
                      </FormDescription>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
            
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-md flex items-start">
              <InfoIcon className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
              <div className="text-blue-800 text-sm">
                <p className="font-medium">Important Note:</p>
                <p>Your service submission will be reviewed by our admin team before being published to the marketplace. This process typically takes 1-2 business days.</p>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Service"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
