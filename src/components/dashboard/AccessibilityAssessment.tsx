
import React, { useState } from 'react';
import { Accessibility, Check, CheckCircle2, ChevronRight, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';

interface AccessibilityAssessmentProps {
  expanded?: boolean;
}

export function AccessibilityAssessment({ expanded = false }: AccessibilityAssessmentProps) {
  const {
    highContrast,
    largeText,
    reducedMotion,
    screenReaderFriendly,
    keyboardMode,
    toggleHighContrast,
    toggleLargeText,
    toggleReducedMotion,
    toggleScreenReaderFriendly,
    toggleKeyboardMode
  } = useAccessibility();
  
  const [showQuestions, setShowQuestions] = useState(false);
  const [answers, setAnswers] = useState({
    visualImpairment: false,
    motionSensitivity: false,
    keyboardNavigation: false,
    screenReader: false,
    colorPerception: false
  });
  
  const assessmentProgress = Object.values(answers).filter(Boolean).length * 20;
  
  const handleAnswerChange = (question: keyof typeof answers, value: boolean) => {
    setAnswers(prev => ({ ...prev, [question]: value }));
  };
  
  const applyRecommendedSettings = () => {
    // Apply settings based on user's answers
    if (answers.visualImpairment && !largeText) toggleLargeText();
    if (answers.colorPerception && !highContrast) toggleHighContrast();
    if (answers.motionSensitivity && !reducedMotion) toggleReducedMotion();
    if (answers.keyboardNavigation && !keyboardMode) toggleKeyboardMode();
    if (answers.screenReader && !screenReaderFriendly) toggleScreenReaderFriendly();
    
    toast.success("Accessibility settings applied", {
      description: "Your experience has been personalized based on your needs"
    });
    
    setShowQuestions(false);
  };

  // For non-expanded view (widget on dashboard)
  if (!expanded) {
    return (
      <div className="p-4 h-full">
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Accessibility className="h-4 w-4 text-primary" />
                <span className="font-medium">Accessibility Profile</span>
              </div>
              {assessmentProgress > 0 && (
                <span className="text-xs text-muted-foreground">{assessmentProgress}% complete</span>
              )}
            </div>
            
            {assessmentProgress > 0 ? (
              <>
                <Progress value={assessmentProgress} className="h-2 mb-4" />
                <div className="space-y-2">
                  {Object.entries(answers).map(([key, value]) => value ? (
                    <div key={key} className="flex items-center text-sm">
                      <CheckCircle2 className="h-3 w-3 mr-2 text-primary" />
                      <span className="text-muted-foreground">
                        {key === 'visualImpairment' && 'Visual settings applied'}
                        {key === 'motionSensitivity' && 'Motion settings applied'}
                        {key === 'keyboardNavigation' && 'Keyboard navigation enabled'}
                        {key === 'screenReader' && 'Screen reader optimized'}
                        {key === 'colorPerception' && 'Color contrast enhanced'}
                      </span>
                    </div>
                  ) : null)}
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground mb-4">
                Take a quick assessment to personalize your accessibility experience.
              </p>
            )}
          </div>
          
          <Button
            variant={assessmentProgress > 0 ? "outline" : "default"}
            size="sm"
            className="w-full mt-2"
            onClick={() => setShowQuestions(true)}
          >
            {assessmentProgress > 0 ? "Update Settings" : "Start Assessment"}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        {showQuestions && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-card border rounded-lg shadow-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold mb-4">Accessibility Assessment</h3>
              <div className="space-y-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="visual" className="flex items-center justify-between">
                    Do you prefer larger text for better readability?
                    <Switch 
                      id="visual" 
                      checked={answers.visualImpairment}
                      onCheckedChange={(checked) => handleAnswerChange('visualImpairment', checked)}
                    />
                  </Label>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="motion" className="flex items-center justify-between">
                    Are you sensitive to motion or animations?
                    <Switch 
                      id="motion" 
                      checked={answers.motionSensitivity}
                      onCheckedChange={(checked) => handleAnswerChange('motionSensitivity', checked)}
                    />
                  </Label>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="keyboard" className="flex items-center justify-between">
                    Do you navigate primarily using a keyboard?
                    <Switch 
                      id="keyboard" 
                      checked={answers.keyboardNavigation}
                      onCheckedChange={(checked) => handleAnswerChange('keyboardNavigation', checked)}
                    />
                  </Label>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="screenReader" className="flex items-center justify-between">
                    Do you use a screen reader?
                    <Switch 
                      id="screenReader" 
                      checked={answers.screenReader}
                      onCheckedChange={(checked) => handleAnswerChange('screenReader', checked)}
                    />
                  </Label>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="color" className="flex items-center justify-between">
                    Do you have difficulty distinguishing some colors?
                    <Switch 
                      id="color" 
                      checked={answers.colorPerception}
                      onCheckedChange={(checked) => handleAnswerChange('colorPerception', checked)}
                    />
                  </Label>
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowQuestions(false)}>
                  Cancel
                </Button>
                <Button onClick={applyRecommendedSettings}>
                  Apply Settings
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // For expanded view (dedicated page)
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Accessibility className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Accessibility Preferences</h3>
          </div>
          <Button variant="outline" size="sm" onClick={() => setShowQuestions(true)}>
            Take Assessment
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground">
          Customize your experience to match your accessibility needs
        </p>
      </div>
      
      <Separator />
      
      <div className="grid gap-6">
        <div className="space-y-2">
          <Label htmlFor="highContrast" className="flex items-center justify-between">
            High Contrast Mode
            <Switch 
              id="highContrast" 
              checked={highContrast}
              onCheckedChange={toggleHighContrast}
            />
          </Label>
          <p className="text-xs text-muted-foreground">Enhances color contrast for better visibility</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="largeText" className="flex items-center justify-between">
            Large Text
            <Switch 
              id="largeText" 
              checked={largeText}
              onCheckedChange={toggleLargeText}
            />
          </Label>
          <p className="text-xs text-muted-foreground">Increases text size throughout the application</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="reducedMotion" className="flex items-center justify-between">
            Reduced Motion
            <Switch 
              id="reducedMotion" 
              checked={reducedMotion}
              onCheckedChange={toggleReducedMotion}
            />
          </Label>
          <p className="text-xs text-muted-foreground">Minimizes animations and transitions</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="screenReader" className="flex items-center justify-between">
            Screen Reader Optimization
            <Switch 
              id="screenReader" 
              checked={screenReaderFriendly}
              onCheckedChange={toggleScreenReaderFriendly}
            />
          </Label>
          <p className="text-xs text-muted-foreground">Enhances screen reader compatibility</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="keyboard" className="flex items-center justify-between">
            Keyboard Navigation Mode
            <Switch 
              id="keyboard" 
              checked={keyboardMode}
              onCheckedChange={toggleKeyboardMode}
            />
          </Label>
          <p className="text-xs text-muted-foreground">Optimizes for keyboard-only navigation</p>
        </div>
      </div>
      
      {showQuestions && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-card border rounded-lg shadow-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Accessibility Assessment</h3>
            <div className="space-y-4 mb-6">
              <div className="space-y-2">
                <Label htmlFor="visual2" className="flex items-center justify-between">
                  Do you prefer larger text for better readability?
                  <Switch 
                    id="visual2" 
                    checked={answers.visualImpairment}
                    onCheckedChange={(checked) => handleAnswerChange('visualImpairment', checked)}
                  />
                </Label>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="motion2" className="flex items-center justify-between">
                  Are you sensitive to motion or animations?
                  <Switch 
                    id="motion2" 
                    checked={answers.motionSensitivity}
                    onCheckedChange={(checked) => handleAnswerChange('motionSensitivity', checked)}
                  />
                </Label>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="keyboard2" className="flex items-center justify-between">
                  Do you navigate primarily using a keyboard?
                  <Switch 
                    id="keyboard2" 
                    checked={answers.keyboardNavigation}
                    onCheckedChange={(checked) => handleAnswerChange('keyboardNavigation', checked)}
                  />
                </Label>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="screenReader2" className="flex items-center justify-between">
                  Do you use a screen reader?
                  <Switch 
                    id="screenReader2" 
                    checked={answers.screenReader}
                    onCheckedChange={(checked) => handleAnswerChange('screenReader', checked)}
                  />
                </Label>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="color2" className="flex items-center justify-between">
                  Do you have difficulty distinguishing some colors?
                  <Switch 
                    id="color2" 
                    checked={answers.colorPerception}
                    onCheckedChange={(checked) => handleAnswerChange('colorPerception', checked)}
                  />
                </Label>
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowQuestions(false)}>
                Cancel
              </Button>
              <Button onClick={applyRecommendedSettings}>
                Apply Settings
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
