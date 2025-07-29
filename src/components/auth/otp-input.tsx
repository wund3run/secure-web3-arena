
import React from 'react';
import { Input } from '@/components/ui/input';

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  numInputs: number;
  placeholder?: string;
}

export const OTPInput: React.FC<OTPInputProps> = ({
  value,
  onChange,
  numInputs = 6,
  placeholder = ''
}) => {
  const handleChange = (elementValue: string, index: number) => {
    const newValue = value.split('');
    newValue[index] = elementValue;
    
    // If user types a digit and there's a next input, focus it
    if (elementValue && index < numInputs - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
    
    onChange(newValue.join(''));
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    // Handle backspace
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text/plain').slice(0, numInputs);
    onChange(pasteData);
  };

  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length: numInputs }, (_, index) => (
        <Input
          key={index}
          id={`otp-${index}`}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[index] || ''}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          placeholder={placeholder}
          className="w-12 h-12 text-center text-lg font-semibold"
        />
      ))}
    </div>
  );
};
