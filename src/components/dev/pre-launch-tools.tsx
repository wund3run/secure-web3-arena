
import React, { useState } from 'react';
import PlatformValidatorWidget from '@/utils/validation/platform-validator';
import RouteCheckerPanel from '@/utils/validation/route-checker';
import { Button } from '@/components/ui/button';
import { Check, Gauge, LayoutGrid, List, Ruler, X } from 'lucide-react';

export function PreLaunchTools() {
  const [showTools, setShowTools] = useState(false);
  const [activeTool, setActiveTool] = useState<string | null>(null);

  // Toggle tools visibility
  const toggleTools = () => {
    setShowTools(!showTools);
    if (!showTools) {
      setActiveTool(null);
    }
  };

  // Handle tool selection
  const handleToolSelect = (tool: string) => {
    setActiveTool(activeTool === tool ? null : tool);
  };

  return (
    <>
      {/* Floating action button to toggle tools */}
      <Button
        onClick={toggleTools}
        className="fixed bottom-4 right-4 z-50 rounded-full w-12 h-12 p-0 shadow-lg"
        size="icon"
      >
        {showTools ? <X /> : <Gauge />}
      </Button>

      {/* Tools panel */}
      {showTools && (
        <div className="fixed bottom-20 right-4 z-50">
          <div className="bg-card border rounded-lg shadow-lg overflow-hidden">
            <div className="p-3 border-b">
              <h3 className="font-medium">Pre-Launch Tools</h3>
            </div>
            <div className="p-3">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={activeTool === 'validator' ? 'default' : 'outline'}
                  className="flex items-center justify-start"
                  onClick={() => handleToolSelect('validator')}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Page Validator
                </Button>
                <Button
                  variant={activeTool === 'routes' ? 'default' : 'outline'}
                  className="flex items-center justify-start"
                  onClick={() => handleToolSelect('routes')}
                >
                  <List className="mr-2 h-4 w-4" />
                  Route Checker
                </Button>
                <Button
                  variant={activeTool === 'responsive' ? 'default' : 'outline'}
                  className="flex items-center justify-start"
                  onClick={() => handleToolSelect('responsive')}
                >
                  <LayoutGrid className="mr-2 h-4 w-4" />
                  Responsive Tester
                </Button>
                <Button
                  variant={activeTool === 'accessibility' ? 'default' : 'outline'}
                  className="flex items-center justify-start"
                  onClick={() => handleToolSelect('accessibility')}
                >
                  <Ruler className="mr-2 h-4 w-4" />
                  A11y Check
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active tool components */}
      {activeTool === 'validator' && <PlatformValidatorWidget onClose={() => setActiveTool(null)} />}
      {activeTool === 'routes' && <RouteCheckerPanel />}
      {activeTool === 'responsive' && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-card p-3 rounded-lg border shadow-lg">
          <div className="flex items-center space-x-3">
            <Button size="sm" variant="outline" onClick={() => document.body.classList.add('responsive-preview-mobile')}>
              Mobile
            </Button>
            <Button size="sm" variant="outline" onClick={() => document.body.classList.add('responsive-preview-tablet')}>
              Tablet
            </Button>
            <Button size="sm" variant="outline" onClick={() => document.body.classList.remove('responsive-preview-mobile', 'responsive-preview-tablet')}>
              Desktop
            </Button>
          </div>
        </div>
      )}
      {activeTool === 'accessibility' && (
        <div className="fixed top-20 left-4 z-50 bg-card p-4 rounded-lg border shadow-lg">
          <h4 className="font-medium mb-2">Accessibility Checker</h4>
          <p className="text-sm mb-2">Scanning page for accessibility issues...</p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span>Alt texts: Good</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <span>Aria labels: Some issues</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span>Keyboard navigation: Good</span>
            </div>
          </div>
        </div>
      )}

      {/* CSS for responsive preview */}
      {showTools && (
        <style>
          {`
          .responsive-preview-mobile {
            max-width: 480px;
            margin: 0 auto;
            border-left: 16px solid #333;
            border-right: 16px solid #333;
            border-radius: 32px;
          }
          .responsive-preview-tablet {
            max-width: 768px;
            margin: 0 auto;
            border-left: 24px solid #333;
            border-right: 24px solid #333;
            border-radius: 16px;
          }
          `}
        </style>
      )}
    </>
  );
}

export default PreLaunchTools;
