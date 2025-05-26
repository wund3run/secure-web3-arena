
import React from 'react';
import { ContentPage } from '@/components/content/content-page';
import { CompetitiveAdvantages } from '@/components/home/competitive-advantages';

export default function CompetitiveAdvantagesPage() {
  return (
    <ContentPage
      title="Why Choose Hawkly"
      description="See how Hawkly compares to traditional security audit services"
      className="px-4 md:px-6"
    >
      <CompetitiveAdvantages />
    </ContentPage>
  );
}
