
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNotifications } from '@/contexts/NotificationContext';
import { Send, TestTube } from 'lucide-react';

export function NotificationTester() {
  const { addNotification } = useNotifications();
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'info' | 'success' | 'warning' | 'error'>('info');

  const handleSendNotification = () => {
    if (message.trim()) {
      addNotification({
        title: `Test ${type} notification`,
        message: message,
        type: type,
        category: 'system',
        userId: 'test-user',
      });
      setMessage('');
    }
  };

  const sendTestNotifications = () => {
    const testMessages = [
      { message: 'Test info notification', type: 'info' as const },
      { message: 'Test success notification', type: 'success' as const },
      { message: 'Test warning notification', type: 'warning' as const },
      { message: 'Test error notification', type: 'error' as const }
    ];

    testMessages.forEach((test, index) => {
      setTimeout(() => {
        addNotification({
          title: `Test ${test.type} notification`,
          message: test.message,
          type: test.type,
          category: 'system',
          userId: 'test-user',
        });
      }, index * 500);
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TestTube className="h-5 w-5" />
          Notification Tester
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input
            placeholder="Enter notification message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendNotification()}
          />
          <Select value={type} onValueChange={(value: any) => setType(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="info">Info</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="error">Error</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={handleSendNotification} 
            disabled={!message.trim()}
            className="flex-1"
          >
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
          <Button variant="outline" onClick={sendTestNotifications}>
            Send Test Set
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
