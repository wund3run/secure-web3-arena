
import React, { useState } from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Upload, Shield, Award, Users } from 'lucide-react';

const ServiceProviderOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    experience: '',
    specializations: [],
    portfolio: '',
    certifications: ''
  });

  const steps = [
    { number: 1, title: "Basic Information", description: "Tell us about yourself" },
    { number: 2, title: "Expertise & Skills", description: "Your security specializations" },
    { number: 3, title: "Portfolio & Experience", description: "Showcase your work" },
    { number: 4, title: "Verification", description: "Document verification" }
  ];

  const specializations = [
    "Smart Contract Auditing",
    "DeFi Security",
    "NFT Security",
    "Cross-Chain Security",
    "Penetration Testing",
    "Code Review",
    "Security Consulting"
  ];

  return (
    <StandardLayout
      title="Service Provider Onboarding"
      description="Join Hawkly as a security expert - March 2025"
    >
      <div className="container py-12 max-w-4xl">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Join Our Network</Badge>
          <h1 className="text-4xl font-bold mb-4">Become a Security Expert</h1>
          <p className="text-xl text-muted-foreground">
            Join 2,400+ verified security professionals on Hawkly and help secure the Web3 ecosystem.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mb-12">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center flex-1">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mb-2 ${
                currentStep >= step.number ? 'bg-primary' : 'bg-gray-300'
              }`}>
                {currentStep > step.number ? <CheckCircle className="h-6 w-6" /> : step.number}
              </div>
              <div className="text-center">
                <div className="font-semibold text-sm">{step.title}</div>
                <div className="text-xs text-muted-foreground">{step.description}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Form Content */}
        <Card>
          <CardHeader>
            <CardTitle>Step {currentStep}: {steps[currentStep - 1].title}</CardTitle>
            <CardDescription>{steps[currentStep - 1].description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Full Name</label>
                    <Input placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email Address</label>
                    <Input type="email" placeholder="john@example.com" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Company/Organization (Optional)</label>
                  <Input placeholder="Security Firm Inc." />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Years of Security Experience</label>
                  <Input placeholder="5" type="number" />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Specializations</label>
                  <div className="grid grid-cols-2 gap-2">
                    {specializations.map((spec, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input type="checkbox" id={`spec-${index}`} />
                        <label htmlFor={`spec-${index}`} className="text-sm">{spec}</label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Technical Skills</label>
                  <Textarea placeholder="Solidity, Rust, Security frameworks, Testing tools..." />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Portfolio/Previous Work</label>
                  <Textarea placeholder="Describe your notable security projects and achievements..." />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Certifications</label>
                  <Textarea placeholder="List relevant security certifications..." />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Portfolio Files</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Upload portfolio documents, certificates, or work samples</p>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="text-center">
                  <Shield className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Identity Verification</h3>
                  <p className="text-muted-foreground mb-4">
                    Please upload identification documents for verification
                  </p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Government ID</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Upload className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm">Upload driver's license or passport</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Professional References</label>
                    <Textarea placeholder="Provide contact information for professional references..." />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              
              {currentStep < 4 ? (
                <Button onClick={() => setCurrentStep(currentStep + 1)}>
                  Next Step
                </Button>
              ) : (
                <Button className="bg-green-500 hover:bg-green-600">
                  Submit Application
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Benefits */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-blue-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Global Network</h3>
              <p className="text-sm text-muted-foreground">
                Join a network of 2,400+ security experts worldwide
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Award className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Verified Status</h3>
              <p className="text-sm text-muted-foreground">
                Get verified badge and enhanced profile visibility
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Shield className="h-8 w-8 text-green-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Quality Projects</h3>
              <p className="text-sm text-muted-foreground">
                Access to high-quality Web3 security projects
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </StandardLayout>
  );
};

export default ServiceProviderOnboarding;
