
import { useState } from "react";
import { useEscrow } from "@/contexts/EscrowContext";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  Calendar as CalendarIcon,
  Info,
  Plus,
  Trash2,
  Users,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { DialogFooter } from "@/components/ui/dialog";

interface CreateContractFormProps {
  onSuccess: () => void;
}

// Define the form schema with Zod
const formSchema = z.object({
  title: z.string().min(3, {
    message: "Contract title must be at least 3 characters.",
  }),
  description: z.string().optional(),
  auditor_id: z.string().uuid({
    message: "Please enter a valid auditor ID.",
  }),
  total_amount: z.coerce.number().positive({
    message: "Total amount must be positive.",
  }),
  currency: z.string().default("ETH"),
  requires_multisig: z.boolean().default(false),
  milestones: z.array(
    z.object({
      title: z.string().min(1, {
        message: "Milestone title is required.",
      }),
      description: z.string().optional(),
      amount: z.coerce.number().positive({
        message: "Milestone amount must be positive.",
      }),
      deadline: z.date().optional(),
    })
  ).min(1, {
    message: "At least one milestone is required.",
  }),
});

export function CreateContractForm({ onSuccess }: CreateContractFormProps) {
  const { createContract } = useEscrow();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      auditor_id: "",
      total_amount: 0,
      currency: "ETH",
      requires_multisig: false,
      milestones: [
        {
          title: "Initial Assessment",
          description: "Preliminary review of the codebase",
          amount: 0,
          deadline: undefined,
        }
      ],
    },
  });
  
  // Watch milestone amounts to calculate total
  const milestones = form.watch("milestones");
  const totalMilestoneAmount = milestones.reduce((sum, milestone) => sum + (milestone.amount || 0), 0);
  
  // Add a milestone
  const addMilestone = () => {
    const currentMilestones = form.getValues("milestones");
    form.setValue("milestones", [
      ...currentMilestones,
      {
        title: "",
        description: "",
        amount: 0,
        deadline: undefined,
      }
    ]);
  };
  
  // Remove a milestone
  const removeMilestone = (index: number) => {
    const currentMilestones = form.getValues("milestones");
    if (currentMilestones.length > 1) {
      form.setValue("milestones", currentMilestones.filter((_, i) => i !== index));
    } else {
      toast.error("At least one milestone is required");
    }
  };
  
  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // Ensure milestone amounts match total amount
      if (Math.abs(totalMilestoneAmount - values.total_amount) > 0.001) {
        toast.error("Milestone amounts do not match total contract amount", {
          description: "Please adjust milestone amounts to match the total."
        });
        return;
      }
      
      const contractId = await createContract(
        {
          title: values.title,
          description: values.description,
          auditor_id: values.auditor_id,
          total_amount: values.total_amount,
          currency: values.currency,
          requires_multisig: values.requires_multisig,
          status: "pending",
        },
        values.milestones
      );
      
      if (contractId) {
        toast.success("Escrow contract created successfully", {
          description: "You can now manage your new contract."
        });
        onSuccess();
      }
    } catch (error) {
      console.error("Error creating contract:", error);
      toast.error("Failed to create contract", {
        description: "Please check your inputs and try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contract Title</FormLabel>
                <FormControl>
                  <Input placeholder="Smart Contract Security Audit" {...field} />
                </FormControl>
                <FormDescription>
                  A descriptive name for this escrow contract
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
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Detailed description of the security audit work to be performed..." 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Describe the scope and expectations for this audit
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="auditor_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Auditor UUID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter auditor's UUID" {...field} />
                  </FormControl>
                  <FormDescription>
                    The unique identifier of the security auditor
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="total_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Amount</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currency</FormLabel>
                    <FormControl>
                      <Input placeholder="ETH" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <FormField
            control={form.control}
            name="requires_multisig"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <FormLabel className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Multi-Signature Approval
                  </FormLabel>
                  <FormDescription>
                    Require multiple signatures for fund transfers
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
          
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Milestones</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addMilestone}
              >
                <Plus className="h-4 w-4 mr-1" /> Add Milestone
              </Button>
            </div>
            
            <div className="space-y-6">
              {milestones.map((_, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Milestone {index + 1}</h4>
                    {index > 0 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeMilestone(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <FormField
                    control={form.control}
                    name={`milestones.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name={`milestones.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name={`milestones.${index}.amount`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Amount</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="0" 
                              step="0.01" 
                              {...field}
                              onChange={(e) => {
                                field.onChange(parseFloat(e.target.value));
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name={`milestones.${index}.deadline`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Deadline (Optional)</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={`w-full justify-start text-left font-normal ${
                                    !field.value && "text-muted-foreground"
                                  }`}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            {Math.abs(totalMilestoneAmount - form.watch("total_amount")) > 0.001 && (
              <div className="mt-4 flex items-center gap-2 text-amber-600 text-sm border border-amber-200 bg-amber-50 p-3 rounded-md">
                <AlertCircle className="h-4 w-4" />
                <div>
                  <span className="font-medium">Milestone amounts don't match total:</span>
                  <div className="flex justify-between mt-1">
                    <span>Milestones sum: {totalMilestoneAmount} {form.watch("currency")}</span>
                    <span>Contract total: {form.watch("total_amount")} {form.watch("currency")}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Escrow Contract"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
