
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';

interface UploadedFile {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  uploaded_at: string;
}

export function useFileUpload() {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadFile = async (
    file: File,
    bucket: string = 'chat-attachments',
    folder?: string
  ): Promise<UploadedFile | null> => {
    if (!user) {
      toast.error('You must be logged in to upload files');
      return null;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast.error('File size must be less than 10MB');
      return null;
    }

    setUploading(true);
    setProgress(0);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${folder ? folder + '/' : ''}${Date.now()}.${fileExt}`;

      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) throw error;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);

      const uploadedFile: UploadedFile = {
        id: data.path,
        name: file.name,
        url: urlData.publicUrl,
        size: file.size,
        type: file.type,
        uploaded_at: new Date().toISOString(),
      };

      setProgress(100);
      toast.success('File uploaded successfully');
      return uploadedFile;
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error('Failed to upload file');
      return null;
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const uploadMultipleFiles = async (
    files: FileList,
    bucket: string = 'chat-attachments',
    folder?: string
  ): Promise<UploadedFile[]> => {
    const uploadedFiles: UploadedFile[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const uploadedFile = await uploadFile(file, bucket, folder);
      if (uploadedFile) {
        uploadedFiles.push(uploadedFile);
      }
      setProgress(((i + 1) / files.length) * 100);
    }

    return uploadedFiles;
  };

  const deleteFile = async (filePath: string, bucket: string = 'chat-attachments') => {
    try {
      const { error } = await supabase.storage
        .from(bucket)
        .remove([filePath]);

      if (error) throw error;
      toast.success('File deleted successfully');
      return true;
    } catch (error: any) {
      console.error('Delete error:', error);
      toast.error('Failed to delete file');
      return false;
    }
  };

  return {
    uploading,
    progress,
    uploadFile,
    uploadMultipleFiles,
    deleteFile,
  };
}
