
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuditRequests } from '@/hooks/useAuditRequests';
import { useAIMatching } from '@/hooks/useAIMatching';
import { AIMatchingDashboard } from '@/components/ai-matching/AIMatchingDashboard';
import { toast } from 'sonner';

const auditRequestSchema = z.object({
  project_name: z.string().min(1, 'Project name is required'),
  project_description: z.string().min(50, 'Please provide a detailed description (min 50 characters)'),
  blockchain: z.string().min(1, 'Please select a blockchain'),
  repository_url: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  contract_count: z.number().min(1, 'Must have at least 1 contract'),
  lines_of_code: z.number().min(1, 'Please estimate lines of code'),
  deadline: z.string().optional(),
  budget: z.number().min(100, 'Minimum budget is $100'),
  audit_scope: z.string().min(1, 'Please select audit scope'),
  previous_audits: z.boolean(),
  specific_concerns: z.string().optional(),
});

type AuditRequestForm = z.infer<typeof auditRequestSchema>;

const BLOCKCHAIN_OPTIONS = [
  'Ethereum', 'Binance Smart Chain', 'Polygon', 'Avalanche', 'Solana', 
  'Cardano', 'Polkadot', 'Cosmos', 'Near', 'Arbitrum', 'Optimism'
];

const AUDIT_SCOPE_OPTIONS = [
  'Smart Contract Security', 'DeFi Protocol', 'NFT Marketplace', 
  'Token Contract', 'Bridge Protocol', 'DAO Governance', 'GameFi Platform'
];

export function EnhancedAuditRequestForm() {
  const { createAuditRequest } = useAuditRequests();
  const [loading, setLoading] = useState(false);
  const [submittedRequestId, setSubmittedRequestId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<'form' | 'matching'>('form');

  const form = useForm<AuditRequestForm>({
    resolver: zodResolver(auditRequestSchema),
    defaultValues: {
      previous_audits: false,
    },
  });

  const onSubmit = async (data: AuditRequestForm) => {
    try {
      setLoading(true);
      
      const requestData = {
        ...data,
        deadline: data.deadline ? new Date(data.deadline).toISOString() : undefined,
        repository_url: data.repository_url || null,
        specific_concerns: data.specific_concerns || null,
      };

      const result = await createAuditRequest(requestData);
      
      if (result) {
        setSubmittedRequestId(result.id);
        setCurrentStep('matching');
        toast.success('Audit request submitted successfully!');
      }
    } catch (error) {
      console.error('Form submission failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (currentStep === 'matching' && submittedRequestId) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>🎉 Request Submitted Successfully!</CardTitle>
            <CardDescription>
              Your audit request has been created. Our AI is now finding the best auditors for your project.
            </CardDescription>
          </CardHeader>
        </Card>
        
        <AIMatchingDashboard 
          auditRequestId={submittedRequestId}
          onAuditorSelect={(auditorId) => {
            console.log('Selected auditor:', auditorId);
            // Navigate to auditor profile or proposal system
          }}
        />
      </div>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Request Security Audit</CardTitle>
        <CardDescription>
          Get your smart contract audited by verified security professionals. Our AI will match you with the best auditors for your project.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="project_name">Project Name *</Label>
              <Input
                id="project_name"
                {...form.register('project_name')}
                placeholder="My DeFi Protocol"
              />
              {form.formState.errors.project_name && (
                <p className="text-sm text-red-600">{form.formState.errors.project_name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="project_description">Project Description *</Label>
              <Textarea
                id="project_description"
                {...form.register('project_description')}
                placeholder="Describe your project, its functionality, and any specific areas of concern..."
                rows={4}
              />
              {form.formState.errors.project_description && (
                <p className="text-sm text-red-600">{form.formState.errors.project_description.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="blockchain">Blockchain *</Label>
                <Select onValueChange={(value) => form.setValue('blockchain', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blockchain" />
                  </SelectTrigger>
                  <SelectContent>
                    {BLOCKCHAIN_OPTIONS.map((blockchain) => (
                      <SelectItem key={blockchain} value={blockchain}>
                        {blockchain}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.blockchain && (
                  <p className="text-sm text-red-600">{form.formState.errors.blockchain.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="audit_scope">Audit Scope *</Label>
                <Select onValueChange={(value) => form.setValue('audit_scope', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select audit type" />
                  </SelectTrigger>
                  <SelectContent>
                    {AUDIT_SCOPE_OPTIONS.map((scope) => (
                      <SelectItem key={scope} value={scope}>
                        {scope}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.audit_scope && (
                  <p className="text-sm text-red-600">{form.formState.errors.audit_scope.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="repository_url">Repository URL</Label>
              <Input
                id="repository_url"
                type="url"
                {...form.register('repository_url')}
                placeholder="https://github.com/yourproject/contracts"
              />
              {form.formState.errors.repository_url && (
                <p className="text-sm text-red-600">{form.formState.errors.repository_url.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contract_count">Number of Contracts *</Label>
                <Input
                  id="contract_count"
                  type="number"
                  min="1"
                  {...form.register('contract_count', { valueAsNumber: true })}
                  placeholder="5"
                />
                {form.formState.errors.contract_count && (
                  <p className="text-sm text-red-600">{form.formState.errors.contract_count.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lines_of_code">Estimated Lines of Code *</Label>
                <Input
                  id="lines_of_code"
                  type="number"
                  min="1"
                  {...form.register('lines_of_code', { valueAsNumber: true })}
                  placeholder="1000"
                />
                {form.formState.errors.lines_of_code && (
                  <p className="text-sm text-red-600">{form.formState.errors.lines_of_code.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="budget">Budget (USD) *</Label>
                <Input
                  id="budget"
                  type="number"
                  min="100"
                  step="100"
                  {...form.register('budget', { valueAsNumber: true })}
                  placeholder="5000"
                />
                {form.formState.errors.budget && (
                  <p className="text-sm text-red-600">{form.formState.errors.budget.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="deadline">Preferred Deadline</Label>
                <Input
                  id="deadline"
                  type="date"
                  {...form.register('deadline')}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="specific_concerns">Specific Security Concerns</Label>
              <Textarea
                id="specific_concerns"
                {...form.register('specific_concerns')}
                placeholder="Any specific vulnerabilities or areas you want the auditor to focus on..."
                rows={3}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="previous_audits"
                checked={form.watch('previous_audits')}
                onCheckedChange={(checked) => form.setValue('previous_audits', checked as boolean)}
              />
              <Label htmlFor="previous_audits" className="text-sm">
                This project has been audited before
              </Label>
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Submitting Request...' : 'Submit Audit Request'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
