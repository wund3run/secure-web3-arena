import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileUpload } from '@/components/ui/file-upload';
import { fileUploadService } from '@/services/fileUploadService';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle2, FileText, Upload } from 'lucide-react';

export function DeliverableUploadDemo() {
  const [uploadedFiles, setUploadedFiles] = useState<Array<{
    name: string;
    url: string;
    size: number;
    uploadedAt: string;
  }>>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (files: File[]) => {
    if (files.length === 0) return;

    setIsUploading(true);
    try {
      const uploadedFileData = await fileUploadService.uploadMultipleFiles(
        files,
        'demo-deliverables'
      );

      const newFiles = uploadedFileData.map(file => ({
        name: file.name,
        url: file.url,
        size: file.size,
        uploadedAt: file.uploadedAt
      }));

      setUploadedFiles(prev => [...prev, ...newFiles]);

      toast({
        title: "Upload successful!",
        description: `${files.length} file(s) uploaded successfully`,
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload files. Please try again.",
        variant: "error",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const clearFiles = () => {
    setUploadedFiles([]);
    toast({
      title: "Files cleared",
      description: "All uploaded files have been cleared from the demo",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            File Upload Demo - Phase 3
          </CardTitle>
          <CardDescription>
            Demonstration of the new file upload functionality for audit deliverables
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Upload Section */}
          <div>
            <h3 className="text-lg font-medium mb-3">Upload Audit Files</h3>
            <FileUpload
              onFilesSelected={handleFileUpload}
              accept=".pdf,.doc,.docx,.md,.zip,.tar.gz,.txt"
              maxFiles={5}
              disabled={isUploading}
            />
            {isUploading && (
              <div className="mt-3 text-sm text-gray-600">
                Uploading files to Supabase storage...
              </div>
            )}
          </div>

          {/* Uploaded Files Display */}
          {uploadedFiles.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium">Uploaded Files</h3>
                <Button variant="outline" size="sm" onClick={clearFiles}>
                  Clear All
                </Button>
              </div>
              
              <div className="space-y-3">
                {uploadedFiles.map((file, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-sm">{file.name}</p>
                          <p className="text-xs text-gray-500">
                            {fileUploadService.formatFileSize(file.size)} • 
                            Uploaded {new Date(file.uploadedAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Uploaded
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(file.url, '_blank')}
                        >
                          View
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Features List */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium mb-3">✨ Phase 3 Features Implemented</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>Drag & drop file upload</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>Multiple file support</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>File type validation</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>Progress tracking</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>Supabase Storage integration</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>Secure file management</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>Audit deliverable workflow</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>Real-time status updates</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 