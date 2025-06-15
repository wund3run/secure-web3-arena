
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Users, Video, Share } from 'lucide-react';

export function CollaborationHub() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Collaboration Hub</h2>
        <Button>
          <Video className="h-4 w-4 mr-2" />
          Start Meeting
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Active Conversations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">DeFi Protocol Audit</p>
                  <p className="text-sm text-muted-foreground">3 new messages</p>
                </div>
                <Button variant="outline" size="sm">View</Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">NFT Marketplace Review</p>
                  <p className="text-sm text-muted-foreground">1 new message</p>
                </div>
                <Button variant="outline" size="sm">View</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Team Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-sm text-white">JD</span>
                </div>
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-muted-foreground">Project Owner</p>
                </div>
                <div className="ml-auto h-2 w-2 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-secondary rounded-full flex items-center justify-center">
                  <span className="text-sm">AS</span>
                </div>
                <div>
                  <p className="font-medium">Alice Smith</p>
                  <p className="text-sm text-muted-foreground">Co-Auditor</p>
                </div>
                <div className="ml-auto h-2 w-2 bg-gray-400 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share className="h-5 w-5" />
              Shared Files
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 border rounded-lg">
                <p className="font-medium">Smart Contract v2.sol</p>
                <p className="text-sm text-muted-foreground">Updated 2 hours ago</p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-medium">Security Report Draft</p>
                <p className="text-sm text-muted-foreground">Updated yesterday</p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-medium">Test Results</p>
                <p className="text-sm text-muted-foreground">Updated 3 days ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
