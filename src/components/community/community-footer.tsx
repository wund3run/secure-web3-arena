
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

export function CommunityFooter() {
  return (
    <div className="mt-16 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-10 text-center">
      <div className="max-w-3xl mx-auto">
        <div className="inline-flex items-center justify-center mb-4">
          <div className="p-3 bg-primary/20 rounded-full">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-4">Join Our Security Community</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto text-muted-foreground">
          Connect with like-minded security professionals, expand your knowledge, and build your reputation in the blockchain security space.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="bg-background rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Weekly Security Office Hours</h3>
            <p className="text-muted-foreground mb-4">
              Join our weekly virtual meetups where security experts discuss the latest trends and answer your questions.
            </p>
            <Link to="/events">
              <Button variant="outline" size="sm" className="group">
                View Schedule
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          <div className="bg-background rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Security Challenges</h3>
            <p className="text-muted-foreground mb-4">
              Test and improve your skills with our community security challenges and earn rewards and recognition.
            </p>
            <Link to="/challenges">
              <Button variant="outline" size="sm" className="group">
                Try Challenges
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/auth">
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
              Sign Up Now
            </Button>
          </Link>
          <Link to="/marketplace">
            <Button size="lg" variant="outline" className="group border-secondary">
              Browse Audit Services
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link to="/pricing-inr">
            <Button size="lg" variant="outline" className="group border-primary">
              View Pricing (INR)
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
