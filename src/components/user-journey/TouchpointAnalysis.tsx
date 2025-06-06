
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Globe, 
  Mail, 
  MessageSquare, 
  Phone, 
  Search,
  Users,
  Star,
  TrendingUp,
  ArrowRight
} from 'lucide-react';

interface Touchpoint {
  id: string;
  name: string;
  channel: string;
  stage: string;
  effectiveness: number;
  volume: number;
  conversionRate: number;
  satisfactionScore: number;
  description: string;
  improvements: string[];
}

export function TouchpointAnalysis() {
  const [selectedStage, setSelectedStage] = useState<string>('all');
  
  const touchpoints: Touchpoint[] = [
    {
      id: 'website-landing',
      name: 'Website Landing Page',
      channel: 'Web',
      stage: 'Discovery',
      effectiveness: 78,
      volume: 1250,
      conversionRate: 12,
      satisfactionScore: 4.2,
      description: 'Primary entry point for new users discovering Hawkly',
      improvements: ['Clearer value proposition', 'Social proof', 'Interactive demos']
    },
    {
      id: 'search-results',
      name: 'Search Engine Results',
      channel: 'SEO',
      stage: 'Discovery',
      effectiveness: 85,
      volume: 890,
      conversionRate: 15,
      satisfactionScore: 4.1,
      description: 'Users finding Hawkly through search engines',
      improvements: ['Better meta descriptions', 'Featured snippets', 'Local SEO']
    },
    {
      id: 'registration-form',
      name: 'Registration Process',
      channel: 'Web',
      stage: 'Onboarding',
      effectiveness: 92,
      volume: 650,
      conversionRate: 89,
      satisfactionScore: 4.0,
      description: 'Account creation and initial setup',
      improvements: ['Progressive disclosure', 'Social login', 'Form validation']
    },
    {
      id: 'email-verification',
      name: 'Email Verification',
      channel: 'Email',
      stage: 'Onboarding',
      effectiveness: 88,
      volume: 580,
      conversionRate: 95,
      satisfactionScore: 3.8,
      description: 'Email confirmation and account activation',
      improvements: ['Faster delivery', 'Better email design', 'Resend options']
    },
    {
      id: 'profile-setup',
      name: 'Profile Setup Wizard',
      channel: 'Web',
      stage: 'Onboarding',
      effectiveness: 76,
      volume: 520,
      conversionRate: 78,
      satisfactionScore: 3.9,
      description: 'Detailed profile creation for auditors/clients',
      improvements: ['Smart suggestions', 'Save and continue', 'Help tooltips']
    },
    {
      id: 'marketplace-browse',
      name: 'Marketplace Browsing',
      channel: 'Web',
      stage: 'Engagement',
      effectiveness: 82,
      volume: 780,
      conversionRate: 45,
      satisfactionScore: 4.3,
      description: 'Users exploring available services and auditors',
      improvements: ['Better filtering', 'Comparison tools', 'Recommendations']
    },
    {
      id: 'chat-system',
      name: 'In-Platform Messaging',
      channel: 'Chat',
      stage: 'Engagement',
      effectiveness: 91,
      volume: 340,
      conversionRate: 78,
      satisfactionScore: 4.5,
      description: 'Real-time communication between users',
      improvements: ['File sharing', 'Video calls', 'Better notifications']
    },
    {
      id: 'project-submission',
      name: 'Project Submission Form',
      channel: 'Web',
      stage: 'Conversion',
      effectiveness: 87,
      volume: 290,
      conversionRate: 81,
      satisfactionScore: 4.1,
      description: 'Clients submitting audit requests',
      improvements: ['Smart form fields', 'Cost estimation', 'Timeline guidance']
    },
    {
      id: 'payment-process',
      name: 'Payment & Escrow Setup',
      channel: 'Web',
      stage: 'Conversion',
      effectiveness: 89,
      volume: 235,
      conversionRate: 92,
      satisfactionScore: 4.2,
      description: 'Secure payment processing and escrow creation',
      improvements: ['More payment options', 'Clearer terms', 'Mobile optimization']
    },
    {
      id: 'support-system',
      name: 'Customer Support',
      channel: 'Support',
      stage: 'Retention',
      effectiveness: 93,
      volume: 180,
      conversionRate: 85,
      satisfactionScore: 4.7,
      description: 'Help desk and customer service interactions',
      improvements: ['AI chatbot', 'Knowledge base', 'Video tutorials']
    }
  ];

  const stages = ['all', 'Discovery', 'Onboarding', 'Engagement', 'Conversion', 'Retention'];
  
  const filteredTouchpoints = selectedStage === 'all' 
    ? touchpoints 
    : touchpoints.filter(t => t.stage === selectedStage);

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'Web': return <Globe className="h-4 w-4" />;
      case 'Email': return <Mail className="h-4 w-4" />;
      case 'Chat': return <MessageSquare className="h-4 w-4" />;
      case 'SEO': return <Search className="h-4 w-4" />;
      case 'Support': return <Users className="h-4 w-4" />;
      default: return <Globe className="h-4 w-4" />;
    }
  };

  const getEffectivenessColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Touchpoint Analysis</h2>
          <p className="text-muted-foreground">
            Analyzing all user interaction points across the platform
          </p>
        </div>
      </div>

      {/* Stage Filter */}
      <div className="flex gap-2 flex-wrap">
        {stages.map(stage => (
          <Button
            key={stage}
            variant={selectedStage === stage ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedStage(stage)}
          >
            {stage === 'all' ? 'All Stages' : stage}
          </Button>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Avg. Effectiveness</p>
                <p className="text-2xl font-bold">
                  {(filteredTouchpoints.reduce((acc, t) => acc + t.effectiveness, 0) / filteredTouchpoints.length).toFixed(1)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Volume</p>
                <p className="text-2xl font-bold">
                  {filteredTouchpoints.reduce((acc, t) => acc + t.volume, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <ArrowRight className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Avg. Conversion</p>
                <p className="text-2xl font-bold">
                  {(filteredTouchpoints.reduce((acc, t) => acc + t.conversionRate, 0) / filteredTouchpoints.length).toFixed(1)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Avg. Satisfaction</p>
                <p className="text-2xl font-bold">
                  {(filteredTouchpoints.reduce((acc, t) => acc + t.satisfactionScore, 0) / filteredTouchpoints.length).toFixed(1)}/5
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Touchpoints List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredTouchpoints.map(touchpoint => (
          <Card key={touchpoint.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getChannelIcon(touchpoint.channel)}
                  <div>
                    <h3 className="font-semibold">{touchpoint.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">{touchpoint.stage}</Badge>
                      <Badge variant="secondary">{touchpoint.channel}</Badge>
                    </div>
                  </div>
                </div>
                <div className={`text-right ${getEffectivenessColor(touchpoint.effectiveness)}`}>
                  <div className="text-2xl font-bold">{touchpoint.effectiveness}%</div>
                  <div className="text-xs text-muted-foreground">Effectiveness</div>
                </div>
              </div>

              <p className="text-muted-foreground mb-4">{touchpoint.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="text-sm text-muted-foreground">Monthly Volume</div>
                  <div className="text-lg font-semibold">{touchpoint.volume.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Conversion Rate</div>
                  <div className="text-lg font-semibold">{touchpoint.conversionRate}%</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Satisfaction Score</div>
                  <div className="text-lg font-semibold">{touchpoint.satisfactionScore}/5</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Effectiveness Score</div>
                <Progress value={touchpoint.effectiveness} className="h-2" />
              </div>

              <div className="mt-4">
                <div className="text-sm font-medium mb-2">Recommended Improvements</div>
                <div className="flex flex-wrap gap-2">
                  {touchpoint.improvements.map((improvement, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {improvement}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
