
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface InstallBannerProps {
  onInstall: () => void;
  onDismiss: () => void;
}

export function InstallBanner({ onInstall, onDismiss }: InstallBannerProps) {
  return (
    <Card className="fixed bottom-4 left-4 right-4 z-50 border-primary/20 bg-primary/5">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Download className="h-4 w-4" />
          Install Hawkly App
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Install our app for faster access and offline features
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onDismiss}>
            Not now
          </Button>
          <Button size="sm" onClick={onInstall}>
            Install
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
