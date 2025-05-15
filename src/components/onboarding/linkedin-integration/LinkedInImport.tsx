
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface LinkedInImportProps {
  onImportSuccess: (data: LinkedInProfileData) => void;
  onCancel: () => void;
}

export interface LinkedInProfileData {
  fullName?: string;
  title?: string;
  company?: string;
  skills?: string[];
  yearsOfExperience?: number;
  education?: string[];
  certifications?: string[];
}

export function LinkedInImport({ onImportSuccess, onCancel }: LinkedInImportProps) {
  const [isLoading, setIsLoading] = useState(false);

  // This function would be implemented with the actual LinkedIn API
  // For now, we'll mock it with a simulated API call
  const handleImport = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock data - in a real implementation, this would come from LinkedIn's API
      const mockProfileData: LinkedInProfileData = {
        fullName: "Alex Johnson",
        title: "Senior Security Engineer",
        company: "Blockchain Security Labs",
        skills: ["Smart Contract Auditing", "Solidity", "Web3 Security", "Penetration Testing"],
        yearsOfExperience: 7,
        education: ["Master's in Computer Science - Stanford University"],
        certifications: ["Certified Web3 Security Professional", "CISSP"]
      };
      
      onImportSuccess(mockProfileData);
      toast.success("LinkedIn profile imported successfully");
    } catch (error) {
      console.error("LinkedIn import error:", error);
      toast.error("Failed to import LinkedIn profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Import from LinkedIn</CardTitle>
        <CardDescription>
          Save time by importing your professional information directly from LinkedIn
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-blue-50 text-blue-700 p-4 rounded-md text-sm">
          <p className="font-medium">Why connect LinkedIn?</p>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Automatically fill your professional details</li>
            <li>Keep your profile updated with your latest skills</li>
            <li>Enhance your credibility with verified information</li>
          </ul>
        </div>
        <p className="text-sm text-muted-foreground">
          We'll only access your public profile information. You can review all imported data before saving.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          Skip
        </Button>
        <Button 
          className="bg-[#0077B5] hover:bg-[#006699]" 
          onClick={handleImport}
          disabled={isLoading}
        >
          {isLoading ? "Connecting..." : "Connect LinkedIn"}
        </Button>
      </CardFooter>
    </Card>
  );
}
