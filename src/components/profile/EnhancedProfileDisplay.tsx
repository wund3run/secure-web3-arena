
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Mail, 
  Calendar, 
  Shield, 
  Settings, 
  MapPin, 
  Clock,
  Star,
  TrendingUp,
  Award,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '@/contexts/auth';

interface EnhancedProfileDisplayProps {
  isOwnProfile?: boolean;
  onEdit?: () => void;
}

export const EnhancedProfileDisplay: React.FC<EnhancedProfileDisplayProps> = ({
  isOwnProfile = true,
  onEdit
}) => {
  const { user, userProfile } = useAuth();

  const renderAuditorSpecificInfo = () => (
    <div className="space-y-6">
      {/* Professional Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Professional Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {userProfile?.years_of_experience || 0}
              </div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {userProfile?.projects_completed || 0}
              </div>
              <div className="text-sm text-muted-foreground">Audits Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">4.8</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
          </div>
          
          {userProfile?.specializations && userProfile.specializations.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Specializations</h4>
              <div className="flex flex-wrap gap-2">
                {userProfile.specializations.map((spec, index) => (
                  <Badge key={index} variant="secondary">{spec}</Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Availability & Rates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Availability & Rates
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Current Status</span>
            <Badge variant="default">Available</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Response Time</span>
            <span className="text-sm text-muted-foreground">< 24 hours</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Hourly Rate</span>
            <span className="text-sm text-muted-foreground">$150 - $300</span>
          </div>
        </CardContent>
      </Card>

      {/* Recent Reviews */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Recent Reviews
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm font-medium">Excellent work!</span>
              </div>
              <p className="text-sm text-muted-foreground">
                "Thorough audit with detailed findings and clear recommendations. 
                Fast turnaround and excellent communication throughout."
              </p>
              <div className="text-xs text-muted-foreground mt-2">
                - Project Owner • 2 weeks ago
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderProjectOwnerSpecificInfo = () => (
    <div className="space-y-6">
      {/* Project Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Project Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {userProfile?.projects_completed || 0}
              </div>
              <div className="text-sm text-muted-foreground">Projects Audited</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">92</div>
              <div className="text-sm text-muted-foreground">Security Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">$50K</div>
              <div className="text-sm text-muted-foreground">Protected Value</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Overall Security Score</span>
              <span>92/100</span>
            </div>
            <Progress value={92} className="h-2" />
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span>Critical Issues</span>
              <span className="text-red-500">0</span>
            </div>
            <div className="flex justify-between">
              <span>High Issues</span>
              <span className="text-orange-500">2</span>
            </div>
            <div className="flex justify-between">
              <span>Medium Issues</span>
              <span className="text-yellow-500">5</span>
            </div>
            <div className="flex justify-between">
              <span>Low Issues</span>
              <span className="text-blue-500">8</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 bg-green-500 rounded-full" />
              <div className="flex-1">
                <p className="text-sm font-medium">DeFi Protocol Audit Completed</p>
                <p className="text-xs text-muted-foreground">2 days ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 bg-blue-500 rounded-full" />
              <div className="flex-1">
                <p className="text-sm font-medium">New Audit Request Submitted</p>
                <p className="text-xs text-muted-foreground">1 week ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 bg-purple-500 rounded-full" />
              <div className="flex-1">
                <p className="text-sm font-medium">Smart Contract Deployed</p>
                <p className="text-xs text-muted-foreground">2 weeks ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={userProfile?.avatar_url} />
                <AvatarFallback className="text-lg">
                  <User className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <div>
                  <h1 className="text-2xl font-bold">
                    {userProfile?.full_name || userProfile?.display_name || 'User Profile'}
                  </h1>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{user?.email || 'email@example.com'}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">
                    {userProfile?.user_type === 'auditor' ? 'Security Auditor' : 'Project Owner'}
                  </Badge>
                  <Badge variant="outline">
                    <Shield className="h-3 w-3 mr-1" />
                    {userProfile?.verification_status === 'verified' ? 'Verified' : 'Pending Verification'}
                  </Badge>
                  {userProfile?.user_type === 'auditor' && (
                    <Badge variant="outline">
                      <MapPin className="h-3 w-3 mr-1" />
                      Available Globally
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            {isOwnProfile && (
              <Button variant="outline" onClick={onEdit}>
                <Settings className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>

          {userProfile?.bio && (
            <div className="mt-4">
              <p className="text-muted-foreground">{userProfile.bio}</p>
            </div>
          )}

          {userProfile?.website && (
            <div className="mt-4">
              <Button variant="link" className="p-0 h-auto" asChild>
                <a href={userProfile.website} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Visit Website
                </a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Separator />

      {/* Role-Specific Content */}
      {userProfile?.user_type === 'auditor' 
        ? renderAuditorSpecificInfo() 
        : renderProjectOwnerSpecificInfo()
      }
    </div>
  );
};
