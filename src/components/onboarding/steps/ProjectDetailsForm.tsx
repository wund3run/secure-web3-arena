import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const projectDetailsSchema = z.object({
  projectName: z.string().min(2, 'Project name must be at least 2 characters'),
  description: z.string().min(10, 'Please provide a more detailed description'),
  projectType: z.string().min(1, 'Please select a project type'),
  teamSize: z.string().min(1, 'Please select your team size'),
  development: z.string().min(1, 'Please select your development stage'),
});

type ProjectDetailsValues = z.infer<typeof projectDetailsSchema>;

interface ProjectDetailsFormProps {
  onNext: (data: { projectData: ProjectDetailsValues }) => void;
  data?: ProjectDetailsValues;
}

export function ProjectDetailsForm({ onNext, data }: ProjectDetailsFormProps) {
  const form = useForm<ProjectDetailsValues>({
    resolver: zodResolver(projectDetailsSchema),
    defaultValues: data || {
      projectName: '',
      description: '',
      projectType: '',
      teamSize: '',
      development: '',
    },
  });

  const handleSubmit = (values: ProjectDetailsValues) => {
    onNext({ projectData: values });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-xl font-medium">Project Details</h3>
          <p className="text-muted-foreground">
            Tell us about the project you want to have audited
          </p>
        </div>

        <FormField
          control={form.control}
          name="projectName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input placeholder="My Web3 Project" {...field} />
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
                  placeholder="Briefly describe your project and its core functionality"
                  className="min-h-[120px]"
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
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="defi">DeFi Protocol</SelectItem>
                  <SelectItem value="nft">NFT Project</SelectItem>
                  <SelectItem value="dao">DAO</SelectItem>
                  <SelectItem value="wallet">Wallet</SelectItem>
                  <SelectItem value="l2">Layer 2/Scaling Solution</SelectItem>
                  <SelectItem value="infrastructure">Infrastructure</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="teamSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team Size</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select team size" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="solo">Solo Developer</SelectItem>
                    <SelectItem value="2-5">2-5 People</SelectItem>
                    <SelectItem value="6-15">6-15 People</SelectItem>
                    <SelectItem value="16-50">16-50 People</SelectItem>
                    <SelectItem value="50+">50+ People</SelectItem>
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
                      <SelectValue placeholder="Select stage" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="concept">Concept/Planning</SelectItem>
                    <SelectItem value="development">In Development</SelectItem>
                    <SelectItem value="testnet">Testnet Release</SelectItem>
                    <SelectItem value="mainnet">Mainnet Ready/Live</SelectItem>
                    <SelectItem value="established">Established Project</SelectItem>
                  </SelectContent>
                </Select>
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
