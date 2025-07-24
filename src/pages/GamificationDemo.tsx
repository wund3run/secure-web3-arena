import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GamificationDashboard } from '@/components/gamification/GamificationDashboard';
import { Gamepad2, Star, Trophy, Target, Users, Gift, TrendingUp } from 'lucide-react';

const GamificationDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center space-y-4">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 bg-white/20 rounded-full flex items-center justify-center">
                <Gamepad2 className="h-8 w-8" />
              </div>
            </div>
            <h1 className="text-4xl font-bold">Auditor Gamification System</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              A comprehensive behavioral design system that motivates auditors through 
              XP, levels, badges, streaks, challenges, and unlockable rewards.
            </p>
          </div>
        </div>
      </div>

      {/* Features Overview */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>XP & Levels</CardTitle>
              <CardDescription>Reward every action with experience points and visible progress</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-left space-y-1">
                <li>• 25+ different XP-earning actions</li>
                <li>• Behavioral multipliers for time & quality</li>
                <li>• Progressive level unlock system</li>
                <li>• Real-time XP notifications</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Trophy className="h-6 w-6 text-yellow-600" />
              </div>
              <CardTitle>Badges & Achievements</CardTitle>
              <CardDescription>Proof of achievement with rarity-based reward system</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-left space-y-1">
                <li>• 4 rarity levels: Common to Legendary</li>
                <li>• Achievement, skill, and behavior badges</li>
                <li>• Animated badge earning notifications</li>
                <li>• Badge showcase in profile</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle>Challenges & Streaks</CardTitle>
              <CardDescription>Time-limited goals that build daily habits</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-left space-y-1">
                <li>• Daily, weekly, and monthly challenges</li>
                <li>• Streak tracking with milestone rewards</li>
                <li>• Progressive difficulty scaling</li>
                <li>• Community participation tracking</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Leaderboards</CardTitle>
              <CardDescription>Competitive ranking with social elements</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-left space-y-1">
                <li>• Daily, weekly, monthly rankings</li>
                <li>• Real-time position tracking</li>
                <li>• Streak and achievement displays</li>
                <li>• Fair competition algorithms</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Gift className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Unlockables & Surprises</CardTitle>
              <CardDescription>Maintain curiosity with progressive rewards</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-left space-y-1">
                <li>• Premium themes and customizations</li>
                <li>• Advanced AI tools and features</li>
                <li>• Priority support access</li>
                <li>• Surprise bonus rewards</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-indigo-600" />
              </div>
              <CardTitle>Progress Tracking</CardTitle>
              <CardDescription>Visual feedback on all activities and growth</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-left space-y-1">
                <li>• Real-time progress bars</li>
                <li>• Visual XP and level displays</li>
                <li>• Achievement timelines</li>
                <li>• Performance analytics</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Behavioral Design Principles */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Behavioral Design Principles</CardTitle>
            <CardDescription>
              This gamification system is built on proven behavioral psychology principles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-3">Intrinsic Motivation</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Focus on skill mastery and professional growth</li>
                  <li>• Meaningful achievements tied to real work</li>
                  <li>• Autonomy through choice and customization</li>
                  <li>• Purpose-driven challenges and goals</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Habit Formation</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Daily streaks to build consistency</li>
                  <li>• Small, frequent rewards for engagement</li>
                  <li>• Progressive challenges that scale difficulty</li>
                  <li>• Time-based bonuses for optimal scheduling</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Social Connection</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Community leaderboards and rankings</li>
                  <li>• Peer recognition through badges</li>
                  <li>• Collaborative challenges and goals</li>
                  <li>• Knowledge sharing rewards</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Progressive Disclosure</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Features unlock with achievement levels</li>
                  <li>• Gradual complexity in challenges</li>
                  <li>• Surprise elements maintain engagement</li>
                  <li>• Clear progression pathways</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Demo */}
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Live Gamification Dashboard</h2>
            <p className="text-gray-600 mb-8">
              Experience the full gamification system below. Use the test buttons in the top-left to trigger XP gains and notifications.
            </p>
          </div>
          
          <GamificationDashboard />
        </div>
      </div>
    </div>
  );
};

export default GamificationDemo; 