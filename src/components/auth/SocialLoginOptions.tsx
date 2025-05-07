
import React from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const SocialLoginOptions = () => {
  return (
    <>
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Button variant="outline" type="button" disabled className="w-full">
            MetaMask
          </Button>
          <Button variant="outline" type="button" disabled className="w-full">
            Wallet Connect
          </Button>
        </div>
      </div>
      
      <p className="px-8 text-center text-sm text-muted-foreground mt-4">
        By continuing, you agree to our{" "}
        <a href="/terms" className="underline underline-offset-4 hover:text-primary">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="/privacy" className="underline underline-offset-4 hover:text-primary">
          Privacy Policy
        </a>
        .
      </p>
    </>
  );
};
