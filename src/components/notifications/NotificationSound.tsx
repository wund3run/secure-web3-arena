
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';

export const NotificationSound = () => {
  const [soundEnabled, setSoundEnabled] = React.useState(true);

  useEffect(() => {
    // Create audio context for notification sounds
    const createNotificationSound = () => {
      if (typeof window !== 'undefined' && 'AudioContext' in window) {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        const playNotificationSound = () => {
          if (!soundEnabled) return;
          
          try {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
          } catch (error) {
            console.warn('Could not play notification sound:', error);
          }
        };
        
        // Make sound function globally available
        (window as any).playNotificationSound = playNotificationSound;
      }
    };

    createNotificationSound();
  }, [soundEnabled]);

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    
    // Save preference
    try {
      localStorage.setItem('hawkly_sound_enabled', JSON.stringify(!soundEnabled));
    } catch (error) {
      console.warn('Failed to save sound preference:', error);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleSound}
      className="h-6 w-6 p-0"
      title={soundEnabled ? 'Disable sounds' : 'Enable sounds'}
    >
      {soundEnabled ? (
        <Volume2 className="h-3 w-3" />
      ) : (
        <VolumeX className="h-3 w-3" />
      )}
    </Button>
  );
};
