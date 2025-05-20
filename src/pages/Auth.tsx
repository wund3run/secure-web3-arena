
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthForms } from "@/components/auth/AuthForms";
import { useAuth } from "@/contexts/auth";

const Auth = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const returnUrl = location.state?.returnUrl || '/dashboard';
  const message = location.state?.message || '';
  
  // If user is already authenticated, redirect to dashboard or return URL
  React.useEffect(() => {
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
    // Authentication logic would go here
    try {
      // Your sign in logic
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  const handleSignUp = async (email: string, password: string, name: string, captchaToken?: string) => {
    // Registration logic would go here
    try {
      // Your sign up logic
    } catch (error) {
      console.error("Sign up error:", error);
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
