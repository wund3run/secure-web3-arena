
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Upload, Shield, CheckCircle, AlertCircle, FileText } from 'lucide-react';

export default function SubmitService() {
  const [serviceType, setServiceType] = useState('');
  const [experience, setExperience] = useState('');

  const serviceTypes = [
    "Smart Contract Audit",
    "DeFi Protocol Audit", 
    "NFT Security Review",
    "Cross-Chain Bridge Audit",
    "Penetration Testing",
    "Security Consulting",
    "Code Review",
    "Vulnerability Assessment"
  ];

  const blockchains = [
    "Ethereum", "Polygon", "BSC", "Avalanche", "Solana", 
    "Arbitrum", "Optimism", "Fantom", "Cardano", "Polkadot"
  ];

  const requirements = [
    "Minimum 2 years of Web3 security experience",
    "Portfolio of completed security audits",
    "Relevant certifications (CISSP, CEH, etc.)",
    "Knowledge of smart contract vulnerabilities",
    "Experience with security testing tools"
  ];

  return (
    <>
      <Helmet>
        <title>Submit Security Service | Hawkly</title>
        <meta name="description" content="Join Hawkly as a security service provider. Submit your expertise and help secure the Web3 ecosystem." />
      </Helmet>

      <StandardLayout 
        title="Submit Security Service" 
        description="Join our marketplace as a verified security expert"
      >
        <div className="container py-12">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">Service Provider Application</Badge>
              <h1 className="text-4xl font-bold mb-4">
                Join Our Security Expert Network
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Submit your security expertise and become part of the leading Web3 security marketplace. 
                Help protect the future of decentralized finance.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Application Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Service Provider Application</CardTitle>
                    <CardDescription>
                      Fill out the form below to submit your security service for review
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" placeholder="Enter your first name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" placeholder="Enter your last name" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="Enter your email" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="linkedIn">LinkedIn Profile</Label>
                        <Input id="linkedIn" placeholder="https://linkedin.com/in/your-profile" />
                      </div>
                    </div>

                    {/* Service Details */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Service Details</h3>
                      <div className="space-y-2">
                        <Label htmlFor="serviceType">Primary Service Type</Label>
                        <Select value={serviceType} onValueChange={setServiceType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your primary service" />
                          </SelectTrigger>
                          <SelectContent>
                            {serviceTypes.map((type) => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Blockchain Expertise</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {blockchains.map((blockchain) => (
                            <div key={blockchain} className="flex items-center space-x-2">
                              <Checkbox id={blockchain} />
                              <Label htmlFor={blockchain} className="text-sm">{blockchain}</Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="experience">Years of Experience</Label>
                        <Select value={experience} onValueChange={setExperience}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your experience level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-2">1-2 years</SelectItem>
                            <SelectItem value="3-5">3-5 years</SelectItem>
                            <SelectItem value="6-10">6-10 years</SelectItem>
                            <SelectItem value="10+">10+ years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="portfolio">Portfolio/Previous Work</Label>
                        <Textarea 
                          id="portfolio" 
                          placeholder="Describe your previous security work, notable audits, or provide links to your portfolio"
                          rows={4}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="tools">Security Tools & Methodologies</Label>
                        <Textarea 
                          id="tools" 
                          placeholder="List the security tools, frameworks, and methodologies you use (e.g., Slither, MythX, Echidna, manual analysis)"
                          rows={3}
                        />
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Pricing Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="hourlyRate">Hourly Rate (USD)</Label>
                          <Input id="hourlyRate" type="number" placeholder="150" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="projectRate">Typical Project Rate (USD)</Label>
                          <Input id="projectRate" type="number" placeholder="5000" />
                        </div>
                      </div>
                    </div>

                    {/* File Uploads */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Supporting Documents</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                          <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">Upload CV/Resume</p>
                          <p className="text-xs text-muted-foreground">PDF, DOC (Max 5MB)</p>
                        </div>
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                          <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">Upload Certifications</p>
                          <p className="text-xs text-muted-foreground">PDF, JPG, PNG (Max 5MB)</p>
                        </div>
                      </div>
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                      <FileText className="mr-2 h-5 w-5" />
                      Submit Application
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Requirements */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      Requirements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {requirements.map((req, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Process */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-blue-500" />
                      Review Process
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">1</div>
                        <span className="text-sm">Application Review</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">2</div>
                        <span className="text-sm">Technical Assessment</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">3</div>
                        <span className="text-sm">Background Check</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">4</div>
                        <span className="text-sm">Onboarding</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Review process typically takes 5-7 business days
                    </p>
                  </CardContent>
                </Card>

                {/* Benefits */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-purple-500" />
                      Benefits
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• Access to high-quality projects</li>
                      <li>• Competitive compensation</li>
                      <li>• Professional networking</li>
                      <li>• Platform marketing support</li>
                      <li>• Continuous education resources</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </StandardLayout>
    </>
  );
}
