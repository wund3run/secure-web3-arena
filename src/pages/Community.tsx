
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, MessageSquare, Calendar, Trophy, BookOpen, Zap, Globe, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

const Community = () => {
  const stats = [
    { label: "Active Members", value: "2,500+", icon: <Users className="h-5 w-5" /> },
    { label: "Discussions", value: "15,000+", icon: <MessageSquare className="h-5 w-5" /> },
    { label: "Events Hosted", value: "150+", icon: <Calendar className="h-5 w-5" /> },
    { label: "Security Reports", value: "500+", icon: <BookOpen className="h-5 w-5" /> }
  ];

  const features = [
    {
      icon: <MessageSquare className="h-8 w-8 text-blue-500" />,
      title: "Discussion Forums",
      description: "Engage with security experts, share insights, and get help with your projects.",
      link: "/forum"
    },
    {
      icon: <Calendar className="h-8 w-8 text-green-500" />,
      title: "Events & Workshops",
      description: "Join live sessions, webinars, and workshops on Web3 security topics.",
      link: "/events"
    },
    {
      icon: <Target className="h-8 w-8 text-purple-500" />,
      title: "Security Challenges",
      description: "Test your skills with CTF competitions and vulnerability hunting.",
      link: "/challenges"
    },
    {
      icon: <Trophy className="h-8 w-8 text-yellow-500" />,
      title: "Leaderboards",
      description: "Track top performers and earn recognition for your contributions.",
      link: "/leaderboard"
    }
  ];

  const recentActivity = [
    {
      type: "discussion",
      title: "Best practices for DeFi auditing",
      author: "SecurityExpert",
      time: "2 hours ago",
      replies: 15
    },
    {
      type: "event",
      title: "Smart Contract Security Workshop",
      author: "Hawkly Team",
      time: "1 day ago",
      attendees: 250
    },
    {
      type: "challenge",
      title: "Weekly CTF Challenge #42",
      author: "ChallengeBot",
      time: "3 days ago",
      participants: 89
    }
  ];

  return (
    <>
      <Helmet>
        <title>Community | Hawkly</title>
        <meta name="description" content="Join the Web3 security community. Connect with experts, learn, and grow together." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Web3 Security Community
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with security professionals, share knowledge, and stay updated 
              with the latest in Web3 security. Join thousands of experts building 
              a safer decentralized future.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-2 text-primary">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    {feature.icon}
                    <CardTitle>{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <Button variant="outline" asChild>
                    <Link to={feature.link}>
                      Explore
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          {activity.type === 'discussion' && <MessageSquare className="h-5 w-5" />}
                          {activity.type === 'event' && <Calendar className="h-5 w-5" />}
                          {activity.type === 'challenge' && <Target className="h-5 w-5" />}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{activity.title}</h4>
                          <p className="text-sm text-gray-600">by {activity.author}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <span>{activity.time}</span>
                            {activity.replies && <span>{activity.replies} replies</span>}
                            {activity.attendees && <span>{activity.attendees} attendees</span>}
                            {activity.participants && <span>{activity.participants} participants</span>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Community Guidelines</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Be respectful and professional</li>
                    <li>• Share knowledge constructively</li>
                    <li>• No spam or self-promotion</li>
                    <li>• Follow responsible disclosure</li>
                    <li>• Help newcomers learn</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Get Involved</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" asChild>
                    <Link to="/forum">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Join Discussions
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/events">
                      <Calendar className="h-4 w-4 mr-2" />
                      Upcoming Events
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/challenges">
                      <Zap className="h-4 w-4 mr-2" />
                      Take Challenges
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center text-white">
            <Globe className="h-12 w-12 mx-auto mb-4 text-white" />
            <h2 className="text-3xl font-bold mb-4">Ready to Join Our Community?</h2>
            <p className="text-xl mb-6 opacity-90">
              Connect with like-minded security professionals and contribute to a safer Web3 ecosystem
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Create Account
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                Learn More
              </Button>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
};

export default Community;
