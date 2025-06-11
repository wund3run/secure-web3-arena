
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/auth';
import { 
  User, 
  MapPin, 
  Calendar, 
  Award, 
  Star, 
  Globe, 
  Edit2, 
  Mail, 
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';

interface EnhancedProfileDisplayProps {
  isOwnProfile?: boolean;
  onEdit?: () => void;
}

export const EnhancedProfileDisplay: React.FC<EnhancedProfileDisplayProps> = ({
  isOwnProfile = false,
  onEdit
}) => {
  const { userProfile } = useAuth();

  if (!userProfile) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            No profile data available
          </div>
        </CardContent>
      </Card>
    );
  }

  const getVerificationBadge = () => {
    switch (userProfile.verification_status) {
      case 'verified':
        return <Badge variant="default" className="flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          Verified
        </Badge>;
      case 'pending':
        return <Badge variant="secondary" className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          Pending
        </Badge>;
      case 'rejected':
        return <Badge variant="destructive" className="flex items-center gap-1">
          <XCircle className="h-3 w-3" />
          Rejected
        </Badge>;
      default:
        return null;
    }
  };

  const getUserTypeDisplay = () => {
    switch (userProfile.user_type) {
      case 'auditor':
        return 'Security Auditor';
      case 'project_owner':
        return 'Project Owner';
      case 'admin':
        return 'Platform Administrator';
      default:
        return 'User';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage 
                  src={userProfile.avatar_url} 
                  alt={userProfile.display_name || userProfile.full_name || 'User'} 
                />
                <AvatarFallback className="text-lg">
                  {((userProfile.display_name || userProfile.full_name || 'U').charAt(0)).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="space-y-2">
                <div>
                  <h1 className="text-2xl font-bold">
                    {userProfile.display_name || userProfile.full_name || 'User'}
                  </h1>
                  {userProfile.full_name && userProfile.display_name && (
                    <p className="text-muted-foreground">{userProfile.full_name}</p>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{getUserTypeDisplay()}</Badge>
                  {getVerificationBadge()}
                </div>
                
                {userProfile.bio && (
                  <p className="text-muted-foreground max-w-2xl">{userProfile.bio}</p>
                )}
              </div>
            </div>
            
            {isOwnProfile && onEdit && (
              <Button onClick={onEdit} variant="outline" size="sm">
                <Edit2 className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Professional Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Professional Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {userProfile.years_of_experience !== undefined && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {userProfile.years_of_experience} years of experience
                </span>
              </div>
            )}
            
            {userProfile.projects_completed !== undefined && (
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {userProfile.projects_completed} projects completed
                </span>
              </div>
            )}
            
            {userProfile.website && (
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <a 
                  href={userProfile.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  {userProfile.website}
                </a>
              </div>
            )}
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
                {userProfile.specializations.map((spec, index) => (
                  <Badge key={index} variant="secondary">
                    {spec}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Skills */}
        {userProfile.skills && userProfile.skills.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {userProfile.skills.map((skill, index) => (
                  <Badge key={index} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

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
              {Object.entries(userProfile.social_links).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <Globe className="h-4 w-4" />
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </a>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
