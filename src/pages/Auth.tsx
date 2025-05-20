
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthForms } from "@/components/auth/AuthForms";
import { useAuth } from "@/contexts/auth";

const Auth = () => {
  const { user, signIn, signUp } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const returnUrl = location.state?.returnUrl || '/dashboard';
  const message = location.state?.message || '';
  
  // If user is already authenticated, redirect to dashboard or return URL
  useEffect(() => {
    if (user) {
      navigate(returnUrl, { replace: true });
    }
  }, [user, navigate, returnUrl]);

  // State for toggling between sign in and sign up
  const [isSignIn, setIsSignIn] = useState(true);
  const [userType, setUserType] = useState<"auditor" | "project_owner">("project_owner");

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  const handleSignIn = async (email: string, password: string, captchaToken?: string) => {
    try {
      await signIn(email, password, captchaToken || 'auto-verified-token');
    } catch (error) {
      console.error("Sign in error:", error);
      // Error is handled within signIn function and displayed in the form
    }
  };

  const handleSignUp = async (email: string, password: string, name: string, selectedUserType: "auditor" | "project_owner", captchaToken?: string) => {
    try {
      await signUp(email, password, name, selectedUserType, captchaToken);
    } catch (error) {
      console.error("Sign up error:", error);
      // Error is handled within signUp function and displayed in the form
    }
  };

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
