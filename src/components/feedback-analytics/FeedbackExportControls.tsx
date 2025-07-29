import React from 'react';

interface FeedbackEntry {
  id: string;
  [key: string]: any;
}

interface FeedbackExportControlsProps {
  feedbacks: FeedbackEntry[];
}

const FeedbackExportControls: React.FC<FeedbackExportControlsProps> = ({ feedbacks }) => {
  // TODO: Implement export controls for feedback analytics
  return (
    <div className="flex gap-4 mt-4">
      <button className="btn-glass btn-accent">Export CSV ({feedbacks.length} items)</button>
      <button className="btn-glass btn-accent">Export PDF</button>
    </div>
  );
};

export default FeedbackExportControls; 