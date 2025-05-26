
import React from "react";
import { ContentPage } from "@/components/content/content-page";
import { MessageSquare, Users, TrendingUp, Pin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Forum() {
  const forumCategories = [
    {
      name: "General Discussion",
      description: "General Web3 security topics and discussions",
      topics: 234,
      posts: 1567,
      icon: MessageSquare
    },
    {
      name: "Smart Contract Security",
      description: "Discussions about smart contract vulnerabilities and best practices",
      topics: 189,
      posts: 2341,
      icon: TrendingUp
    },
    {
      name: "Audit Questions",
      description: "Q&A about security audits and methodology",
      topics: 156,
      posts: 892,
      icon: Users
    }
  ];

  const recentTopics = [
    {
      title: "How to properly implement reentrancy guards?",
      author: "dev_alice",
      replies: 12,
      lastActive: "2 hours ago",
      isPinned: false
    },
    {
      title: "Welcome to the Hawkly Security Forum!",
      author: "hawkly_team",
      replies: 45,
      lastActive: "1 day ago",
      isPinned: true
    },
    {
      title: "Best practices for oracle price feeds",
      author: "security_bob",
      replies: 8,
      lastActive: "3 hours ago",
      isPinned: false
    }
  ];

  return (
    <ContentPage
      title="Security Forum"
      description="Community discussions about Web3 security, audits, and best practices"
      className="px-4 md:px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="bg-card rounded-lg p-6 mb-8 border border-border/40">
          <div className="flex items-center mb-4">
            <MessageSquare className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold">Security Forum</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Connect with the Web3 security community. Share knowledge, ask questions, and discuss best practices.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {forumCategories.map((category, index) => (
            <div key={index} className="bg-card rounded-lg p-6 border border-border/40 hover:shadow-md transition-all">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-primary/10 rounded-lg mr-3">
                  <category.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{category.name}</h3>
              </div>
              <p className="text-muted-foreground mb-4">{category.description}</p>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{category.topics} topics</span>
                <span>{category.posts} posts</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-lg border border-border/40">
          <div className="p-6 border-b border-border/40">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Recent Discussions</h2>
              <Button>New Topic</Button>
            </div>
          </div>
          
          <div className="divide-y divide-border/40">
            {recentTopics.map((topic, index) => (
              <div key={index} className="p-6 hover:bg-muted/20 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-grow">
                    <div className="flex items-center mb-2">
                      {topic.isPinned && (
                        <Pin className="h-4 w-4 text-primary mr-2" />
                      )}
                      <h3 className="text-lg font-medium hover:text-primary cursor-pointer">
                        {topic.title}
                      </h3>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>by {topic.author}</span>
                      <span className="mx-2">•</span>
                      <span>{topic.replies} replies</span>
                      <span className="mx-2">•</span>
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{topic.lastActive}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 bg-primary/5 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-2">Forum Guidelines</h3>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Be respectful and constructive in all discussions</li>
            <li>Search existing topics before creating new ones</li>
            <li>Provide context and details when asking questions</li>
            <li>Share knowledge and help others learn</li>
            <li>Follow our code of conduct and community standards</li>
          </ul>
        </div>
      </div>
    </ContentPage>
  );
}
