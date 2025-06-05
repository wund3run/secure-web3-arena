
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { PasswordResetForm } from '@/components/auth/PasswordResetForm';
import { CriticalPageErrorBoundary } from '@/components/error/CriticalPageErrorBoundary';

const ResetPassword = () => {
  return (
    <CriticalPageErrorBoundary pageName="Password Reset">
      <Helmet>
        <title>Reset Password | Hawkly</title>
        <meta name="description" content="Reset your Hawkly account password" />
      </Helmet>
      <PasswordResetForm />
    </CriticalPageErrorBoundary>
  );
};

export default ResetPassword;
