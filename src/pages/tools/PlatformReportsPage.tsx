
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Calendar } from 'lucide-react';

const PlatformReportsPage = () => {
  return (
    <StandardLayout
      title="Platform Reports | Hawkly"
      description="Comprehensive security reports and analytics"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-hawkly-gradient mb-4">
            Platform Reports
          </h1>
          <p className="text-xl text-muted-foreground">
            Access comprehensive security reports and market insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Q4 2024 Security Report",
              description: "Comprehensive analysis of Web3 security trends",
              date: "December 2024",
              type: "Quarterly",
              downloads: "2.1k"
            },
            {
              title: "DeFi Vulnerability Analysis",
              description: "In-depth study of DeFi protocol vulnerabilities",
              date: "November 2024",
              type: "Special Report",
              downloads: "1.8k"
            },
            {
              title: "Smart Contract Audit Trends",
              description: "Market analysis of audit patterns and findings",
              date: "October 2024",
              type: "Monthly",
              downloads: "1.5k"
            }
          ].map((report, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{report.type}</Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Download className="h-3 w-3" />
                    {report.downloads}
                  </div>
                </div>
                <CardTitle className="text-lg">{report.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{report.description}</p>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {report.date}
                </div>
                <Button className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </StandardLayout>
  );
};

export default PlatformReportsPage;
