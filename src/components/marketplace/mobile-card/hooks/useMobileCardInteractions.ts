
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

/**
 * Custom hook to handle mobile card interactions
 * 
 * @param serviceId - ID of the service associated with the card
 * @param onSelect - Callback function when card is selected
 * @returns Object containing interaction handlers and states
 */
export const useMobileCardInteractions = (
  serviceId: string,
  onSelect?: () => void
) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  
  /**
   * Handle card selection
   */
  const handleSelect = useCallback(() => {
    if (onSelect) {
      onSelect();
    }
  }, [onSelect]);
  
  /**
   * Handle saving the service to favorites
   */
  const handleSave = useCallback(async (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsSaving(true);
    
    try {
      // This would typically be an API call to save the service
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast.success('Service saved to favorites');
    } catch (error) {
      console.error('Error saving service:', error);
      toast.error('Failed to save service');
    } finally {
      setIsSaving(false);
    }
  }, []);
  
  /**
   * Handle sharing the service
   */
  const handleShare = useCallback(async (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsSharing(true);
    
    try {
      // Check if the Web Share API is available
      if (navigator.share) {
        await navigator.share({
          title: 'Check out this security service',
          text: 'I found this security service on Hawkly',
          url: window.location.href,
        });
        
        toast.success('Service shared successfully');
      } else {
        // Fallback for browsers that don't support the Web Share API
        // Copy the URL to clipboard
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard');
      }
    } catch (error) {
      // User canceled or sharing failed
      console.error('Error sharing service:', error);
    } finally {
      setIsSharing(false);
    }
  }, []);
  
  return {
    handleSelect,
    handleSave,
    handleShare,
    isSaving,
    isSharing
  };
};
