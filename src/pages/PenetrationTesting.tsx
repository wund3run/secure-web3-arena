
import React, { useState } from 'react';
import { StandardizedLayout } from '@/components/layout/StandardizedLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Target, Zap, AlertTriangle, CheckCircle, Calendar, Users, FileText } from 'lucide-react';

const PenetrationTesting = () => {
  const [selectedService, setSelectedService] = useState('');

  const testingServices = [
    {
      id: 'smart-contract',
      title: 'Smart Contract Penetration Testing',
      description: 'Comprehensive security testing of smart contracts and DeFi protocols',
      duration: '1-2 weeks',
      price: 'From $5,000',
      features: ['Automated vulnerability scanning', 'Manual code analysis', 'Attack vector simulation', 'Gas optimization review']
    },
    {
      id: 'dapp',
      title: 'DApp Security Testing',
      description: 'End-to-end security assessment of decentralized applications',
      duration: '2-3 weeks',
      price: 'From $8,000',
      features: ['Frontend security analysis', 'Backend API testing', 'Wallet integration security', 'User flow analysis']
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure Testing',
      description: 'Network and server security assessment for Web3 infrastructure',
      duration: '1-2 weeks',
      price: 'From $6,000',
      features: ['Network penetration testing', 'Server hardening review', 'DNS security analysis', 'SSL/TLS configuration']
    }
  ];

  const methodologies = [
    {
      phase: 'Reconnaissance',
      description: 'Information gathering and target analysis',
      icon: Target,
      activities: ['Code repository analysis', 'Documentation review', 'Architecture mapping', 'Attack surface identification']
    },
    {
      phase: 'Vulnerability Assessment',
      description: 'Automated and manual vulnerability discovery',
      icon: Zap,
      activities: ['Automated scanning', 'Manual code review', 'Logic flaw analysis', 'Configuration assessment']
    },
    {
      phase: 'Exploitation',
      description: 'Controlled exploitation of discovered vulnerabilities',
      icon: AlertTriangle,
      activities: ['Proof of concept development', 'Impact assessment', 'Chain exploitation', 'Data extraction simulation']
    },
    {
      phase: 'Reporting',
      description: 'Comprehensive documentation and recommendations',
      icon: FileText,
      activities: ['Executive summary', 'Technical findings', 'Risk assessment', 'Remediation roadmap']
    }
  ];

  return (
    <StandardizedLayout
      title="Penetration Testing | Hawkly"
      description="Advanced security vulnerability testing for Web3 applications and infrastructure"
      keywords="penetration testing, security testing, vulnerability assessment"
    >
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-orange-900 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse delay-1500" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-red-500/10 px-4 py-2 rounded-full border border-red-500/20 mb-6">
              <Shield className="h-5 w-5 text-red-400" />
              <span className="text-red-300 font-medium">Advanced Security Testing</span>
            </div>
            <h1 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Penetration Testing Services
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive security vulnerability testing for your Web3 applications, smart contracts, 
              and infrastructure. Identify and fix security gaps before attackers do.
            </p>
          </div>

          <Tabs defaultValue="services" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 bg-gray-800/50 border border-gray-700">
              <TabsTrigger value="services" className="data-[state=active]:bg-red-600">Services</TabsTrigger>
              <TabsTrigger value="methodology" className="data-[state=active]:bg-red-600">Methodology</TabsTrigger>
              <TabsTrigger value="booking" className="data-[state=active]:bg-red-600">Book Test</TabsTrigger>
            </TabsList>

            <TabsContent value="services" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {testingServices.map((service) => (
                  <Card key={service.id} className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:border-red-500/50 transition-colors">
                    <CardHeader>
                      <CardTitle className="text-white text-xl">{service.title}</CardTitle>
                      <p className="text-gray-400">{service.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-300">{service.duration}</span>
                        </div>
                        <Badge variant="outline" className="border-red-500/50 text-red-300">
                          {service.price}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="text-white font-medium">Includes:</h4>
                        {service.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-400" />
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <Button 
                        className="w-full bg-red-600 hover:bg-red-700"
                        onClick={() => setSelectedService(service.id)}
                      >
                        Select Service
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="methodology" className="mt-8">
              <div className="space-y-8">
                <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white text-2xl text-center">Our Testing Methodology</CardTitle>
                    <p className="text-gray-400 text-center">
                      We follow industry-standard penetration testing methodologies adapted for Web3 security
                    </p>
                  </CardHeader>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {methodologies.map((method, index) => (
                    <Card key={index} className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-red-600/20 rounded-lg">
                            <method.icon className="h-6 w-6 text-red-400" />
                          </div>
                          <div>
                            <CardTitle className="text-white">{method.phase}</CardTitle>
                            <p className="text-gray-400 text-sm">{method.description}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {method.activities.map((activity, actIndex) => (
                            <div key={actIndex} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-red-400 rounded-full" />
                              <span className="text-gray-300 text-sm">{activity}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="booking" className="mt-8">
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle className="text-white text-center">Book Penetration Testing</CardTitle>
                  <p className="text-gray-400 text-center">
                    Schedule a consultation to discuss your testing requirements
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Service Type</label>
                      <select className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-md text-white">
                        <option value="">Select service</option>
                        {testingServices.map(service => (
                          <option key={service.id} value={service.id}>{service.title}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Start Date</label>
                      <input 
                        type="date" 
                        className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-md text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Project Details</label>
                    <textarea 
                      placeholder="Describe your project, specific concerns, and testing scope..."
                      rows={4}
                      className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-md text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Budget Range</label>
                      <select className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-md text-white">
                        <option value="">Select budget</option>
                        <option value="5k-10k">$5,000 - $10,000</option>
                        <option value="10k-20k">$10,000 - $20,000</option>
                        <option value="20k+">$20,000+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Urgency</label>
                      <select className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-md text-white">
                        <option value="">Select urgency</option>
                        <option value="standard">Standard (2-4 weeks)</option>
                        <option value="priority">Priority (1-2 weeks)</option>
                        <option value="emergency">Emergency (< 1 week)</option>
                      </select>
                    </div>
                  </div>

                  <Button className="w-full bg-red-600 hover:bg-red-700 text-lg py-3">
                    Schedule Consultation
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </StandardizedLayout>
  );
};

export default PenetrationTesting;
