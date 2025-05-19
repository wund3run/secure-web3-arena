
import React, { useState } from "react";
import { usePlatformValidator } from "../hooks/usePlatformValidator";

export function PlatformValidatorWidget({ onClose }: { onClose?: () => void }) {
  const { issues, isValidating, runValidation } = usePlatformValidator();
  const [isOpen, setIsOpen] = useState(true);
  
  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 bg-card border shadow-lg rounded-lg overflow-hidden max-h-[80vh]">
      <div className="p-4 bg-muted flex justify-between items-center border-b">
        <h3 className="font-medium">Platform Validator</h3>
        <button onClick={handleClose} className="text-muted-foreground hover:text-foreground">
          ✕
        </button>
      </div>
      <div className="p-4 overflow-y-auto max-h-[calc(80vh-4rem)]">
        <div className="flex justify-between mb-4">
          <div>
            <span className="font-medium">Issues found: </span>
            <span className={issues.length > 0 ? 'text-red-500' : 'text-green-500'}>
              {issues.length}
            </span>
          </div>
          <button
            onClick={runValidation}
            disabled={isValidating}
            className="text-sm bg-primary text-primary-foreground px-2 py-1 rounded hover:bg-primary/90"
          >
            {isValidating ? 'Scanning...' : 'Scan Again'}
          </button>
        </div>
        
        {issues.length > 0 ? (
          <ul className="space-y-3">
            {issues.map((issue, i) => (
              <li key={i} className="text-xs border-l-4 pl-2 py-1" 
                  style={{ borderColor: issue.severity === 'high' ? 'red' : issue.severity === 'medium' ? 'orange' : 'yellow' }}>
                <div className="font-medium">{issue.description}</div>
                <div className="text-muted-foreground">Location: {issue.location}</div>
                {issue.suggestion && (
                  <div className="mt-1 text-blue-500">Tip: {issue.suggestion}</div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-green-500 text-center py-2">No issues detected on this page! 🎉</p>
        )}
      </div>
    </div>
  );
}

export default PlatformValidatorWidget;
