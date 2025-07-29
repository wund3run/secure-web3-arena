
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { PasswordResetForm } from '@/components/auth/PasswordResetForm';

const ResetPassword = () => {
  return (
    <>
      <Helmet>
        <title>Reset Password | Hawkly</title>
        <meta name="description" content="Reset your Hawkly account password" />
      </Helmet>
      <PasswordResetForm />
    </>
  );
};

export default ResetPassword;
