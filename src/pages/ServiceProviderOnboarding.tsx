
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Shield, ChevronRight, ChevronLeft, Upload, Award, Globe, Code } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { toast } from 'sonner';

const ServiceProviderOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    website: '',
    linkedin: '',
    github: '',
    yearsExperience: '',
    specializations: [] as string[],
    blockchainExpertise: [] as string[],
    certifications: '',
    portfolioDescription: '',
    hourlyRateMin: '',
    hourlyRateMax: '',
    availability: '',
    preferredProjectSize: '',
    languages: [] as string[],
    timezone: '',
    businessRegistration: null,
    insuranceDocuments: null,
    portfolio: null
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const specializations = [
    'Smart Contract Auditing',
    'DeFi Protocol Security',
    'NFT Security',
    'Bridge Security',
    'DAO Security',
    'Gaming/GameFi Security',
    'Infrastructure Security',
    'Penetration Testing',
    'Code Review',
    'Gas Optimization'
  ];

  const blockchains = [
    'Ethereum',
    'Binance Smart Chain',
    'Polygon',
    'Arbitrum',
    'Optimism',
    'Avalanche',
    'Solana',
    'Cardano',
    'Polkadot',
    'Cosmos'
  ];

  const languages = [
    'English',
    'Spanish',
    'French',
    'German',
    'Chinese',
    'Japanese',
    'Korean',
    'Russian',
    'Portuguese',
    'Arabic'
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: string, item: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field as keyof typeof prev] as string[], item]
        : (prev[field as keyof typeof prev] as string[]).filter(i => i !== item)
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submitApplication = () => {
    toast.success('Application submitted successfully! We\'ll review your profile and get back to you within 48 hours.');
    console.log('Form data:', formData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    placeholder="Your company or personal brand name"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    placeholder="Your full legal name"
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
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    placeholder="https://yourwebsite.com"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="linkedin">LinkedIn Profile</Label>
                  <Input
                    id="linkedin"
                    placeholder="https://linkedin.com/in/yourprofile"
                    value={formData.linkedin}
                    onChange={(e) => handleInputChange('linkedin', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="github">GitHub Profile</Label>
                  <Input
                    id="github"
                    placeholder="https://github.com/yourusername"
                    value={formData.github}
                    onChange={(e) => handleInputChange('github', e.target.value)}
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
                      <SelectItem value="EST">Eastern Time</SelectItem>
                      <SelectItem value="PST">Pacific Time</SelectItem>
                      <SelectItem value="CET">Central European Time</SelectItem>
                      <SelectItem value="JST">Japan Standard Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Expertise & Experience</h3>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="yearsExperience">Years of Security Experience *</Label>
                  <Input
                    id="yearsExperience"
                    type="number"
                    placeholder="e.g., 3"
                    value={formData.yearsExperience}
                    onChange={(e) => handleInputChange('yearsExperience', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label>Specializations *</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {specializations.map(spec => (
                      <div key={spec} className="flex items-center space-x-2">
                        <Checkbox
                          id={spec}
                          checked={formData.specializations.includes(spec)}
                          onCheckedChange={(checked) => handleArrayChange('specializations', spec, checked as boolean)}
                        />
                        <Label htmlFor={spec} className="text-sm">{spec}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Blockchain Expertise *</Label>
                  <div className="grid grid-cols-3 gap-3 mt-2">
                    {blockchains.map(blockchain => (
                      <div key={blockchain} className="flex items-center space-x-2">
                        <Checkbox
                          id={blockchain}
                          checked={formData.blockchainExpertise.includes(blockchain)}
                          onCheckedChange={(checked) => handleArrayChange('blockchainExpertise', blockchain, checked as boolean)}
                        />
                        <Label htmlFor={blockchain} className="text-sm">{blockchain}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Languages Spoken</Label>
                  <div className="grid grid-cols-3 gap-3 mt-2">
                    {languages.map(language => (
                      <div key={language} className="flex items-center space-x-2">
                        <Checkbox
                          id={language}
                          checked={formData.languages.includes(language)}
                          onCheckedChange={(checked) => handleArrayChange('languages', language, checked as boolean)}
                        />
                        <Label htmlFor={language} className="text-sm">{language}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="certifications">Certifications</Label>
                  <Textarea
                    id="certifications"
                    placeholder="List your relevant security certifications (CISSP, CEH, etc.)"
                    rows={3}
                    value={formData.certifications}
                    onChange={(e) => handleInputChange('certifications', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Service Details</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="hourlyRateMin">Minimum Hourly Rate (USD)</Label>
                    <Input
                      id="hourlyRateMin"
                      type="number"
                      placeholder="50"
                      value={formData.hourlyRateMin}
                      onChange={(e) => handleInputChange('hourlyRateMin', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="hourlyRateMax">Maximum Hourly Rate (USD)</Label>
                    <Input
                      id="hourlyRateMax"
                      type="number"
                      placeholder="200"
                      value={formData.hourlyRateMax}
                      onChange={(e) => handleInputChange('hourlyRateMax', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="availability">Current Availability</Label>
                  <Select value={formData.availability} onValueChange={(value) => handleInputChange('availability', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediately">Available Immediately</SelectItem>
                      <SelectItem value="1-2weeks">Available in 1-2 weeks</SelectItem>
                      <SelectItem value="1month">Available in 1 month</SelectItem>
                      <SelectItem value="not-available">Currently not available</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="preferredProjectSize">Preferred Project Size</Label>
                  <Select value={formData.preferredProjectSize} onValueChange={(value) => handleInputChange('preferredProjectSize', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select project size preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small ($1K - $5K)</SelectItem>
                      <SelectItem value="medium">Medium ($5K - $25K)</SelectItem>
                      <SelectItem value="large">Large ($25K - $100K)</SelectItem>
                      <SelectItem value="enterprise">Enterprise ($100K+)</SelectItem>
                      <SelectItem value="any">Any size</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="portfolioDescription">Portfolio Description *</Label>
                  <Textarea
                    id="portfolioDescription"
                    placeholder="Describe your experience, notable projects, and what makes you unique as a security auditor..."
                    rows={6}
                    value={formData.portfolioDescription}
                    onChange={(e) => handleInputChange('portfolioDescription', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Documents & Verification</h3>
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Required Documents</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Government-issued ID or passport</li>
                    <li>• Business registration (if applicable)</li>
                    <li>• Professional insurance certificate</li>
                    <li>• Portfolio samples or case studies</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Business Registration</Label>
                    <div className="mt-2 flex items-center gap-4">
                      <Button variant="outline" className="flex items-center gap-2">
                        <Upload className="h-4 w-4" />
                        Upload Document
                      </Button>
                      <span className="text-sm text-gray-500">PDF, JPG, PNG (max 10MB)</span>
                    </div>
                  </div>

                  <div>
                    <Label>Insurance Documents</Label>
                    <div className="mt-2 flex items-center gap-4">
                      <Button variant="outline" className="flex items-center gap-2">
                        <Upload className="h-4 w-4" />
                        Upload Document
                      </Button>
                      <span className="text-sm text-gray-500">PDF, JPG, PNG (max 10MB)</span>
                    </div>
                  </div>

                  <div>
                    <Label>Portfolio Samples</Label>
                    <div className="mt-2 flex items-center gap-4">
                      <Button variant="outline" className="flex items-center gap-2">
                        <Upload className="h-4 w-4" />
                        Upload Portfolio
                      </Button>
                      <span className="text-sm text-gray-500">PDF, ZIP (max 50MB)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-medium text-yellow-900 mb-2">Verification Process</h4>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>• Document review: 24-48 hours</li>
                    <li>• Background check: 3-5 business days</li>
                    <li>• Technical assessment: 1-2 weeks</li>
                    <li>• Final approval: 2-3 weeks total</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Join as Security Auditor | Hawkly</title>
        <meta name="description" content="Become a verified security auditor on the Hawkly platform" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <Shield className="mx-auto h-12 w-12 text-primary mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Join as Security Auditor
              </h1>
              <p className="text-gray-600">
                Become a verified security expert on the leading Web3 security platform
              </p>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 bg-white rounded-lg border">
                <Award className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <h3 className="font-semibold">Global Recognition</h3>
                <p className="text-sm text-gray-600">Build your reputation worldwide</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border">
                <Globe className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <h3 className="font-semibold">Flexible Work</h3>
                <p className="text-sm text-gray-600">Work on your own schedule</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border">
                <Code className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <h3 className="font-semibold">Top Projects</h3>
                <p className="text-sm text-gray-600">Access to premium audits</p>
              </div>
            </div>

            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Step {currentStep} of {totalSteps}</span>
                <span className="text-sm text-gray-500">{Math.round(progress)}% complete</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>

            {/* Form */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {currentStep === 1 && "Basic Information"}
                  {currentStep === 2 && "Expertise & Experience"}
                  {currentStep === 3 && "Service Details"}
                  {currentStep === 4 && "Documents & Verification"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {renderStep()}

                {/* Navigation */}
                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  
                  {currentStep < totalSteps ? (
                    <Button onClick={nextStep}>
                      Next
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  ) : (
                    <Button onClick={submitApplication}>
                      Submit Application
                      <Shield className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
};

export default ServiceProviderOnboarding;
