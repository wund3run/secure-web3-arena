
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SecuritySettings as SecuritySettingsComponent } from '@/components/auth/SecuritySettings';
import { PrivateRoute } from '@/components/auth/PrivateRoute';

const SecuritySettings = () => {
  return (
    <PrivateRoute>
      <Helmet>
        <title>Security Settings | Hawkly</title>
        <meta name="description" content="Manage your account security settings" />
      </Helmet>
      <div className="container py-8">
        <SecuritySettingsComponent />
      </div>
    </PrivateRoute>
  );
};

export default SecuritySettings;
