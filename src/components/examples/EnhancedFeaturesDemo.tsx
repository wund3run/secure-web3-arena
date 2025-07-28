
import React from 'react';
import { useFeedback } from '@/components/feedback/UnifiedFeedbackSystem';
import { useEnhancedTheme } from '@/components/theme/EnhancedThemeSystem';
import { ContentSection, ProgressiveDisclosure } from '@/components/content/ContentStrategySystem';
import { AnimatedButton, AnimatedCard, AnimatedProgress } from '@/components/animations/MicroInteractionSystem';
import { Typography } from '@/components/ui/design-system/DesignSystem';
import { ThemeCustomizationPanel } from '@/components/theme/EnhancedThemeSystem';

export function EnhancedFeaturesDemo() {
  const { 
    showSuccessToast, 
    showErrorToast, 
    showWarningToast, 
    showInfoToast, 
    showConfirmDialog 
  } = useFeedback();
  const [progress, setProgress] = React.useState(0);

  const handleToastDemo = (type: 'success' | 'error' | 'warning' | 'info') => {
    const messages = {
      success: 'Operation completed successfully!',
      error: 'Something went wrong. Please try again.',
      warning: 'Please review your settings before continuing.',
      info: 'Here\'s some helpful information for you.',
    };

    switch (type) {
      case 'success': showSuccessToast(messages.success); break;
      case 'error': showErrorToast(messages.error); break;
      case 'warning': showWarningToast(messages.warning); break;
      case 'info': showInfoToast(messages.info); break;
    }
  };

  const handleConfirmDemo = async () => {
    const confirmed = await showConfirmDialog({
      title: 'Confirm Action',
      description: 'Are you sure you want to proceed with this action? This cannot be undone.',
      confirmText: 'Yes, Continue',
      cancelText: 'Cancel',
      variant: 'destructive',
    });

    if (confirmed) {
      showSuccessToast('Action confirmed!');
    } else {
      showInfoToast('Action cancelled');
    }
  };

  const handleProgressDemo = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          showSuccessToast('Progress completed!');
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <ContentSection 
        title="Enhanced Features Demo"
        subtitle="Experience the improved user feedback, content strategy, animations, and theme system"
        level={1}
      >
        {/* Feedback System Demo */}
        <ContentSection title="User Feedback System" level={2}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <AnimatedButton onClick={() => handleToastDemo('success')} variant="default">
              Success Toast
            </AnimatedButton>
            <AnimatedButton onClick={() => handleToastDemo('error')} variant="secondary">
              Error Toast
            </AnimatedButton>
            <AnimatedButton onClick={() => handleToastDemo('warning')} variant="secondary">
              Warning Toast
            </AnimatedButton>
            <AnimatedButton onClick={() => handleToastDemo('info')} variant="secondary">
              Info Toast
            </AnimatedButton>
          </div>
          
          <AnimatedButton onClick={handleConfirmDemo} variant="default" className="mt-4">
            Show Confirmation Dialog
          </AnimatedButton>
        </ContentSection>

        {/* Animation System Demo */}
        <ContentSection title="Animation & Micro-interactions" level={2}>
          <div className="grid md:grid-cols-2 gap-6">
            <AnimatedCard interactive>
              <Typography variant="h5" className="mb-2">Interactive Card</Typography>
              <Typography variant="body" className="text-muted-foreground">
                Hover over this card to see the smooth transition effects.
              </Typography>
            </AnimatedCard>
            
            <div className="space-y-4">
              <Typography variant="h6">Progress Animation</Typography>
              <AnimatedProgress value={progress} showPercentage />
              <AnimatedButton onClick={handleProgressDemo} size="sm">
                Start Progress Demo
              </AnimatedButton>
            </div>
          </div>
        </ContentSection>

        {/* Content Strategy Demo */}
        <ContentSection title="Content Strategy & Information Architecture" level={2}>
          <ProgressiveDisclosure
            title="Security Audit Process"
            summary="Learn about our comprehensive security audit methodology"
            details={
              <div className="space-y-4">
                <Typography variant="body">
                  Our security audit process involves multiple stages designed to identify and address potential vulnerabilities in your codebase.
                </Typography>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Initial code analysis and architecture review</li>
                  <li>Automated vulnerability scanning</li>
                  <li>Manual code review by certified security experts</li>
                  <li>Comprehensive reporting with remediation guidance</li>
                  <li>Follow-up verification of implemented fixes</li>
                </ul>
              </div>
            }
          />
          
          <ProgressiveDisclosure
            title="Pricing Structure"
            summary="Transparent pricing based on project complexity"
            details={
              <div className="space-y-4">
                <Typography variant="body">
                  Our pricing is designed to be fair and transparent, scaling with your project's needs.
                </Typography>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 border border-border rounded-lg">
                    <Typography variant="h6">Basic</Typography>
                    <Typography variant="caption">For small projects</Typography>
                  </div>
                  <div className="p-4 border border-border rounded-lg">
                    <Typography variant="h6">Professional</Typography>
                    <Typography variant="caption">For enterprise projects</Typography>
                  </div>
                  <div className="p-4 border border-border rounded-lg">
                    <Typography variant="h6">Enterprise</Typography>
                    <Typography variant="caption">For large organizations</Typography>
                  </div>
                </div>
              </div>
            }
          />
        </ContentSection>

        {/* Theme System Demo */}
        <ContentSection title="Enhanced Theme System" level={2}>
          <ThemeCustomizationPanel />
        </ContentSection>
      </ContentSection>
    </div>
  );
}
