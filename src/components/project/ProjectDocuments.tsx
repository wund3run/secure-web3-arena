
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, ExternalLink, Lock } from 'lucide-react';

interface ProjectDocumentsProps {
  projectId: string;
}

export function ProjectDocuments({ projectId }: ProjectDocumentsProps) {
  const documents = [
    {
      name: 'Technical Specification',
      type: 'PDF',
      size: '2.3 MB',
      isPublic: true,
      description: 'Detailed technical requirements and architecture overview'
    },
    {
      name: 'Smart Contract Code',
      type: 'ZIP',
      size: '1.8 MB',
      isPublic: false,
      description: 'Source code repository with all smart contracts'
    },
    {
      name: 'API Documentation',
      type: 'PDF',
      size: '890 KB',
      isPublic: true,
      description: 'Complete API endpoints and integration guide'
    },
    {
      name: 'Previous Audit Report',
      type: 'PDF',
      size: '1.2 MB',
      isPublic: false,
      description: 'Last security audit conducted 6 months ago'
    }
  ];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Project Documents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {documents.map((doc, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-muted rounded">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold">{doc.name}</h4>
                    {!doc.isPublic && <Lock className="h-4 w-4 text-muted-foreground" />}
                  </div>
                  <p className="text-sm text-muted-foreground">{doc.description}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {doc.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{doc.size}</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                {doc.isPublic ? (
                  <>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <Button size="sm" variant="outline" disabled>
                    <Lock className="h-4 w-4 mr-2" />
                    Apply to Access
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Document Access Policy</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <p>
            Some documents are restricted to approved applicants only. 
            Submit your application to gain access to all project materials.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
