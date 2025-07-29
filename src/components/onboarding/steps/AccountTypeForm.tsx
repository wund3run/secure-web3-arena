import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const accountTypeSchema = z.object({
  userType: z.enum(['auditor', 'project-owner'], {
    required_error: 'You need to select an account type',
  }),
});

type AccountTypeValues = z.infer<typeof accountTypeSchema>;

interface AccountTypeFormProps {
  onNext: (data: { accountType: AccountTypeValues }) => void;
  data?: AccountTypeValues;
}

export function AccountTypeForm({ onNext, data }: AccountTypeFormProps) {
  const form = useForm<AccountTypeValues>({
    resolver: zodResolver(accountTypeSchema),
    defaultValues: data || {
      userType: 'auditor',
    },
  });

  const handleSubmit = (values: AccountTypeValues) => {
    onNext({ accountType: values });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-xl font-medium">Choose Your Account Type</h3>
          <p className="text-muted-foreground">
            Select the type of account that best describes your role in the Web3 security ecosystem.
          </p>
        </div>

        <FormField
          control={form.control}
          name="userType"
          render={({ field }) => (
            <FormItem className="space-y-6">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-1 gap-6 pt-2 md:grid-cols-2"
                >
                  <FormItem className="flex flex-col items-center space-x-0 space-y-3 rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-hawkly-primary">
                    <FormControl>
                      <RadioGroupItem value="auditor" className="sr-only" />
                    </FormControl>
                    <div className="text-center space-y-2">
                      <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-hawkly-accent/20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-hawkly-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <FormLabel className="text-xl font-medium">Auditor</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Join as a security auditor to review projects and earn rewards
                      </p>
                    </div>
                  </FormItem>
                  <FormItem className="flex flex-col items-center space-x-0 space-y-3 rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-hawkly-primary">
                    <FormControl>
                      <RadioGroupItem value="project-owner" className="sr-only" />
                    </FormControl>
                    <div className="text-center space-y-2">
                      <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-hawkly-accent/20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-hawkly-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <FormLabel className="text-xl font-medium">Project Owner</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Submit your project for security audits by experts
                      </p>
                    </div>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">Next</Button>
      </form>
    </Form>
  );
}
