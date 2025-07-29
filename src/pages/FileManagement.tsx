
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { FileUploadSystem } from '@/components/files/FileUploadSystem';

const FileManagement = () => {
  return (
    <StandardLayout
      title="File Management | Hawkly"
      description="Secure file upload and management system"
    >
      <FileUploadSystem />
    </StandardLayout>
  );
};

export default FileManagement;
