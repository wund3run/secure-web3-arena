
import React from 'react';
import { useParams } from 'react-router-dom';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ArrowLeft, 
  Pin, 
  Lock, 
  MessageCircle, 
  ThumbsUp, 
  ThumbsDown, 
  Quote,
  Flag
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ForumTopic = () => {
  const { topicSlug } = useParams();

  // Mock topic data
  const topic = {
    title: 'New vulnerability discovered in popular DeFi protocol',
    content: `I've been analyzing the latest DeFi protocol and discovered a potential vulnerability in their flash loan implementation. 

The issue seems to be in the way they handle the callback function during the flash loan execution. Here's what I found:

1. The protocol doesn't properly validate the callback data
2. There's a potential for reentrancy attacks
3. The price oracle can be manipulated during the transaction

Has anyone else noticed this? Would love to get some feedback from the community.`,
    author: {
      name: 'Emma Thompson',
      avatar: null,
      reputation: 1250,
      role: 'Security Expert'
    },
    category: 'DeFi Security',
    isPinned: true,
    isLocked: false,
    createdAt: '2024-01-15T10:00:00Z',
    replies: [
      {
        id: '1',
        content: 'This is concerning. Have you reached out to the protocol team directly? It might be worth coordinating a responsible disclosure.',
        author: {
          name: 'David Wilson',
          avatar: null,
          reputation: 890,
          role: 'Auditor'
        },
        createdAt: '2024-01-15T11:30:00Z',
        votes: 12,
        isAuthor: false
      },
      {
        id: '2',
        content: 'Great find! I\'ve seen similar patterns in other protocols. The callback validation issue is particularly serious. Do you have a proof of concept?',
        author: {
          name: 'Sarah Kim',
          avatar: null,
          reputation: 2150,
          role: 'Security Researcher'
        },
        createdAt: '2024-01-15T12:15:00Z',
        votes: 8,
        isAuthor: false
      }
    ]
  };

  return (
    <StandardLayout
      title={topic.title}
      description="Community discussion about Web3 security topics"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back Button */}
        <Link to="/forum">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Forum
          </Button>
        </Link>

        {/* Topic Header */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {topic.isPinned && <Pin className="h-4 w-4 text-green-500" />}
                    {topic.isLocked && <Lock className="h-4 w-4 text-yellow-500" />}
                    <Badge variant="outline">{topic.category}</Badge>
                  </div>
                  <h1 className="text-2xl font-bold">{topic.title}</h1>
                </div>
                <Button variant="outline" size="sm">
                  <Flag className="h-4 w-4 mr-2" />
                  Report
                </Button>
              </div>

              <div className="flex items-center gap-4">
                <Avatar className="w-10 h-10">
                  <AvatarFallback>{topic.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{topic.author.name}</div>
                  <div className="text-sm text-muted-foreground">{topic.author.role} • {topic.author.reputation} rep</div>
                </div>
                <div className="text-sm text-muted-foreground ml-auto">
                  {new Date(topic.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className="prose max-w-none">
                {topic.content.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="flex items-center gap-4 pt-4 border-t">
                <Button variant="outline" size="sm">
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Helpful
                </Button>
                <Button variant="outline" size="sm">
                  <Quote className="h-4 w-4 mr-2" />
                  Quote
                </Button>
                <div className="text-sm text-muted-foreground ml-auto">
                  {topic.replies.length} replies
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Replies */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Replies ({topic.replies.length})
          </h2>

          {topic.replies.map((reply) => (
            <Card key={reply.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">{reply.author.name}</span>
                        <span className="text-sm text-muted-foreground ml-2">
                          {reply.author.role} • {reply.author.reputation} rep
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(reply.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="prose max-w-none">
                      <p>{reply.content}</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <Button variant="outline" size="sm">
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        {reply.votes}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Quote className="h-4 w-4 mr-2" />
                        Quote
                      </Button>
                      <Button variant="outline" size="sm">
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Reply Form */}
        {!topic.isLocked && (
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Add a Reply</h3>
              <div className="space-y-4">
                <Textarea
                  placeholder="Share your thoughts on this topic..."
                  className="min-h-[120px]"
                />
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    Be respectful and constructive in your response
                  </div>
                  <Button>Post Reply</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </StandardLayout>
  );
};

export default ForumTopic;
