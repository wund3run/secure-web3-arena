import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Checkbox,
  CheckboxItem
} from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

const skillsSchema = z.object({
  specializations: z.array(z.string()).min(1, {
    message: "Please select at least one specialization",
  }),
  experience: z.string().min(1, { message: "Please select your experience level" }),
  github: z.string().url({ message: "Please enter a valid GitHub URL" }),
  portfolio: z.string().url({ message: "Please enter a valid portfolio URL" }).optional(),
});

type SkillsValues = z.infer<typeof skillsSchema>;

const specializationOptions = [
  { value: 'smart-contracts', label: 'Smart Contract Security' },
  { value: 'web3-frontends', label: 'Web3 Frontend Security' },
  { value: 'protocol-security', label: 'Protocol Security' },
  { value: 'blockchain-security', label: 'Blockchain Security' },
  { value: 'defi-security', label: 'DeFi Security' },
  { value: 'nft-security', label: 'NFT Security' },
  { value: 'solidity', label: 'Solidity' },
  { value: 'rust', label: 'Rust' },
];

const experienceLevels = [
  { value: '0-1', label: 'Less than 1 year' },
  { value: '1-3', label: '1-3 years' },
  { value: '3-5', label: '3-5 years' },
  { value: '5+', label: 'More than 5 years' },
];

interface SkillsFormProps {
  onNext: (data: { skillsData: SkillsValues }) => void;
  data?: {
    specializations?: string[];
    experience?: string;
    github?: string;
    portfolio?: string;
  };
}

export function SkillsForm({ onNext, data = {} }: SkillsFormProps) {
  const form = useForm<SkillsValues>({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      specializations: data.specializations || [],
      experience: data.experience || '',
      github: data.github || '',
      portfolio: data.portfolio || '',
    },
  });

  const handleSubmit = (values: SkillsValues) => {
    onNext({ skillsData: values });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Your Expertise</h3>
          <p className="text-muted-foreground">
            Tell us about your security expertise to help match you with relevant projects
          </p>
        </div>

        <FormField
          control={form.control}
          name="specializations"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>Specializations</FormLabel>
                <p className="text-sm text-muted-foreground">
                  Select all areas that you specialize in
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {specializationOptions.map((option) => (
                  <FormField
                    key={option.value}
                    control={form.control}
                    name="specializations"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={option.value}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(option.value)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, option.value])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== option.value
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {option.label}
                          </FormLabel>
                        </FormItem>
                      )
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your experience level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {experienceLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                <Input placeholder="https://github.com/yourusername" {...field} />
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
              <FormLabel>Portfolio Website (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://yourportfolio.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">Continue</Button>
      </form>
    </Form>
  );
}

export default SkillsForm;
