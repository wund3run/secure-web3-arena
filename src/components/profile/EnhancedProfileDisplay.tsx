import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/auth';
import { 
  MapPin, 
  Globe, 
  Calendar, 
  Star, 
  Shield, 
  Edit,
  ExternalLink,
  Wallet
} from 'lucide-react';

interface EnhancedProfileDisplayProps {
  isOwnProfile?: boolean;
  onEdit?: () => void;
}

export function EnhancedProfileDisplay({ isOwnProfile = false, onEdit }: EnhancedProfileDisplayProps) {
  const { userProfile, getUserType } = useAuth();
  const userType = getUserType();

  if (!userProfile) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage 
                  src={userProfile.avatar_url ?? undefined} 
                  alt={userProfile.display_name || userProfile.full_name || 'User'} 
                />
                <AvatarFallback className="text-lg">
                  {getInitials(userProfile.display_name || userProfile.full_name || 'U')}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <div>
                  <h1 className="text-2xl font-bold">
                    {userProfile.display_name || userProfile.full_name}
                  </h1>
                  <p className="text-muted-foreground capitalize">
                    {userType} • Member since {formatDate(userProfile.created_at)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    {userProfile.verification_status || 'Pending'}
                  </Badge>
                  {userProfile.projects_completed && (
                    <Badge variant="outline">
                      {userProfile.projects_completed} Projects Completed
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            {isOwnProfile && (
              <Button variant="outline" onClick={onEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {userProfile.bio && (
            <p className="text-muted-foreground mb-4">{userProfile.bio}</p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userProfile.website && (
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <a 
                  href={userProfile.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center gap-1"
                >
                  Website
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            )}
            {userProfile.wallet_address && (
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4 text-muted-foreground" />
                <span className="font-mono text-sm">
                  {userProfile.wallet_address.slice(0, 6)}...{userProfile.wallet_address.slice(-4)}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      {/* Specializations */}
      {userProfile.specializations && userProfile.specializations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Specializations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {userProfile.specializations.map((spec: string, index: number) => (
                <Badge key={index} variant="secondary">
                  {spec}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      {/* Skills & Social Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
          </CardHeader>
          <CardContent>
            {userProfile.skills && userProfile.skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {userProfile.skills.map((skill: string, index: number) => (
                  <Badge key={index} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No skills listed</p>
            )}
          </CardContent>
        </Card>
        {/* Social Links */}
        {userProfile.social_links && Object.keys(userProfile.social_links).length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Social Links
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {Object.entries(userProfile.social_links).map(([platform, url]) => {
                const urlString = typeof url === 'string' ? url : String(url);
                return (
                  <a
                    key={platform}
                    href={urlString}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <Globe className="h-4 w-4" />
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </a>
                );
              })}
            </CardContent>
          </Card>
        )}
      </div>
      {/* Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">{userProfile.projects_completed || 0}</div>
              <div className="text-sm text-muted-foreground">Projects Completed</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">{userProfile.years_of_experience || 0}</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold flex items-center justify-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                4.9
              </div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
