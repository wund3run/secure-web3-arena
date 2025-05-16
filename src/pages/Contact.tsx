
import React from "react";
import { ContentPage } from "@/components/content/content-page";
import { Mail, MessageSquare, Shield, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would be connected to an actual form submission handler
    alert("Thanks for reaching out! We'll get back to you soon.");
  };

  return (
    <ContentPage 
      title="Contact Us" 
      description="Get in touch with the Hawkly Web3 Security Marketplace team."
    >
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Contact Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <p className="text-lg mb-6">
            Have questions, concerns, or feedback? Our team is here to help. Reach out using the form or contact us directly through one of our channels.
          </p>
          
          <div className="space-y-6 mt-8">
            <div className="flex items-start">
              <Mail className="h-5 w-5 text-primary mt-1 mr-3" />
              <div>
                <h3 className="font-medium">Email Us</h3>
                <p className="text-sm text-muted-foreground mb-1">For general inquiries:</p>
                <a href="mailto:info@hawkly.com" className="text-primary hover:underline">info@hawkly.com</a>
              </div>
            </div>
            
            <div className="flex items-start">
              <Shield className="h-5 w-5 text-primary mt-1 mr-3" />
              <div>
                <h3 className="font-medium">Security Support</h3>
                <p className="text-sm text-muted-foreground mb-1">For security concerns or vulnerability reports:</p>
                <a href="mailto:security@hawkly.com" className="text-primary hover:underline">security@hawkly.com</a>
              </div>
            </div>
            
            <div className="flex items-start">
              <MessageSquare className="h-5 w-5 text-primary mt-1 mr-3" />
              <div>
                <h3 className="font-medium">Community</h3>
                <p className="text-sm text-muted-foreground mb-1">Join our Discord community:</p>
                <a href="https://discord.gg/hawkly" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center">
                  discord.gg/hawkly <ArrowRight className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>
            
            <div className="flex items-start">
              <Globe className="h-5 w-5 text-primary mt-1 mr-3" />
              <div>
                <h3 className="font-medium">Social Media</h3>
                <p className="text-sm text-muted-foreground mb-1">Follow us for updates:</p>
                <div className="flex space-x-3 mt-1">
                  <a href="https://twitter.com/hawkly" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Twitter</a>
                  <a href="https://github.com/hawkly" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-card p-6 rounded-lg border border-border/40">
          <h2 className="text-xl font-semibold mb-4">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input id="name" placeholder="Full name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="your@email.com" required />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select>
                <SelectTrigger id="subject">
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Inquiry</SelectItem>
                  <SelectItem value="support">Technical Support</SelectItem>
                  <SelectItem value="auditor">Become an Auditor</SelectItem>
                  <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                  <SelectItem value="feedback">Feedback</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea 
                id="message" 
                placeholder="How can we help you?" 
                rows={5} 
                required 
              />
            </div>
            
            <Button type="submit" className="w-full">
              Send Message
            </Button>
            
            <p className="text-xs text-muted-foreground text-center mt-4">
              By submitting this form, you agree to our <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
            </p>
          </form>
        </div>
      </div>
    </ContentPage>
  );
}
