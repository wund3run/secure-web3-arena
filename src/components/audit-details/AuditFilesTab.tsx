
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { FileText, Download, Upload, Search, Filter, Eye, Calendar, User } from 'lucide-react';

interface AuditFilesTabProps {
  auditData: any;
}

export const AuditFilesTab = ({ auditData }: AuditFilesTabProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const files = [
    {
      id: 1,
      name: 'Smart Contract Code.zip',
      type: 'source-code',
      size: '2.4 MB',
      uploadedBy: 'Sarah Kim',
      uploadedAt: '2023-05-15',
      status: 'reviewed',
      category: 'Source Code'
    },
    {
      id: 2,
      name: 'Architecture Documentation.pdf',
      type: 'documentation',
      size: '1.8 MB',
      uploadedBy: 'Jason Wei',
      uploadedAt: '2023-05-16',
      status: 'under-review',
      category: 'Documentation'
    },
    {
      id: 3,
      name: 'Initial Vulnerability Report.pdf',
      type: 'report',
      size: '856 KB',
      uploadedBy: 'Alex Chen',
      uploadedAt: '2023-05-20',
      status: 'final',
      category: 'Reports'
    },
    {
      id: 4,
      name: 'Test Cases.xlsx',
      type: 'test-data',
      size: '324 KB',
      uploadedBy: 'Maria Garcia',
      uploadedAt: '2023-05-22',
      status: 'draft',
      category: 'Testing'
    },
    {
      id: 5,
      name: 'Security Recommendations.md',
      type: 'documentation',
      size: '45 KB',
      uploadedBy: 'Alex Chen',
      uploadedAt: '2023-05-24',
      status: 'in-progress',
      category: 'Reports'
    }
  ];

  const categories = ['all', 'Source Code', 'Documentation', 'Reports', 'Testing'];

  const getFileIcon = (type: string) => {
    return <FileText className="h-4 w-4" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'final': return 'bg-green-500';
      case 'reviewed': return 'bg-blue-500';
      case 'under-review': return 'bg-yellow-500';
      case 'in-progress': return 'bg-orange-500';
      case 'draft': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || file.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* File Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Files
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Upload Files</h3>
            <p className="text-muted-foreground mb-4">
              Drag and drop files here, or click to browse
            </p>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Choose Files
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle>File Library</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  placeholder="Search files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category === 'all' ? 'All Files' : category}
                </Button>
              ))}
            </div>
          </div>

          {/* Files List */}
          <div className="space-y-3">
            {filteredFiles.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                <div className="flex items-center gap-3">
                  {getFileIcon(file.type)}
                  <div>
                    <div className="font-medium">{file.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {file.size} • Uploaded by {file.uploadedBy} on {new Date(file.uploadedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(file.status)}>
                    {file.status.replace('-', ' ')}
                  </Badge>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredFiles.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No files found matching your criteria
            </div>
          )}
        </CardContent>
      </Card>

      {/* File Categories Overview */}
      <Card>
        <CardHeader>
          <CardTitle>File Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.slice(1).map((category) => {
              const categoryFiles = files.filter(f => f.category === category);
              return (
                <div key={category} className="p-4 border rounded-lg text-center">
                  <div className="text-2xl font-bold">{categoryFiles.length}</div>
                  <div className="text-sm text-muted-foreground">{category}</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
