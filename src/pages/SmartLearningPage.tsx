import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { SmartLearningPlatform } from '@/components/learning/SmartLearningPlatform';

export default function SmartLearningPage() {
  return (
    <StandardLayout
      title="Smart Learning Platform"
      description="Personalized learning paths, interactive vulnerability database, and peer knowledge sharing for Web3 security experts."
    >
      <SmartLearningPlatform />
    </StandardLayout>
  );
} 