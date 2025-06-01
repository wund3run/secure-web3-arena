
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, CheckCircle, Clock, DollarSign, FileText, Shield } from 'lucide-react';
import { toast } from 'sonner';

const auditRequestSchema = z.object({
  projectName: z.string().min(1, 'Project name is required'),
  projectDescription: z.string().min(10, 'Description must be at least 10 characters'),
  blockchain: z.string().min(1, 'Blockchain selection is required'),
  repositoryUrl: z.string().url('Valid repository URL is required').optional().or(z.literal('')),
  contractCount: z.number().min(1, 'Must have at least 1 contract'),
  linesOfCode: z.number().min(1, 'Lines of code must be greater than 0'),
  deadline: z.string().min(1, 'Deadline is required'),
  budget: z.number().min(100, 'Minimum budget is $100'),
  auditScope: z.array(z.string()).min(1, 'Select at least one audit scope'),
  previousAudits: z.boolean(),
  specificConcerns: z.string().optional(),
  urgencyLevel: z.enum(['low', 'normal', 'high', 'critical']),
  communicationPreference: z.enum(['email', 'slack', 'discord', 'telegram'])
});

type AuditRequestForm = z.infer<typeof auditRequestSchema>;

interface EnhancedRequestFormProps {
  onSubmit: (data: AuditRequestForm) => void;
  loading?: boolean;
}

export function EnhancedRequestForm({ onSubmit, loading = false }: EnhancedRequestFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [estimatedCost, setEstimatedCost] = useState<number | null>(null);
  const [estimatedDuration, setEstimatedDuration] = useState<number | null>(null);

  const form = useForm<AuditRequestForm>({
    resolver: zodResolver(auditRequestSchema),
    defaultValues: {
      previousAudits: false,
      urgencyLevel: 'normal',
      communicationPreference: 'email',
      auditScope: []
    }
  });

  const watchedValues = form.watch();

  useEffect(() => {
    // Calculate estimated cost and duration based on form inputs
    const { contractCount, linesOfCode, auditScope, urgencyLevel } = watchedValues;
    
    if (contractCount && linesOfCode && auditScope.length > 0) {
      let baseCost = contractCount * 500 + (linesOfCode / 100) * 50;
      let baseDuration = Math.ceil(contractCount * 1.5 + linesOfCode / 1000);

      // Adjust for scope complexity
      const scopeMultiplier = auditScope.length * 0.2 + 0.8;
      baseCost *= scopeMultiplier;
      baseDuration *= scopeMultiplier;

      // Adjust for urgency
      if (urgencyLevel === 'high') {
        baseCost *= 1.3;
        baseDuration *= 0.8;
      } else if (urgencyLevel === 'critical') {
        baseCost *= 1.6;
        baseDuration *= 0.6;
      }

      setEstimatedCost(Math.round(baseCost));
      setEstimatedDuration(Math.round(baseDuration));
    }
  }, [watchedValues]);

  const totalSteps = 4;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const blockchainOptions = [
    'Ethereum', 'Polygon', 'Binance Smart Chain', 'Avalanche', 
    'Solana', 'Cardano', 'Polkadot', 'Cosmos', 'Near', 'Other'
  ];

  const auditScopeOptions = [
    'Smart Contract Security',
    'DeFi Protocol Analysis',
    'NFT Contract Review',
    'Governance Mechanisms',
    'Oracle Integration',
    'Bridge Security',
    'Tokenomics Review',
    'Gas Optimization',
    'Upgrade Mechanisms',
    'Multi-signature Security'
  ];

  const handleNext = async () => {
    let fieldsToValidate: (keyof AuditRequestForm)[] = [];
    
    switch (currentStep) {
      case 1:
        fieldsToValidate = ['projectName', 'projectDescription', 'blockchain'];
        break;
      case 2:
        fieldsToValidate = ['contractCount', 'linesOfCode', 'repositoryUrl'];
        break;
      case 3:
        fieldsToValidate = ['deadline', 'budget', 'auditScope'];
        break;
    }

    const isValid = await form.trigger(fieldsToValidate);
    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold">Project Information</h3>
              <p className="text-muted-foreground">Tell us about your project</p>
            </div>

            <FormField
              control={form.control}
              name="projectName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your project name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="projectDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your project, its purpose, and key features"
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Provide details about functionality, token mechanics, and any unique features
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="blockchain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blockchain Platform</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select blockchain platform" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {blockchainOptions.map((blockchain) => (
                        <SelectItem key={blockchain} value={blockchain}>
                          {blockchain}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold">Technical Details</h3>
              <p className="text-muted-foreground">Provide technical specifications</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="contractCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Contracts</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1"
                        placeholder="e.g., 5"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="linesOfCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lines of Code (approx.)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1"
                        placeholder="e.g., 2500"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="repositoryUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repository URL (Optional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://github.com/your-project/repo"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Public repository link if available
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold">Audit Requirements</h3>
              <p className="text-muted-foreground">Define scope and timeline</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Deadline</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget (USD)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="100"
                        placeholder="e.g., 5000"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="auditScope"
              render={() => (
                <FormItem>
                  <FormLabel>Audit Scope</FormLabel>
                  <FormDescription>
                    Select all areas you want to include in the audit
                  </FormDescription>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                    {auditScopeOptions.map((scope) => (
                      <FormField
                        key={scope}
                        control={form.control}
                        name="auditScope"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(scope)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, scope])
                                    : field.onChange(
                                        field.value?.filter((value) => value !== scope)
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {scope}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold">Additional Information</h3>
              <p className="text-muted-foreground">Final details and preferences</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="urgencyLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Urgency Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select urgency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low - Standard timeline</SelectItem>
                        <SelectItem value="normal">Normal - Preferred timeline</SelectItem>
                        <SelectItem value="high">High - Rush job (+30% cost)</SelectItem>
                        <SelectItem value="critical">Critical - Emergency (+60% cost)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="communicationPreference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Communication Preference</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select communication method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="slack">Slack</SelectItem>
                        <SelectItem value="discord">Discord</SelectItem>
                        <SelectItem value="telegram">Telegram</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="previousAudits"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      This project has been audited before
                    </FormLabel>
                    <FormDescription>
                      Check if your project has undergone previous security audits
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="specificConcerns"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Specific Concerns (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Any specific security concerns, known issues, or areas you'd like us to focus on"
                      className="min-h-[80px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Estimation Display */}
            {estimatedCost && estimatedDuration && (
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Estimated Cost & Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        ${estimatedCost.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">Estimated Cost</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {estimatedDuration} days
                      </div>
                      <div className="text-sm text-muted-foreground">Estimated Duration</div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    *Final pricing may vary based on auditor selection and detailed requirements
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Request Security Audit</CardTitle>
        <CardDescription>
          Complete the form to submit your audit request
        </CardDescription>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>{Math.round(progressPercentage)}% Complete</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            {renderStep()}
          </CardContent>

          <div className="flex justify-between p-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              Previous
            </Button>

            <div className="flex gap-2">
              {currentStep < totalSteps ? (
                <Button type="button" onClick={handleNext}>
                  Next
                </Button>
              ) : (
                <Button type="submit" disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit Request'}
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>
    </Card>
  );
}
