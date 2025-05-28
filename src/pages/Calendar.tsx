
import React from 'react';
import { PlaceholderPage } from './placeholder-template';
import { Calendar as CalendarIcon } from 'lucide-react';

const Calendar = () => {
  return (
    <PlaceholderPage
      title="Audit Calendar"
      description="Schedule and manage audit appointments"
      icon={<CalendarIcon className="h-6 w-6" />}
    />
  );
};

export default Calendar;
