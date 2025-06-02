
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { ProfileCompletionWizard } from '@/components/profile/ProfileCompletionWizard';

export default function ProfileCompletion() {
  return (
    <>
      <Helmet>
        <title>Complete Your Profile | Hawkly</title>
        <meta name="description" content="Complete your professional profile to get started on Hawkly" />
      </Helmet>

      <StandardLayout 
        title="Complete Your Profile" 
        description="Set up your professional profile to start using Hawkly's security services"
      >
        <div className="container py-12">
          <ProfileCompletionWizard />
        </div>
      </StandardLayout>
    </>
  );
}
