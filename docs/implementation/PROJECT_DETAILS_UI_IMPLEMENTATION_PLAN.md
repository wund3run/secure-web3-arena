# ProjectDetails.tsx UI Implementation Plan

**Page:** ProjectDetails.tsx  
**Priority:** High (Tier 1 - Service Pages)  
**Target Completion Date:** August 12, 2025

## Current Analysis

The current `ProjectDetails.tsx` page is a complex project details page that includes:

1. Project header with name, description, and owner
2. Key details (budget, timeline, applications, blockchain)
3. Required expertise badges
4. Content tabs (overview, documents, timeline, applications)
5. Sidebar with application options and competition analysis
6. Loading state and error state handling

This page is more data-focused than the other service pages we've updated, so we'll need to carefully integrate Hawkly UI components while maintaining the functionality.

## Implementation Plan

### 1. Import Hawkly UI Components

```tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Star, Clock, DollarSign, Users, FileText, MessageCircle, Heart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { ApplicationForm } from '@/components/project/ApplicationForm';
import { ProjectDocuments } from '@/components/project/ProjectDocuments';
import { ProjectTimeline } from '@/components/project/ProjectTimeline';
import { HawklyCard, SecurityBadge, ProgressIndicator } from '@/components/ui/hawkly-components';
```

### 2. Main Container Updates

```tsx
<div className="min-h-screen bg-[#0a0d16]">
  <Navbar />
  <main className="py-8">
    <div className="container mx-auto px-4">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        onClick={() => navigate('/marketplace')}
        className="mb-6 text-gray-300 hover:text-white hover:bg-[#23283e]/50"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Marketplace
      </Button>
      
      {/* Rest of the content */}
    </div>
  </main>
  <Footer />
</div>
```

### 3. Loading State Updates

```tsx
if (loading) {
  return (
    <div className="min-h-screen bg-[#0a0d16]">
      <Navbar />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-[#23283e]/50 rounded w-1/3"></div>
            <div className="h-32 bg-[#23283e]/50 rounded"></div>
            <div className="h-64 bg-[#23283e]/50 rounded"></div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
```

### 4. Project Header Updates

```tsx
{/* Project Header */}
<HawklyCard variant="glass" elevation="subtle" className="border-[rgba(168,121,239,0.08)]">
  <CardHeader>
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-2">
          <CardTitle className="text-2xl text-white">{project.project_name}</CardTitle>
          {project.urgency_level && (
            <Badge variant="outline" className="border-red-400 text-red-400 bg-red-900/10">
              {project.urgency_level} Priority
            </Badge>
          )}
        </div>
        <p className="text-gray-300">{project.project_description}</p>
      </div>
      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-[#23283e]/50">
        <Heart className="h-4 w-4" />
      </Button>
    </div>
  </CardHeader>
  <CardContent>
    {/* Project Owner */}
    <div className="flex items-center space-x-3 mb-6">
      <Avatar className="h-10 w-10 border-2 border-[#23283e]">
        <AvatarImage src={project.profiles?.avatar_url} />
        <AvatarFallback className="bg-gradient-to-br from-[#a879ef] to-[#32d9fa] text-white">
          {project.profiles?.full_name?.charAt(0) || 'U'}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="font-semibold text-white">{project.profiles?.full_name || 'Anonymous'}</p>
        <div className="flex items-center space-x-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm text-gray-400">4.8 (23 reviews)</span>
        </div>
      </div>
    </div>

    {/* Key Details */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="text-center p-3 bg-[#23283e]/50 rounded-xl">
        <DollarSign className="h-5 w-5 mx-auto mb-1 text-green-400" />
        <p className="text-sm font-semibold text-white">{project.budget ? `$${project.budget.toLocaleString()}` : 'TBD'}</p>
        <p className="text-xs text-gray-400">Budget</p>
      </div>
      {/* Other key details similarly styled */}
    </div>

    {/* Required Expertise */}
    {project.required_expertise && project.required_expertise.length > 0 && (
      <div className="mb-6">
        <h4 className="font-semibold mb-2 text-white">Required Expertise</h4>
        <div className="flex flex-wrap gap-2">
          {project.required_expertise.map((skill: string) => (
            <Badge key={skill} variant="outline" className="bg-[#212842]/60 text-[#a879ef] border-[#a879ef]/20">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    )}
  </CardContent>
</HawklyCard>
```

### 5. Tabs Section Updates

