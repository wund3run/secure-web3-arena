
import React, { useState } from "react";
import { useAuth } from "@/contexts/auth";

interface AuthFormsProps {
  isSignIn: boolean;
  onToggle: () => void;
  returnMessage?: string;
  onSignIn: (email: string, password: string, captchaToken?: string) => Promise<void>;
  onSignUp: (email: string, password: string, name: string, userType: "auditor" | "project_owner", captchaToken?: string) => Promise<void>;
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
  const { error } = useAuth();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    
    setIsLoading(true);
    try {
      await onSignIn(email, password);
    } catch (err) {
      // Error handling is done in the auth provider
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !fullName) {
      return;
    }
    
    setIsLoading(true);
    try {
      await onSignUp(email, password, fullName, userType);
    } catch (err) {
      // Error handling is done in the auth provider
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
        <div className="space-y-2">
          <label className="block text-sm font-medium">Select Account Type</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setUserType("project_owner")}
              className={`flex-1 py-2 px-4 text-sm rounded-md border transition-colors ${
                userType === "project_owner" ? "bg-primary text-primary-foreground" : "bg-muted/20 hover:bg-muted/30"
              }`}
              aria-pressed={userType === "project_owner"}
            >
              Project Owner
            </button>
            <button
              type="button"
              onClick={() => setUserType("auditor")}
              className={`flex-1 py-2 px-4 text-sm rounded-md border transition-colors ${
                userType === "auditor" ? "bg-primary text-primary-foreground" : "bg-muted/20 hover:bg-muted/30"
              }`}
              aria-pressed={userType === "auditor"}
            >
              Security Auditor
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {userType === "auditor" 
              ? "Register as an auditor to offer your security expertise" 
              : "Register as a project owner to request security audits"}
          </p>
        </div>
      )}

      {/* Auth Form */}
      <div className="space-y-4">
        <form onSubmit={isSignIn ? handleSignIn : handleSignUp} className="space-y-4">
          {!isSignIn && (
            <div className="space-y-2">
              <label htmlFor="fullName" className="block text-sm font-medium">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
                disabled={isLoading}
              />
            </div>
          )}
          
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              minLength={6}
              required
              disabled={isLoading}
            />
          </div>
          
          {error && <p className="text-sm text-red-500">{error}</p>}
          
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={isLoading || !email || !password || (!isSignIn && !fullName)}
          >
            {isLoading ? (isSignIn ? "Signing in..." : "Creating account...") : (isSignIn ? "Sign In" : "Create Account")}
          </button>
        </form>
      </div>

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
