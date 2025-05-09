
import React, { useEffect, useRef } from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

interface CaptchaVerificationProps {
  onVerify: (token: string) => void;
  onExpire: () => void;
  error?: string | null;
}

export const CaptchaVerification = ({ onVerify, onExpire, error }: CaptchaVerificationProps) => {
  const captchaRef = useRef<HTMLDivElement>(null);
  const captchaId = useRef<number | null>(null);

  useEffect(() => {
    // Load the hCaptcha script if it hasn't been loaded already
    if (typeof window !== 'undefined' && !window.hcaptcha) {
      const script = document.createElement('script');
      script.src = 'https://js.hcaptcha.com/1/api.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      
      return () => {
        document.body.removeChild(script);
      };
    }
    
    return undefined;
  }, []);

  useEffect(() => {
    // Initialize hCaptcha when the script has loaded
    const renderCaptcha = () => {
      if (captchaRef.current && window.hcaptcha) {
        captchaId.current = window.hcaptcha.render(captchaRef.current, {
          sitekey: '10000000-ffff-ffff-ffff-000000000001', // Test sitekey - replace with your actual sitekey
          theme: 'light',
          callback: (token: string) => onVerify(token),
          'expired-callback': onExpire
        });
      } else {
        setTimeout(renderCaptcha, 300);
      }
    };

    renderCaptcha();

    return () => {
      if (captchaId.current !== null && window.hcaptcha) {
        window.hcaptcha.reset(captchaId.current);
        window.hcaptcha.remove(captchaId.current);
      }
    };
  }, [onVerify, onExpire]);

  return (
    <div className="w-full">
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="flex justify-center my-4">
        <div ref={captchaRef} />
      </div>
    </div>
  );
};
