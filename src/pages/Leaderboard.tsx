
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Star, Shield, Award, TrendingUp, Users } from 'lucide-react';

export default function Leaderboard() {
  const topAuditors = [
    {
      rank: 1,
      name: "Alex Chen",
      username: "sec_master_alex",
      score: 9850,
      auditsCompleted: 127,
      vulnerabilitiesFound: 1247,
      rating: 4.9,
      specializations: ["DeFi", "Smart Contracts"],
      badge: "Legendary",
      change: "+12"
    },
    {
      rank: 2,
      name: "Sarah Wilson",
      username: "defi_security_pro",
      score: 9720,
      auditsCompleted: 98,
      vulnerabilitiesFound: 1089,
      rating: 4.8,
      specializations: ["Bridge Security", "DeFi"],
      badge: "Master",
      change: "+5"
    },
    {
      rank: 3,
      name: "Michael Rodriguez",
      username: "crypto_auditor_mike",
      score: 9680,
      auditsCompleted: 112,
      vulnerabilitiesFound: 1156,
      rating: 4.8,
      specializations: ["Smart Contracts", "NFT"],
      badge: "Master",
      change: "-1"
    },
    {
      rank: 4,
      name: "Emily Zhang",
      username: "blockchain_sec_emily",
      score: 9540,
      auditsCompleted: 89,
      vulnerabilitiesFound: 967,
      rating: 4.7,
      specializations: ["Cross-Chain", "DeFi"],
      badge: "Expert",
      change: "+3"
    },
    {
      rank: 5,
      name: "David Kumar",
      username: "security_guru_david",
      score: 9420,
      auditsCompleted: 104,
      vulnerabilitiesFound: 1034,
      rating: 4.7,
      specializations: ["Smart Contracts", "GameFi"],
      badge: "Expert",
      change: "+7"
    }
  ];

  const monthlyLeaders = [
    {
      rank: 1,
      name: "Jennifer Liu",
      auditsThisMonth: 12,
      score: 1240,
      change: "new"
    },
    {
      rank: 2,
      name: "Robert Singh",
      auditsThisMonth: 10,
      score: 1180,
      change: "+2"
    },
    {
      rank: 3,
      name: "Maria Garcia",
      auditsThisMonth: 9,
      score: 1095,
      change: "-1"
    }
  ];

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Legendary": return "bg-gradient-to-r from-yellow-400 to-orange-500 text-white";
      case "Master": return "bg-gradient-to-r from-purple-500 to-blue-500 text-white";
      case "Expert": return "bg-gradient-to-r from-green-500 to-teal-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2: return <Award className="h-6 w-6 text-gray-400" />;
      case 3: return <Award className="h-6 w-6 text-amber-600" />;
      default: return <span className="h-6 w-6 flex items-center justify-center text-sm font-bold">{rank}</span>;
    }
  };

  return (
    <>
      <Helmet>
        <title>Security Expert Leaderboard | Hawkly</title>
        <meta name="description" content="Discover top Web3 security auditors and experts. View rankings based on audit performance, vulnerabilities found, and community ratings." />
      </Helmet>

      <StandardLayout 
        title="Security Expert Leaderboard" 
        description="Top-performing Web3 security auditors and experts"
      >
        <div className="container py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Updated March 2025</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Security Expert Leaderboard
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Discover the top-performing security auditors and experts in the Web3 ecosystem. 
              Rankings based on audit quality, vulnerabilities found, and community feedback.
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">2,401</div>
                <div className="text-sm text-muted-foreground">Active Auditors</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Shield className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">7,129</div>
                <div className="text-sm text-muted-foreground">Vulnerabilities Found</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">2,387</div>
                <div className="text-sm text-muted-foreground">Audits Completed</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Star className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">4.7</div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </CardContent>
            </Card>
          </div>

          {/* Leaderboard Tabs */}
          <Tabs defaultValue="overall" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overall">Overall Rankings</TabsTrigger>
              <TabsTrigger value="monthly">This Month</TabsTrigger>
              <TabsTrigger value="rising">Rising Stars</TabsTrigger>
            </TabsList>

            <TabsContent value="overall" className="space-y-4">
              <div className="space-y-4">
                {topAuditors.map((auditor, index) => (
                  <Card key={index} className={`hover:shadow-lg transition-shadow ${index < 3 ? 'border-primary/20' : ''}`}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-12 h-12 bg-muted rounded-full">
                            {getRankIcon(auditor.rank)}
                          </div>
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="font-semibold text-lg">{auditor.name}</h3>
                              <Badge className={getBadgeColor(auditor.badge)}>
                                {auditor.badge}
                              </Badge>
                              <div className="flex items-center gap-1">
                                {auditor.change.startsWith('+') ? (
                                  <TrendingUp className="h-4 w-4 text-green-500" />
                                ) : auditor.change.startsWith('-') ? (
                                  <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
                                ) : null}
                                <span className={`text-sm ${
                                  auditor.change.startsWith('+') ? 'text-green-500' : 
                                  auditor.change.startsWith('-') ? 'text-red-500' : 'text-muted-foreground'
                                }`}>
                                  {auditor.change}
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">@{auditor.username}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {auditor.specializations.map((spec, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {spec}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary mb-1">
                            {auditor.score.toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <div>{auditor.auditsCompleted} audits</div>
                            <div>{auditor.vulnerabilitiesFound} vulnerabilities</div>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span>{auditor.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="monthly" className="space-y-4">
              <div className="space-y-4">
                {monthlyLeaders.map((leader, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-12 h-12 bg-muted rounded-full">
                            {getRankIcon(leader.rank)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{leader.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {leader.auditsThisMonth} audits this month
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-primary">
                            {leader.score}
                          </div>
                          <div className="text-sm text-muted-foreground">points</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="rising">
              <div className="text-center py-12">
                <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Rising Stars</h3>
                <p className="text-muted-foreground">
                  Auditors with the highest growth in rankings this month
                </p>
              </div>
            </TabsContent>
          </Tabs>

          {/* Join CTA */}
          <div className="mt-16 text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8">
            <Trophy className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Join the Leaderboard</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Become a verified security auditor and compete with the best experts in Web3 security.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">Become an Auditor</Button>
              <Button variant="outline" size="lg">Learn More</Button>
            </div>
          </div>
        </div>
      </StandardLayout>
    </>
  );
}
