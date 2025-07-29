import React, { useState } from 'react';
import { ProductionLayout } from '@/components/layout/ProductionLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Save,
  Eye,
  EyeOff,
  LockIcon,
  UserIcon,
  BellIcon,
  PaletteIcon,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/auth';
import { HawklyCard, SecurityBadge, ProgressIndicator, AuditorAvatar } from '@/components/ui/hawkly-components';

export default function Settings() {
  const { user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    marketing: false
  });
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success'>('idle');
  const [securityScore, setSecurityScore] = useState(75);

  const handleSave = () => {
    // Handle saving settings
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <ProductionLayout>
      <div className="container mx-auto px-4 py-8 bg-[#0a0d16] min-h-screen">
        <div className="max-w-4xl mx-auto space-y-8">
          <HawklyCard variant="glass" elevation="subtle" className="border-[rgba(168,121,239,0.08)] p-6">
            <h1 className="text-3xl font-bold text-white">Settings</h1>
            <p className="text-[#8391ad]">Manage your account settings and security preferences</p>
          </HawklyCard>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-[#1e2332] border border-[#23283e] rounded-xl overflow-hidden">
              <TabsTrigger 
                value="profile" 
                className="data-[state=active]:bg-[#23283e] data-[state=active]:text-white text-[#8391ad] py-3"
              >
                <UserIcon className="h-4 w-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger 
                value="notifications"
                className="data-[state=active]:bg-[#23283e] data-[state=active]:text-white text-[#8391ad] py-3"
              >
                <BellIcon className="h-4 w-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger 
                value="security"
                className="data-[state=active]:bg-[#23283e] data-[state=active]:text-white text-[#8391ad] py-3"
              >
                <Shield className="h-4 w-4 mr-2" />
                Security
              </TabsTrigger>
              <TabsTrigger 
                value="appearance"
                className="data-[state=active]:bg-[#23283e] data-[state=active]:text-white text-[#8391ad] py-3"
              >
                <PaletteIcon className="h-4 w-4 mr-2" />
                Appearance
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <HawklyCard variant="glass" elevation="subtle">
                    <CardHeader>
                      <CardTitle className="text-white">Profile Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-[#8391ad]">First Name</Label>
                          <Input 
                            id="firstName" 
                            defaultValue="John" 
                            className="bg-[#212842]/60 border-[#23283e] text-white focus:border-[#a879ef] focus:ring-[#a879ef]/20" 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-[#8391ad]">Last Name</Label>
                          <Input 
                            id="lastName" 
                            defaultValue="Doe" 
                            className="bg-[#212842]/60 border-[#23283e] text-white focus:border-[#a879ef] focus:ring-[#a879ef]/20" 
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-[#8391ad]">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          defaultValue={user?.email || 'john@example.com'} 
                          className="bg-[#212842]/60 border-[#23283e] text-white focus:border-[#a879ef] focus:ring-[#a879ef]/20" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio" className="text-[#8391ad]">Bio</Label>
                        <Input 
                          id="bio" 
                          placeholder="Tell us about yourself..." 
                          className="bg-[#212842]/60 border-[#23283e] text-white focus:border-[#a879ef] focus:ring-[#a879ef]/20" 
                        />
                      </div>
                      <Button 
                        onClick={handleSave} 
                        className="bg-gradient-to-r from-[#a879ef] to-[#32d9fa] hover:from-[#9a6adf] hover:to-[#25c9ea] border-none"
                      >
                        {saveStatus === 'saving' ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                          </span>
                        ) : saveStatus === 'success' ? (
                          <span className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Saved!
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </span>
                        )}
                      </Button>
                    </CardContent>
                  </HawklyCard>

                  <HawklyCard variant="glass" elevation="subtle">
                    <CardHeader>
                      <CardTitle className="text-white">Connected Accounts</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-[#212842]/60 rounded-xl border border-[#23283e]">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-[#4285F4] rounded-full flex items-center justify-center">
                            <span className="text-xl text-white font-bold">G</span>
                          </div>
                          <div>
                            <p className="font-medium text-white">Google</p>
                            <p className="text-sm text-[#8391ad]">Connected</p>
                          </div>
                        </div>
                        <Button variant="outline" className="border-[#23283e] text-[#8391ad] hover:bg-[#23283e]/50 hover:text-white">Disconnect</Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-[#212842]/60 rounded-xl border border-[#23283e]">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-[#3b5998] rounded-full flex items-center justify-center">
                            <span className="text-xl text-white font-bold">M</span>
                          </div>
                          <div>
                            <p className="font-medium text-white">MetaMask</p>
                            <p className="text-xs text-[#8391ad]">0x71C7...8A3F</p>
                          </div>
                        </div>
                        <Button variant="outline" className="border-[#23283e] text-[#8391ad] hover:bg-[#23283e]/50 hover:text-white">Disconnect</Button>
                      </div>
                    </CardContent>
                  </HawklyCard>
                </div>

                <div className="space-y-6">
                  <HawklyCard variant="highlighted" elevation="subtle" glow={true} className="border-[#a879ef]/20">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Profile Status</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex flex-col items-center">
                        <AuditorAvatar 
                          name="John Doe"
                          verified={true}
                          size="xl"
                          rating={4.8}
                        />
                        <p className="text-white font-medium mt-4">John Doe</p>
                        <p className="text-[#8391ad] text-sm">Security Researcher</p>
                      </div>
                      
                      <div className="text-center p-3 bg-[#212842]/60 rounded-xl border border-[#23283e]">
                        <p className="text-sm text-[#8391ad]">Profile Completion</p>
                        <ProgressIndicator 
                          value={85} 
                          max={100} 
                          glowEffect={true}
                        />
                      </div>
                    </CardContent>
                  </HawklyCard>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notifications">
              <HawklyCard variant="glass" elevation="subtle">
                <CardHeader>
                  <CardTitle className="text-white">Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between px-3 py-4 bg-[#212842]/60 rounded-xl border border-[#23283e]">
                    <div className="space-y-0.5">
                      <div className="text-base text-white">Email Notifications</div>
                      <div className="text-sm text-[#8391ad]">
                        Receive security alerts and updates via email
                      </div>
                    </div>
                    <Switch 
                      checked={notifications.email}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, email: checked }))
                      }
                      className="data-[state=checked]:bg-[#a879ef] data-[state=checked]:border-[#a879ef]"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between px-3 py-4 bg-[#212842]/60 rounded-xl border border-[#23283e]">
                    <div className="space-y-0.5">
                      <div className="text-base text-white">Push Notifications</div>
                      <div className="text-sm text-[#8391ad]">
                        Receive push notifications in your browser
                      </div>
                    </div>
                    <Switch 
                      checked={notifications.push}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, push: checked }))
                      }
                      className="data-[state=checked]:bg-[#a879ef] data-[state=checked]:border-[#a879ef]"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between px-3 py-4 bg-[#212842]/60 rounded-xl border border-[#23283e]">
                    <div className="space-y-0.5">
                      <div className="text-base text-white">Marketing Emails</div>
                      <div className="text-sm text-[#8391ad]">
                        Receive updates about new features and offers
                      </div>
                    </div>
                    <Switch 
                      checked={notifications.marketing}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, marketing: checked }))
                      }
                      className="data-[state=checked]:bg-[#a879ef] data-[state=checked]:border-[#a879ef]"
                    />
                  </div>

                  <div className="pt-4">
                    <Button 
                      onClick={handleSave} 
                      className="bg-gradient-to-r from-[#a879ef] to-[#32d9fa] hover:from-[#9a6adf] hover:to-[#25c9ea] border-none"
                    >
                      {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'success' ? 'Saved!' : 'Save Preferences'}
                    </Button>
                  </div>
                </CardContent>
              </HawklyCard>
            </TabsContent>

            <TabsContent value="security">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <HawklyCard variant="glass" elevation="subtle">
                    <CardHeader>
                      <CardTitle className="text-white">Password Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword" className="text-[#8391ad]">Current Password</Label>
                        <div className="relative">
                          <Input 
                            id="currentPassword" 
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter current password" 
                            className="bg-[#212842]/60 border-[#23283e] text-white focus:border-[#a879ef] focus:ring-[#a879ef]/20" 
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 text-[#8391ad] hover:text-white"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword" className="text-[#8391ad]">New Password</Label>
                        <Input 
                          id="newPassword" 
                          type="password" 
                          placeholder="Enter new password" 
                          className="bg-[#212842]/60 border-[#23283e] text-white focus:border-[#a879ef] focus:ring-[#a879ef]/20" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-[#8391ad]">Confirm Password</Label>
                        <Input 
                          id="confirmPassword" 
                          type="password" 
                          placeholder="Confirm new password" 
                          className="bg-[#212842]/60 border-[#23283e] text-white focus:border-[#a879ef] focus:ring-[#a879ef]/20" 
                        />
                      </div>
                      <Button 
                        className="bg-gradient-to-r from-[#a879ef] to-[#32d9fa] hover:from-[#9a6adf] hover:to-[#25c9ea] border-none"
                      >
                        Update Password
                      </Button>
                    </CardContent>
                  </HawklyCard>

                  <HawklyCard variant="glass" elevation="subtle">
                    <CardHeader>
                      <CardTitle className="text-white">Two-Factor Authentication</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between px-3 py-4 bg-[#212842]/60 rounded-xl border border-[#23283e]">
                        <div className="space-y-0.5">
                          <div className="text-base text-white">Enable 2FA</div>
                          <div className="text-sm text-[#8391ad]">
                            Protect your account with two-factor authentication
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          className="border-[#a879ef] text-[#a879ef] hover:bg-[#a879ef]/10"
                        >
                          <LockIcon className="h-4 w-4 mr-2" />
                          Setup
                        </Button>
                      </div>

                      <div className="flex items-center justify-between px-3 py-4 bg-[#212842]/60 rounded-xl border border-[#23283e]">
                        <div className="space-y-0.5">
                          <div className="text-base text-white">Hardware Security Key</div>
                          <div className="text-sm text-[#8391ad]">
                            Add a hardware security key (YubiKey, etc.)
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          className="border-[#a879ef] text-[#a879ef] hover:bg-[#a879ef]/10"
                        >
                          <LockIcon className="h-4 w-4 mr-2" />
                          Add Key
                        </Button>
                      </div>
                    </CardContent>
                  </HawklyCard>
                </div>

                <div className="space-y-6">
                  <HawklyCard variant="highlighted" elevation="subtle" glow={true} className="border-[#a879ef]/20">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Security Status</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex flex-col items-center">
                        <SecurityBadge 
                          level="advanced" 
                          verified={true} 
                          size="lg"
                        />
                      </div>
                      
                      <ProgressIndicator 
                        value={securityScore} 
                        max={100}
                        glowEffect={true}
                        label="Security Score"
                      />
                      
                      <div className="text-sm text-[#8391ad] bg-[#212842]/60 p-3 rounded-lg border border-[#23283e]">
                        <p className="mb-2 text-white">Security Recommendations:</p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Enable two-factor authentication</li>
                          <li>Add a hardware security key</li>
                          <li>Complete your security challenge</li>
                        </ul>
                      </div>
                    </CardContent>
                  </HawklyCard>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="appearance">
              <HawklyCard variant="glass" elevation="subtle">
                <CardHeader>
                  <CardTitle className="text-white">Appearance Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Label className="text-white">Theme</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="relative bg-gradient-to-br from-[#212842] to-[#2a224e] p-5 rounded-xl border border-[#a879ef] ring-2 ring-[#a879ef]/20">
                        <div className="h-20 flex flex-col justify-between">
                          <div className="bg-[#1e2332] h-4 w-1/2 rounded mb-2"></div>
                          <div className="bg-[#212842]/60 h-10 w-full rounded"></div>
                        </div>
                        <p className="mt-3 text-center text-white font-medium">Hawkly Dark</p>
                        <div className="absolute top-2 right-2 text-[#a879ef]">
                          <CheckCircle className="h-5 w-5" />
                        </div>
                      </div>
                      
                      <div className="opacity-50 bg-[#e8eaf5] p-5 rounded-xl border border-[#c4c9d9]">
                        <div className="h-20 flex flex-col justify-between">
                          <div className="bg-[#d1d5e3] h-4 w-1/2 rounded mb-2"></div>
                          <div className="bg-white h-10 w-full rounded shadow-sm"></div>
                        </div>
                        <p className="mt-3 text-center text-[#444b61] font-medium">Light (Coming Soon)</p>
                      </div>
                      
                      <div className="opacity-50 bg-[#080b14] p-5 rounded-xl border border-[#262f49]">
                        <div className="h-20 flex flex-col justify-between">
                          <div className="bg-[#161d2e] h-4 w-1/2 rounded mb-2"></div>
                          <div className="bg-gradient-to-r from-[#5a32a3] to-[#26577c] h-10 w-full rounded"></div>
                        </div>
                        <p className="mt-3 text-center text-white font-medium">Contrast (Coming Soon)</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-[#212842]/60 rounded-xl border border-[#23283e]">
                    <p className="text-sm text-[#8391ad]">
                      Hawkly uses a consistent dark theme optimized for security professionals and low-light conditions. Additional themes are under development.
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between px-3 py-4 bg-[#212842]/60 rounded-xl border border-[#23283e]">
                    <div className="space-y-0.5">
                      <div className="text-base text-white">Reduce Animations</div>
                      <div className="text-sm text-[#8391ad]">
                        Minimize motion and animations across the interface
                      </div>
                    </div>
                    <Switch 
                      className="data-[state=checked]:bg-[#a879ef] data-[state=checked]:border-[#a879ef]"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between px-3 py-4 bg-[#212842]/60 rounded-xl border border-[#23283e]">
                    <div className="space-y-0.5">
                      <div className="text-base text-white">High Contrast Text</div>
                      <div className="text-sm text-[#8391ad]">
                        Increase text contrast for better readability
                      </div>
                    </div>
                    <Switch 
                      className="data-[state=checked]:bg-[#a879ef] data-[state=checked]:border-[#a879ef]"
                    />
                  </div>
                </CardContent>
              </HawklyCard>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProductionLayout>
  );
}
