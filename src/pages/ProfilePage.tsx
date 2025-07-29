
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';

const ProfilePage = () => {
  return (
    <StandardLayout
      title="Profile | Hawkly"
      description="Manage your profile settings"
    >
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              User Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Profile management coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </StandardLayout>
  );
};

export default ProfilePage;
