import React from 'react';

const FeedbackExportControls: React.FC = () => {
  // TODO: Implement export controls for feedback analytics
  return (
    <div className="flex gap-4 mt-4">
      <button className="btn-glass btn-accent">Export CSV</button>
      <button className="btn-glass btn-accent">Export PDF</button>
    </div>
  );
};

export default FeedbackExportControls; 