import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Shield, 
  Users, 
  Globe,
  Send,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    priority: 'normal'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help with your account or technical issues',
      contact: 'support@hawkly.com',
      response: 'Within 24 hours',
      color: 'text-blue-600'
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Real-time support from our security experts',
      contact: 'Available 24/7',
      response: 'Instant response',
      color: 'text-green-600'
    },
    {
      icon: Phone,
      title: 'Emergency Support',
      description: 'Critical security incidents and urgent matters',
      contact: '+1 (555) 123-4567',
      response: 'Within 2 hours',
      color: 'text-red-600'
    }
  ];

  const officeLocations = [
    {
      city: 'San Francisco',
      country: 'United States',
      address: '123 Security Street, SF, CA 94105',
      timezone: 'PST (UTC-8)',
      hours: '9:00 AM - 6:00 PM'
    },
    {
      city: 'London',
      country: 'United Kingdom',
      address: '456 Blockchain Lane, London, UK EC2A 4BX',
      timezone: 'GMT (UTC+0)',
      hours: '9:00 AM - 6:00 PM'
    },
    {
      city: 'Singapore',
      country: 'Singapore',
      address: '789 Crypto Avenue, Singapore 018956',
      timezone: 'SGT (UTC+8)',
      hours: '9:00 AM - 6:00 PM'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    toast.success('Message sent successfully! We\'ll get back to you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      company: '',
      subject: '',
      message: '',
      priority: 'normal'
    });
    setIsSubmitting(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <MessageSquare className="h-8 w-8 text-blue-600" />
          <h1 className="text-4xl font-bold">Contact Us</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Get in touch with our security experts. Whether you need technical support, 
          have questions about our services, or want to discuss a partnership, we're here to help.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Badge variant="outline" className="text-sm">
            <CheckCircle className="h-3 w-3 mr-1" />
            24/7 Support Available
          </Badge>
          <Badge variant="outline" className="text-sm">
            <Shield className="h-3 w-3 mr-1" />
            Security Experts
          </Badge>
        </div>
      </div>
      {/* Contact Methods */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contactMethods.map((method, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <method.icon className={`h-8 w-8 mx-auto mb-3 ${method.color}`} />
              <h3 className="text-lg font-semibold mb-2">{method.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{method.description}</p>
              <div className="space-y-1">
                <p className="font-medium">{method.contact}</p>
                <p className="text-xs text-muted-foreground">Response: {method.response}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Contact Form and Office Locations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              Send us a Message
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Name *</label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email *</label>
                  <Input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your.email@company.com"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Company</label>
                <Input
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  placeholder="Your company name (optional)"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Subject *</label>
                <Input
                  required
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  placeholder="Subject of your message"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Message *</label>
                <Textarea
                  required
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="How can we help you?"
                  rows={5}
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        {/* Office Locations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Our Offices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {officeLocations.map((office, idx) => (
                <div key={idx} className="border-b pb-4 last:border-b-0 last:pb-0">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="font-semibold">{office.city}, {office.country}</span>
                  </div>
                  <div className="text-sm text-muted-foreground mb-1">{office.address}</div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {office.hours} ({office.timezone})
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
