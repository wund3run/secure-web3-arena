
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertCircle, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HawklyLogo } from "@/components/layout/hawkly-logo";
import { OTPInput } from "@/components/auth/otp-input";
import { useAuth } from '@/contexts/auth';

const TwoFactorAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyOTP, resendOTP, session } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [otpCode, setOtpCode] = useState("");
  const [countdown, setCountdown] = useState(300); // 5 minutes in seconds
  const [canResend, setCanResend] = useState(false);
  
  // Get email from state or fall back to session
  const email = location.state?.email || session?.user?.email || "";
  
  useEffect(() => {
    // If no email is provided and user is not in session, redirect to login
    if (!email && !session) {
      navigate('/auth');
    }
    
    // Start countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [email, session, navigate]);
  
  // Format countdown to mm:ss
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  const handleVerify = async () => {
    if (otpCode.length !== 6) {
      setError("Please enter a valid 6-digit code");
      return;
    }
    
    setError(null);
    setIsLoading(true);
    
    try {
      await verifyOTP(otpCode);
      // Successful verification will redirect via AuthContext
    } catch (error: any) {
      setError(error.message || "Failed to verify code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleResend = async () => {
    if (!canResend) return;
    
    setError(null);
    setCanResend(false);
    
    try {
      await resendOTP(email);
      // Reset countdown
      setCountdown(300);
    } catch (error: any) {
      setError(error.message || "Failed to resend code. Please try again.");
      setCanResend(true);
    }
  };
  
  return (
    <>
      <Helmet>
        <title>Two-Factor Authentication | Hawkly</title>
        <meta name="description" content="Verify your identity to continue to Hawkly - Web3 Security Marketplace" />
      </Helmet>
      <Navbar />
      <main className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gradient-to-br from-white via-primary/5 to-secondary/5 py-16">
        <div className="w-full max-w-md px-4">
          <div className="flex justify-center mb-6">
            <HawklyLogo variant="large" />
          </div>
          
          <Card className="border border-border/40 shadow-sm backdrop-blur-sm bg-white/80">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Two-Factor Authentication</CardTitle>
              <CardDescription className="text-center">
                Enter the 6-digit code sent to your email
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="text-center text-sm text-muted-foreground">
                <p>We sent a verification code to:</p>
                <p className="font-medium text-foreground">{email}</p>
              </div>
              
              <OTPInput
                value={otpCode}
                onChange={setOtpCode}
                numInputs={6}
                renderInput={(props) => <input {...props} className="otp-input" />}
              />
              
              <div className="text-center text-sm text-muted-foreground">
                <p>Code expires in: <span className="font-medium">{formatTime(countdown)}</span></p>
              </div>
              
              <Button 
                onClick={handleVerify} 
                className="w-full" 
                disabled={isLoading || otpCode.length !== 6}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify Code"
                )}
              </Button>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                variant="ghost" 
                className="w-full text-primary hover:text-primary/90"
                disabled={!canResend}
                onClick={handleResend}
              >
                {canResend ? "Resend Code" : `Resend code in ${formatTime(countdown)}`}
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => navigate('/auth')}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Login
              </Button>
              
              <p className="px-8 text-center text-xs text-muted-foreground mt-4">
                Having trouble? Please contact our support team for assistance.
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default TwoFactorAuth;
