
import React, { useState, useCallback } from 'react';
import { FileUpload } from '@/components/ui/FileUpload';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Upload, 
  File, 
  Image, 
  FileText, 
  Download, 
  Trash2, 
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  FolderOpen
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/auth';

interface UploadedFile {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: Date;
  category: string;
}

export function FileUploadSystem() {
  const { user } = useAuth();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [activeCategory, setActiveCategory] = useState('documents');

  const handleFileUpload = useCallback((fileUrl: string, fileName: string) => {
    const newFile: UploadedFile = {
      id: crypto.randomUUID(),
      name: fileName,
      url: fileUrl,
      type: fileName.split('.').pop() || 'unknown',
      size: 0, // Would be provided by actual upload
      uploadedAt: new Date(),
      category: activeCategory
    };

    setUploadedFiles(prev => [newFile, ...prev]);
    toast.success(`${fileName} uploaded successfully`);
  }, [activeCategory]);

  const handleDeleteFile = useCallback((fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
    toast.success('File deleted successfully');
  }, []);

  const getFileIcon = (type: string) => {
    const extension = type.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) {
      return <Image className="h-5 w-5" />;
    }
    if (['pdf', 'doc', 'docx', 'txt'].includes(extension)) {
      return <FileText className="h-5 w-5" />;
    }
    return <File className="h-5 w-5" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const categories = [
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'code', label: 'Source Code', icon: File },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'contracts', label: 'Smart Contracts', icon: File },
  ];

  const filteredFiles = uploadedFiles.filter(file => file.category === activeCategory);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              Authentication Required
            </CardTitle>
            <CardDescription>
              Please sign in to access the file management system.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">File Management</h1>
          <p className="text-muted-foreground">
            Upload, organize, and manage your project files securely
          </p>
        </div>
        <Badge variant="secondary" className="flex items-center gap-1">
          <FolderOpen className="h-3 w-3" />
          {uploadedFiles.length} files
        </Badge>
      </div>

      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="grid w-full grid-cols-4">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="flex items-center gap-2"
            >
              <category.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{category.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload {category.label}
                </CardTitle>
                <CardDescription>
                  Upload files to your secure {category.label.toLowerCase()} folder
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileUpload
                  onUpload={handleFileUpload}
                  acceptedTypes={
                    category.id === 'code' 
                      ? ['.sol', '.js', '.ts', '.py', '.zip', '.tar.gz']
                      : ['.pdf', '.doc', '.docx', '.txt', '.zip']
                  }
                  maxSize={50}
                  folder={category.id}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <category.icon className="h-5 w-5" />
                  {category.label} ({filteredFiles.length})
                </CardTitle>
                <CardDescription>
                  Manage your uploaded {category.label.toLowerCase()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {filteredFiles.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <category.icon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No {category.label.toLowerCase()} uploaded yet</p>
                    <p className="text-sm">Upload files using the form above</p>
                  </div>
                ) : (
                  <div className="grid gap-3">
                    {filteredFiles.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {getFileIcon(file.type)}
                          <div>
                            <p className="font-medium">{file.name}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {file.uploadedAt.toLocaleDateString()}
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {file.type.toUpperCase()}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(file.url, '_blank')}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const link = document.createElement('a');
                              link.href = file.url;
                              link.download = file.name;
                              document.body.appendChild(link);
                              link.click();
                              document.body.removeChild(link);
                            }}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteFile(file.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
