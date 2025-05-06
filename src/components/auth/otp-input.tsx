
import React from 'react';
import { 
  InputOTP, 
  InputOTPGroup, 
  InputOTPSlot 
} from "@/components/ui/input-otp";

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  numInputs?: number;
  renderInput?: any;
  placeholder?: string;
  disabled?: boolean;
}

export function OTPInput({
  value,
  onChange,
  numInputs = 6,
  placeholder = "○",
  disabled = false,
}: OTPInputProps) {
  return (
    <div className="flex justify-center">
      <InputOTP
        value={value}
        onChange={onChange}
        maxLength={numInputs}
        disabled={disabled}
      >
        <InputOTPGroup>
          {Array.from({ length: numInputs }).map((_, i) => (
            <InputOTPSlot key={i} index={i} />
          ))}
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
}
