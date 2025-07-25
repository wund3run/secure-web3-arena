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
import { Textarea } from '@/components/ui/textarea';

const projectDetailsSchema = z.object({
  projectName: z.string().min(2, { message: "Project name must be at least 2 characters" }),
  description: z.string().min(20, { message: "Please provide a more detailed description (at least 20 characters)" }),
  projectType: z.string().min(1, { message: "Please select a project type" }),
  teamSize: z.string().min(1, { message: "Please select your team size" }),
  development: z.string().min(1, { message: "Please select your development stage" }),
});

type ProjectDetailsValues = z.infer<typeof projectDetailsSchema>;

const projectTypes = [
  { value: 'defi', label: 'DeFi Protocol' },
  { value: 'nft', label: 'NFT Project' },
  { value: 'dao', label: 'DAO' },
  { value: 'wallet', label: 'Wallet' },
  { value: 'infrastructure', label: 'Infrastructure' },
  { value: 'gaming', label: 'Gaming & Metaverse' },
  { value: 'other', label: 'Other' },
];

const teamSizes = [
  { value: 'solo', label: 'Solo Developer' },
  { value: '2-5', label: '2-5 People' },
  { value: '6-15', label: '6-15 People' },
  { value: '16-50', label: '16-50 People' },
  { value: '50+', label: '50+ People' },
];

const developmentStages = [
  { value: 'concept', label: 'Concept/Idea' },
  { value: 'development', label: 'In Development' },
  { value: 'beta', label: 'Beta/Testnet' },
  { value: 'launched', label: 'Launched on Mainnet' },
  { value: 'established', label: 'Established (6+ months on mainnet)' },
];

interface ProjectDetailsFormProps {
  onNext: (data: { projectData: ProjectDetailsValues }) => void;
  data?: {
    projectName?: string;
    description?: string;
    projectType?: string;
    teamSize?: string;
    development?: string;
  };
}

export function ProjectDetailsForm({ onNext, data = {} }: ProjectDetailsFormProps) {
  const form = useForm<ProjectDetailsValues>({
    resolver: zodResolver(projectDetailsSchema),
    defaultValues: {
      projectName: data.projectName || '',
      description: data.description || '',
      projectType: data.projectType || '',
      teamSize: data.teamSize || '',
      development: data.development || '',
    },
  });

  const handleSubmit = (values: ProjectDetailsValues) => {
    onNext({ projectData: values });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Project Details</h3>
          <p className="text-muted-foreground">
            Tell us about your project to help match you with relevant security experts
          </p>
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Briefly describe what your project does and its main features" 
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="projectType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your project type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {projectTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
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
          name="teamSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Size</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your team size" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {teamSizes.map((size) => (
                    <SelectItem key={size.value} value={size.value}>
                      {size.label}
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
          name="development"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Development Stage</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your development stage" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {developmentStages.map((stage) => (
                    <SelectItem key={stage.value} value={stage.value}>
                      {stage.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">Continue</Button>
      </form>
    </Form>
  );
}

export default ProjectDetailsForm;
