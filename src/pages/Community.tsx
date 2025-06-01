
import React from "react";
import { Helmet } from "react-helmet-async";
import { SimplifiedNavbar } from "@/components/layout/simplified-navbar";
import { Users, MessageSquare, Calendar, Trophy } from "lucide-react";

export default function Community() {
  return (
    <>
      <Helmet>
        <title>Community | Hawkly</title>
        <meta name="description" content="Join the Hawkly Web3 security community." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <SimplifiedNavbar />
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Join Our Community</h1>
              <p className="text-xl text-muted-foreground">
                Connect with Web3 security experts and stay updated on the latest threats
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="border rounded-lg p-6">
                <MessageSquare className="h-8 w-8 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-3">Community Forum</h3>
                <p className="text-muted-foreground mb-4">
                  Discuss security best practices, share insights, and get help from experts
                </p>
                <a href="/forum" className="text-primary hover:underline">Visit Forum →</a>
              </div>
              
              <div className="border rounded-lg p-6">
                <Calendar className="h-8 w-8 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-3">Events & Workshops</h3>
                <p className="text-muted-foreground mb-4">
                  Attend live events, workshops, and training sessions on Web3 security
                </p>
                <a href="/events" className="text-primary hover:underline">View Events →</a>
              </div>
              
              <div className="border rounded-lg p-6">
                <Trophy className="h-8 w-8 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-3">Security Challenges</h3>
                <p className="text-muted-foreground mb-4">
                  Test your skills with hands-on security challenges and CTF competitions
                </p>
                <a href="/challenges" className="text-primary hover:underline">Try Challenges →</a>
              </div>
              
              <div className="border rounded-lg p-6">
                <Users className="h-8 w-8 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-3">Expert Network</h3>
                <p className="text-muted-foreground mb-4">
                  Connect with top security experts and see rankings on our leaderboard
                </p>
                <a href="/leaderboard" className="text-primary hover:underline">View Leaderboard →</a>
              </div>
            </div>
            
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">Community Stats</h2>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">2,500+</div>
                  <div className="text-sm text-muted-foreground">Security Experts</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">15,000+</div>
                  <div className="text-sm text-muted-foreground">Audits Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">$2B+</div>
                  <div className="text-sm text-muted-foreground">Value Secured</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
