
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { useAuditorProfiles } from '@/hooks/useAuditorProfiles';
import { toast } from 'sonner';

const auditorProfileSchema = z.object({
  business_name: z.string().optional(),
  years_experience: z.number().min(0).max(50),
  hourly_rate_min: z.number().min(0).optional(),
  hourly_rate_max: z.number().min(0).optional(),
  max_concurrent_audits: z.number().min(1).max(10),
  blockchain_expertise: z.array(z.string()).min(1, 'Select at least one blockchain'),
  audit_types: z.array(z.string()).min(1, 'Select at least one audit type'),
  languages_spoken: z.array(z.string()).min(1, 'Select at least one language'),
  timezone: z.string(),
  portfolio_url: z.string().url().optional().or(z.literal('')),
  github_username: z.string().optional(),
  linkedin_url: z.string().url().optional().or(z.literal('')),
});

type AuditorProfileForm = z.infer<typeof auditorProfileSchema>;

const BLOCKCHAIN_OPTIONS = [
  'Ethereum', 'Binance Smart Chain', 'Polygon', 'Avalanche', 'Solana', 
  'Cardano', 'Polkadot', 'Cosmos', 'Near', 'Arbitrum', 'Optimism'
];

const AUDIT_TYPE_OPTIONS = [
  'Smart Contract Audit', 'DeFi Protocol Audit', 'NFT Contract Audit', 
  'Bridge Audit', 'DAO Audit', 'Token Audit', 'GameFi Audit', 'Infrastructure Audit'
];

const LANGUAGE_OPTIONS = [
  'English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 
  'Korean', 'Russian', 'Portuguese', 'Italian'
];

interface AuditorOnboardingFormProps {
  onSuccess?: () => void;
}

export function AuditorOnboardingForm({ onSuccess }: AuditorOnboardingFormProps) {
  const { createAuditorProfile } = useAuditorProfiles();
  const [selectedBlockchains, setSelectedBlockchains] = useState<string[]>([]);
  const [selectedAuditTypes, setSelectedAuditTypes] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['English']);
  const [loading, setLoading] = useState(false);

  const form = useForm<AuditorProfileForm>({
    resolver: zodResolver(auditorProfileSchema),
    defaultValues: {
      years_experience: 0,
      max_concurrent_audits: 3,
      blockchain_expertise: [],
      audit_types: [],
      languages_spoken: ['English'],
      timezone: 'UTC',
    },
  });

  const toggleSelection = (item: string, list: string[], setList: (list: string[]) => void) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const onSubmit = async (data: AuditorProfileForm) => {
    try {
      setLoading(true);
      
      const profileData = {
        ...data,
        blockchain_expertise: selectedBlockchains,
        audit_types: selectedAuditTypes,
        languages_spoken: selectedLanguages,
      };

      await createAuditorProfile(profileData);
      toast.success('Auditor profile created! Pending verification.');
      onSuccess?.();
    } catch (error) {
      console.error('Profile creation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Join as a Security Auditor</CardTitle>
        <CardDescription>
          Complete your profile to start receiving audit opportunities on our platform.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="business_name">Business Name (Optional)</Label>
              <Input
                id="business_name"
                {...form.register('business_name')}
                placeholder="Your audit firm name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="years_experience">Years of Experience *</Label>
              <Input
                id="years_experience"
                type="number"
                {...form.register('years_experience', { valueAsNumber: true })}
                placeholder="5"
              />
              {form.formState.errors.years_experience && (
                <p className="text-sm text-red-600">{form.formState.errors.years_experience.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hourly_rate_min">Minimum Hourly Rate (USD)</Label>
              <Input
                id="hourly_rate_min"
                type="number"
                step="0.01"
                {...form.register('hourly_rate_min', { valueAsNumber: true })}
                placeholder="150"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hourly_rate_max">Maximum Hourly Rate (USD)</Label>
              <Input
                id="hourly_rate_max"
                type="number"
                step="0.01"
                {...form.register('hourly_rate_max', { valueAsNumber: true })}
                placeholder="300"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Blockchain Expertise *</Label>
            <div className="flex flex-wrap gap-2">
              {BLOCKCHAIN_OPTIONS.map((blockchain) => (
                <Badge
                  key={blockchain}
                  variant={selectedBlockchains.includes(blockchain) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => toggleSelection(blockchain, selectedBlockchains, setSelectedBlockchains)}
                >
                  {blockchain}
                  {selectedBlockchains.includes(blockchain) && (
                    <X className="h-3 w-3 ml-1" />
                  )}
                </Badge>
              ))}
            </div>
            {form.formState.errors.blockchain_expertise && (
              <p className="text-sm text-red-600">{form.formState.errors.blockchain_expertise.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Audit Types *</Label>
            <div className="flex flex-wrap gap-2">
              {AUDIT_TYPE_OPTIONS.map((type) => (
                <Badge
                  key={type}
                  variant={selectedAuditTypes.includes(type) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => toggleSelection(type, selectedAuditTypes, setSelectedAuditTypes)}
                >
                  {type}
                  {selectedAuditTypes.includes(type) && (
                    <X className="h-3 w-3 ml-1" />
                  )}
                </Badge>
              ))}
            </div>
            {form.formState.errors.audit_types && (
              <p className="text-sm text-red-600">{form.formState.errors.audit_types.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="max_concurrent_audits">Max Concurrent Audits</Label>
              <Input
                id="max_concurrent_audits"
                type="number"
                min="1"
                max="10"
                {...form.register('max_concurrent_audits', { valueAsNumber: true })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select onValueChange={(value) => form.setValue('timezone', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC">UTC</SelectItem>
                  <SelectItem value="EST">Eastern Time</SelectItem>
                  <SelectItem value="PST">Pacific Time</SelectItem>
                  <SelectItem value="CET">Central European Time</SelectItem>
                  <SelectItem value="JST">Japan Standard Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Languages Spoken *</Label>
            <div className="flex flex-wrap gap-2">
              {LANGUAGE_OPTIONS.map((language) => (
                <Badge
                  key={language}
                  variant={selectedLanguages.includes(language) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => toggleSelection(language, selectedLanguages, setSelectedLanguages)}
                >
                  {language}
                  {selectedLanguages.includes(language) && (
                    <X className="h-3 w-3 ml-1" />
                  )}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="portfolio_url">Portfolio URL</Label>
              <Input
                id="portfolio_url"
                type="url"
                {...form.register('portfolio_url')}
                placeholder="https://your-portfolio.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="github_username">GitHub Username</Label>
              <Input
                id="github_username"
                {...form.register('github_username')}
                placeholder="yourusername"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="linkedin_url">LinkedIn Profile</Label>
              <Input
                id="linkedin_url"
                type="url"
                {...form.register('linkedin_url')}
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Creating Profile...' : 'Submit for Verification'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
