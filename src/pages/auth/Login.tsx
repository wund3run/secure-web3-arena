
import React from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { EnhancedSignInForm } from '@/components/auth/EnhancedSignInForm';

const Login = () => {
  return (
    <AuthLayout>
      <EnhancedSignInForm />
    </AuthLayout>
  );
};

export default Login;
