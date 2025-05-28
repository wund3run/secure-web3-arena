
import React from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';

export const NotificationSound = () => {
  const [soundEnabled, setSoundEnabled] = React.useState(() => {
    return localStorage.getItem('notificationSound') !== 'false';
  });

  const playNotificationSound = () => {
    if (!soundEnabled) return;
    
    try {
      // Create a simple notification sound using Web Audio API
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
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
      console.error('Failed to play notification sound:', error);
    }
  };

  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    localStorage.setItem('notificationSound', newState.toString());
    
    if (newState) {
      playNotificationSound(); // Test sound
    }
  };

  // Expose the play function globally so other components can use it
  React.useEffect(() => {
    (window as any).playNotificationSound = soundEnabled ? playNotificationSound : () => {};
  }, [soundEnabled]);

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleSound}
      title={soundEnabled ? 'Disable notification sounds' : 'Enable notification sounds'}
    >
      {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
    </Button>
  );
};
