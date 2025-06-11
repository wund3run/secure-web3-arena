
import React, { useState } from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Target, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Users, 
  FileText,
  Zap,
  Search,
  Globe,
  Database,
  Wifi,
  Smartphone
} from 'lucide-react';

const PenetrationTesting = () => {
  const [selectedService, setSelectedService] = useState('');

  const testingServices = [
    {
      id: 'web-app',
      title: 'Web Application Testing',
      icon: <Globe className="h-6 w-6" />,
      description: 'Comprehensive security testing of web applications including OWASP Top 10 vulnerabilities',
      duration: '2-4 weeks',
      price: 'From $3,500',
      features: [
        'SQL Injection Testing',
        'Cross-Site Scripting (XSS)',
        'Authentication Bypass',
        'Session Management',
        'Business Logic Flaws'
      ]
    },
    {
      id: 'network',
      title: 'Network Penetration Testing',
      icon: <Wifi className="h-6 w-6" />,
      description: 'External and internal network security assessment to identify infrastructure vulnerabilities',
      duration: '1-3 weeks',
      price: 'From $4,200',
      features: [
        'Port Scanning & Enumeration',
        'Vulnerability Assessment',
        'Privilege Escalation',
        'Lateral Movement Testing',
        'Network Segmentation Review'
      ]
    },
    {
      id: 'mobile',
      title: 'Mobile Application Testing',
      icon: <Smartphone className="h-6 w-6" />,
      description: 'Security testing for iOS and Android applications including static and dynamic analysis',
      duration: '2-3 weeks',
      price: 'From $2,800',
      features: [
        'Static Code Analysis',
        'Dynamic Runtime Testing',
        'API Security Testing',
        'Data Storage Security',
        'Communication Security'
      ]
    },
    {
      id: 'api',
      title: 'API Security Testing',
      icon: <Database className="h-6 w-6" />,
      description: 'Specialized testing for REST, GraphQL, and other API endpoints',
      duration: '1-2 weeks',
      price: 'From $2,200',
      features: [
        'Authentication Testing',
        'Authorization Flaws',
        'Input Validation',
        'Rate Limiting',
        'Data Exposure'
      ]
    }
  ];

  const methodology = [
    {
      phase: 'Planning & Reconnaissance',
      description: 'Information gathering and attack surface mapping',
      duration: '2-3 days',
      deliverables: ['Scope Definition', 'Reconnaissance Report']
    },
    {
      phase: 'Scanning & Enumeration',
      description: 'Automated and manual vulnerability discovery',
      duration: '3-5 days',
      deliverables: ['Vulnerability Scan Results', 'Service Enumeration']
    },
    {
      phase: 'Gaining Access',
      description: 'Exploitation of identified vulnerabilities',
      duration: '5-7 days',
      deliverables: ['Proof of Concept Exploits', 'Access Documentation']
    },
    {
      phase: 'Maintaining Access',
      description: 'Testing persistence and privilege escalation',
      duration: '2-3 days',
      deliverables: ['Persistence Testing', 'Privilege Escalation Report']
    },
    {
      phase: 'Analysis & Reporting',
      description: 'Comprehensive report with remediation guidance',
      duration: '3-4 days',
      deliverables: ['Executive Summary', 'Technical Report', 'Remediation Plan']
    }
  ];

  const experts = [
    {
      name: 'Marcus Chen',
      title: 'Senior Penetration Tester',
      certifications: ['OSCP', 'CEH', 'CISSP'],
      experience: '8+ years',
      specialization: 'Web Applications & APIs',
      image: '/lovable-uploads/457a4f30-ef00-4983-ad81-9841ef293c46.png'
    },
    {
      name: 'Sarah Rodriguez',
      title: 'Network Security Specialist',
      certifications: ['OSCE', 'GPEN', 'GCIH'],
      experience: '10+ years',
      specialization: 'Network Infrastructure',
      image: '/lovable-uploads/ba568bdc-629c-43ca-a343-58b3c786ecba.png'
    },
    {
      name: 'Alex Thompson',
      title: 'Mobile Security Expert',
      certifications: ['GMOB', 'CEH', 'CSSLP'],
      experience: '6+ years',
      specialization: 'Mobile Applications',
      image: '/lovable-uploads/6286d686-7daf-4eb4-8d7b-51a3de242644.png'
    }
  ];

  return (
    <StandardLayout
      title="Penetration Testing Services | Hawkly"
      description="Professional penetration testing services to identify and validate security vulnerabilities"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="px-4 py-2 mb-4">
            <Target className="h-4 w-4 mr-2" />
            Ethical Hacking Services
          </Badge>
          <h1 className="text-4xl font-bold text-hawkly-gradient mb-4">
            Professional Penetration Testing
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive security testing services to identify vulnerabilities before attackers do. 
            Our certified ethical hackers simulate real-world attacks to validate your security posture.
          </p>
        </div>

        <Tabs defaultValue="services" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="services">Testing Services</TabsTrigger>
            <TabsTrigger value="methodology">Methodology</TabsTrigger>
            <TabsTrigger value="experts">Our Experts</TabsTrigger>
            <TabsTrigger value="request">Request Test</TabsTrigger>
          </TabsList>

          <TabsContent value="services" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testingServices.map((service) => (
                <Card key={service.id} className="hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        {service.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {service.duration}
                          </span>
                          <span className="text-primary font-medium">{service.price}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{service.description}</p>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Key Testing Areas:</h4>
                      <ul className="grid grid-cols-1 gap-1">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button 
                      className="w-full" 
                      onClick={() => setSelectedService(service.id)}
                    >
                      Select This Service
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="methodology" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Our Testing Methodology</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We follow industry-standard penetration testing methodologies including PTES, OWASP, and NIST guidelines
              </p>
            </div>
            
            <div className="space-y-6">
              {methodology.map((phase, index) => (
                <Card key={index} className="relative">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground rounded-full font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{phase.phase}</CardTitle>
                        <p className="text-muted-foreground mt-1">{phase.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <Badge variant="secondary">
                            <Clock className="h-3 w-3 mr-1" />
                            {phase.duration}
                          </Badge>
                          <span className="text-muted-foreground">
                            Deliverables: {phase.deliverables.join(', ')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="experts" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Meet Our Penetration Testing Experts</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our team consists of certified ethical hackers with extensive real-world experience
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {experts.map((expert, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mb-4">
                      <Users className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{expert.name}</CardTitle>
                    <p className="text-muted-foreground">{expert.title}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <Badge variant="outline">{expert.experience}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{expert.specialization}</p>
                      <div className="flex flex-wrap justify-center gap-1">
                        {expert.certifications.map((cert, certIndex) => (
                          <Badge key={certIndex} variant="secondary" className="text-xs">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      View Profile
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="request" className="space-y-8">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-4">Request Penetration Testing</h2>
                <p className="text-muted-foreground">
                  Tell us about your security testing requirements and we'll connect you with the right expert
                </p>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Testing Type</label>
                      <select 
                        className="w-full p-3 border rounded-lg"
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                      >
                        <option value="">Select testing type...</option>
                        {testingServices.map((service) => (
                          <option key={service.id} value={service.id}>
                            {service.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Target Environment</label>
                      <Input placeholder="e.g., Production, Staging, Development" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Project Scope</label>
                    <Textarea 
                      placeholder="Describe your target applications, networks, or systems to be tested..."
                      rows={4}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Preferred Timeline</label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Budget Range</label>
                      <select className="w-full p-3 border rounded-lg">
                        <option value="">Select budget range...</option>
                        <option value="2k-5k">$2,000 - $5,000</option>
                        <option value="5k-10k">$5,000 - $10,000</option>
                        <option value="10k-25k">$10,000 - $25,000</option>
                        <option value="25k+">$25,000+</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Additional Requirements</label>
                    <Textarea 
                      placeholder="Any specific compliance requirements, testing constraints, or special considerations..."
                      rows={3}
                    />
                  </div>
                  
                  <Button className="w-full" size="lg">
                    Submit Testing Request
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </StandardLayout>
  );
};

export default PenetrationTesting;
