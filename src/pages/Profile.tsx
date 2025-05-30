
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { PrivateRoute } from '@/components/auth/PrivateRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Settings, 
  Shield, 
  Camera, 
  Mail, 
  Phone, 
  Globe, 
  Award,
  Lock,
  Bell
} from 'lucide-react';
import { useAuth } from '@/contexts/auth';

const Profile = () => {
  const { userProfile, getUserType } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const userType = getUserType();

  const [formData, setFormData] = useState({
    fullName: userProfile?.full_name || '',
    displayName: userProfile?.display_name || '',
    bio: userProfile?.bio || '',
    website: userProfile?.website || '',
    walletAddress: userProfile?.wallet_address || '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // TODO: Implement profile save logic
    setIsEditing(false);
  };

  return (
    <PrivateRoute>
      <Helmet>
        <title>Profile | Hawkly</title>
        <meta name="description" content="Manage your profile and account settings" />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <div className="container py-8 max-w-4xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Profile Settings</h1>
              <p className="text-muted-foreground">Manage your account information and preferences</p>
            </div>

            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Update your profile information and how others see you on the platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={userProfile?.avatar_url || ''} />
                        <AvatarFallback>
                          {(userProfile?.display_name || userProfile?.full_name || 'U')[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm">
                          <Camera className="mr-2 h-4 w-4" />
                          Change Avatar
                        </Button>
                        <p className="text-sm text-muted-foreground">
                          JPG, GIF or PNG. 1MB max.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="displayName">Display Name</Label>
                        <Input
                          id="displayName"
                          value={formData.displayName}
                          onChange={(e) => handleInputChange('displayName', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell us about yourself..."
                        value={formData.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        disabled={!isEditing}
                        rows={4}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          placeholder="https://..."
                          value={formData.website}
                          onChange={(e) => handleInputChange('website', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="walletAddress">Wallet Address</Label>
                        <Input
                          id="walletAddress"
                          placeholder="0x..."
                          value={formData.walletAddress}
                          onChange={(e) => handleInputChange('walletAddress', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">
                        {userType === 'project_owner' ? 'Project Owner' : 
                         userType === 'auditor' ? 'Auditor' : 
                         userType === 'admin' ? 'Admin' : 'General User'}
                      </Badge>
                      <Badge variant={userProfile?.verification_status === 'verified' ? 'default' : 'outline'}>
                        {userProfile?.verification_status === 'verified' ? 'Verified' : 'Pending Verification'}
                      </Badge>
                    </div>

                    <div className="flex justify-end space-x-2">
                      {isEditing ? (
                        <>
                          <Button variant="outline" onClick={() => setIsEditing(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleSave}>Save Changes</Button>
                        </>
                      ) : (
                        <Button onClick={() => setIsEditing(true)}>
                          <User className="mr-2 h-4 w-4" />
                          Edit Profile
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Password & Authentication</CardTitle>
                      <CardDescription>
                        Manage your password and two-factor authentication
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="outline">
                        <Lock className="mr-2 h-4 w-4" />
                        Change Password
                      </Button>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Two-Factor Authentication</h4>
                          <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Active Sessions</CardTitle>
                      <CardDescription>
                        Monitor and manage your active sessions
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Current Session</p>
                            <p className="text-sm text-muted-foreground">Chrome on macOS</p>
                          </div>
                          <Badge variant="secondary">Active</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Choose what notifications you want to receive
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {[
                      { 
                        title: 'Audit Updates', 
                        description: 'Get notified about audit progress and milestones',
                        enabled: true 
                      },
                      { 
                        title: 'New Messages', 
                        description: 'Receive notifications for new messages',
                        enabled: true 
                      },
                      { 
                        title: 'Marketing Emails', 
                        description: 'Get updates about new features and promotions',
                        enabled: false 
                      },
                      { 
                        title: 'Security Alerts', 
                        description: 'Important security notifications',
                        enabled: true 
                      }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                        <Switch defaultChecked={item.enabled} />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preferences">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Preferences</CardTitle>
                    <CardDescription>
                      Customize your experience on the platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Time Zone</Label>
                        <select className="w-full p-2 border rounded-md">
                          <option>UTC</option>
                          <option>EST</option>
                          <option>PST</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label>Language</Label>
                        <select className="w-full p-2 border rounded-md">
                          <option>English</option>
                          <option>Spanish</option>
                          <option>French</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Public Profile</h4>
                        <p className="text-sm text-muted-foreground">
                          Make your profile visible to other users
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Auto-Accept Audits</h4>
                        <p className="text-sm text-muted-foreground">
                          Automatically accept audit requests that match your criteria
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        <Footer />
      </div>
    </PrivateRoute>
  );
};

export default Profile;
