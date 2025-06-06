
import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, DollarSign, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const AuditDetail = () => {
  const { id } = useParams();

  return (
    <>
      <Helmet>
        <title>Audit Details | Hawkly</title>
        <meta name="description" content="View detailed information about this security audit" />
      </Helmet>
      
      <StandardLayout
        title={`Audit #${id}`}
        description="Detailed audit information and progress"
      >
        <div className="container py-8">
          <div className="mb-6">
            <Button variant="ghost" asChild className="mb-4">
              <Link to="/audits">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Audits
              </Link>
            </Button>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Smart Contract Security Audit</CardTitle>
                    <CardDescription>Comprehensive security review and vulnerability assessment</CardDescription>
                  </div>
                  <Badge variant="outline">In Progress</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Auditor: SecureCode Labs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Due: Dec 15, 2024</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Budget: $5,000</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Audit Progress</CardTitle>
                <CardDescription>Current status and timeline</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Overall Progress</span>
                    <span className="font-medium">65%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Description</h4>
                    <p className="text-sm text-muted-foreground">
                      DeFi protocol with lending and borrowing capabilities. Requires comprehensive security audit
                      before mainnet deployment.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Blockchain</h4>
                    <Badge variant="secondary">Ethereum</Badge>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Contract Count</h4>
                    <span className="text-sm">12 contracts</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </StandardLayout>
    </>
  );
};

export default AuditDetail;
