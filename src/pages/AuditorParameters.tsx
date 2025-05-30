
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { RoleBasedRoute } from '@/components/auth/RoleBasedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { 
  Settings, 
  Calendar as CalendarIcon, 
  DollarSign, 
  Target, 
  Clock,
  Award,
  Plus,
  Trash2
} from 'lucide-react';

const AuditorParameters = () => {
  const [availability, setAvailability] = useState<Date | undefined>(new Date());
  const [skills, setSkills] = useState(['Smart Contracts', 'DeFi', 'Solidity']);
  const [newSkill, setNewSkill] = useState('');
  
  const [settings, setSettings] = useState({
    hourlyRateMin: '150',
    hourlyRateMax: '300',
    maxConcurrentAudits: '3',
    autoAccept: false,
    minProjectSize: '5000',
    maxProjectSize: '100000',
    responseTimeHours: '24'
  });

  const handleSettingChange = (key: string, value: string | boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  return (
    <RoleBasedRoute allowedRoles={["auditor"]}>
      <Helmet>
        <title>Auditor Parameters | Hawkly</title>
        <meta name="description" content="Configure your auditor settings and availability" />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <div className="container py-8 max-w-6xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Auditor Parameters</h1>
              <p className="text-muted-foreground">Configure your availability, rates, and audit preferences</p>
            </div>

            <Tabs defaultValue="availability" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="availability">Availability</TabsTrigger>
                <TabsTrigger value="rates">Rates & Pricing</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              </TabsList>

              <TabsContent value="availability">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Availability Calendar</CardTitle>
                      <CardDescription>
                        Mark your available dates for new audit requests
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Calendar
                        mode="single"
                        selected={availability}
                        onSelect={setAvailability}
                        className="rounded-md border"
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Capacity Settings</CardTitle>
                      <CardDescription>
                        Configure your audit capacity and working hours
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="maxAudits">Maximum Concurrent Audits</Label>
                        <Input
                          id="maxAudits"
                          type="number"
                          value={settings.maxConcurrentAudits}
                          onChange={(e) => handleSettingChange('maxConcurrentAudits', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="responseTime">Response Time (hours)</Label>
                        <Input
                          id="responseTime"
                          type="number"
                          value={settings.responseTimeHours}
                          onChange={(e) => handleSettingChange('responseTimeHours', e.target.value)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Auto-Accept Matching Requests</h4>
                          <p className="text-sm text-muted-foreground">
                            Automatically accept requests that match your criteria
                          </p>
                        </div>
                        <Switch
                          checked={settings.autoAccept}
                          onCheckedChange={(checked) => handleSettingChange('autoAccept', checked)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="rates">
                <Card>
                  <CardHeader>
                    <CardTitle>Pricing Configuration</CardTitle>
                    <CardDescription>
                      Set your hourly rates and project size preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="minRate">Minimum Hourly Rate ($)</Label>
                        <Input
                          id="minRate"
                          type="number"
                          value={settings.hourlyRateMin}
                          onChange={(e) => handleSettingChange('hourlyRateMin', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="maxRate">Maximum Hourly Rate ($)</Label>
                        <Input
                          id="maxRate"
                          type="number"
                          value={settings.hourlyRateMax}
                          onChange={(e) => handleSettingChange('hourlyRateMax', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="minProject">Minimum Project Size ($)</Label>
                        <Input
                          id="minProject"
                          type="number"
                          value={settings.minProjectSize}
                          onChange={(e) => handleSettingChange('minProjectSize', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="maxProject">Maximum Project Size ($)</Label>
                        <Input
                          id="maxProject"
                          type="number"
                          value={settings.maxProjectSize}
                          onChange={(e) => handleSettingChange('maxProjectSize', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2">Rate Preview</h4>
                      <p className="text-sm text-muted-foreground">
                        Your hourly rate range: ${settings.hourlyRateMin} - ${settings.hourlyRateMax}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Project size range: ${settings.minProjectSize} - ${settings.maxProjectSize}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preferences">
                <Card>
                  <CardHeader>
                    <CardTitle>Audit Preferences</CardTitle>
                    <CardDescription>
                      Configure your preferred audit types and project characteristics
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label className="text-base font-medium">Preferred Blockchain Ecosystems</Label>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {['Ethereum', 'Solana', 'Polygon', 'Binance Smart Chain', 'Avalanche', 'Arbitrum'].map((blockchain) => (
                          <label key={blockchain} className="flex items-center space-x-2">
                            <input type="checkbox" defaultChecked={blockchain === 'Ethereum'} />
                            <span className="text-sm">{blockchain}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-base font-medium">Audit Types</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {['Smart Contract Audit', 'DeFi Protocol Review', 'NFT Contract Audit', 'Token Audit', 'Bridge Audit', 'DAO Audit'].map((type) => (
                          <label key={type} className="flex items-center space-x-2">
                            <input type="checkbox" defaultChecked />
                            <span className="text-sm">{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-base font-medium">Project Complexity</Label>
                      <div className="flex gap-2 mt-2">
                        {['Low', 'Medium', 'High', 'Expert'].map((level) => (
                          <label key={level} className="flex items-center space-x-2">
                            <input type="radio" name="complexity" defaultChecked={level === 'Medium'} />
                            <span className="text-sm">{level}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="skills">
                <Card>
                  <CardHeader>
                    <CardTitle>Skills & Expertise</CardTitle>
                    <CardDescription>
                      Manage your technical skills and specializations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label className="text-base font-medium">Add New Skill</Label>
                      <div className="flex gap-2 mt-2">
                        <Input
                          placeholder="Enter skill name"
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                        />
                        <Button onClick={addSkill}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label className="text-base font-medium">Current Skills</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                            {skill}
                            <button onClick={() => removeSkill(skill)}>
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-4">
                      <div>
                        <Label className="text-base font-medium">Certifications</Label>
                        <Button variant="outline" className="mt-2">
                          <Award className="mr-2 h-4 w-4" />
                          Add Certification
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="portfolio">
                <Card>
                  <CardHeader>
                    <CardTitle>Portfolio & Case Studies</CardTitle>
                    <CardDescription>
                      Showcase your previous work and achievements
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center py-8 border-2 border-dashed border-muted rounded-lg">
                      <h4 className="font-medium mb-2">No portfolio items yet</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Add case studies and examples of your audit work
                      </p>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Portfolio Item
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="mt-8 flex justify-end space-x-2">
              <Button variant="outline">Reset to Defaults</Button>
              <Button>Save All Changes</Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </RoleBasedRoute>
  );
};

export default AuditorParameters;
