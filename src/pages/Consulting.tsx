
import React, { useState } from 'react';
import { StandardizedLayout } from '@/components/layout/StandardizedLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Star, Calendar, MessageSquare, Brain, Shield, TrendingUp, Clock } from 'lucide-react';

const Consulting = () => {
  const [selectedExpertise, setSelectedExpertise] = useState('');

  const consultants = [
    {
      id: 1,
      name: "Dr. Michael Zhang",
      title: "Senior Security Architect",
      expertise: "Enterprise Security Strategy",
      experience: "15+ years",
      rating: 4.9,
      sessions: 340,
      hourlyRate: 300,
      avatar: "/api/placeholder/64/64",
      specializations: ["Security Architecture", "Risk Assessment", "Compliance"],
      availability: "Available"
    },
    {
      id: 2,
      name: "Lisa Thompson",
      title: "DeFi Security Consultant",
      expertise: "DeFi Protocol Design",
      experience: "8+ years",
      rating: 4.8,
      sessions: 220,
      hourlyRate: 250,
      avatar: "/api/placeholder/64/64",
      specializations: ["DeFi Protocols", "Tokenomics", "Liquidity Security"],
      availability: "Busy"
    },
    {
      id: 3,
      name: "Alex Kumar",
      title: "Blockchain Solutions Architect",
      expertise: "Cross-chain Integration",
      experience: "12+ years",
      rating: 4.9,
      sessions: 180,
      hourlyRate: 280,
      avatar: "/api/placeholder/64/64",
      specializations: ["Cross-chain", "Infrastructure", "Scalability"],
      availability: "Available"
    }
  ];

  const services = [
    {
      category: "Security Strategy",
      icon: Shield,
      description: "Comprehensive security planning and risk management",
      services: [
        "Security architecture design",
        "Risk assessment and mitigation",
        "Compliance framework development",
        "Security policy creation"
      ]
    },
    {
      category: "Technical Advisory",
      icon: Brain,
      description: "Expert technical guidance for complex projects",
      services: [
        "Code architecture review",
        "Technology stack selection",
        "Performance optimization",
        "Integration planning"
      ]
    },
    {
      category: "Business Strategy",
      icon: TrendingUp,
      description: "Strategic guidance for Web3 business development",
      services: [
        "Go-to-market strategy",
        "Tokenomics design",
        "Partnership development",
        "Market analysis"
      ]
    }
  ];

  return (
    <StandardizedLayout
      title="Security Consulting | Hawkly"
      description="Strategic security guidance and expert advisory services for Web3 projects"
      keywords="security consulting, strategic guidance, expert advisory"
    >
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-teal-900 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse delay-2000" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-500/10 px-4 py-2 rounded-full border border-green-500/20 mb-6">
              <Users className="h-5 w-5 text-green-400" />
              <span className="text-green-300 font-medium">Expert Advisory</span>
            </div>
            <h1 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
                Security Consulting Services
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Get strategic security guidance from industry experts. Our consultants help you navigate 
              complex security challenges and build robust Web3 solutions.
            </p>
          </div>

          <Tabs defaultValue="consultants" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 bg-gray-800/50 border border-gray-700">
              <TabsTrigger value="consultants" className="data-[state=active]:bg-green-600">Expert Consultants</TabsTrigger>
              <TabsTrigger value="services" className="data-[state=active]:bg-green-600">Services</TabsTrigger>
              <TabsTrigger value="booking" className="data-[state=active]:bg-green-600">Book Session</TabsTrigger>
            </TabsList>

            <TabsContent value="consultants" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {consultants.map((consultant) => (
                  <Card key={consultant.id} className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:border-green-500/50 transition-colors">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={consultant.avatar} />
                          <AvatarFallback className="bg-green-600">
                            {consultant.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <CardTitle className="text-white text-lg">{consultant.name}</CardTitle>
                          <p className="text-gray-400 text-sm">{consultant.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge 
                              variant={consultant.availability === 'Available' ? 'default' : 'secondary'}
                              className={consultant.availability === 'Available' ? 'bg-green-600' : 'bg-orange-600'}
                            >
                              {consultant.availability}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Expertise:</span>
                          <span className="text-white text-sm">{consultant.expertise}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Experience:</span>
                          <span className="text-white text-sm">{consultant.experience}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Rate:</span>
                          <span className="text-white text-sm">${consultant.hourlyRate}/hr</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-white font-medium">{consultant.rating}</span>
                        </div>
                        <div className="text-gray-400 text-sm">
                          {consultant.sessions} sessions
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {consultant.specializations.map((spec) => (
                          <Badge key={spec} variant="outline" className="bg-green-600/20 text-green-300 text-xs">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          className="flex-1 bg-green-600 hover:bg-green-700"
                          disabled={consultant.availability !== 'Available'}
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Book Session
                        </Button>
                        <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="services" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {services.map((service, index) => (
                  <Card key={index} className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-green-600/20 rounded-lg">
                          <service.icon className="h-6 w-6 text-green-400" />
                        </div>
                        <div>
                          <CardTitle className="text-white">{service.category}</CardTitle>
                          <p className="text-gray-400 text-sm">{service.description}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {service.services.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full" />
                            <span className="text-gray-300 text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="mt-8 bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-center">Consultation Process</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                      { step: 1, title: "Initial Consultation", description: "Discuss your requirements and challenges" },
                      { step: 2, title: "Strategy Development", description: "Create customized solutions and recommendations" },
                      { step: 3, title: "Implementation Support", description: "Guide you through implementation phases" },
                      { step: 4, title: "Ongoing Support", description: "Continuous monitoring and optimization" }
                    ].map((item, index) => (
                      <div key={index} className="text-center">
                        <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-white font-bold">{item.step}</span>
                        </div>
                        <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                        <p className="text-gray-400 text-sm">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="booking" className="mt-8">
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle className="text-white text-center">Book Consultation Session</CardTitle>
                  <p className="text-gray-400 text-center">
                    Schedule a session with our expert consultants
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Consultation Type</label>
                      <select 
                        className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-md text-white"
                        value={selectedExpertise}
                        onChange={(e) => setSelectedExpertise(e.target.value)}
                      >
                        <option value="">Select consultation type</option>
                        <option value="security-strategy">Security Strategy</option>
                        <option value="technical-advisory">Technical Advisory</option>
                        <option value="business-strategy">Business Strategy</option>
                        <option value="general">General Consultation</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Session Duration</label>
                      <select className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-md text-white">
                        <option value="30">30 minutes</option>
                        <option value="60">1 hour</option>
                        <option value="90">1.5 hours</option>
                        <option value="120">2 hours</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Project Description</label>
                    <textarea 
                      placeholder="Describe your project, challenges, and what you hope to achieve..."
                      rows={4}
                      className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-md text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Date</label>
                      <input 
                        type="date" 
                        className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-md text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Time</label>
                      <select className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-md text-white">
                        <option value="">Select time</option>
                        <option value="09:00">9:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="14:00">2:00 PM</option>
                        <option value="15:00">3:00 PM</option>
                        <option value="16:00">4:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <Button className="w-full bg-green-600 hover:bg-green-700 text-lg py-3">
                    <Clock className="h-5 w-5 mr-2" />
                    Book Consultation
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

export default Consulting;
