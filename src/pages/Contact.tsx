
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Phone, Mail, MapPin, Clock, MessageSquare, Shield, Users, Zap } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    inquiryType: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully! We\'ll get back to you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      company: '',
      inquiryType: '',
      subject: '',
      message: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email Us",
      content: "join@hawkly.com",
      description: "Send us an email anytime"
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      description: "Mon-Fri from 9am to 6pm EST"
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Visit Us",
      content: "San Francisco, CA",
      description: "By appointment only"
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Response Time",
      content: "< 24 hours",
      description: "We respond to all inquiries quickly"
    }
  ];

  const inquiryTypes = [
    { value: 'audit', label: 'Security Audit Inquiry' },
    { value: 'partnership', label: 'Partnership Opportunity' },
    { value: 'support', label: 'Platform Support' },
    { value: 'media', label: 'Media & Press' },
    { value: 'general', label: 'General Question' },
    { value: 'other', label: 'Other' }
  ];

  const supportOptions = [
    {
      icon: <Shield className="h-8 w-8 text-blue-500" />,
      title: "Security Consultation",
      description: "Get expert advice on your Web3 security strategy",
      action: "Schedule Call"
    },
    {
      icon: <Users className="h-8 w-8 text-green-500" />,
      title: "Partnership Opportunities",
      description: "Explore collaboration and integration possibilities",
      action: "Learn More"
    },
    {
      icon: <Zap className="h-8 w-8 text-purple-500" />,
      title: "Emergency Support",
      description: "Urgent security issues require immediate attention",
      action: "Get Help Now"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us | Hawkly</title>
        <meta name="description" content="Get in touch with our security experts and support team for personalized assistance" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Contact Our Team
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get in touch with our security experts and support team for personalized assistance with your Web3 security needs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Send us a message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="company">Company/Project</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="inquiryType">Inquiry Type *</Label>
                        <Select value={formData.inquiryType} onValueChange={(value) => handleInputChange('inquiryType', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select inquiry type" />
                          </SelectTrigger>
                          <SelectContent>
                            {inquiryTypes.map(type => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        rows={6}
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Tell us about your project, security needs, or how we can help..."
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Contact Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Get in Touch</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="text-primary mt-1">
                        {info.icon}
                      </div>
                      <div>
                        <h4 className="font-medium">{info.title}</h4>
                        <p className="text-sm font-medium text-gray-900">{info.content}</p>
                        <p className="text-sm text-gray-600">{info.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Support Options */}
              <Card>
                <CardHeader>
                  <CardTitle>How We Can Help</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {supportOptions.map((option, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start gap-3">
                        {option.icon}
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{option.title}</h4>
                          <p className="text-sm text-gray-600 mb-3">{option.description}</p>
                          <Button variant="outline" size="sm">
                            {option.action}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="h-5 w-5 text-red-500" />
                    <h3 className="font-semibold text-red-900">Emergency Security Issue?</h3>
                  </div>
                  <p className="text-sm text-red-800 mb-4">
                    If you have an urgent security vulnerability or active exploit, contact us immediately.
                  </p>
                  <Button variant="destructive" size="sm" className="w-full">
                    Emergency Contact
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Link */}
          <div className="mt-16 text-center">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4">Looking for Quick Answers?</h3>
                <p className="text-gray-600 mb-6">
                  Check our comprehensive FAQ section for immediate answers to common questions about audits, pricing, and platform features.
                </p>
                <Button variant="outline" asChild>
                  <a href="/faq">Browse FAQ</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
};

export default Contact;
