
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Upload, File, Download, Eye, Trash2, Search, Filter } from 'lucide-react';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';

interface FileItem {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedBy: string;
  uploadedAt: Date;
  description?: string;
  category: 'code' | 'documentation' | 'report' | 'other';
  versions: number;
}

interface FileSharingProps {
  auditId: string;
  participants: Array<{
    id: string;
    name: string;
    role: 'client' | 'auditor';
  }>;
}

export function FileSharing({ auditId, participants }: FileSharingProps) {
  const [files, setFiles] = useState<FileItem[]>([
    {
      id: '1',
      name: 'SmartContract.sol',
      type: 'solidity',
      size: 15420,
      uploadedBy: 'Sarah Chen',
      uploadedAt: new Date(Date.now() - 86400000),
      description: 'Main smart contract for audit',
      category: 'code',
      versions: 2
    },
    {
      id: '2',
      name: 'Audit_Requirements.pdf',
      type: 'pdf',
      size: 245760,
      uploadedBy: 'Alex Rodriguez',
      uploadedAt: new Date(Date.now() - 172800000),
      description: 'Detailed audit requirements and scope',
      category: 'documentation',
      versions: 1
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isUploading, setIsUploading] = useState(false);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newFile: FileItem = {
        id: Date.now().toString(),
        name: file.name,
        type: file.type || 'unknown',
        size: file.size,
        uploadedBy: 'You',
        uploadedAt: new Date(),
        category: 'other',
        versions: 1
      };

      setFiles(prev => [newFile, ...prev]);
      toast.success('File uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload file');
    } finally {
      setIsUploading(false);
    }
  }, []);

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || file.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'code': return 'bg-blue-100 text-blue-800';
      case 'documentation': return 'bg-green-100 text-green-800';
      case 'report': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            File Sharing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Label htmlFor="file-upload" className="cursor-pointer">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm font-medium">Click to upload files</p>
                  <p className="text-xs text-muted-foreground">
                    Supports documents, code files, images, and reports
                  </p>
                </div>
                <Input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                />
              </Label>
            </div>
          </div>
          {isUploading && (
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">Uploading file...</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border rounded-md bg-background"
        >
          <option value="all">All Categories</option>
          <option value="code">Code</option>
          <option value="documentation">Documentation</option>
          <option value="report">Reports</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Files List */}
      <div className="space-y-2">
        {filteredFiles.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <File className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No files found</h3>
              <p className="text-muted-foreground">
                {searchTerm || selectedCategory !== 'all' 
                  ? 'Try adjusting your search or filter'
                  : 'Upload files to start sharing with your team'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredFiles.map((file) => (
            <Card key={file.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-muted rounded">
                      <File className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{file.name}</h4>
                        <Badge variant="outline" className={getCategoryColor(file.category)}>
                          {file.category}
                        </Badge>
                        {file.versions > 1 && (
                          <Badge variant="secondary" className="text-xs">
                            v{file.versions}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span>{formatFileSize(file.size)}</span>
                        <span>Uploaded by {file.uploadedBy}</span>
                        <span>{formatDistanceToNow(file.uploadedAt, { addSuffix: true })}</span>
                      </div>
                      {file.description && (
                        <p className="text-sm text-muted-foreground mt-1">{file.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
