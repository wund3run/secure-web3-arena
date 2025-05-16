
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Trophy } from "lucide-react";

export interface SecurityDiscussion {
  id: number;
  title: string;
  category: string;
  categoryLabel?: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  preview: string;
  replies: number;
  points: number;
  href: string;
}

interface SecurityDiscussionCardProps {
  discussion: SecurityDiscussion;
}

export function SecurityDiscussionCard({ discussion }: SecurityDiscussionCardProps) {
  return (
    <Card className="h-full hover:shadow-md transition-all">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Link 
            to={discussion.href}
            className="text-lg font-semibold hover:text-primary transition-colors line-clamp-2 group"
          >
            {discussion.title}
            <span className="block w-0 group-hover:w-full h-0.5 bg-primary transition-all duration-300"></span>
          </Link>
          <Badge variant="outline" className="ml-2 bg-primary/10 whitespace-nowrap">
            {discussion.categoryLabel || discussion.category}
          </Badge>
        </div>
        <div className="flex items-center gap-2 mt-2 text-muted-foreground text-sm">
          <img 
            src={discussion.author.avatar} 
            alt={`Avatar of ${discussion.author.name}`} 
            className="w-6 h-6 rounded-full"
            loading="lazy"
          />
          <span>{discussion.author.name} • {discussion.date}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 text-muted-foreground">
          {discussion.preview}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-4 h-4" aria-hidden="true" />
          <span>{discussion.replies} replies</span>
        </div>
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4" aria-hidden="true" />
          <span>{discussion.points} points</span>
        </div>
      </CardFooter>
    </Card>
  );
}
