
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { HawklyLogo } from "@/components/layout/hawkly-logo";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/contexts/auth';

const TwoFactorAuth = () => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Mock functions for OTP verification that would normally come from auth context
  const verifyOTP = async (code: string) => {
    // Simulate API call
    setIsLoading(true);
    try {
      // Mock verification
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (code === '123456') { // For demo purposes only
        toast({
          title: "Success!",
          description: "Two-factor authentication verified successfully.",
        });
        navigate('/dashboard');
      } else {
        setError('Invalid verification code. Please try again.');
        toast({
          variant: "destructive",
          title: "Verification Failed",
          description: "The code you entered is incorrect. Please try again.",
        });
      }
    } catch (err) {
      setError('An error occurred during verification.');
      toast({
        variant: "destructive",
        title: "Verification Error",
        description: "There was a problem verifying your code. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const resendOTP = async (email: string) => {
    // Simulate API call
    try {
      toast({
        title: "Code Resent",
        description: "A new verification code has been sent to your email.",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to resend verification code. Please try again.",
      });
    }
  };

  const handleVerify = async () => {
    if (otp.length < 6) {
      setError('Please enter a complete verification code.');
      return;
    }
    
    await verifyOTP(otp);
  };

  const handleResend = async () => {
    if (user?.email) {
      await resendOTP(user.email);
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Unable to resend code. Please try signing in again.",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-primary/5 to-secondary/5 p-4">
      <Helmet>
        <title>Two-Factor Authentication | Hawkly</title>
        <meta name="description" content="Verify your identity to access your Hawkly account." />
      </Helmet>

      <div className="w-full max-w-md p-8 space-y-8 bg-white/80 backdrop-blur rounded-xl shadow-lg border border-gray-200">
        <div className="flex flex-col items-center space-y-2">
          <HawklyLogo />
          <h1 className="text-2xl font-bold tracking-tight">Two-Factor Authentication</h1>
          <p className="text-muted-foreground text-center">
            We've sent a verification code to your email. Please enter it below to continue.
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>

          <Button 
            onClick={handleVerify} 
            className="w-full" 
            disabled={isLoading || otp.length < 6}
          >
            {isLoading ? "Verifying..." : "Verify"}
          </Button>

          <div className="text-center pt-2">
            <Button 
              variant="link" 
              onClick={handleResend}
              disabled={isLoading}
            >
              Didn't receive a code? Resend
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorAuth;
