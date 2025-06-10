
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Clock, Users, BookOpen } from 'lucide-react';

const TutorialsPage = () => {
  return (
    <StandardLayout
      title="Tutorials | Hawkly"
      description="Step-by-step tutorials for Web3 security best practices"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Badge variant="outline" className="px-4 py-2">
              <Play className="h-4 w-4 mr-2" />
              Learn by Doing
            </Badge>
          </div>
          <h1 className="text-4xl font-bold text-hawkly-gradient mb-4">
            Security Tutorials
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Master Web3 security with our hands-on tutorials and interactive guides
          </p>
        </div>

        {/* Featured Tutorial */}
        <Card className="mb-12 bg-gradient-to-r from-hawkly-primary/10 to-hawkly-secondary/10 border-hawkly-primary/20">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <Badge className="mb-4 bg-hawkly-primary">Featured Tutorial</Badge>
                <h2 className="text-2xl font-bold mb-4">Complete Smart Contract Security Course</h2>
                <p className="text-muted-foreground mb-6">
                  Learn to identify and fix common vulnerabilities in smart contracts through practical examples and exercises.
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    4 hours
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    2.5k students
                  </div>
                  <Badge variant="outline">Intermediate</Badge>
                </div>
                <Button size="lg" className="bg-hawkly-primary hover:bg-hawkly-primary/90">
                  Start Course
                </Button>
              </div>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <Play className="h-12 w-12 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tutorial Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            {
              title: "Smart Contract Basics",
              description: "Learn the fundamentals of secure smart contract development",
              tutorials: 8,
              level: "Beginner",
              duration: "2 hours"
            },
            {
              title: "Advanced Security Patterns",
              description: "Master advanced security patterns and architectures",
              tutorials: 12,
              level: "Advanced",
              duration: "6 hours"
            },
            {
              title: "DeFi Security",
              description: "Secure decentralized finance protocols and applications",
              tutorials: 6,
              level: "Intermediate",
              duration: "3 hours"
            },
            {
              title: "Vulnerability Analysis",
              description: "Learn to identify and exploit common vulnerabilities",
              tutorials: 10,
              level: "Intermediate",
              duration: "4 hours"
            },
            {
              title: "Testing & Auditing",
              description: "Comprehensive testing and auditing methodologies",
              tutorials: 15,
              level: "Advanced",
              duration: "8 hours"
            },
            {
              title: "Incident Response",
              description: "Handle security incidents and breaches effectively",
              tutorials: 5,
              level: "Advanced",
              duration: "2 hours"
            }
          ].map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{category.level}</Badge>
                  <Badge variant="secondary">{category.tutorials} tutorials</Badge>
                </div>
                <CardTitle className="text-lg">{category.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{category.description}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {category.duration}
                </div>
                <Button className="w-full">Start Learning</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Learning Path */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Recommended Learning Path
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { step: 1, title: "Blockchain Fundamentals", completed: true },
                { step: 2, title: "Smart Contract Basics", completed: true },
                { step: 3, title: "Security Fundamentals", completed: false },
                { step: 4, title: "Vulnerability Analysis", completed: false },
                { step: 5, title: "Advanced Security Patterns", completed: false }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    item.completed ? 'bg-green-500 text-white' : 'bg-muted-foreground text-background'
                  }`}>
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.title}</h3>
                  </div>
                  <Button variant={item.completed ? "outline" : "default"} size="sm">
                    {item.completed ? "Review" : "Start"}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="bg-hawkly-primary/5 border-hawkly-primary/20">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Master Web3 Security?</h2>
            <p className="text-muted-foreground mb-6">
              Start your journey with our comprehensive tutorial series.
            </p>
            <Button size="lg" className="bg-hawkly-primary hover:bg-hawkly-primary/90">
              Begin Learning Journey
            </Button>
          </CardContent>
        </Card>
      </div>
    </StandardLayout>
  );
};

export default TutorialsPage;
