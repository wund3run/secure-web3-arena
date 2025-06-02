
import { useCallback } from 'react';

interface DropzoneConfig {
  accept?: Record<string, string[]>;
  maxSize?: number;
  disabled?: boolean;
  onDrop?: (files: File[]) => void;
}

export const useDropzone = (config: DropzoneConfig) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    config.onDrop?.(acceptedFiles);
  }, [config]);

  const getRootProps = () => ({
    onClick: () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.multiple = true;
      input.accept = Object.values(config.accept || {}).flat().join(',');
      input.onchange = (e) => {
        const files = Array.from((e.target as HTMLInputElement).files || []);
        onDrop(files);
      };
      input.click();
    }
  });

  const getInputProps = () => ({
    type: 'file',
    multiple: true,
    style: { display: 'none' }
  });

  return {
    getRootProps,
    getInputProps,
    isDragActive: false // Simplified for now
  };
};
