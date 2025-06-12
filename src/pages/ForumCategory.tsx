
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, Pin, Lock, MessageCircle, Eye, Clock, Plus } from 'lucide-react';

const ForumCategory = () => {
  const { categorySlug } = useParams();
  
  // Mock category data
  const category = {
    name: 'Smart Contract Security',
    description: 'Discussions about smart contract vulnerabilities and best practices',
    color: '#EF4444'
  };

  const topics = [
    {
      title: 'New vulnerability discovered in popular DeFi protocol',
      slug: 'new-vulnerability-defi-protocol',
      author: 'Emma Thompson',
      isPinned: true,
      isLocked: false,
      replyCount: 23,
      viewCount: 456,
      lastReply: '30 minutes ago'
    }
    // Add more mock topics...
  ];

  return (
    <StandardLayout
      title={`${category.name} - Forum`}
      description={category.description}
    >
      <div className="space-y-6">
        <Link to="/forum">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Forum
          </Button>
        </Link>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{category.name}</h1>
            <p className="text-muted-foreground">{category.description}</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Topic
          </Button>
        </div>

        <div className="space-y-4">
          {topics.map((topic, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>{topic.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {topic.isPinned && <Pin className="h-4 w-4 text-green-500" />}
                      {topic.isLocked && <Lock className="h-4 w-4 text-yellow-500" />}
                      <h3 className="font-semibold">
                        <Link to={`/forum/topic/${topic.slug}`} className="hover:text-primary">
                          {topic.title}
                        </Link>
                      </h3>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>by {topic.author}</span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        {topic.replyCount}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {topic.viewCount}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {topic.lastReply}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </StandardLayout>
  );
};

export default ForumCategory;
