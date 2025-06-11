
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Upload, 
  File, 
  FileText, 
  Image, 
  Archive,
  Trash2,
  Download,
  Eye,
  Lock,
  CheckCircle,
  AlertTriangle,
  Clock
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';

interface FileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'completed' | 'error' | 'scanning';
  progress: number;
  url?: string;
  scanResult?: 'clean' | 'threat' | 'pending';
  uploadedAt: Date;
}

export const FileUploadSystem = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: FileItem[] = acceptedFiles.map(file => ({
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'uploading',
      progress: 0,
      uploadedAt: new Date(),
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Simulate upload process
    newFiles.forEach(file => {
      simulateUpload(file.id);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    maxSize: 100 * 1024 * 1024, // 100MB
  });

  const simulateUpload = (fileId: string) => {
    const interval = setInterval(() => {
      setFiles(prev => prev.map(file => {
        if (file.id === fileId) {
          const newProgress = Math.min(file.progress + 10, 100);
          if (newProgress === 100) {
            clearInterval(interval);
            // Start security scan
            setTimeout(() => {
              setFiles(prev => prev.map(f => 
                f.id === fileId ? { ...f, status: 'scanning' } : f
              ));
              // Complete scan after 2 seconds
              setTimeout(() => {
                setFiles(prev => prev.map(f => 
                  f.id === fileId ? { 
                    ...f, 
                    status: 'completed', 
                    scanResult: 'clean',
                    url: `/files/${f.name}`
                  } : f
                ));
              }, 2000);
            }, 500);
            return { ...file, progress: newProgress, status: 'completed' as const };
          }
          return { ...file, progress: newProgress };
        }
        return file;
      }));
    }, 200);
  };

  const deleteFile = (fileId: string) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="h-4 w-4" />;
    if (type.includes('pdf') || type.includes('document')) return <FileText className="h-4 w-4" />;
    if (type.includes('zip') || type.includes('archive')) return <Archive className="h-4 w-4" />;
    return <File className="h-4 w-4" />;
  };

  const getStatusIcon = (status: string, scanResult?: string) => {
    switch (status) {
      case 'uploading': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'scanning': return <Lock className="h-4 w-4 text-yellow-500 animate-pulse" />;
      case 'completed': 
        return scanResult === 'clean' 
          ? <CheckCircle className="h-4 w-4 text-green-500" />
          : <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <File className="h-4 w-4" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const completedFiles = files.filter(f => f.status === 'completed');
  const uploadingFiles = files.filter(f => f.status === 'uploading' || f.status === 'scanning');

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-6">
        <Upload className="h-6 w-6" />
        <h1 className="text-2xl font-bold">File Management</h1>
      </div>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload Files</TabsTrigger>
          <TabsTrigger value="files" className="flex items-center gap-2">
            My Files
            {completedFiles.length > 0 && (
              <Badge variant="secondary">{completedFiles.length}</Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Secure File Upload</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300'
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">
                  {isDragActive ? 'Drop files here' : 'Upload your files'}
                </h3>
                <p className="text-muted-foreground mb-4">
                  Drag and drop files here, or click to select files
                </p>
                <p className="text-sm text-muted-foreground">
                  Supports: PDF, DOC, DOCX, TXT, ZIP, Images • Max size: 100MB
                </p>
              </div>
            </CardContent>
          </Card>

          {uploadingFiles.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Upload Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {uploadingFiles.map((file) => (
                  <div key={file.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getFileIcon(file.type)}
                        <span className="font-medium">{file.name}</span>
                        <Badge variant="outline">
                          {file.status === 'scanning' ? 'Scanning...' : 'Uploading...'}
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {formatFileSize(file.size)}
                      </span>
                    </div>
                    <Progress value={file.progress} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="files" className="space-y-4">
          {completedFiles.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <File className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No files uploaded yet</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {completedFiles.map((file) => (
                <Card key={file.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getFileIcon(file.type)}
                        <div>
                          <h3 className="font-medium">{file.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {formatFileSize(file.size)} • Uploaded {file.uploadedAt.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(file.status, file.scanResult)}
                        <Badge variant={file.scanResult === 'clean' ? 'default' : 'destructive'}>
                          {file.scanResult === 'clean' ? 'Secure' : 'Threat Detected'}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => deleteFile(file.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
