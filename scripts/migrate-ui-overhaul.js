#!/usr/bin/env node

/**
 * Hawkly UI Overhaul Migration Script
 * 
 * This script helps migrate existing pages to use the new Hawkly UI components.
 * It performs the following operations:
 * 
 * 1. Adds necessary imports for Hawkly UI components
 * 2. Replaces standard containers with HawklyCard
 * 3. Replaces standard metrics with LiveMetric
 * 4. Updates navigation components
 * 
 * Usage:
 * node migrate-ui-overhaul.js --page=src/pages/YourPage.tsx
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name correctly in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command line arguments
const args = process.argv.slice(2);
const pageArg = args.find(arg => arg.startsWith('--page='));
const pageFilePath = pageArg ? pageArg.split('=')[1] : null;

// Show help if no file path is provided
if (!pageFilePath) {
  console.log(`
Hawkly UI Overhaul Migration Script
-----------------------------------

This script helps migrate existing pages to use the new Hawkly UI components.

Usage:
  node migrate-ui-overhaul.js --page=src/pages/YourPage.tsx

Options:
  --page       Path to the page file to migrate
  --dry-run    Run without making changes (preview only)
  --help       Display this help message
  `);
  process.exit(0);
}

// Check if file exists
if (!fs.existsSync(pageFilePath)) {
  console.error(`Error: File not found: ${pageFilePath}`);
  process.exit(1);
}

// Read the file content
const originalContent = fs.readFileSync(pageFilePath, 'utf8');
let updatedContent = originalContent;

// 1. Add necessary imports
function addImports() {
  // Check if imports are already present
  const hawklyComponentsImport = "import { HawklyCard, SecurityBadge, LiveMetric, ProgressIndicator, AuditorAvatar } from '@/components/ui/hawkly-components';";
  
  if (!updatedContent.includes("HawklyCard")) {
    // Find where to insert imports (after last import statement)
    const importRegex = /import.*from ['"].*['"];?/g;
    const matches = [...updatedContent.matchAll(importRegex)];
    
    if (matches.length > 0) {
      const lastImport = matches[matches.length - 1];
      const insertPosition = lastImport.index + lastImport[0].length;
      updatedContent = updatedContent.slice(0, insertPosition) + '\n' + hawklyComponentsImport + updatedContent.slice(insertPosition);
    } else {
      updatedContent = hawklyComponentsImport + '\n\n' + updatedContent;
    }
    
    console.log('✅ Added Hawkly component imports');
  } else {
    console.log('ℹ️ Hawkly component imports already exist');
  }
}

// 2. Replace standard containers with HawklyCard
function replaceContainers() {
  // Pattern for typical container divs
  const containerCount = (updatedContent.match(/<div className="((?:p-\d|m-\d|rounded|shadow|bg-|border).+?)"/g) || []).length;
  
  // Replace common container patterns
  updatedContent = updatedContent.replace(
    /<div className="((?:p-\d|m-\d|rounded|shadow|bg-|border).+?)"([^>]*)>/g, 
    '<HawklyCard className="$1"$2>'
  );
  
  // Close HawklyCards properly
  updatedContent = updatedContent.replace(
    /<\/div>(\s*{\/\* End of container \*\/})/g,
    '</HawklyCard>$1'
  );
  
  console.log(`✅ Replaced ${containerCount} standard containers with HawklyCard`);
}

// 3. Replace standard metrics displays
function replaceMetrics() {
  // Look for metric patterns
  const metricCount = (updatedContent.match(/<div[^>]*>([\s\S]*?)<span[^>]*>([^<]+)<\/span>[\s\S]*?<\/div>/g) || []).length;
  
  // Replace metric patterns with LiveMetric
  updatedContent = updatedContent.replace(
    /<div[^>]*>([\s\S]*?)<span[^>]*>([^<]+)<\/span>[\s\S]*?<div[^>]*>([^<]+)<\/div>[\s\S]*?<\/div>/g,
    (match, p1, p2, p3) => {
      // Extract icon if present
      const iconMatch = p1.match(/<([A-Z][a-zA-Z]+)\s[^>]*\/>/);
      const iconComponent = iconMatch ? `{<${iconMatch[1]} className="h-5 w-5" />}` : 'undefined';
      
      return `<LiveMetric
        label="${p3.trim()}"
        value="${p2.trim()}"
        icon=${iconComponent}
        animated={true}
      />`;
    }
  );
  
  console.log(`✅ Replaced ${metricCount} standard metrics with LiveMetric`);
}

// 4. Replace standard navigation
function replaceNavigation() {
  // Check for navigation components
  if (updatedContent.includes('import { Navbar') || 
      updatedContent.includes('import Navbar') || 
      updatedContent.includes('<Navbar')) {
    
    // Add EnhancedNavigation import if not present
    if (!updatedContent.includes('EnhancedNavigation')) {
      updatedContent = updatedContent.replace(
        /import (.*) from ['"]@\/components\/layout\/navbar['"];?/g,
        'import EnhancedNavigation from \'@/components/navigation/EnhancedNavigation\';'
      );
    }
    
    // Replace Navbar component with EnhancedNavigation
    updatedContent = updatedContent.replace(
      /<Navbar[^>]*>[\s\S]*?<\/Navbar>/g,
      '<EnhancedNavigation />'
    );
    
    console.log('✅ Replaced standard navigation with EnhancedNavigation');
  }
}

// 5. Add glassmorphism effects
function addGlassmorphismEffects() {
  // Add glass effect to appropriate components
  updatedContent = updatedContent.replace(
    /<HawklyCard className="([^"]*)(bg-white|bg-gray-100|bg-slate-100|bg-opacity-\d+)([^"]*)"/g,
    '<HawklyCard variant="glass" className="$1$3"'
  );
  
  console.log('✅ Added glassmorphism effects where appropriate');
}

// 6. Enhance buttons with animations
function enhanceButtons() {
  // Add transition effects to buttons
  updatedContent = updatedContent.replace(
    /className="([^"]*)btn([^"]*)"/g,
    'className="$1btn$2 transition-all duration-300 hover:scale-105"'
  );
  
  console.log('✅ Enhanced buttons with animations');
}

// Run all transformations
console.log(`\n🔍 Analyzing ${pageFilePath}...`);
addImports();
replaceContainers();
replaceMetrics();
replaceNavigation();
addGlassmorphismEffects();
enhanceButtons();

// Write changes back to file
if (args.includes('--dry-run')) {
  console.log('\n🔍 DRY RUN: No changes were made. Preview of changes:');
  console.log('----------------------------------------');
  console.log(updatedContent.slice(0, 500) + '...');
} else {
  fs.writeFileSync(pageFilePath, updatedContent, 'utf8');
  console.log(`\n✅ Successfully migrated: ${pageFilePath}`);
}

console.log('\n🚀 UI Migration complete!');
console.log('📝 Please review the changes manually to ensure everything looks correct.');
console.log('💡 Tip: Additional manual adjustments may be needed for complex layouts.');

// Process exit needed for ES modules
process.exit(0);
