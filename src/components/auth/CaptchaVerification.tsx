
import React, { useEffect, useRef, useState } from 'react';
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
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Load the hCaptcha script
  useEffect(() => {
    if (typeof window !== 'undefined' && !document.querySelector('script[src*="hcaptcha"]')) {
      const script = document.createElement('script');
      script.src = 'https://js.hcaptcha.com/1/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        setScriptLoaded(true);
      };
      
      document.body.appendChild(script);
      
      return () => {
        // Clean up script if component unmounts before script loads
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    } else if (window.hcaptcha) {
      setScriptLoaded(true);
    }
  }, []);

  // Render captcha when script is loaded
  useEffect(() => {
    if (scriptLoaded && captchaRef.current && window.hcaptcha) {
      // Small timeout to ensure hcaptcha is fully initialized
      const timeoutId = setTimeout(() => {
        try {
          captchaId.current = window.hcaptcha.render(captchaRef.current!, {
            sitekey: '10000000-ffff-ffff-ffff-000000000001', // Test sitekey - replace with your actual sitekey
            theme: 'light',
            callback: (token: string) => onVerify(token),
            'expired-callback': onExpire,
            'error-callback': (err: string) => console.error("hCaptcha error:", err)
          });
        } catch (err) {
          console.error("Error rendering hCaptcha:", err);
        }
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        if (captchaId.current !== null && window.hcaptcha) {
          try {
            window.hcaptcha.reset(captchaId.current);
            window.hcaptcha.remove(captchaId.current);
          } catch (err) {
            console.error("Error cleaning up hCaptcha:", err);
          }
        }
      };
    }
  }, [scriptLoaded, onVerify, onExpire]);

  return (
    <div className="w-full">
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="flex justify-center my-4">
        <div ref={captchaRef} className="h-captcha" />
      </div>
    </div>
  );
};
