
import React from 'react';
import { ProductionLayout } from '@/components/layout/ProductionLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Calendar, Shield, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/auth';

export default function Profile() {
  const { user, userProfile } = useAuth();

  return (
    <ProductionLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Header */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={userProfile?.avatar_url} />
                  <AvatarFallback>
                    <User className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-2xl">{userProfile?.full_name || userProfile?.display_name || 'User Profile'}</CardTitle>
                  <div className="flex items-center space-x-2 text-muted-foreground mt-2">
                    <Mail className="h-4 w-4" />
                    <span>{user?.email || 'email@example.com'}</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="secondary">
                      {userProfile?.user_type || 'Project Owner'}
                    </Badge>
                    <Badge variant="outline">
                      <Shield className="h-3 w-3 mr-1" />
                      {userProfile?.verification_status === 'verified' ? 'Verified' : 'Pending Verification'}
                    </Badge>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* Profile Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">{userProfile?.projects_completed || 0}</div>
                  <div className="text-sm text-muted-foreground">Projects Completed</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">4.8</div>
                  <div className="text-sm text-muted-foreground">Average Rating</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">{userProfile?.years_of_experience || 0}</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Skills & Specializations */}
          {userProfile?.specializations && userProfile.specializations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Specializations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {userProfile.specializations.map((specialization, index) => (
                    <Badge key={index} variant="outline">
                      {specialization}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm">Profile updated</p>
                    <p className="text-xs text-muted-foreground">
                      {userProfile?.updated_at ? new Date(userProfile.updated_at).toLocaleDateString() : 'Recently'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm">Account created</p>
                    <p className="text-xs text-muted-foreground">
                      {userProfile?.created_at ? new Date(userProfile.created_at).toLocaleDateString() : 'Some time ago'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProductionLayout>
  );
}
