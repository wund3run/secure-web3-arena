
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  Upload, 
  File, 
  FileText, 
  Image, 
  Archive, 
  Code,
  X,
  Download,
  Eye
} from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadProgress: number;
  uploadStatus: 'pending' | 'uploading' | 'completed' | 'error';
  url?: string;
  preview?: string;
}

interface FileUploadManagerProps {
  auditRequestId: string;
  allowedTypes?: string[];
  maxFileSize?: number;
  maxFiles?: number;
  onFilesUploaded?: (files: FileItem[]) => void;
}

export const FileUploadManager: React.FC<FileUploadManagerProps> = ({
  auditRequestId,
  allowedTypes = ['.sol', '.js', '.ts', '.json', '.md', '.pdf', '.zip', '.tar.gz'],
  maxFileSize = 50 * 1024 * 1024, // 50MB
  maxFiles = 10,
  onFilesUploaded
}) => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (files.length + acceptedFiles.length > maxFiles) {
      toast.error(`Maximum ${maxFiles} files allowed`);
      return;
    }

    const newFiles: FileItem[] = acceptedFiles.map(file => ({
      id: `${Date.now()}-${Math.random()}`,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadProgress: 0,
      uploadStatus: 'pending'
    }));

    setFiles(prev => [...prev, ...newFiles]);
    
    // Start upload process
    await uploadFiles(acceptedFiles, newFiles);
  }, [files.length, maxFiles]);

  const uploadFiles = async (rawFiles: File[], fileItems: FileItem[]) => {
    setIsUploading(true);
    
    try {
      for (let i = 0; i < rawFiles.length; i++) {
        const file = rawFiles[i];
        const fileItem = fileItems[i];
        
        // Update status to uploading
        setFiles(prev => prev.map(f => 
          f.id === fileItem.id 
            ? { ...f, uploadStatus: 'uploading' as const }
            : f
        ));

        // Simulate upload with progress
        for (let progress = 0; progress <= 100; progress += 10) {
          await new Promise(resolve => setTimeout(resolve, 100));
          setFiles(prev => prev.map(f => 
            f.id === fileItem.id 
              ? { ...f, uploadProgress: progress }
              : f
          ));
        }

        // Simulate successful upload
        const uploadedUrl = `https://storage.hawkly.com/audits/${auditRequestId}/${file.name}`;
        
        setFiles(prev => prev.map(f => 
          f.id === fileItem.id 
            ? { 
                ...f, 
                uploadStatus: 'completed' as const,
                url: uploadedUrl,
                uploadProgress: 100
              }
            : f
        ));
      }

      toast.success(`${rawFiles.length} file(s) uploaded successfully`);
      onFilesUploaded?.(fileItems);
      
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Upload failed. Please try again.');
      
      // Mark failed files
      fileItems.forEach(fileItem => {
        setFiles(prev => prev.map(f => 
          f.id === fileItem.id 
            ? { ...f, uploadStatus: 'error' as const }
            : f
        ));
      });
    } finally {
      setIsUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: allowedTypes.reduce((acc, type) => {
      acc[`application/${type.replace('.', '')}`] = [type];
      return acc;
    }, {} as Record<string, string[]>),
    maxSize: maxFileSize,
    disabled: isUploading
  });

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const getFileIcon = (type: string, name: string) => {
    if (type.startsWith('image/')) return <Image className="h-4 w-4" />;
    if (name.endsWith('.sol') || name.endsWith('.js') || name.endsWith('.ts')) return <Code className="h-4 w-4" />;
    if (name.endsWith('.pdf')) return <FileText className="h-4 w-4" />;
    if (name.endsWith('.zip') || name.endsWith('.tar.gz')) return <Archive className="h-4 w-4" />;
    return <File className="h-4 w-4" />;
  };

  const getStatusBadge = (status: FileItem['uploadStatus']) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500">Uploaded</Badge>;
      case 'uploading':
        return <Badge variant="secondary">Uploading...</Badge>;
      case 'error':
        return <Badge variant="error">Error</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          File Upload
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive 
              ? 'border-primary bg-primary/5' 
              : 'border-gray-300 hover:border-gray-400'
          } ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <input {...getInputProps()} />
          <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          {isDragActive ? (
            <p className="text-primary">Drop the files here...</p>
          ) : (
            <div>
              <p className="text-lg font-medium mb-2">
                Drag & drop files here, or click to select
              </p>
              <p className="text-sm text-muted-foreground">
                Supported: {allowedTypes.join(', ')} (max {maxFileSize / 1024 / 1024}MB each)
              </p>
            </div>
          )}
        </div>

        {files.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium">Uploaded Files ({files.length})</h4>
            {files.map((file) => (
              <div key={file.id} className="flex items-center gap-3 p-3 border rounded-lg">
                {getFileIcon(file.type, file.name)}
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  {file.uploadStatus === 'uploading' && (
                    <Progress value={file.uploadProgress} className="mt-2" />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(file.uploadStatus)}
                  {file.url && (
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => removeFile(file.id)}
                    disabled={file.uploadStatus === 'uploading'}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
