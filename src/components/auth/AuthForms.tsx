
import React, { useState } from "react";
import { SignInForm, SignUpForm } from "@/components/auth/AuthForms";

interface AuthFormsProps {
  isSignIn: boolean;
  onToggle: () => void;
  returnMessage?: string;
  onSignIn: (email: string, password: string, captchaToken?: string) => Promise<void>;
  onSignUp: (email: string, password: string, name: string, captchaToken?: string) => Promise<void>;
  userType: "auditor" | "project_owner";
  setUserType: (type: "auditor" | "project_owner") => void;
}

export function AuthForms({
  isSignIn,
  onToggle,
  returnMessage,
  onSignIn,
  onSignUp,
  userType,
  setUserType,
}: AuthFormsProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await onSignIn(email, password);
    } catch (err) {
      setError("Failed to sign in. Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await onSignUp(email, password, fullName);
    } catch (err) {
      setError("Failed to create an account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      {/* Logo and Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold">{isSignIn ? "Sign In to Hawkly" : "Create a Hawkly Account"}</h1>
        <p className="text-sm text-muted-foreground mt-2">
          {isSignIn
            ? "Enter your credentials to access your account"
            : "Join our platform to connect with security professionals"}
        </p>
      </div>
      
      {/* Return message (if any) */}
      {returnMessage && (
        <div className="bg-muted/50 px-4 py-3 rounded-md text-sm">
          {returnMessage}
        </div>
      )}

      {/* User type selection for sign up */}
      {!isSignIn && (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setUserType("project_owner")}
            className={`flex-1 py-2 px-4 text-sm rounded-md border ${
              userType === "project_owner" ? "bg-primary text-primary-foreground" : "bg-muted/20"
            }`}
          >
            Project Owner
          </button>
          <button
            type="button"
            onClick={() => setUserType("auditor")}
            className={`flex-1 py-2 px-4 text-sm rounded-md border ${
              userType === "auditor" ? "bg-primary text-primary-foreground" : "bg-muted/20"
            }`}
          >
            Security Auditor
          </button>
        </div>
      )}

      {/* Auth Form */}
      {isSignIn ? (
        <SignInForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          onSubmit={handleSignIn}
          isLoading={isLoading}
          error={error}
        />
      ) : (
        <SignUpForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          fullName={fullName}
          setFullName={setFullName}
          onSubmit={handleSignUp}
          isLoading={isLoading}
          error={error}
        />
      )}

      {/* Toggle between sign in and sign up */}
      <div className="text-center mt-6">
        <p className="text-sm">
          {isSignIn ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={onToggle}
            className="text-primary hover:underline font-medium"
            type="button"
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
}
