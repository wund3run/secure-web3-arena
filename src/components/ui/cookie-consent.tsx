
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false
  });

  useEffect(() => {
    // Check if user has already set cookie preferences
    const hasConsent = localStorage.getItem('hawkly_cookie_consent');
    
    if (!hasConsent) {
      // Delay showing the dialog for better user experience
      const timer = setTimeout(() => {
        setOpen(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    setPreferences({
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    });
    
    localStorage.setItem('hawkly_cookie_consent', JSON.stringify({
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
      timestamp: new Date().toISOString()
    }));
    
    setOpen(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('hawkly_cookie_consent', JSON.stringify({
      ...preferences,
      timestamp: new Date().toISOString()
    }));
    
    setOpen(false);
  };

  const handleNecessaryOnly = () => {
    setPreferences({
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    });
    
    localStorage.setItem('hawkly_cookie_consent', JSON.stringify({
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
      timestamp: new Date().toISOString()
    }));
    
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Cookie Preferences</DialogTitle>
          <DialogDescription>
            Hawkly uses cookies to ensure you get the best experience on our website. 
            You can customize your cookie preferences below.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="flex items-start space-x-2">
            <Checkbox id="necessary" checked disabled />
            <div className="grid gap-1.5">
              <Label htmlFor="necessary" className="font-medium">Necessary Cookies</Label>
              <p className="text-sm text-muted-foreground">
                These cookies are essential for the website to function and cannot be disabled.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="analytics" 
              checked={preferences.analytics}
              onCheckedChange={(checked) => 
                setPreferences(prev => ({...prev, analytics: checked as boolean}))
              }
            />
            <div className="grid gap-1.5">
              <Label htmlFor="analytics" className="font-medium">Analytics Cookies</Label>
              <p className="text-sm text-muted-foreground">
                These cookies help us understand how visitors interact with our website.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="functional" 
              checked={preferences.functional}
              onCheckedChange={(checked) => 
                setPreferences(prev => ({...prev, functional: checked as boolean}))
              }
            />
            <div className="grid gap-1.5">
              <Label htmlFor="functional" className="font-medium">Functional Cookies</Label>
              <p className="text-sm text-muted-foreground">
                These cookies enable personalized features and functionality.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="marketing" 
              checked={preferences.marketing}
              onCheckedChange={(checked) => 
                setPreferences(prev => ({...prev, marketing: checked as boolean}))
              }
            />
            <div className="grid gap-1.5">
              <Label htmlFor="marketing" className="font-medium">Marketing Cookies</Label>
              <p className="text-sm text-muted-foreground">
                These cookies are used to track visitors across websites for marketing purposes.
              </p>
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex-col sm:flex-row sm:justify-between gap-2">
          <Button variant="outline" onClick={handleNecessaryOnly}>
            Necessary Only
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleSavePreferences}>
              Save Preferences
            </Button>
            <Button onClick={handleAcceptAll} className="bg-primary">
              Accept All
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
