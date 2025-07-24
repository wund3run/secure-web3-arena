import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, Clock, MapPin, Send } from 'lucide-react';
import { toast } from 'sonner';

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  serviceType: string;
  projectDescription: string;
  budget: string;
  timeline: string;
  urgency: string;
  agreedToTerms: boolean;
}

export function EnhancedContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    serviceType: '',
    projectDescription: '',
    budget: '',
    timeline: '',
    urgency: 'standard',
    agreedToTerms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [K in keyof ContactFormData]?: string }>({});

  const handleInputChange = (field: keyof ContactFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const newErrors: { [K in keyof ContactFormData]?: string } = {};
    if (!formData.name) newErrors.name = 'Full name is required.';
    if (!formData.email) newErrors.email = 'Email is required.';
    if (!formData.serviceType) newErrors.serviceType = 'Please select a service type.';
    if (!formData.projectDescription) newErrors.projectDescription = 'Project description is required.';
    if (!formData.agreedToTerms) newErrors.agreedToTerms = 'You must agree to the terms.';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      toast.error('Please fix the errors before submitting.');
      return;
    }
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Thank you! We\'ll get back to you within 24 hours.');
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        serviceType: '',
        projectDescription: '',
        budget: '',
        timeline: '',
        urgency: 'standard',
        agreedToTerms: false
      });
    } catch (error) {
      toast.error('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-[2rem]">
      {/* Contact Form */}
      <div className="lg:col-span-2">
        <Card className="bg-[rgba(24,31,47,0.58)] backdrop-blur-[20px] border border-[rgba(168,121,239,0.08)] rounded-[1.15rem] p-[2rem]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[1.6rem] font-bold text-[#a879ef]">
              <Send className="h-5 w-5 text-[#32d9fa]" />
              Get Your Security Audit Quote
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-[1.5rem]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[1rem]">
                <div>
                  <label className="text-[1rem] font-medium mb-[0.5rem] block text-[#f8f9fb]">Full Name *</label>
                  <Input
                    placeholder="John Smith"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                    className={errors.name ? 'border-[#fc3574]' : ''}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-[0.95rem] text-[#fc3574] mt-[0.3rem]" role="alert">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="text-[1rem] font-medium mb-[0.5rem] block text-[#f8f9fb]">Email *</label>
                  <Input
                    type="email"
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    className={errors.email ? 'border-[#fc3574]' : ''}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-[0.95rem] text-[#fc3574] mt-[0.3rem]" role="alert">{errors.email}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[1rem]">
                <div>
                  <label className="text-[1rem] font-medium mb-[0.5rem] block text-[#f8f9fb]">Company</label>
                  <Input
                    placeholder="Your Company Name"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-[1rem] font-medium mb-[0.5rem] block text-[#f8f9fb]">Phone</label>
                  <Input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="text-[1rem] font-medium mb-[0.5rem] block text-[#f8f9fb]">Service Type *</label>
                <Select value={formData.serviceType} onValueChange={(value) => handleInputChange('serviceType', value)}>
                  <SelectTrigger className={errors.serviceType ? 'border-[#fc3574]' : ''} aria-invalid={!!errors.serviceType} aria-describedby={errors.serviceType ? 'serviceType-error' : undefined}>
                    <SelectValue placeholder="Select the service you need" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="smart-contract-audit">Smart Contract Audit</SelectItem>
                    <SelectItem value="defi-protocol-audit">DeFi Protocol Audit</SelectItem>
                    <SelectItem value="enterprise-security">Enterprise Security Suite</SelectItem>
                    <SelectItem value="penetration-testing">Penetration Testing</SelectItem>
                    <SelectItem value="code-review">Code Review</SelectItem>
                    <SelectItem value="consulting">Security Consulting</SelectItem>
                    <SelectItem value="custom">Custom Solution</SelectItem>
                  </SelectContent>
                </Select>
                {errors.serviceType && (
                  <p id="serviceType-error" className="text-[0.95rem] text-[#fc3574] mt-[0.3rem]" role="alert">{errors.serviceType}</p>
                )}
              </div>
              <div>
                <label className="text-[1rem] font-medium mb-[0.5rem] block text-[#f8f9fb]">Project Description *</label>
                <Textarea
                  placeholder="Tell us about your project, the blockchain you're using, number of contracts, and any specific security concerns..."
                  className={errors.projectDescription ? 'border-[#fc3574] min-h-24' : 'min-h-24'}
                  value={formData.projectDescription}
                  onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                  required
                  aria-invalid={!!errors.projectDescription}
                  aria-describedby={errors.projectDescription ? 'projectDescription-error' : undefined}
                />
                {errors.projectDescription && (
                  <p id="projectDescription-error" className="text-[0.95rem] text-[#fc3574] mt-[0.3rem]" role="alert">{errors.projectDescription}</p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[1rem]">
                <div>
                  <label className="text-[1rem] font-medium mb-[0.5rem] block text-[#f8f9fb]">Budget Range</label>
                  <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-500k">Under ₹5,00,000</SelectItem>
                      <SelectItem value="500k-1m">₹5,00,000 - ₹10,00,000</SelectItem>
                      <SelectItem value="1m-2m">₹10,00,000 - ₹20,00,000</SelectItem>
                      <SelectItem value="2m-5m">₹20,00,000 - ₹50,00,000</SelectItem>
                      <SelectItem value="above-5m">Above ₹50,00,000</SelectItem>
                      <SelectItem value="discuss">Let's Discuss</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-[1rem] font-medium mb-[0.5rem] block text-[#f8f9fb]">Timeline</label>
                  <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="When do you need this completed?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asap">ASAP (Rush Order)</SelectItem>
                      <SelectItem value="1-2-weeks">1-2 weeks</SelectItem>
                      <SelectItem value="2-4-weeks">2-4 weeks</SelectItem>
                      <SelectItem value="1-2-months">1-2 months</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreedToTerms}
                  onCheckedChange={(checked) => handleInputChange('agreedToTerms', checked as boolean)}
                  aria-invalid={!!errors.agreedToTerms}
                  aria-describedby={errors.agreedToTerms ? 'terms-error' : undefined}
                />
                <label htmlFor="terms" className="text-[1rem] text-[#f8f9fb]">
                  I agree to the <a href="/terms" className="text-[#a879ef] hover:underline">Terms of Service</a> and{' '}
                  <a href="/privacy" className="text-[#a879ef] hover:underline">Privacy Policy</a>
                </label>
              </div>
              {errors.agreedToTerms && (
                <p id="terms-error" className="text-[0.95rem] text-[#fc3574] mt-[0.3rem]" role="alert">{errors.agreedToTerms}</p>
              )}
              <Button type="submit" className="w-full mt-[0.5rem]" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Get My Quote'}
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Contact Information */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm text-muted-foreground">security@hawkly.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-sm text-muted-foreground">+91 98765 43210</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Business Hours</p>
                <p className="text-sm text-muted-foreground">Mon-Fri: 9 AM - 6 PM IST</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Location</p>
                <p className="text-sm text-muted-foreground">Bangalore, India</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">General Inquiries</span>
                <Badge variant="secondary">24 hours</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Security Quotes</span>
                <Badge variant="secondary">4-6 hours</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Emergency Support</span>
                <Badge variant="destructive">1 hour</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
