
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MessageCircle, Phone, MapPin } from 'lucide-react';

const ContactPage = () => {
  return (
    <StandardLayout
      title="Contact Us | Hawkly"
      description="Get in touch with the Hawkly team for support, partnerships, or inquiries"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-hawkly-gradient mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have questions about our services? Need a custom security solution? 
            We're here to help secure your Web3 project.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">First Name</label>
                  <Input placeholder="John" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Last Name</label>
                  <Input placeholder="Doe" />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Email</label>
                <Input type="email" placeholder="john@example.com" />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Company</label>
                <Input placeholder="Your Company" />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Subject</label>
                <Input placeholder="How can we help?" />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Message</label>
                <Textarea 
                  placeholder="Tell us about your project and security needs..."
                  className="min-h-32"
                />
              </div>
              
              <Button className="w-full bg-hawkly-primary hover:bg-hawkly-primary/90">
                Send Message
              </Button>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-hawkly-primary/10 rounded-full flex items-center justify-center">
                    <Mail className="h-5 w-5 text-hawkly-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-muted-foreground">hello@hawkly.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-hawkly-primary/10 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-hawkly-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Discord</h3>
                    <p className="text-muted-foreground">Join our community server</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-hawkly-primary/10 rounded-full flex items-center justify-center">
                    <Phone className="h-5 w-5 text-hawkly-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-hawkly-primary/10 rounded-full flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-hawkly-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Office</h3>
                    <p className="text-muted-foreground">San Francisco, CA</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">For Project Owners</h3>
                  <p className="text-muted-foreground text-sm mb-2">
                    Need a security audit for your project?
                  </p>
                  <Button variant="outline" size="sm">Request Audit</Button>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">For Security Experts</h3>
                  <p className="text-muted-foreground text-sm mb-2">
                    Join our network of security professionals.
                  </p>
                  <Button variant="outline" size="sm">Apply as Auditor</Button>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">For Partnerships</h3>
                  <p className="text-muted-foreground text-sm mb-2">
                    Interested in partnering with Hawkly?
                  </p>
                  <Button variant="outline" size="sm">Partner with Us</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </StandardLayout>
  );
};

export default ContactPage;
