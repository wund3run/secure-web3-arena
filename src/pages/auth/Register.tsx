
import React from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { useAuth } from '@/contexts/auth';
import { CompleteAuthFlow } from '@/components/auth/CompleteAuthFlow';

const Register = () => {
  const { signUp, signIn, loading, error } = useAuth();

  const handleSignUp = async (email: string, password: string, fullName: string, userType: 'auditor' | 'project_owner') => {
    await signUp(email, password, fullName, userType);
  };

  const handleSignIn = async (email: string, password: string) => {
    await signIn(email, password);
  };

  return (
    <AuthLayout>
      <CompleteAuthFlow />
    </AuthLayout>
  );
};

export default Register;
