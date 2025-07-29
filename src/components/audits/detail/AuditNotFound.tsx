
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft } from "lucide-react";

export const AuditNotFound: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <AlertCircle className="h-16 w-16 text-muted-foreground mb-4" />
      <h2 className="text-2xl font-bold mb-2">Audit Not Found</h2>
      <p className="text-muted-foreground mb-4">
        The audit you're looking for doesn't exist or you don't have permission to view it.
      </p>
      <Button onClick={() => navigate('/audits')}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Audits
      </Button>
    </div>
  );
};
