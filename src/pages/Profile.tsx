
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/auth';

const Profile = () => {
  const { user, userProfile } = useAuth();

  return (
    <>
      <Helmet>
        <title>Profile | Hawkly</title>
        <meta name="description" content="Manage your profile settings and preferences" />
      </Helmet>
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Manage your profile information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Email</label>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Full Name</label>
                <p className="text-sm text-muted-foreground">{userProfile?.full_name || 'Not set'}</p>
              </div>
              <div>
                <label className="text-sm font-medium">User Type</label>
                <p className="text-sm text-muted-foreground">{userProfile?.user_type || 'Not set'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Profile;
