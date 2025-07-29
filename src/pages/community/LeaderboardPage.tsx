
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';

const LeaderboardPage = () => {
  return (
    <StandardLayout
      title="Leaderboard | Hawkly"
      description="Top security experts and contributors in the Hawkly community"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-hawkly-gradient mb-4">
            Community Leaderboard
          </h1>
          <p className="text-xl text-muted-foreground">
            Recognizing the top security experts and contributors
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Top 3 */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Top Performers This Month
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { rank: 1, name: "Alex Chen", score: 9850, badge: "Security Master", icon: Trophy, color: "text-yellow-500" },
                    { rank: 2, name: "Sarah Kim", score: 9420, badge: "Audit Expert", icon: Medal, color: "text-gray-400" },
                    { rank: 3, name: "Michael Torres", score: 8890, badge: "DeFi Specialist", icon: Award, color: "text-amber-600" }
                  ].map((user, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <user.icon className={`h-6 w-6 ${user.color}`} />
                          <span className="text-2xl font-bold">{user.rank}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold">{user.name}</h3>
                          <Badge variant="secondary" className="text-xs">{user.badge}</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-hawkly-primary">{user.score.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">points</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Full Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle>Full Leaderboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Array.from({ length: 10 }, (_, i) => ({
                    rank: i + 4,
                    name: `User ${i + 4}`,
                    score: 8500 - (i * 200),
                    change: Math.floor(Math.random() * 20) - 10
                  })).map((user, index) => (
                    <div key={index} className="flex items-center justify-between p-3 hover:bg-muted/50 rounded transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="w-8 text-center font-medium">{user.rank}</span>
                        <span>{user.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{user.score.toLocaleString()}</span>
                        <div className={`flex items-center gap-1 text-xs ${
                          user.change > 0 ? 'text-green-500' : user.change < 0 ? 'text-red-500' : 'text-muted-foreground'
                        }`}>
                          <TrendingUp className="h-3 w-3" />
                          {user.change > 0 ? '+' : ''}{user.change}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Overall", active: true },
                    { name: "Smart Contracts", active: false },
                    { name: "DeFi", active: false },
                    { name: "NFTs", active: false },
                    { name: "Challenges", active: false }
                  ].map((category, index) => (
                    <div key={index} className={`p-2 rounded cursor-pointer transition-colors ${
                      category.active ? 'bg-hawkly-primary text-white' : 'hover:bg-muted'
                    }`}>
                      {category.name}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "First Audit", description: "Complete your first audit", earned: true },
                    { name: "Security Master", description: "Score 10,000+ points", earned: false },
                    { name: "Community Helper", description: "Help 50+ users", earned: true }
                  ].map((achievement, index) => (
                    <div key={index} className={`p-3 rounded border ${
                      achievement.earned ? 'bg-green-50 border-green-200' : 'bg-muted/50 border-muted'
                    }`}>
                      <div className="flex items-center gap-2 mb-1">
                        <Award className={`h-4 w-4 ${achievement.earned ? 'text-green-500' : 'text-muted-foreground'}`} />
                        <span className="font-medium text-sm">{achievement.name}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </StandardLayout>
  );
};

export default LeaderboardPage;
