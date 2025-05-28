
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, MessageSquare, Calendar, Trophy, Star, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export function CommunityHeader() {
  return (
    <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Users className="h-4 w-4" />
            12,500+ Security Professionals Connected
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Join the Web3 Security <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Community</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Connect with security experts, share knowledge, participate in challenges, and stay ahead of emerging threats in the blockchain ecosystem.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button size="lg" asChild>
              <Link to="/auth">
                <MessageSquare className="mr-2 h-4 w-4" />
                Join Discussions
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/events">
                <Calendar className="mr-2 h-4 w-4" />
                Upcoming Events
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/challenges">
                <Trophy className="mr-2 h-4 w-4" />
                Security Challenges
              </Link>
            </Button>
          </div>
          
          {/* Community Highlights */}
          <div className="grid md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/50 backdrop-blur rounded-lg p-4 border">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="font-semibold">Expert Contributors</span>
              </div>
              <p className="text-2xl font-bold text-primary">350+</p>
              <p className="text-sm text-muted-foreground">Verified security experts</p>
            </div>
            
            <div className="bg-white/50 backdrop-blur rounded-lg p-4 border">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="h-5 w-5 text-blue-500" />
                <span className="font-semibold">Active Discussions</span>
              </div>
              <p className="text-2xl font-bold text-primary">4.2k+</p>
              <p className="text-sm text-muted-foreground">Security topics discussed</p>
            </div>
            
            <div className="bg-white/50 backdrop-blur rounded-lg p-4 border">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <span className="font-semibold">Knowledge Shared</span>
              </div>
              <p className="text-2xl font-bold text-primary">95%</p>
              <p className="text-sm text-muted-foreground">Questions get answered</p>
            </div>
            
            <div className="bg-white/50 backdrop-blur rounded-lg p-4 border">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="h-5 w-5 text-orange-500" />
                <span className="font-semibold">Monthly Events</span>
              </div>
              <p className="text-2xl font-bold text-primary">12+</p>
              <p className="text-sm text-muted-foreground">Workshops & meetups</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
