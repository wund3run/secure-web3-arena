
import React, { useState } from 'react';
import { StandardizedLayout } from '@/components/layout/StandardizedLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, Star, Clock, CheckCircle, GitBranch, Users, FileText, ArrowRight } from 'lucide-react';

const CodeReviews = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const reviewers = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      specialty: "Smart Contract Security",
      rating: 4.9,
      reviews: 234,
      languages: ["Solidity", "Rust", "Go"],
      hourlyRate: 150,
      avatar: "/api/placeholder/64/64"
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      specialty: "DeFi Protocol Analysis",
      rating: 4.8,
      reviews: 187,
      languages: ["Solidity", "JavaScript", "Python"],
      hourlyRate: 120,
      avatar: "/api/placeholder/64/64"
    },
    {
      id: 3,
      name: "Elena Petrov",
      specialty: "Cross-chain Security",
      rating: 4.9,
      reviews: 156,
      languages: ["Rust", "C++", "Solidity"],
      hourlyRate: 180,
      avatar: "/api/placeholder/64/64"
    }
  ];

  const languages = ["Solidity", "Rust", "JavaScript", "Python", "Go", "C++", "TypeScript"];

  return (
    <StandardizedLayout
      title="Code Reviews | Hawkly"
      description="Expert code analysis and security reviews for Web3 projects"
      keywords="code review, security analysis, smart contract review"
    >
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20 mb-6">
              <Code className="h-5 w-5 text-blue-400" />
              <span className="text-blue-300 font-medium">Expert Code Analysis</span>
            </div>
            <h1 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Professional Code Reviews
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Get your smart contracts and Web3 code reviewed by expert security professionals. 
              Identify vulnerabilities, improve code quality, and ensure best practices.
            </p>
          </div>

          <Tabs defaultValue="submit" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 bg-gray-800/50 border border-gray-700">
              <TabsTrigger value="submit" className="data-[state=active]:bg-blue-600">Submit Code</TabsTrigger>
              <TabsTrigger value="reviewers" className="data-[state=active]:bg-blue-600">Find Reviewers</TabsTrigger>
              <TabsTrigger value="process" className="data-[state=active]:bg-blue-600">Review Process</TabsTrigger>
            </TabsList>

            <TabsContent value="submit" className="mt-8">
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-400" />
                    Submit Code for Review
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Project Name</label>
                      <Input 
                        placeholder="Enter your project name" 
                        className="bg-gray-700/50 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Programming Language</label>
                      <select 
                        className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-md text-white"
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                      >
                        <option value="">Select language</option>
                        {languages.map(lang => (
                          <option key={lang} value={lang}>{lang}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Repository URL</label>
                    <Input 
                      placeholder="https://github.com/username/repository" 
                      className="bg-gray-700/50 border-gray-600 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Review Requirements</label>
                    <Textarea 
                      placeholder="Describe what aspects you want reviewed, specific concerns, and any deadlines..."
                      rows={4}
                      className="bg-gray-700/50 border-gray-600 text-white"
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Submit for Review
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                      Save as Draft
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviewers" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviewers.map((reviewer) => (
                  <Card key={reviewer.id} className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:border-blue-500/50 transition-colors">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={reviewer.avatar} />
                          <AvatarFallback className="bg-blue-600">
                            {reviewer.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-white text-lg">{reviewer.name}</CardTitle>
                          <p className="text-gray-400">{reviewer.specialty}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-white font-medium">{reviewer.rating}</span>
                          <span className="text-gray-400">({reviewer.reviews})</span>
                        </div>
                        <div className="text-gray-300">
                          ${reviewer.hourlyRate}/hr
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {reviewer.languages.map((lang) => (
                          <Badge key={lang} variant="secondary" className="bg-blue-600/20 text-blue-300">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                      
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        Request Review
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="process" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <GitBranch className="h-5 w-5 text-blue-400" />
                      Review Process
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {[
                      { step: 1, title: "Code Submission", description: "Upload your code or provide repository access" },
                      { step: 2, title: "Reviewer Assignment", description: "Expert reviewers are matched to your project" },
                      { step: 3, title: "Security Analysis", description: "Comprehensive code analysis and vulnerability assessment" },
                      { step: 4, title: "Report Generation", description: "Detailed findings with recommendations and fixes" },
                      { step: 5, title: "Follow-up Support", description: "Implementation guidance and re-review if needed" }
                    ].map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">{item.step}</span>
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">{item.title}</h3>
                          <p className="text-gray-400">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      What We Review
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        "Security vulnerabilities and attack vectors",
                        "Code quality and best practices",
                        "Gas optimization opportunities",
                        "Logic errors and edge cases",
                        "Access control implementations",
                        "Integration security patterns",
                        "Documentation and comments",
                        "Testing coverage and quality"
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-gray-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </StandardizedLayout>
  );
};

export default CodeReviews;
