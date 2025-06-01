
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  User, 
  Shield, 
  FileText, 
  Globe, 
  DollarSign, 
  Clock,
  Upload,
  Plus,
  X
} from 'lucide-react';
import { toast } from 'sonner';

interface ServiceProviderOnboardingFormProps {
  providerType: 'auditor' | 'service';
}

const blockchainExpertise = [
  'Ethereum', 'Polygon', 'Binance Smart Chain', 'Avalanche', 
  'Solana', 'Arbitrum', 'Optimism', 'Fantom', 'Cosmos', 'Polkadot'
];

const auditTypes = [
  'Smart Contract Audit', 'Full-Stack Review', 'Penetration Testing',
  'Code Review', 'Architecture Review', 'Gas Optimization',
  'NFT Security', 'DeFi Security', 'GameFi Security', 'DAO Security'
];

const languages = [
  'English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese',
  'Korean', 'Russian', 'Portuguese', 'Italian', 'Dutch', 'Arabic'
];

export const ServiceProviderOnboardingForm: React.FC<ServiceProviderOnboardingFormProps> = ({ 
  providerType 
}) => {
  const [formData, setFormData] = useState({
    businessName: '',
    fullName: '',
    email: '',
    website: '',
    bio: '',
    yearsExperience: '',
    hourlyRateMin: '',
    hourlyRateMax: '',
    availabilityHours: '',
    timezone: '',
    linkedinUrl: '',
    githubUsername: '',
    portfolioUrl: '',
    certifications: [''],
    blockchainExpertise: [] as string[],
    auditTypes: [] as string[],
    languagesSpoken: ['English'],
    maxConcurrentProjects: '3',
    responseTime: '24'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayToggle = (field: 'blockchainExpertise' | 'auditTypes' | 'languagesSpoken', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const addCertification = () => {
    setFormData(prev => ({
      ...prev,
      certifications: [...prev.certifications, '']
    }));
  };

  const updateCertification = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.map((cert, i) => i === index ? value : cert)
    }));
  };

  const removeCertification = (index: number) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Application submitted successfully! We\'ll review your application and get back to you within 48 hours.');
      
      // Reset form
      setFormData({
        businessName: '',
        fullName: '',
        email: '',
        website: '',
        bio: '',
        yearsExperience: '',
        hourlyRateMin: '',
        hourlyRateMax: '',
        availabilityHours: '',
        timezone: '',
        linkedinUrl: '',
        githubUsername: '',
        portfolioUrl: '',
        certifications: [''],
        blockchainExpertise: [],
        auditTypes: [],
        languagesSpoken: ['English'],
        maxConcurrentProjects: '3',
        responseTime: '24'
      });
    } catch (error) {
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Basic Information
          </CardTitle>
          <CardDescription>
            Tell us about yourself and your {providerType === 'auditor' ? 'auditing' : 'security service'} background
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {providerType === 'service' && (
            <div>
              <Label htmlFor="businessName">Business/Company Name</Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
                placeholder="Enter your business or company name"
              />
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="Your full name"
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
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="bio">Professional Bio *</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              placeholder="Describe your experience, expertise, and what makes you unique as a security professional..."
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="yearsExperience">Years of Experience</Label>
              <Input
                id="yearsExperience"
                type="number"
                value={formData.yearsExperience}
                onChange={(e) => handleInputChange('yearsExperience', e.target.value)}
                placeholder="5"
                min="0"
              />
            </div>
            <div>
              <Label htmlFor="website">Website (Optional)</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                placeholder="https://your-website.com"
              />
            </div>
            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <Select value={formData.timezone} onValueChange={(value) => handleInputChange('timezone', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC">UTC</SelectItem>
                  <SelectItem value="EST">EST (Eastern)</SelectItem>
                  <SelectItem value="PST">PST (Pacific)</SelectItem>
                  <SelectItem value="CET">CET (Central European)</SelectItem>
                  <SelectItem value="JST">JST (Japan)</SelectItem>
                  <SelectItem value="AEST">AEST (Australian Eastern)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expertise */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Expertise & Skills
          </CardTitle>
          <CardDescription>
            Select your areas of expertise and blockchain knowledge
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-base font-medium">Blockchain Expertise</Label>
            <p className="text-sm text-muted-foreground mb-3">Select all blockchains you have experience with</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {blockchainExpertise.map((blockchain) => (
                <div key={blockchain} className="flex items-center space-x-2">
                  <Checkbox
                    id={`blockchain-${blockchain}`}
                    checked={formData.blockchainExpertise.includes(blockchain)}
                    onCheckedChange={() => handleArrayToggle('blockchainExpertise', blockchain)}
                  />
                  <Label htmlFor={`blockchain-${blockchain}`} className="text-sm">
                    {blockchain}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-base font-medium">Audit Types</Label>
            <p className="text-sm text-muted-foreground mb-3">What types of security services do you provide?</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {auditTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`audit-${type}`}
                    checked={formData.auditTypes.includes(type)}
                    onCheckedChange={() => handleArrayToggle('auditTypes', type)}
                  />
                  <Label htmlFor={`audit-${type}`} className="text-sm">
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-base font-medium">Languages Spoken</Label>
            <p className="text-sm text-muted-foreground mb-3">Select all languages you can communicate in</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {languages.map((language) => (
                <div key={language} className="flex items-center space-x-2">
                  <Checkbox
                    id={`lang-${language}`}
                    checked={formData.languagesSpoken.includes(language)}
                    onCheckedChange={() => handleArrayToggle('languagesSpoken', language)}
                  />
                  <Label htmlFor={`lang-${language}`} className="text-sm">
                    {language}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing & Availability */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Pricing & Availability
          </CardTitle>
          <CardDescription>
            Set your rates and availability preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="hourlyRateMin">Minimum Hourly Rate ($)</Label>
              <Input
                id="hourlyRateMin"
                type="number"
                value={formData.hourlyRateMin}
                onChange={(e) => handleInputChange('hourlyRateMin', e.target.value)}
                placeholder="100"
                min="0"
              />
            </div>
            <div>
              <Label htmlFor="hourlyRateMax">Maximum Hourly Rate ($)</Label>
              <Input
                id="hourlyRateMax"
                type="number"
                value={formData.hourlyRateMax}
                onChange={(e) => handleInputChange('hourlyRateMax', e.target.value)}
                placeholder="300"
                min="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="availabilityHours">Hours Available per Week</Label>
              <Input
                id="availabilityHours"
                type="number"
                value={formData.availabilityHours}
                onChange={(e) => handleInputChange('availabilityHours', e.target.value)}
                placeholder="40"
                min="1"
                max="80"
              />
            </div>
            <div>
              <Label htmlFor="maxConcurrentProjects">Max Concurrent Projects</Label>
              <Select value={formData.maxConcurrentProjects} onValueChange={(value) => handleInputChange('maxConcurrentProjects', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 project</SelectItem>
                  <SelectItem value="2">2 projects</SelectItem>
                  <SelectItem value="3">3 projects</SelectItem>
                  <SelectItem value="4">4 projects</SelectItem>
                  <SelectItem value="5">5+ projects</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="responseTime">Response Time (hours)</Label>
              <Select value={formData.responseTime} onValueChange={(value) => handleInputChange('responseTime', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Within 1 hour</SelectItem>
                  <SelectItem value="4">Within 4 hours</SelectItem>
                  <SelectItem value="12">Within 12 hours</SelectItem>
                  <SelectItem value="24">Within 24 hours</SelectItem>
                  <SelectItem value="48">Within 48 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Portfolio & Links */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Portfolio & Professional Links
          </CardTitle>
          <CardDescription>
            Share your professional profiles and portfolio
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="linkedinUrl">LinkedIn Profile</Label>
              <Input
                id="linkedinUrl"
                type="url"
                value={formData.linkedinUrl}
                onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>
            <div>
              <Label htmlFor="githubUsername">GitHub Username</Label>
              <Input
                id="githubUsername"
                value={formData.githubUsername}
                onChange={(e) => handleInputChange('githubUsername', e.target.value)}
                placeholder="yourusername"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="portfolioUrl">Portfolio Website</Label>
            <Input
              id="portfolioUrl"
              type="url"
              value={formData.portfolioUrl}
              onChange={(e) => handleInputChange('portfolioUrl', e.target.value)}
              placeholder="https://your-portfolio.com"
            />
          </div>
        </CardContent>
      </Card>

      {/* Certifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Certifications & Credentials
          </CardTitle>
          <CardDescription>
            List your relevant security certifications and credentials
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.certifications.map((cert, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={cert}
                onChange={(e) => updateCertification(index, e.target.value)}
                placeholder="e.g., Certified Ethereum Security Auditor (CESA)"
                className="flex-1"
              />
              {formData.certifications.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeCertification(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={addCertification}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Another Certification
          </Button>
        </CardContent>
      </Card>

      {/* Submit */}
      <Card>
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold">Ready to Join Hawkly?</h3>
            <p className="text-muted-foreground">
              By submitting this application, you agree to our terms of service and privacy policy. 
              We'll review your application and get back to you within 48 hours.
            </p>
            <Button type="submit" size="lg" disabled={isSubmitting} className="w-full md:w-auto">
              {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};
