
import { Award, FileText, ShieldCheck, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function AuditsHeader() {
  return (
    <div className="bg-gradient-to-r from-primary/5 to-secondary/5 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center bg-primary/10 px-4 py-2 rounded-full text-primary mb-4">
            <ShieldCheck className="h-5 w-5 mr-2" />
            <span className="font-medium">Verified Security</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
            Smart Contract Security Audits
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse completed audits, track ongoing security reviews, or request a new audit for your Web3 project.
            Our verified security experts follow industry-standard methodologies to secure your blockchain applications.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* For Project Owners */}
          <div className="glass-card p-6 rounded-lg hover:shadow-lg transition-shadow border border-border/40 bg-card/80">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full mr-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Request an Audit</h3>
            </div>
            <p className="mb-4 text-muted-foreground">
              Get your smart contracts or protocols reviewed by top security experts. Our auditors specialize in 
              identifying vulnerabilities before they can be exploited in production.
            </p>
            <div className="mt-6">
              <Link to="/marketplace">
                <Button className="group">
                  Request Audit Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
          
          {/* For Security Experts */}
          <div className="glass-card p-6 rounded-lg hover:shadow-lg transition-shadow border border-border/40 bg-card/80">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-secondary/10 rounded-full mr-4">
                <Award className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-bold">Join as an Auditor</h3>
            </div>
            <p className="mb-4 text-muted-foreground">
              Are you a security expert? Join our platform to connect with projects seeking audits,
              build your reputation, and earn rewards for identifying critical vulnerabilities.
            </p>
            <div className="mt-6">
              <Link to="/leaderboard">
                <Button variant="outline" className="group border-secondary text-secondary hover:bg-secondary/10">
                  Join Auditor Network
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mt-8 text-sm">
          <div className="flex items-center bg-muted/50 rounded-lg px-3 py-1.5">
            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
            <span className="text-muted-foreground">2,387 Completed Audits</span>
          </div>
          <div className="flex items-center bg-muted/50 rounded-lg px-3 py-1.5">
            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
            <span className="text-muted-foreground">7,129 Vulnerabilities Found</span>
          </div>
          <div className="flex items-center bg-muted/50 rounded-lg px-3 py-1.5">
            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
            <span className="text-muted-foreground">4.2 Days Avg. Completion</span>
          </div>
        </div>
      </div>
    </div>
  );
}
