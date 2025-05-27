
import React from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { FileText, Calendar, Shield, ExternalLink, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Audits = () => {
  const audits = [
    {
      id: 1,
      projectName: "DeFi Protocol X",
      auditor: "Security Expert Alpha",
      status: "Completed",
      date: "2024-01-15",
      severity: "High",
      findings: 3
    },
    {
      id: 2,
      projectName: "NFT Marketplace Y",
      auditor: "Blockchain Security Pro",
      status: "In Progress",
      date: "2024-01-20",
      severity: "Medium",
      findings: 1
    },
    {
      id: 3,
      projectName: "Cross-chain Bridge Z",
      auditor: "Smart Contract Auditor",
      status: "Completed",
      date: "2024-01-10",
      severity: "Low",
      findings: 0
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-500';
      case 'In Progress': return 'bg-blue-500';
      case 'Pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'destructive';
      case 'Medium': return 'secondary';
      case 'Low': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gradient mb-2">Security Audits</h1>
              <p className="text-muted-foreground">
                Browse completed and ongoing security audits
              </p>
            </div>
            <Button asChild>
              <Link to="/request-audit">
                <Shield className="mr-2 h-4 w-4" />
                Request Audit
              </Link>
            </Button>
          </div>
          
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search audits by project name, auditor, or findings..." 
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {audits.map((audit) => (
              <Card key={audit.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        {audit.projectName}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        Audited by {audit.auditor}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(audit.status)}>
                        {audit.status}
                      </Badge>
                      <Badge variant={getSeverityColor(audit.severity)}>
                        {audit.severity} Risk
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Date</div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(audit.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Findings</div>
                      <div className="font-semibold">{audit.findings} issues</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Status</div>
                      <div className="font-semibold">{audit.status}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Risk Level</div>
                      <div className="font-semibold">{audit.severity}</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link to={`/audit/${audit.id}`}>
                        <ExternalLink className="mr-2 h-3 w-3" />
                        View Details
                      </Link>
                    </Button>
                    {audit.status === 'Completed' && (
                      <Button variant="ghost" size="sm">
                        Download Report
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">
              Looking for a specific audit or need help finding information?
            </p>
            <Button variant="outline" asChild>
              <Link to="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Audits;
