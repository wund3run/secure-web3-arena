
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Play, Clock, Users, Star, ChevronRight } from 'lucide-react';

export const TutorialsLayout = () => {
  return (
    <StandardLayout
      title="Security Tutorials | Hawkly"
      description="Interactive Web3 security tutorials and courses"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-hawkly-gradient mb-4">
            Security Tutorials
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Master Web3 security through hands-on interactive tutorials
          </p>
        </div>

        {/* Learning Paths */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Learning Paths</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Beginner Security Fundamentals",
                description: "Start your Web3 security journey with the basics",
                lessons: 8,
                duration: "4 hours",
                difficulty: "Beginner",
                progress: 0,
                color: "bg-green-50 border-green-200"
              },
              {
                title: "Smart Contract Auditing",
                description: "Learn professional smart contract audit techniques",
                lessons: 12,
                duration: "8 hours",
                difficulty: "Intermediate",
                progress: 35,
                color: "bg-blue-50 border-blue-200"
              },
              {
                title: "Advanced Security Research",
                description: "Master advanced vulnerability research methods",
                lessons: 15,
                duration: "12 hours",
                difficulty: "Advanced",
                progress: 0,
                color: "bg-purple-50 border-purple-200"
              }
            ].map((path, index) => (
              <Card key={index} className={`${path.color} hover:shadow-lg transition-shadow`}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{path.difficulty}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      {path.duration}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{path.title}</CardTitle>
                  <p className="text-muted-foreground">{path.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span>{path.lessons} lessons</span>
                    <span>{path.progress}% complete</span>
                  </div>
                  <Progress value={path.progress} className="h-2" />
                  <Button className="w-full">
                    {path.progress > 0 ? "Continue Learning" : "Start Path"}
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Tutorials */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Tutorials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Understanding Reentrancy Attacks",
                description: "Learn how reentrancy attacks work and how to prevent them",
                duration: "25 min",
                difficulty: "Intermediate",
                students: 1247,
                rating: 4.8,
                thumbnail: "🔄"
              },
              {
                title: "Gas Optimization Techniques",
                description: "Master advanced gas optimization for smart contracts",
                duration: "30 min",
                difficulty: "Advanced",
                students: 892,
                rating: 4.9,
                thumbnail: "⚡"
              },
              {
                title: "DeFi Flash Loan Security",
                description: "Understand flash loan attacks and defensive strategies",
                duration: "35 min",
                difficulty: "Advanced",
                students: 654,
                rating: 4.7,
                thumbnail: "💰"
              },
              {
                title: "Access Control Best Practices",
                description: "Implement secure access control in your contracts",
                duration: "20 min",
                difficulty: "Beginner",
                students: 1856,
                rating: 4.6,
                thumbnail: "🔐"
              }
            ].map((tutorial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">{tutorial.thumbnail}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{tutorial.difficulty}</Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          {tutorial.duration}
                        </div>
                      </div>
                      <CardTitle className="text-lg line-clamp-2">
                        {tutorial.title}
                      </CardTitle>
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {tutorial.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {tutorial.students.toLocaleString()}
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-500" />
                        {tutorial.rating}
                      </div>
                    </div>
                  </div>
                  <Button className="w-full">
                    <Play className="h-4 w-4 mr-2" />
                    Start Tutorial
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Smart Contracts", count: 24, icon: "📄" },
              { name: "DeFi Security", count: 18, icon: "💰" },
              { name: "Tools & Testing", count: 32, icon: "🛠️" },
              { name: "Audit Process", count: 15, icon: "🔍" },
              { name: "Vulnerabilities", count: 28, icon: "🚨" },
              { name: "Best Practices", count: 21, icon: "⭐" },
              { name: "Gas Optimization", count: 12, icon: "⚡" },
              { name: "Research", count: 9, icon: "🔬" }
            ].map((category, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <h3 className="font-medium text-sm">{category.name}</h3>
                  <p className="text-xs text-muted-foreground">{category.count} tutorials</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </StandardLayout>
  );
};
