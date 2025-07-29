
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Code, ArrowRight } from "lucide-react";

export interface UserTypeSelectionProps {
  onSelect: (type: "provider" | "buyer") => void;
  onSkip: () => void;
}

export function UserTypeSelection({ onSelect, onSkip }: UserTypeSelectionProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Welcome to Hawkly</h2>
        <p className="text-muted-foreground">
          Tell us what brings you here today to personalize your experience
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all" onClick={() => onSelect("provider")}>
          <CardHeader>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
              <Shield className="h-6 w-6" />
            </div>
            <CardTitle>I'm a Security Provider</CardTitle>
            <CardDescription>
              I want to offer security services and audits to blockchain projects
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Continue as Provider
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="cursor-pointer hover:border-secondary/50 hover:bg-secondary/5 transition-all" onClick={() => onSelect("buyer")}>
          <CardHeader>
            <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mb-2">
              <Code className="h-6 w-6" />
            </div>
            <CardTitle>I'm Looking for Security</CardTitle>
            <CardDescription>
              I need security services for my blockchain project or smart contracts
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Continue as Buyer
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="text-center">
        <Button variant="ghost" size="sm" onClick={onSkip}>
          I'm just browsing
        </Button>
      </div>
    </div>
  );
}
