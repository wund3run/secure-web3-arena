
import React, { useState, useEffect } from 'react';
import { Star, Plus } from 'lucide-react';

interface XPNotificationProps {
  amount: number;
  reason: string;
  show: boolean;
  onComplete: () => void;
}

export const XPNotification: React.FC<XPNotificationProps> = ({
  amount,
  reason,
  show,
  onComplete
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onComplete, 500);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!show && !isVisible) return null;

  return (
    <div className={`fixed top-20 right-4 z-40 transition-all duration-500 ${
      isVisible ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-95'
    }`}>
      <div className="bg-green-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
        <Star className="h-4 w-4 fill-current" />
        <Plus className="h-3 w-3" />
        <span className="font-bold">{amount}</span>
        <span className="text-sm">XP</span>
        {reason && (
          <span className="text-xs opacity-90 ml-1">• {reason}</span>
        )}
      </div>
    </div>
  );
};
