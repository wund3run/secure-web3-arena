
import React from 'react';

export const AuditLoadingState: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="flex flex-col items-center space-y-4">
        <img 
          src="/hawkly-uploads/6286d686-7daf-4eb4-8d7b-51a3de242644.png" 
          alt="Hawkly Logo"
          className="h-12 w-12 object-contain bg-transparent animate-pulse"
          style={{ backgroundColor: 'transparent' }}
        />
        <p className="text-sm text-muted-foreground">Loading audit details...</p>
      </div>
    </div>
  );
};
