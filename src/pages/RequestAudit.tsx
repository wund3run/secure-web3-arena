
import React from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Shield, Clock, DollarSign } from 'lucide-react';

const RequestAudit = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gradient mb-4">Request Security Audit</h1>
            <p className="text-muted-foreground">
              Get your Web3 project audited by verified security experts
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Audit Request Form
              </CardTitle>
              <CardDescription>
                Provide details about your project to get matched with the right auditors
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="project-name">Project Name</Label>
                <Input id="project-name" placeholder="Enter your project name" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="project-type">Project Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="defi">DeFi Protocol</SelectItem>
                    <SelectItem value="nft">NFT Project</SelectItem>
                    <SelectItem value="dao">DAO</SelectItem>
                    <SelectItem value="bridge">Cross-chain Bridge</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Project Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe your project, its functionality, and any specific security concerns"
                  rows={4}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget Range</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                      <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                      <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                      <SelectItem value="50k+">$50,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timeline">Timeline</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="urgent">ASAP (1-2 weeks)</SelectItem>
                      <SelectItem value="normal">Normal (2-4 weeks)</SelectItem>
                      <SelectItem value="flexible">Flexible (1-2 months)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input id="contact-email" type="email" placeholder="your@email.com" />
              </div>
              
              <Button className="w-full" size="lg">
                <Shield className="mr-2 h-4 w-4" />
                Submit Audit Request
              </Button>
              
              <div className="text-sm text-muted-foreground text-center">
                We'll match you with qualified auditors within 24 hours
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RequestAudit;
