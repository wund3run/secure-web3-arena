
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { Copy, Download, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

interface BackupCodesGenerationProps {
  onComplete: () => void;
}

export const BackupCodesGeneration: React.FC<BackupCodesGenerationProps> = ({ 
  onComplete 
}) => {
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [showCodes, setShowCodes] = useState(false);
  const [codesAcknowledged, setCodesAcknowledged] = useState(false);

  useEffect(() => {
    generateBackupCodes();
  }, []);

  const generateBackupCodes = () => {
    // Generate 10 random backup codes
    const codes = Array.from({ length: 10 }, () => {
      return Math.random().toString(36).substring(2, 10).toUpperCase();
    });
    setBackupCodes(codes);
  };

  const copyAllCodes = () => {
    const codesText = backupCodes.join('\n');
    navigator.clipboard.writeText(codesText);
    toast.success('Backup codes copied to clipboard');
  };

  const downloadCodes = () => {
    const codesText = `Hawkly Backup Codes\nGenerated on: ${new Date().toLocaleDateString()}\n\n${backupCodes.join('\n')}\n\nStore these codes in a safe place. Each code can only be used once.`;
    const blob = new Blob([codesText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hawkly-backup-codes.txt';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Backup codes downloaded');
  };

  const handleContinue = () => {
    if (!codesAcknowledged) {
      toast.error('Please acknowledge that you have saved your backup codes');
      return;
    }
    onComplete();
  };

  return (
    <div className="space-y-6">
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Important:</strong> Save these backup codes in a secure location. 
          You can use them to access your account if you lose your primary authentication method.
        </AlertDescription>
      </Alert>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Your Backup Codes</h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCodes(!showCodes)}
              >
                {showCodes ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={copyAllCodes}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={downloadCodes}
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 font-mono text-sm">
            {backupCodes.map((code, index) => (
              <div
                key={index}
                className={`p-2 rounded border ${
                  showCodes ? 'bg-background' : 'bg-muted'
                }`}
              >
                {showCodes ? code : '••••••••'}
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-3">
            <Alert>
              <AlertDescription className="text-sm">
                • Each code can only be used once<br/>
                • Store them in a password manager or secure location<br/>
                • Do not share these codes with anyone
              </AlertDescription>
            </Alert>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={codesAcknowledged}
                onChange={(e) => setCodesAcknowledged(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">
                I have saved these backup codes in a secure location
              </span>
            </label>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Button 
          onClick={handleContinue}
          disabled={!codesAcknowledged}
          className="flex-1"
        >
          Continue
        </Button>
        <Button 
          variant="outline" 
          onClick={generateBackupCodes}
        >
          Generate New Codes
        </Button>
      </div>
    </div>
  );
};
