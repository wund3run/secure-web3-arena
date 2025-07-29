import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';
import { toast } from 'sonner';

export const NotificationSound = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    // Create notification sound functionality
    const playNotificationSound = () => {
      if (!soundEnabled) return;
      
      try {
        // Create a simple notification sound using Web Audio API
        const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
      } catch (error) {
        console.warn('Could not play notification sound:', error);
      }
    };

    // Make the function globally available
    (window as unknown as { playNotificationSound?: () => void }).playNotificationSound = playNotificationSound;

    return () => {
      delete (window as unknown as { playNotificationSound?: () => void }).playNotificationSound;
    };
  }, [soundEnabled]);

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    toast.info(soundEnabled ? 'Notification sounds disabled' : 'Notification sounds enabled');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleSound}
      className="h-6 w-6 p-0"
    >
      {soundEnabled ? (
        <Volume2 className="h-3 w-3" />
      ) : (
        <VolumeX className="h-3 w-3" />
      )}
    </Button>
  );
};
