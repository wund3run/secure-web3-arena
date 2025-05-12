
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface PlaceholderTabProps {
  title: string;
}

export const PlaceholderTab: React.FC<PlaceholderTabProps> = ({ title }) => {
  return (
    <Card className="w-full h-[400px] flex items-center justify-center">
      <CardContent className="text-center py-10">
        <h3 className="text-lg font-medium mb-2 capitalize">{title}</h3>
        <p className="text-muted-foreground">
          This section is under development. Check back soon for updates!
        </p>
      </CardContent>
    </Card>
  );
};
