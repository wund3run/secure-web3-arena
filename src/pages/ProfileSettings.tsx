import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  User, 
  Save,
  CheckCircle,
  Camera,
  Globe,
  Twitter,
  Github,
  Linkedin,
  Link as LinkIcon
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { ProductionLayout } from '@/components/layout/ProductionLayout';
import { HawklyCard, AuditorAvatar } from '@/components/ui/hawkly-components';
import { useAuth } from '@/contexts/auth';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ProfileSettings() {
  const { user } = useAuth();
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success'>('idle');
  const [avatarHover, setAvatarHover] = useState(false);
  
  // Form state
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: user?.email || 'john@example.com',
    username: 'johndoe',
    bio: 'Security researcher and blockchain auditor with 5+ years of experience.',
    jobTitle: 'Senior Security Auditor',
    location: 'San Francisco, CA',
    website: 'https://johndoe.dev',
    twitter: '@johndoetech',
    github: 'johndoe',
    linkedin: 'johndoe',
    skillLevel: 'advanced',
    availableForWork: true,
    displayEmail: false,
    specialties: ['Smart Contracts', 'DeFi', 'ZK Proofs', 'Frontend Security']
  });

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSave = () => {
    // Simulate API call
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <ProductionLayout>
      <Helmet>
        <title>Profile Settings | Hawkly</title>
        <meta name="description" content="Update your profile information and preferences" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8 bg-[#0a0d16] min-h-screen">
        <div className="max-w-4xl mx-auto space-y-8">
          <HawklyCard variant="glass" elevation="subtle" className="border-[rgba(168,121,239,0.08)] p-6">
            <div className="flex items-center gap-4">
              <User size={24} className="text-[#a879ef]" />
              <div>
                <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
                <p className="text-[#8391ad]">Manage how others see you on the platform</p>
              </div>
            </div>
          </HawklyCard>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column - Avatar and profile status */}
            <div className="space-y-6">
              <HawklyCard variant="glass" elevation="subtle">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Profile Image</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div 
                    className="relative"
                    onMouseEnter={() => setAvatarHover(true)}
                    onMouseLeave={() => setAvatarHover(false)}
                  >
                    <AuditorAvatar
                      name={`${profileData.firstName} ${profileData.lastName}`}
                      size="xl"
                      className="w-32 h-32"
                    />
                    <div className={`absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center transition-opacity ${avatarHover ? 'opacity-100' : 'opacity-0'}`}>
                      <Camera size={24} className="text-white" />
                    </div>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="absolute inset-0 opacity-0 cursor-pointer" 
                      aria-label="Upload profile picture"
                    />
                  </div>
                  <p className="mt-4 text-sm text-[#8391ad] text-center">
                    Click on the image to upload a new profile picture<br />
                    (Recommended: 400 x 400px)
                  </p>
                </CardContent>
              </HawklyCard>
              
              <HawklyCard variant="highlighted" elevation="subtle" glow={true} className="border-[#a879ef]/20">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Profile Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[#8391ad]">Profile Completion</span>
                    <span className="text-white font-medium">85%</span>
                  </div>
                  <div className="w-full h-2 bg-[#212842] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#a879ef] to-[#32d9fa]" style={{ width: '85%' }} />
                  </div>
                  
                  <Separator className="my-2 bg-[#23283e]" />
                  
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#8391ad]">Verification Level</span>
                      <span className="text-white bg-[#a879ef]/20 px-2 py-0.5 rounded-md text-xs">Advanced</span>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-[#8391ad]">Account Type</span>
                      <span className="text-white text-sm">Auditor</span>
                    </div>
                  </div>
                </CardContent>
              </HawklyCard>
            </div>
            
            {/* Right column - Main profile form */}
            <div className="lg:col-span-2 space-y-6">
              <HawklyCard variant="glass" elevation="subtle">
                <CardHeader>
                  <CardTitle className="text-white">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-[#8391ad]">First Name</Label>
                      <Input 
                        id="firstName" 
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleChange}
                        className="bg-[#212842]/60 border-[#23283e] text-white focus:border-[#a879ef] focus:ring-[#a879ef]/20" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-[#8391ad]">Last Name</Label>
                      <Input 
                        id="lastName" 
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleChange}
                        className="bg-[#212842]/60 border-[#23283e] text-white focus:border-[#a879ef] focus:ring-[#a879ef]/20" 
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[#8391ad]">Email</Label>
                      <Input 
                        id="email" 
                        name="email"
                        type="email" 
                        value={profileData.email}
                        onChange={handleChange}
                        className="bg-[#212842]/60 border-[#23283e] text-white focus:border-[#a879ef] focus:ring-[#a879ef]/20" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-[#8391ad]">Username</Label>
                      <Input 
                        id="username" 
                        name="username"
                        value={profileData.username}
                        onChange={handleChange}
                        className="bg-[#212842]/60 border-[#23283e] text-white focus:border-[#a879ef] focus:ring-[#a879ef]/20" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-[#8391ad]">Bio</Label>
                    <Textarea 
                      id="bio" 
                      name="bio"
                      value={profileData.bio}
                      onChange={handleChange}
                      rows={4}
                      className="bg-[#212842]/60 border-[#23283e] text-white focus:border-[#a879ef] focus:ring-[#a879ef]/20 resize-none" 
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="jobTitle" className="text-[#8391ad]">Job Title</Label>
                      <Input 
                        id="jobTitle" 
                        name="jobTitle"
                        value={profileData.jobTitle}
                        onChange={handleChange}
                        className="bg-[#212842]/60 border-[#23283e] text-white focus:border-[#a879ef] focus:ring-[#a879ef]/20" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-[#8391ad]">Location</Label>
                      <Input 
                        id="location" 
                        name="location"
                        value={profileData.location}
                        onChange={handleChange}
                        className="bg-[#212842]/60 border-[#23283e] text-white focus:border-[#a879ef] focus:ring-[#a879ef]/20" 
                      />
                    </div>
                  </div>
                </CardContent>
              </HawklyCard>
              
              <HawklyCard variant="glass" elevation="subtle">
                <CardHeader>
                  <CardTitle className="text-white">Professional Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="skillLevel" className="text-[#8391ad]">Experience Level</Label>
                    <Select 
                      value={profileData.skillLevel}
                      onValueChange={(value) => handleSelectChange('skillLevel', value)}
                    >
                      <SelectTrigger className="bg-[#212842]/60 border-[#23283e] text-white focus:border-[#a879ef] focus:ring-[#a879ef]/20">
                        <SelectValue placeholder="Select your experience level" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1e2332] border-[#23283e] text-white">
                        <SelectItem value="beginner">Beginner (0-2 years)</SelectItem>
                        <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
                        <SelectItem value="advanced">Advanced (5-10 years)</SelectItem>
                        <SelectItem value="expert">Expert (10+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-4">
                    <Label className="text-[#8391ad]">Specialties</Label>
                    <div className="flex flex-wrap gap-2">
                      {profileData.specialties.map((specialty, index) => (
                        <div 
                          key={index} 
                          className="px-3 py-1.5 rounded-lg bg-[#272e43] text-white text-sm flex items-center gap-2"
                        >
                          {specialty}
                          <button className="text-[#8391ad] hover:text-white">×</button>
                        </div>
                      ))}
                      <Button variant="outline" className="text-[#8391ad] border-[#23283e] hover:bg-[#212842]/60 hover:text-white">
                        + Add
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </HawklyCard>
              
              <HawklyCard variant="glass" elevation="subtle">
                <CardHeader>
                  <CardTitle className="text-white">Social Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Globe className="h-5 w-5 text-[#8391ad]" />
                      <div className="flex-grow">
                        <Input 
                          id="website" 
                          name="website"
                          value={profileData.website}
                          onChange={handleChange}
                          placeholder="Your website URL"
                          className="bg-[#212842]/60 border-[#23283e] text-white focus:border-[#a879ef] focus:ring-[#a879ef]/20" 
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Twitter className="h-5 w-5 text-[#8391ad]" />
                      <div className="flex-grow">
                        <Input 
                          id="twitter" 
                          name="twitter"
                          value={profileData.twitter}
                          onChange={handleChange}
                          placeholder="Twitter/X username"
                          className="bg-[#212842]/60 border-[#23283e] text-white focus:border-[#a879ef] focus:ring-[#a879ef]/20" 
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Github className="h-5 w-5 text-[#8391ad]" />
                      <div className="flex-grow">
                        <Input 
                          id="github" 
                          name="github"
                          value={profileData.github}
                          onChange={handleChange}
                          placeholder="GitHub username"
                          className="bg-[#212842]/60 border-[#23283e] text-white focus:border-[#a879ef] focus:ring-[#a879ef]/20" 
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Linkedin className="h-5 w-5 text-[#8391ad]" />
                      <div className="flex-grow">
                        <Input 
                          id="linkedin" 
                          name="linkedin"
                          value={profileData.linkedin}
                          onChange={handleChange}
                          placeholder="LinkedIn username"
                          className="bg-[#212842]/60 border-[#23283e] text-white focus:border-[#a879ef] focus:ring-[#a879ef]/20" 
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <LinkIcon className="h-5 w-5 text-[#8391ad]" />
                      <div className="flex-grow flex gap-2">
                        <Input 
                          placeholder="Other link"
                          className="bg-[#212842]/60 border-[#23283e] text-white focus:border-[#a879ef] focus:ring-[#a879ef]/20 flex-grow" 
                        />
                        <Button variant="outline" className="border-[#23283e] text-[#8391ad] hover:bg-[#23283e]/50 hover:text-white">
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </HawklyCard>
              
              <div className="flex justify-end space-x-3">
                <Button 
                  variant="outline" 
                  className="border-[#23283e] text-[#8391ad] hover:bg-[#23283e]/50 hover:text-white"
                >
                  Cancel
                </Button>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProductionLayout>
  );
}
