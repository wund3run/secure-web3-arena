import { supabase } from '@/integrations/supabase/client';

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  path: string;
  uploadedAt: string;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export class FileUploadService {
  private static instance: FileUploadService;

  static getInstance(): FileUploadService {
    if (!FileUploadService.instance) {
      FileUploadService.instance = new FileUploadService();
    }
    return FileUploadService.instance;
  }

  async uploadFile(
    file: File,
    folder: string = 'audit-deliverables',
    onProgress?: (progress: UploadProgress) => void
  ): Promise<UploadedFile> {
    try {
      // Generate unique filename
      const fileExtension = file.name.split('.').pop();
      const timestamp = Date.now();
      const randomId = Math.random().toString(36).substr(2, 9);
      const fileName = `${timestamp}-${randomId}.${fileExtension}`;
      const filePath = `${folder}/${fileName}`;

      // Upload to Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from('audit-files')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('audit-files')
        .getPublicUrl(filePath);

      const uploadedFile: UploadedFile = {
        id: randomId,
        name: file.name,
        size: file.size,
        type: file.type,
        url: urlData.publicUrl,
        path: filePath,
        uploadedAt: new Date().toISOString()
      };

      return uploadedFile;
    } catch (error) {
      console.error('File upload error:', error);
      throw error;
    }
  }

  async uploadMultipleFiles(
    files: File[],
    folder: string = 'audit-deliverables',
    onProgress?: (fileIndex: number, progress: UploadProgress) => void
  ): Promise<UploadedFile[]> {
    const uploadPromises = files.map((file, index) =>
      this.uploadFile(file, folder, (progress) => {
        if (onProgress) {
          onProgress(index, progress);
        }
      })
    );

    try {
      const results = await Promise.all(uploadPromises);
      return results;
    } catch (error) {
      console.error('Multiple file upload error:', error);
      throw error;
    }
  }

  async deleteFile(filePath: string): Promise<void> {
    try {
      const { error } = await supabase.storage
        .from('audit-files')
        .remove([filePath]);

      if (error) {
        throw new Error(`Delete failed: ${error.message}`);
      }
    } catch (error) {
      console.error('File deletion error:', error);
      throw error;
    }
  }

  async getFileUrl(filePath: string): Promise<string> {
    try {
      const { data } = supabase.storage
        .from('audit-files')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error getting file URL:', error);
      throw error;
    }
  }

  validateFile(file: File, maxSize: number = 10): string | null {
    // Check file size (in MB)
    if (file.size > maxSize * 1024 * 1024) {
      return `File size must be less than ${maxSize}MB`;
    }

    // Check if file is empty
    if (file.size === 0) {
      return 'File cannot be empty';
    }

    // Basic file type validation
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'text/markdown',
      'application/zip',
      'application/x-zip-compressed'
    ];

    if (!allowedTypes.includes(file.type)) {
      return 'File type not supported';
    }

    return null;
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

export const fileUploadService = FileUploadService.getInstance(); 