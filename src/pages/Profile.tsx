
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';

export default function Profile() {
  return (
    <StandardLayout title="Profile - Hawkly" description="User profile">
      <div className="container py-8">
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground mt-2">
          Manage your profile and account settings
        </p>
      </div>
    </StandardLayout>
  );
}
