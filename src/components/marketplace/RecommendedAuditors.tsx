
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Shield, TrendingUp, MessageCircle, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface RecommendedAuditor {
  id: string;
  full_name: string;
  avatar_url?: string;
  specialization?: string[];
  experience_level?: string;
  rating: number;
  completed_audits: number;
  response_time: string;
  compatibility_score: number;
  match_reason: string;
  hourly_rate?: number;
  availability: 'available' | 'busy' | 'unavailable';
}

export function RecommendedAuditors() {
  const [auditors, setAuditors] = useState<RecommendedAuditor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecommendedAuditors();
  }, []);

  const fetchRecommendedAuditors = async () => {
    try {
      // Simulate AI-powered recommendations
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .limit(5);

      if (error) throw error;

      // Enhance with mock recommendation data
      const enhancedAuditors: RecommendedAuditor[] = (data || []).map(profile => ({
        id: profile.id,
        full_name: profile.full_name || 'Anonymous Auditor',
        avatar_url: profile.avatar_url,
        specialization: ['DeFi', 'Smart Contracts', 'Layer 2'],
        experience_level: 'Senior',
        rating: 4.8 + Math.random() * 0.2,
        completed_audits: Math.floor(Math.random() * 50) + 10,
        response_time: ['2 hours', '4 hours', '1 day'][Math.floor(Math.random() * 3)],
        compatibility_score: Math.floor(Math.random() * 20) + 80,
        match_reason: [
          'Specialized in your blockchain',
          'High rating in similar projects',
          'Fast response time',
          'Excellent DeFi expertise'
        ][Math.floor(Math.random() * 4)],
        hourly_rate: Math.floor(Math.random() * 100) + 100,
        availability: ['available', 'busy', 'unavailable'][Math.floor(Math.random() * 3)] as any
      }));

      // Sort by compatibility score
      enhancedAuditors.sort((a, b) => b.compatibility_score - a.compatibility_score);
      setAuditors(enhancedAuditors);
    } catch (error) {
      console.error('Error fetching recommended auditors:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'unavailable': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getCompatibilityColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-gray-600';
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="h-10 w-10 bg-muted rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-muted rounded w-3/4 mb-1"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            AI-Recommended Auditors
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Auditors matched to your project requirements
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {auditors.map((auditor, index) => (
            <Card key={auditor.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="space-y-3">
                {/* Header with ranking */}
                <div className="flex items-center justify-between">
                  <Badge variant={index === 0 ? 'default' : 'outline'} className="text-xs">
                    #{index + 1} Match
                  </Badge>
                  <div className={`text-sm font-semibold ${getCompatibilityColor(auditor.compatibility_score)}`}>
                    {auditor.compatibility_score}% Compatible
                  </div>
                </div>

                {/* Auditor Info */}
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={auditor.avatar_url} />
                      <AvatarFallback>
                        {auditor.full_name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div 
                      className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${getAvailabilityColor(auditor.availability)}`}
                      title={auditor.availability}
                    ></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold truncate">{auditor.full_name}</h4>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{auditor.rating.toFixed(1)}</span>
                      <span>•</span>
                      <span>{auditor.completed_audits} audits</span>
                    </div>
                  </div>
                </div>

                {/* Specializations */}
                {auditor.specialization && (
                  <div className="flex flex-wrap gap-1">
                    {auditor.specialization.map((spec) => (
                      <Badge key={spec} variant="outline" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Match Reason */}
                <p className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                  <Shield className="h-3 w-3 inline mr-1" />
                  {auditor.match_reason}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">Response:</span>
                    <span className="ml-1 font-medium">{auditor.response_time}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Rate:</span>
                    <span className="ml-1 font-medium">${auditor.hourly_rate}/hr</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button size="sm" className="flex-1">
                    <MessageCircle className="h-3 w-3 mr-1" />
                    Invite
                  </Button>
                  <Button size="sm" variant="outline">
                    View Profile
                  </Button>
                </div>
              </div>
            </Card>
          ))}

          <Button variant="outline" className="w-full">
            <TrendingUp className="h-4 w-4 mr-2" />
            View All Auditors
          </Button>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            AI Matching Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            <span>High-quality matches available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
            <span>3 auditors specialize in your tech stack</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
            <span>Average response time: 3 hours</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
