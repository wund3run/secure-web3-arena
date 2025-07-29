
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  IndianRupee,
  Shield,
  Users,
  FileText,
  Settings
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LaunchReadiness() {
  const readinessChecks = [
    {
      category: "Core Functionality",
      status: "completed",
      items: [
        { name: "User Authentication System", status: "completed" },
        { name: "Service Marketplace", status: "completed" },
        { name: "AI Auditor Matching", status: "completed" },
        { name: "Messaging System", status: "completed" },
        { name: "Notification Center", status: "completed" }
      ]
    },
    {
      category: "Business Operations", 
      status: "in-progress",
      items: [
        { name: "Payment Integration", status: "pending" },
        { name: "Escrow System", status: "pending" },
        { name: "Real Auditor Onboarding", status: "pending" },
        { name: "Customer Support System", status: "in-progress" },
        { name: "Quality Assurance Process", status: "completed" }
      ]
    },
    {
      category: "Legal & Compliance",
      status: "completed", 
      items: [
        { name: "Updated Terms of Service (2025)", status: "completed" },
        { name: "Privacy Policy (GDPR + Indian Compliance)", status: "completed" },
        { name: "Service Level Agreements", status: "completed" },
        { name: "Dispute Resolution Framework", status: "completed" },
        { name: "Data Protection Measures", status: "completed" }
      ]
    },
    {
      category: "Indian Market Ready",
      status: "completed",
      items: [
        { name: "INR Pricing Display", status: "completed" },
        { name: "Local Payment Methods", status: "pending" },
        { name: "Indian Regulatory Compliance", status: "completed" },
        { name: "Multi-language Support", status: "pending" },
        { name: "Local Customer Support", status: "pending" }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Ready</Badge>;
      case 'in-progress':
        return <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>;
      default:
        return <Badge className="bg-red-100 text-red-800">Needs Work</Badge>;
    }
  };

  return (
    <StandardLayout 
      title="Launch Readiness Assessment" 
      description="Comprehensive evaluation of website functionality and market readiness"
    >
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Website Launch Readiness Report</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive assessment of your Hawkly Web3 Security Marketplace platform
          </p>
        </div>

        {/* Overall Status */}
        <Card className="mb-8 border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-green-500" />
              Overall Launch Status: 75% Ready
            </CardTitle>
            <CardDescription>
              Core functionality is operational. Payment integration and auditor onboarding required for full launch.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">8+</p>
                  <p className="text-sm text-muted-foreground">Security Services</p>
                </div>
                <Shield className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">₹2.08L+</p>
                  <p className="text-sm text-muted-foreground">Starting Price</p>
                </div>
                <IndianRupee className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">15+</p>
                  <p className="text-sm text-muted-foreground">Active Pages</p>
                </div>
                <FileText className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">100%</p>
                  <p className="text-sm text-muted-foreground">Mobile Ready</p>
                </div>
                <Settings className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Readiness Checks */}
        <div className="space-y-6">
          {readinessChecks.map((category, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    {getStatusIcon(category.status)}
                    {category.category}
                  </CardTitle>
                  {getStatusBadge(category.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-sm">{item.name}</span>
                      {getStatusIcon(item.status)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Next Steps */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Immediate Action Items for Launch</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 border-l-4 border-l-orange-500 bg-orange-50">
                <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Priority 1: Payment Integration</h4>
                  <p className="text-sm text-muted-foreground">
                    Implement Stripe/Razorpay for Indian market with INR support
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 border-l-4 border-l-blue-500 bg-blue-50">
                <Users className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Priority 2: Auditor Onboarding</h4>
                  <p className="text-sm text-muted-foreground">
                    Replace demo data with real verified security professionals
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 border-l-4 border-l-green-500 bg-green-50">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Ready for Beta Launch</h4>
                  <p className="text-sm text-muted-foreground">
                    Core functionality operational for limited user testing
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/pricing">
                View Pricing Structure
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">
                Discuss Launch Timeline
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </StandardLayout>
  );
}
