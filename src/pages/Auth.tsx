
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthForms } from "@/components/auth/AuthForms";
import { useAuth } from "@/contexts/auth";

const Auth = () => {
  const { user, signIn, signUp, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const returnUrl = location.state?.returnUrl || '/dashboard';
  const message = location.state?.message || '';
  
  // If user is already authenticated, redirect to dashboard or return URL
  useEffect(() => {
    if (user && !loading) {
      navigate(returnUrl, { replace: true });
    }
  }, [user, loading, navigate, returnUrl]);

  // State for toggling between sign in and sign up
  const [isSignIn, setIsSignIn] = useState(true);
  const [userType, setUserType] = useState<"auditor" | "project_owner">("project_owner");

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  const handleSignIn = async (email: string, password: string, captchaToken?: string) => {
    await signIn(email, password, captchaToken);
  };

  const handleSignUp = async (email: string, password: string, name: string, selectedUserType: "auditor" | "project_owner", captchaToken?: string) => {
    await signUp(email, password, name, selectedUserType, captchaToken);
  };

  // Show loading state while checking authentication
  if (loading) {
    return (
      <>
        <Helmet>
          <title>Loading | Hawkly</title>
        </Helmet>
        <AuthLayout>
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        </AuthLayout>
      </>
    );
  }

  // Don't render the form if user is already authenticated
  if (user) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>{isSignIn ? "Sign In" : "Sign Up"} | Hawkly</title>
        <meta 
          name="description" 
          content={isSignIn ? "Sign in to your Hawkly account" : "Create a new account on Hawkly"} 
        />
      </Helmet>
      
      <AuthLayout>
        <AuthForms 
          isSignIn={isSignIn} 
          onToggle={toggleForm}
          returnMessage={message}
          onSignIn={handleSignIn}
          onSignUp={handleSignUp}
          userType={userType}
          setUserType={setUserType}
        />
      </AuthLayout>
    </>
  );
};

export default Auth;
