
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Upload, File, X, Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/auth';

interface FileUploadProps {
  bucket: string;
  folder?: string;
  acceptedTypes?: string[];
  maxSize?: number; // in MB
  onUploadComplete?: (url: string, fileName: string) => void;
  onUploadError?: (error: string) => void;
}

interface UploadingFile {
  file: File;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  url?: string;
  error?: string;
}

export function FileUpload({
  bucket,
  folder = '',
  acceptedTypes = ['.pdf', '.doc', '.docx', '.txt'],
  maxSize = 10, // 10MB default
  onUploadComplete,
  onUploadError
}: FileUploadProps) {
  const { user } = useAuth();
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      return `File size must be less than ${maxSize}MB`;
    }

    // Check file type
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!acceptedTypes.includes(fileExtension)) {
      return `File type not allowed. Accepted types: ${acceptedTypes.join(', ')}`;
    }

    return null;
  };

  const uploadFile = async (file: File) => {
    if (!user) {
      toast.error('You must be logged in to upload files');
      return;
    }

    const validationError = validateFile(file);
    if (validationError) {
      toast.error(validationError);
      onUploadError?.(validationError);
      return;
    }

    const fileName = `${Date.now()}-${file.name}`;
    const filePath = folder ? `${user.id}/${folder}/${fileName}` : `${user.id}/${fileName}`;

    // Add file to uploading state
    const uploadingFile: UploadingFile = {
      file,
      progress: 0,
      status: 'uploading'
    };

    setUploadingFiles(prev => [...prev, uploadingFile]);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setUploadingFiles(prev => 
          prev.map(f => 
            f.file === file && f.progress < 90
              ? { ...f, progress: f.progress + 10 }
              : f
          )
        );
      }, 200);

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      clearInterval(progressInterval);

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      // Update file status
      setUploadingFiles(prev => 
        prev.map(f => 
          f.file === file 
            ? { ...f, status: 'completed', url: publicUrl, progress: 100 }
            : f
        )
      );

      toast.success('File uploaded successfully');
      onUploadComplete?.(publicUrl, fileName);

    } catch (error: any) {
      console.error('Upload error:', error);
      
      setUploadingFiles(prev => 
        prev.map(f => 
          f.file === file 
            ? { ...f, status: 'error', error: error.message }
            : f
        )
      );

      toast.error('Upload failed', { description: error.message });
      onUploadError?.(error.message);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    files.forEach(uploadFile);
  };

  const removeFile = (file: File) => {
    setUploadingFiles(prev => prev.filter(f => f.file !== file));
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <Card 
        className="border-dashed border-2 cursor-pointer hover:border-primary/50 transition-colors"
        onClick={triggerFileSelect}
      >
        <CardContent className="flex flex-col items-center justify-center p-6">
          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground text-center">
            Click to upload files or drag and drop
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Max size: {maxSize}MB • Accepted: {acceptedTypes.join(', ')}
          </p>
        </CardContent>
      </Card>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={acceptedTypes.join(',')}
        onChange={handleFileSelect}
        className="hidden"
      />

      {uploadingFiles.length > 0 && (
        <div className="space-y-2">
          {uploadingFiles.map((uploadingFile, index) => (
            <Card key={index}>
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 flex-1">
                    <File className="h-4 w-4" />
                    <span className="text-sm truncate">
                      {uploadingFile.file.name}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {uploadingFile.status === 'uploading' && (
                      <div className="w-20">
                        <Progress value={uploadingFile.progress} className="h-2" />
                      </div>
                    )}
                    
                    {uploadingFile.status === 'completed' && (
                      <Check className="h-4 w-4 text-green-500" />
                    )}
                    
                    {uploadingFile.status === 'error' && (
                      <span className="text-xs text-red-500">
                        {uploadingFile.error}
                      </span>
                    )}
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(uploadingFile.file)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
