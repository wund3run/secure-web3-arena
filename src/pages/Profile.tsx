
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/auth';
import { 
  User, 
  Star, 
  Shield, 
  Calendar, 
  MapPin, 
  Globe, 
  Building,
  Mail,
  Phone,
  Award,
  TrendingUp
} from 'lucide-react';
import { PrivateRoute } from '@/components/auth/PrivateRoute';

export default function Profile() {
  const { user, userProfile, getUserType } = useAuth();
  const userType = getUserType();

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const mockStats = {
    auditor: {
      totalAudits: 47,
      rating: 4.9,
      earnings: '$127,500',
      expertise: ['Smart Contracts', 'DeFi', 'NFTs', 'DAOs']
    },
    projectOwner: {
      projectsSecured: 12,
      totalSpent: '$45,000',
      avgRating: 4.8,
      favoriteAuditors: 8
    }
  };

  const recentActivity = [
    { type: 'audit_completed', title: 'DeFi Protocol Audit Completed', date: '2 days ago' },
    { type: 'payment_released', title: 'Milestone Payment Released', date: '5 days ago' },
    { type: 'audit_started', title: 'NFT Marketplace Audit Started', date: '1 week ago' },
    { type: 'profile_updated', title: 'Profile Information Updated', date: '2 weeks ago' }
  ];

  return (
    <PrivateRoute>
      <StandardLayout title="Profile - Hawkly" description="User profile">
        <div className="container py-8 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center space-y-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={userProfile?.avatar_url} />
                      <AvatarFallback className="text-xl">
                        {getInitials(userProfile?.full_name || user?.email || 'U')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="text-center">
                      <h2 className="text-2xl font-bold">
                        {userProfile?.full_name || 'User'}
                      </h2>
                      <p className="text-muted-foreground">{user?.email}</p>
                      <Badge variant="secondary" className="mt-2">
                        {userType === 'auditor' ? 'Security Auditor' : 'Project Owner'}
                      </Badge>
                    </div>

                    {userProfile?.bio && (
                      <p className="text-sm text-muted-foreground text-center">
                        {userProfile.bio}
                      </p>
                    )}

                    <Button className="w-full">
                      Edit Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{user?.email}</span>
                  </div>
                  {userProfile?.company && (
                    <div className="flex items-center space-x-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{userProfile.company}</span>
                    </div>
                  )}
                  {userProfile?.location && (
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{userProfile.location}</span>
                    </div>
                  )}
                  {userProfile?.website && (
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <a href={userProfile.website} className="text-sm text-primary hover:underline">
                        Website
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                  <TabsTrigger value="achievements">Achievements</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {userType === 'auditor' ? (
                      <>
                        <Card>
                          <CardContent className="pt-6">
                            <div className="flex items-center space-x-2">
                              <Shield className="h-8 w-8 text-primary" />
                              <div>
                                <p className="text-2xl font-bold">{mockStats.auditor.totalAudits}</p>
                                <p className="text-xs text-muted-foreground">Total Audits</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="pt-6">
                            <div className="flex items-center space-x-2">
                              <Star className="h-8 w-8 text-yellow-500" />
                              <div>
                                <p className="text-2xl font-bold">{mockStats.auditor.rating}</p>
                                <p className="text-xs text-muted-foreground">Avg Rating</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="pt-6">
                            <div className="flex items-center space-x-2">
                              <TrendingUp className="h-8 w-8 text-green-500" />
                              <div>
                                <p className="text-2xl font-bold">{mockStats.auditor.earnings}</p>
                                <p className="text-xs text-muted-foreground">Total Earnings</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="pt-6">
                            <div className="flex items-center space-x-2">
                              <Award className="h-8 w-8 text-purple-500" />
                              <div>
                                <p className="text-2xl font-bold">{mockStats.auditor.expertise.length}</p>
                                <p className="text-xs text-muted-foreground">Specializations</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </>
                    ) : (
                      <>
                        <Card>
                          <CardContent className="pt-6">
                            <div className="flex items-center space-x-2">
                              <Shield className="h-8 w-8 text-primary" />
                              <div>
                                <p className="text-2xl font-bold">{mockStats.projectOwner.projectsSecured}</p>
                                <p className="text-xs text-muted-foreground">Projects Secured</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="pt-6">
                            <div className="flex items-center space-x-2">
                              <TrendingUp className="h-8 w-8 text-green-500" />
                              <div>
                                <p className="text-2xl font-bold">{mockStats.projectOwner.totalSpent}</p>
                                <p className="text-xs text-muted-foreground">Total Invested</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="pt-6">
                            <div className="flex items-center space-x-2">
                              <Star className="h-8 w-8 text-yellow-500" />
                              <div>
                                <p className="text-2xl font-bold">{mockStats.projectOwner.avgRating}</p>
                                <p className="text-xs text-muted-foreground">Avg Rating</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="pt-6">
                            <div className="flex items-center space-x-2">
                              <User className="h-8 w-8 text-blue-500" />
                              <div>
                                <p className="text-2xl font-bold">{mockStats.projectOwner.favoriteAuditors}</p>
                                <p className="text-xs text-muted-foreground">Favorite Auditors</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </>
                    )}
                  </div>

                  {/* Expertise/Skills */}
                  {userType === 'auditor' && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Areas of Expertise</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {mockStats.auditor.expertise.map((skill, index) => (
                            <Badge key={index} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="activity" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentActivity.map((activity, index) => (
                          <div key={index} className="flex items-center space-x-3 pb-3 border-b last:border-b-0">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <div className="flex-1">
                              <p className="font-medium">{activity.title}</p>
                              <p className="text-sm text-muted-foreground">{activity.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="achievements" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center space-x-3">
                          <Award className="h-12 w-12 text-yellow-500" />
                          <div>
                            <h3 className="font-bold">Top Performer</h3>
                            <p className="text-sm text-muted-foreground">Completed 50+ audits with 4.8+ rating</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center space-x-3">
                          <Shield className="h-12 w-12 text-green-500" />
                          <div>
                            <h3 className="font-bold">Security Expert</h3>
                            <p className="text-sm text-muted-foreground">Found 200+ critical vulnerabilities</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </StandardLayout>
    </PrivateRoute>
  );
}
