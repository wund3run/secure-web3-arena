
import React, { useRef } from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import HCaptcha from '@hcaptcha/react-hcaptcha';

interface CaptchaVerificationProps {
  onVerify: (token: string) => void;
  onExpire: () => void;
  error?: string | null;
}

export const CaptchaVerification = ({ onVerify, onExpire, error }: CaptchaVerificationProps) => {
  const captchaRef = useRef<HCaptcha | null>(null);

  return (
    <div className="w-full">
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="flex justify-center my-4">
        <HCaptcha
          ref={captchaRef}
          sitekey="10000000-ffff-ffff-ffff-000000000001" // Test sitekey - replace with your actual sitekey in production
          onVerify={onVerify}
          onExpire={onExpire}
          onError={(err) => console.error("hCaptcha error:", err)}
          theme="light"
        />
      </div>
    </div>
  );
};
