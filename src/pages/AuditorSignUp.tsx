
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Shield, User, Code, Award } from 'lucide-react';

const AuditorSignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    walletAddress: '',
    githubProfile: '',
    linkedinProfile: '',
    yearsExperience: '',
    primarySkills: [] as string[],
    certifications: '',
    agreeToTerms: false,
    agreeToCodeOfConduct: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const skillOptions = [
    'Smart Contract Auditing',
    'Solidity Development',
    'Rust Programming',
    'Security Analysis',
    'DeFi Protocols',
    'NFT Standards',
    'Layer 2 Solutions',
    'Cross-chain Security'
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      primarySkills: prev.primarySkills.includes(skill)
        ? prev.primarySkills.filter(s => s !== skill)
        : [...prev.primarySkills, skill]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!formData.agreeToTerms || !formData.agreeToCodeOfConduct) {
      toast.error('Please agree to the terms and code of conduct');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Registration successful! Please check your email for verification');
      navigate('/auditor/email-verification');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Auditor Sign Up | Hawkly</title>
        <meta name="description" content="Join Hawkly as a security auditor and start earning from Web3 audits" />
      </Helmet>

      <StandardLayout title="Join as Security Auditor" description="Start your journey as a Web3 security expert">
        <div className="container max-w-2xl py-8">
          <div className="text-center mb-8">
            <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
            <h1 className="text-3xl font-bold">Become a Security Auditor</h1>
            <p className="text-muted-foreground mt-2">
              Join our network of elite Web3 security professionals
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Auditor Registration</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Basic Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="password">Password *</Label>
                      <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm Password *</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="walletAddress">Wallet Address *</Label>
                    <Input
                      id="walletAddress"
                      placeholder="0x..."
                      value={formData.walletAddress}
                      onChange={(e) => handleInputChange('walletAddress', e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Professional Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Professional Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="githubProfile">GitHub Profile</Label>
                      <Input
                        id="githubProfile"
                        placeholder="https://github.com/username"
                        value={formData.githubProfile}
                        onChange={(e) => handleInputChange('githubProfile', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="linkedinProfile">LinkedIn Profile</Label>
                      <Input
                        id="linkedinProfile"
                        placeholder="https://linkedin.com/in/username"
                        value={formData.linkedinProfile}
                        onChange={(e) => handleInputChange('linkedinProfile', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="yearsExperience">Years of Experience *</Label>
                    <Select value={formData.yearsExperience} onValueChange={(value) => handleInputChange('yearsExperience', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-1">0-1 years</SelectItem>
                        <SelectItem value="2-3">2-3 years</SelectItem>
                        <SelectItem value="4-5">4-5 years</SelectItem>
                        <SelectItem value="5+">5+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Primary Skills * (Select all that apply)</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {skillOptions.map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox
                            id={skill}
                            checked={formData.primarySkills.includes(skill)}
                            onCheckedChange={() => handleSkillToggle(skill)}
                          />
                          <Label htmlFor={skill} className="text-sm">{skill}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="certifications">Certifications & Credentials</Label>
                    <Textarea
                      id="certifications"
                      placeholder="List any relevant certifications, educational background, or achievements..."
                      value={formData.certifications}
                      onChange={(e) => handleInputChange('certifications', e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>

                {/* Agreement Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Terms & Agreements
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked)}
                      />
                      <Label htmlFor="agreeToTerms" className="text-sm">
                        I agree to the <a href="/terms" className="text-primary hover:underline">Terms of Service</a> and <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
                      </Label>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="agreeToCodeOfConduct"
                        checked={formData.agreeToCodeOfConduct}
                        onCheckedChange={(checked) => handleInputChange('agreeToCodeOfConduct', checked)}
                      />
                      <Label htmlFor="agreeToCodeOfConduct" className="text-sm">
                        I agree to follow the <a href="/audit-guidelines" className="text-primary hover:underline">Auditor Code of Conduct</a> and maintain professional standards
                      </Label>
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating Account...' : 'Create Auditor Account'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </StandardLayout>
    </>
  );
};

export default AuditorSignUp;
