import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Mail, MessageSquare, MapPin, Clock, Globe, ArrowRight, Shield, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const Contact = () => {
  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the form data to a backend
    toast.success("Message sent successfully!", {
      description: "We'll get back to you as soon as possible.",
    });
    // Reset form
    (e.target as HTMLFormElement).reset();
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Hawkly</title>
        <meta name="description" content="Get in touch with the Hawkly team for any questions about our Web3 security services." />
      </Helmet>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-white via-primary/5 to-secondary/5 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-4">
              <div className="p-3 bg-primary/20 rounded-full">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions about our Web3 security services? We're here to help.
              Get in touch with our team for inquiries about audits, security assessments, or partnership opportunities.
            </p>
            {/* Direct Email Link - Prominently Displayed */}
            <div className="mt-6 inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary/15 transition-colors">
              <Mail className="h-5 w-5 mr-2" />
              <a 
                href="mailto:join@hawkly.com" 
                className="text-lg font-medium hover:underline"
              >
                join@hawkly.com
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Form */}
            <div className="lg:col-span-2 bg-card border border-border/40 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                    <Input id="name" placeholder="Your name" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input id="email" type="email" placeholder="your-email@example.com" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                  <Input id="subject" placeholder="What is this regarding?" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <Textarea 
                    id="message" 
                    placeholder="Please provide details about your inquiry..." 
                    className="min-h-[150px]"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <Button type="submit" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                    Send Message
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>

            {/* Contact Information */}
            <div className="bg-card border border-border/40 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mt-1 mr-3 bg-primary/10 p-2 rounded-full">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <a 
                      href="mailto:join@hawkly.com" 
                      className="text-primary hover:underline font-medium"
                    >
                      join@hawkly.com
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">
                      We respond within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-1 mr-3 bg-secondary/10 p-2 rounded-full">
                    <Globe className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium">Global Service</p>
                    <p className="text-muted-foreground">
                      Serving Web3 projects worldwide
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-1 mr-3 bg-muted p-2 rounded-full">
                    <Clock className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">Business Hours</p>
                    <p className="text-muted-foreground">
                      Monday - Friday: 24/7<br />
                      Saturday - Sunday: 24/7
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Our international team works across all time zones
                    </p>
                  </div>
                </div>
              </div>

              {/* Request an Audit CTA */}
              <div className="mt-8 pt-6 border-t border-border/30">
                <h3 className="font-bold mb-3">Need a Security Audit?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our AI-powered system will match you with the perfect security experts for your project.
                </p>
                <Link to="/request-audit">
                  <Button className="w-full bg-gradient-to-r from-[#9b87f5] to-[#33C3F0] hover:opacity-90">
                    <FileText className="mr-2 h-4 w-4" />
                    Request an Audit
                  </Button>
                </Link>
              </div>

              <div className="mt-8 pt-6 border-t border-border/30">
                <div className="flex items-center mb-4">
                  <Shield className="h-5 w-5 text-primary mr-2" />
                  <h3 className="font-bold">Security First</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  As a security company, we take your privacy seriously. All communications are encrypted and handled with the utmost confidentiality.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-muted/30 rounded-xl p-8 mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-background rounded-lg p-5 border border-border/40">
                <h3 className="font-bold mb-2">How quickly can I get an audit?</h3>
                <p className="text-sm text-muted-foreground">
                  Timing depends on project complexity and our current queue. Contact us for a specific timeline for your project.
                </p>
              </div>
              <div className="bg-background rounded-lg p-5 border border-border/40">
                <h3 className="font-bold mb-2">What information do I need to provide for an audit?</h3>
                <p className="text-sm text-muted-foreground">
                  Your contract code, documentation, and any specific areas of concern. We'll guide you through the process.
                </p>
              </div>
              <div className="bg-background rounded-lg p-5 border border-border/40">
                <h3 className="font-bold mb-2">Do you offer continuous monitoring?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes, we provide ongoing security monitoring services to help protect your project as it evolves.
                </p>
              </div>
              <div className="bg-background rounded-lg p-5 border border-border/40">
                <h3 className="font-bold mb-2">How do I become a security provider?</h3>
                <p className="text-sm text-muted-foreground">
                  Security experts interested in joining our marketplace can apply through our website or send their credentials via email.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Secure Your Web3 Project?</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Don't wait for vulnerabilities to be exploited. Connect with top security experts today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/request-audit">
                <Button size="lg" className="bg-gradient-to-r from-[#9b87f5] to-[#33C3F0] hover:opacity-90">
                  Request an Audit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
                View Security Services
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
