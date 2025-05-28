
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, BookOpen, Video, FileText, Code, Users, Star } from "lucide-react";
import { TutorialCard, Tutorial } from "./tutorial-card";
import { LearningPathCard, LearningPath } from "./learning-path-card";

export function KnowledgeHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const tutorials: Tutorial[] = [
    {
      id: 1,
      title: "Smart Contract Security Fundamentals",
      description: "Learn the basics of smart contract security, common vulnerabilities, and prevention techniques.",
      difficulty: "Beginner",
      duration: "2h 30m",
      category: "Smart Contracts",
      rating: 4.8,
      students: 2340,
      isNew: true,
      instructor: {
        name: "Dr. Sarah Chen",
        avatar: "https://i.pravatar.cc/150?img=1"
      },
      href: "/tutorials"
    },
    {
      id: 2,
      title: "Advanced DeFi Security Patterns",
      description: "Deep dive into DeFi protocols security, MEV protection, and flash loan attack prevention.",
      difficulty: "Advanced",
      duration: "4h 15m",
      category: "DeFi",
      rating: 4.9,
      students: 1240,
      isPremium: true,
      instructor: {
        name: "Alex Rodriguez",
        avatar: "https://i.pravatar.cc/150?img=2"
      },
      href: "/tutorials"
    },
    {
      id: 3,
      title: "Cross-Chain Bridge Security",
      description: "Understanding cross-chain vulnerabilities and implementing secure bridge architectures.",
      difficulty: "Intermediate",
      duration: "3h 45m",
      category: "Cross-Chain",
      rating: 4.7,
      students: 890,
      instructor: {
        name: "Michael Zhang",
        avatar: "https://i.pravatar.cc/150?img=3"
      },
      href: "/tutorials"
    },
    {
      id: 4,
      title: "Zero-Knowledge Proof Security",
      description: "Explore ZK-proof vulnerabilities, circuit security, and privacy-preserving protocols.",
      difficulty: "Advanced",
      duration: "5h 20m",
      category: "ZK Proofs",
      rating: 4.6,
      students: 670,
      isPremium: true,
      instructor: {
        name: "Dr. Elena Vasquez",
        avatar: "https://i.pravatar.cc/150?img=4"
      },
      href: "/tutorials"
    }
  ];

  const learningPaths: LearningPath[] = [
    {
      id: 1,
      title: "Web3 Security Professional",
      description: "Complete certification path from smart contract basics to advanced security auditing.",
      totalCourses: 12,
      totalDuration: "40+ hours",
      difficulty: "Beginner",
      progress: 25,
      completedCourses: 3,
      category: "Certification",
      skills: ["Smart Contract Auditing", "DeFi Security", "Vulnerability Assessment", "Risk Management"],
      href: "/tutorials"
    },
    {
      id: 2,
      title: "DeFi Security Specialist",
      description: "Specialized track focusing on decentralized finance security challenges and solutions.",
      totalCourses: 8,
      totalDuration: "28+ hours",
      difficulty: "Intermediate",
      progress: 60,
      completedCourses: 5,
      category: "Specialization",
      skills: ["MEV Protection", "Flash Loan Security", "Liquidity Pool Auditing", "Oracle Security"],
      href: "/tutorials"
    },
    {
      id: 3,
      title: "Blockchain Security Researcher",
      description: "Advanced research-oriented path for cutting-edge security protocol development.",
      totalCourses: 15,
      totalDuration: "60+ hours",
      difficulty: "Advanced",
      category: "Research",
      skills: ["Formal Verification", "Cryptographic Protocols", "Consensus Security", "Novel Attack Vectors"],
      href: "/tutorials"
    }
  ];

  const categories = [
    { id: "all", name: "All Topics" },
    { id: "smart-contracts", name: "Smart Contracts" },
    { id: "defi", name: "DeFi" },
    { id: "cross-chain", name: "Cross-Chain" },
    { id: "zk-proofs", name: "ZK Proofs" },
    { id: "governance", name: "Governance" }
  ];

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search tutorials, courses, and learning paths..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-1" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            Difficulty
          </Button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>

      <Tabs defaultValue="tutorials" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tutorials" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            Tutorials
          </TabsTrigger>
          <TabsTrigger value="paths" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Learning Paths
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Resources
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tutorials" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorials.map((tutorial) => (
              <TutorialCard key={tutorial.id} tutorial={tutorial} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="paths" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningPaths.map((path) => (
              <LearningPathCard key={path.id} path={path} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Security Checklist
                </CardTitle>
                <CardDescription>
                  Comprehensive smart contract security checklist for auditors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Template</Badge>
                  <Button variant="outline" size="sm">Download</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Vulnerability Database
                </CardTitle>
                <CardDescription>
                  Curated database of known smart contract vulnerabilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Database</Badge>
                  <Button variant="outline" size="sm">Browse</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Best Practices Guide
                </CardTitle>
                <CardDescription>
                  Industry best practices for secure smart contract development
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Guide</Badge>
                  <Button variant="outline" size="sm">Read</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
