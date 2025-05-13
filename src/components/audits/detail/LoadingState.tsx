
import React from 'react';
import LoadingTrivia from '@/components/ui/loading-trivia';

export const AuditLoadingState: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <LoadingTrivia message="Loading audit details..." size="md" />
    </div>
  );
};