```tsx
{/* Tabs */}
<Tabs defaultValue="overview" className="space-y-4">
  <TabsList className="grid w-full grid-cols-4 bg-[#1e2332] border border-[#23283e]">
    <TabsTrigger 
      value="overview" 
      className="data-[state=active]:bg-[#23283e] data-[state=active]:text-white text-gray-400"
    >
      Overview
    </TabsTrigger>
    <TabsTrigger 
      value="documents"
      className="data-[state=active]:bg-[#23283e] data-[state=active]:text-white text-gray-400"
    >
      Documents
    </TabsTrigger>
    <TabsTrigger 
      value="timeline"
      className="data-[state=active]:bg-[#23283e] data-[state=active]:text-white text-gray-400"
    >
      Timeline
    </TabsTrigger>
    <TabsTrigger 
      value="applications"
      className="data-[state=active]:bg-[#23283e] data-[state=active]:text-white text-gray-400"
    >
      Applications
    </TabsTrigger>
  </TabsList>

  <TabsContent value="overview" className="space-y-4">
    <HawklyCard variant="glass" elevation="subtle">
      <CardHeader>
        <CardTitle className="text-white">Project Scope</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300">{project.audit_scope || 'Full security audit of smart contracts and protocol architecture.'}</p>
      </CardContent>
    </HawklyCard>

    <HawklyCard variant="glass" elevation="subtle">
      <CardHeader>
        <CardTitle className="text-white">Additional Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2 text-white">Communication Preference</h4>
          <p className="text-gray-300">{project.communication_preference || 'Regular updates via Slack/Discord'}</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-white">Special Requirements</h4>
          <p className="text-gray-300">{project.special_requirements || 'None specified'}</p>
        </div>
      </CardContent>
    </HawklyCard>
  </TabsContent>

  {/* Other tabs similar styling */}
</Tabs>
```

### 6. Sidebar Updates

```tsx
{/* Sidebar */}
<div className="space-y-6">
  {/* Apply Card */}
  <HawklyCard variant="highlighted" elevation="subtle" glow={true} className="border-[#a879ef]/20">
    <CardHeader>
      <CardTitle className="text-white">Apply for This Project</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="text-center">
        <p className="text-2xl font-bold text-green-400">92% Match</p>
        <p className="text-sm text-gray-300">Based on your profile</p>
      </div>
      
      <Button 
        className="w-full bg-gradient-to-r from-[#a879ef] to-[#32d9fa] hover:from-[#9a6adf] hover:to-[#25c9ea] border-none" 
        size="lg"
        onClick={() => setShowApplicationForm(true)}
      >
        Submit Application
      </Button>
      
      <Button variant="outline" className="w-full border-gray-500 text-gray-300 hover:text-white hover:bg-[#23283e]/50">
        <MessageCircle className="h-4 w-4 mr-2" />
        Message Owner
      </Button>
    </CardContent>
  </HawklyCard>

  {/* Competition Stats */}
  <HawklyCard variant="glass" elevation="subtle">
    <CardHeader>
      <CardTitle className="text-sm text-white">Competition Analysis</CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      <div className="flex justify-between text-sm">
        <span className="text-gray-300">Applications</span>
        <span className="font-semibold text-white">8</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-300">Avg. Rate</span>
        <span className="font-semibold text-white">$145/hr</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-300">Your Rate</span>
        <span className="font-semibold text-green-400">$150/hr</span>
      </div>
      <div className="pt-2 border-t border-[#23283e]">
        <p className="text-xs text-gray-400">
          You're competitive for this project
        </p>
      </div>
    </CardContent>
  </HawklyCard>
</div>
```

### 7. Application Form Modal Updates

The ApplicationForm component would need its own update, but for now we can mention it in the implementation:

```tsx
{/* Application Form Modal */}
{showApplicationForm && (
  <ApplicationForm
    projectId={project.id}
    onClose={() => setShowApplicationForm(false)}
  />
)}
```

## Design Considerations

1. **Color Palette:**
   - Use the standard Hawkly dark background (#0a0d16)
   - Incorporate purple to cyan gradients for primary elements
   - Use subtle glass effects for cards
   - Add appropriate glow effects to highlighted elements

2. **Component Updates:**
   - Replace all standard Card components with HawklyCard variants
   - Update Badge styling to match Hawkly design
   - Add appropriate background gradients to key UI elements

3. **Typography & Readability:**
   - Update text colors to ensure high contrast and readability
   - White (#FFFFFF) for headings and important text
   - Gray-300 (#D1D5DB) for most body text
   - Gray-400 (#9CA3AF) for secondary/supporting text

## Implementation Phases

1. **Structure & Imports (30 mins)**
   - Update imports to include Hawkly components
   - Modify the page container background

2. **Loading & Error States (30 mins)**
   - Update loading state styling
   - Update error state styling

3. **Project Header & Details (1 hour)**
   - Convert project header to HawklyCard
   - Update key details section styling
   - Update project owner profile styling

4. **Tabs & Content (1.5 hours)**
   - Update tabs styling to match Hawkly design
   - Convert all content cards to HawklyCard variants
   - Update content text colors and spacing

5. **Sidebar (1 hour)**
   - Convert sidebar cards to HawklyCard variants
   - Update application buttons with gradient styling
   - Enhance competition stats styling

**Total Estimated Time:** 4 hours

## Testing Checklist

- [ ] Test with real project data
- [ ] Verify all tabs function correctly
- [ ] Check loading state appearance
- [ ] Test error state appearance
- [ ] Verify responsiveness on mobile
- [ ] Test application form modal opens correctly

## Next Steps After Implementation

1. Update `HAWKLY_UI_OVERHAUL_IMPLEMENTATION_TRACKING.md`
2. Update service pages completion from 42% to 50%
3. Update overall completion percentage
4. Create PR for review
5. Consider updating the related components like ApplicationForm, ProjectDocuments, and ProjectTimeline in future iterations
