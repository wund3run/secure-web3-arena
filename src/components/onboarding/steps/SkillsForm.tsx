import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';

const skillsSchema = z.object({
  specializations: z.array(z.string()).min(1, 'Please select at least one specialization'),
  experience: z.string().min(1, 'Please select your years of experience'),
  github: z.string().url('Please enter a valid GitHub URL').optional().or(z.literal('')),
  portfolio: z.string().url('Please enter a valid portfolio URL').optional().or(z.literal('')),
});

type SkillsValues = z.infer<typeof skillsSchema>;

const specializationOptions = [
  { id: 'smart-contracts', label: 'Smart Contracts' },
  { id: 'defi', label: 'DeFi Protocols' },
  { id: 'nft', label: 'NFT Systems' },
  { id: 'consensus', label: 'Consensus Mechanisms' },
  { id: 'zk', label: 'Zero Knowledge Proofs' },
  { id: 'l2', label: 'Layer 2 Solutions' },
];

const experienceOptions = [
  { value: '0-1', label: 'Less than 1 year' },
  { value: '1-2', label: '1-2 years' },
  { value: '3-5', label: '3-5 years' },
  { value: '5+', label: '5+ years' },
];

interface SkillsFormProps {
  onNext: (data: { skillsData: SkillsValues }) => void;
  data?: SkillsValues;
}

export function SkillsForm({ onNext, data }: SkillsFormProps) {
  const form = useForm<SkillsValues>({
    resolver: zodResolver(skillsSchema),
    defaultValues: data || {
      specializations: [],
      experience: '',
      github: '',
      portfolio: '',
    },
  });

  const handleSubmit = (values: SkillsValues) => {
    onNext({ skillsData: values });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-xl font-medium">Auditor Skills & Experience</h3>
          <p className="text-muted-foreground">
            Tell us about your security expertise and experience in Web3
          </p>
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="specializations"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel>Areas of Specialization</FormLabel>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {specializationOptions.map((option) => (
                    <FormField
                      key={option.id}
                      control={form.control}
                      name="specializations"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={option.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(option.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, option.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== option.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {option.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Years of Experience</FormLabel>
                <div className="grid grid-cols-2 gap-3">
                  {experienceOptions.map((option) => (
                    <FormItem
                      key={option.value}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <input
                          type="radio"
                          value={option.value}
                          checked={field.value === option.value}
                          onChange={(e) => field.onChange(e.target.value)}
                          className="h-4 w-4 text-hawkly-primary"
                        />
                      </FormControl>
                      <FormLabel className="font-normal">{option.label}</FormLabel>
                    </FormItem>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="github"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GitHub Profile</FormLabel>
                <FormControl>
                  <Input placeholder="https://github.com/username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="portfolio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Portfolio/Website</FormLabel>
                <FormControl>
                  <Input placeholder="https://yourportfolio.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full">Next</Button>
      </form>
    </Form>
  );
}
