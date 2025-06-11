
import React, { useState } from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calculator, 
  DollarSign, 
  Clock, 
  Shield, 
  Zap,
  CheckCircle,
  AlertCircle,
  TrendingUp
} from 'lucide-react';

const PricingCalculator = () => {
  const [contractCount, setContractCount] = useState([5]);
  const [linesOfCode, setLinesOfCode] = useState([1000]);
  const [urgency, setUrgency] = useState('standard');
  const [includeReview, setIncludeReview] = useState(true);
  const [includeTesting, setIncludeTesting] = useState(false);
  const [includeConsulting, setIncludeConsulting] = useState(false);
  const [enterprise, setEnterprise] = useState(false);

  const basePrice = 500;
  const contractMultiplier = contractCount[0] * 100;
  const codeMultiplier = Math.floor(linesOfCode[0] / 100) * 25;
  
  const urgencyMultipliers = {
    standard: 1,
    priority: 1.5,
    urgent: 2,
  };

  const urgencyMultiplier = urgencyMultipliers[urgency as keyof typeof urgencyMultipliers];
  
  const addOns = {
    review: includeReview ? 200 : 0,
    testing: includeTesting ? 300 : 0,
    consulting: includeConsulting ? 500 : 0,
  };

  const subtotal = (basePrice + contractMultiplier + codeMultiplier + Object.values(addOns).reduce((a, b) => a + b, 0)) * urgencyMultiplier;
  const enterpriseDiscount = enterprise ? subtotal * 0.15 : 0;
  const total = subtotal - enterpriseDiscount;

  const estimatedDays = Math.max(3, Math.floor(contractCount[0] * 2 + linesOfCode[0] / 500));

  const serviceFeatures = [
    {
      id: 'review',
      title: 'Code Review',
      description: 'Comprehensive manual code review by security experts',
      price: 200,
      included: includeReview,
      setIncluded: setIncludeReview,
    },
    {
      id: 'testing',
      title: 'Penetration Testing',
      description: 'Automated and manual penetration testing',
      price: 300,
      included: includeTesting,
      setIncluded: setIncludeTesting,
    },
    {
      id: 'consulting',
      title: 'Security Consulting',
      description: 'One-on-one consultation and remediation guidance',
      price: 500,
      included: includeConsulting,
      setIncluded: setIncludeConsulting,
    },
  ];

  return (
    <StandardLayout
      title="Pricing Calculator | Hawkly"
      description="Calculate the cost for your security audit"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calculator className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Pricing Calculator</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get an instant estimate for your security audit based on your project specifications
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Project Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Number of Smart Contracts: {contractCount[0]}</Label>
                  <Slider
                    value={contractCount}
                    onValueChange={setContractCount}
                    max={50}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>1 contract</span>
                    <span>50+ contracts</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Lines of Code: {linesOfCode[0].toLocaleString()}</Label>
                  <Slider
                    value={linesOfCode}
                    onValueChange={setLinesOfCode}
                    max={10000}
                    min={100}
                    step={100}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>100 lines</span>
                    <span>10,000+ lines</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Project Urgency</Label>
                  <Tabs value={urgency} onValueChange={setUrgency}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="standard">Standard</TabsTrigger>
                      <TabsTrigger value="priority">Priority</TabsTrigger>
                      <TabsTrigger value="urgent">Urgent</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-medium">Standard</div>
                      <div className="text-muted-foreground">7-14 days</div>
                      <div className="text-green-600">Base price</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">Priority</div>
                      <div className="text-muted-foreground">3-7 days</div>
                      <div className="text-yellow-600">+50%</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">Urgent</div>
                      <div className="text-muted-foreground">1-3 days</div>
                      <div className="text-red-600">+100%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Additional Services
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {serviceFeatures.map((service) => (
                  <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{service.title}</h4>
                        <Badge variant="outline">${service.price}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                    <Switch
                      checked={service.included}
                      onCheckedChange={service.setIncluded}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Enterprise Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Enterprise Package</h4>
                    <p className="text-sm text-muted-foreground">
                      Dedicated support, priority scheduling, and volume discounts
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-green-100 text-green-800">15% OFF</Badge>
                    <Switch checked={enterprise} onCheckedChange={setEnterprise} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Price Summary */}
          <div className="space-y-6">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Price Estimate
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Base audit</span>
                    <span>${basePrice}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Contracts ({contractCount[0]})</span>
                    <span>${contractMultiplier}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Code complexity</span>
                    <span>${codeMultiplier}</span>
                  </div>
                  {Object.entries(addOns).map(([key, value]) => {
                    if (value > 0) {
                      return (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="capitalize">{key}</span>
                          <span>${value}</span>
                        </div>
                      );
                    }
                    return null;
                  })}
                  {urgencyMultiplier > 1 && (
                    <div className="flex justify-between text-sm text-yellow-600">
                      <span>Urgency multiplier</span>
                      <span>×{urgencyMultiplier}</span>
                    </div>
                  )}
                  {enterprise && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Enterprise discount</span>
                      <span>-${enterpriseDiscount.toFixed(0)}</span>
                    </div>
                  )}
                </div>
                
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total</span>
                    <span className="text-2xl font-bold text-primary">
                      ${total.toFixed(0)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Estimated delivery: {estimatedDays} days</span>
                </div>

                <Button className="w-full" size="lg">
                  Request Quote
                </Button>

                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span>Fixed price guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span>Money-back guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span>24/7 support included</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Not sure about your requirements? Our experts can help you determine the right package.
                </p>
                <Button variant="outline" className="w-full" size="sm">
                  Schedule Consultation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </StandardLayout>
  );
};

export default PricingCalculator;
