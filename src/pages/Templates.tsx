
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ContentPage } from '@/components/content/content-page';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDown, FileText, FileCheck, FileLock, FilePlus, CheckCircle } from "lucide-react";

const Templates = () => {
  const templateCategories = [
    {
      title: "Audit Request Templates",
      description: "Standardized formats for requesting security audits with the right level of detail",
      templates: [
        {
          title: "Basic Audit Request",
          description: "Essential template for small-scale projects and single contracts",
          format: "PDF, DOCX",
          recommended: false
        },
        {
          title: "Comprehensive Audit Request",
          description: "Detailed template for complex protocols with multiple contracts",
          format: "PDF, DOCX",
          recommended: true
        },
        {
          title: "DeFi Protocol Audit Request",
          description: "Specialized template for DeFi projects with lending, borrowing or AMM components",
          format: "PDF, DOCX",
          recommended: false
        }
      ]
    },
    {
      title: "Security Requirement Documents",
      description: "Templates to clearly define security requirements and standards for your project",
      templates: [
        {
          title: "Basic Security Requirements",
          description: "Fundamental security requirements checklist for blockchain projects",
          format: "PDF, DOCX",
          recommended: false
        },
        {
          title: "Advanced Security Requirements",
          description: "Comprehensive requirements document for enterprise-grade applications",
          format: "PDF, DOCX",
          recommended: true
        },
        {
          title: "Compliance-Focused Requirements",
          description: "Requirements template focusing on regulatory compliance aspects",
          format: "PDF, DOCX",
          recommended: false
        }
      ]
    },
    {
      title: "Audit Report Templates",
      description: "Professional formats for security auditors to document findings and recommendations",
      templates: [
        {
          title: "Standard Audit Report",
          description: "Professional template for documenting audit findings and recommendations",
          format: "PDF, DOCX",
          recommended: true
        },
        {
          title: "Executive Summary Report",
          description: "Condensed report format for management and stakeholder review",
          format: "PDF, DOCX",
          recommended: false
        },
        {
          title: "Technical Audit Report",
          description: "Detailed technical report with code examples and in-depth analysis",
          format: "PDF, DOCX",
          recommended: false
        }
      ]
    },
    {
      title: "Verification Checklists",
      description: "Templates for verifying that security issues have been properly addressed",
      templates: [
        {
          title: "Fix Verification Checklist",
          description: "Systematic checklist for verifying vulnerability fixes",
          format: "PDF, DOCX",
          recommended: true
        },
        {
          title: "Pre-Deployment Security Checklist",
          description: "Final security checks before deploying to production",
          format: "PDF, DOCX",
          recommended: false
        },
        {
          title: "Ongoing Monitoring Checklist",
          description: "Checklist for continuous security monitoring after deployment",
          format: "PDF, DOCX",
          recommended: false
        }
      ]
    }
  ];

  return (
    <ContentPage 
      title="Audit Templates" 
      description="Download professional templates for audit requests, security requirements, reports, and verification checklists."
    >
      <h1>Audit Templates</h1>
      
      <p className="text-muted-foreground text-lg mb-8">
        Standardize your security processes with our professional templates. These documents help ensure 
        clarity, thoroughness, and consistency throughout the audit process.
      </p>
      
      {templateCategories.map((category, index) => (
        <div key={index} className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              {index === 0 ? <FilePlus className="h-5 w-5 text-primary" /> : 
               index === 1 ? <FileLock className="h-5 w-5 text-primary" /> : 
               index === 2 ? <FileCheck className="h-5 w-5 text-primary" /> : 
               <CheckCircle className="h-5 w-5 text-primary" />}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{category.title}</h2>
              <p className="text-muted-foreground">{category.description}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {category.templates.map((template, i) => (
              <Card key={i} className={template.recommended ? "border-primary/50" : ""}>
                {template.recommended && (
                  <div className="bg-primary text-primary-foreground text-xs px-3 py-1 absolute right-4 top-4 rounded-full">
                    Recommended
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{template.title}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Available formats: {template.format}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <FileDown className="mr-2 h-4 w-4" />
                    Download Template
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ))}
      
      <div className="mt-8 p-6 bg-muted/40 rounded-lg border border-border/40">
        <h3 className="text-lg font-medium mb-2">Need a Custom Template?</h3>
        <p className="mb-4">
          If you need a specialized template for your unique project requirements, our team can help create 
          custom documentation tailored to your specific needs.
        </p>
        <Button asChild variant="outline">
          <a href="/contact">Request Custom Template</a>
        </Button>
      </div>
    </ContentPage>
  );
};

export default Templates;
