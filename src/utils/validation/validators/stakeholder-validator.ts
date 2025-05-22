import { ValidationIssue, StakeholderType } from "../types";

/**
 * Validates the platform experience for different stakeholders
 * @returns Array of validation issues affecting stakeholder experiences
 */
export const validateStakeholderExperience = (stakeholderType: StakeholderType): ValidationIssue[] => {
  const stakeholderIssues: ValidationIssue[] = [];
  
  // Common issues for all stakeholders
  const commonIssues = validateCommonStakeholderIssues();
  
  // Specific issues based on stakeholder type
  switch (stakeholderType) {
    case 'auditor':
      stakeholderIssues.push(...validateAuditorExperience());
      break;
    case 'project-owner':
      stakeholderIssues.push(...validateProjectOwnerExperience());
      break;
    case 'admin':
      stakeholderIssues.push(...validateAdminExperience());
      break;
    case 'general':
    default:
      // Common issues are sufficient for general users
      break;
  }
  
  return [...commonIssues, ...stakeholderIssues];
};

/**
 * Validates issues common to all stakeholders
 */
const validateCommonStakeholderIssues = (): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];
  
  // Check for navigation consistency
  const navItems = document.querySelectorAll('nav a, nav button');
  const inconsistentStyles = Array.from(navItems).some((item, i, arr) => {
    if (i === 0) return false;
    const prevStyle = window.getComputedStyle(arr[i-1]);
    const currStyle = window.getComputedStyle(item);
    return prevStyle.fontSize !== currStyle.fontSize || 
           prevStyle.fontWeight !== currStyle.fontWeight;
  });
  
  if (inconsistentStyles) {
    issues.push({
      type: 'ui',
      severity: 'low',
      description: 'Navigation has inconsistent styling',
      location: 'Navigation menu',
      suggestion: 'Standardize font sizes and weights in navigation elements',
      affectedStakeholders: ['general', 'auditor', 'project-owner', 'admin'],
      wcagCriterion: 'WCAG 3.2.3 Consistent Navigation'
    });
  }
  
  // Check for keyboard focus indicators
  const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
  let missingFocusStyles = false;
  
  focusableElements.forEach(element => {
    const style = window.getComputedStyle(element);
    if (style.outlineStyle === 'none' || style.outlineWidth === '0px') {
      // Check if there are alternative focus indicators
      const hasCustomFocus = element.classList.contains('focus-visible') || 
                            element.classList.contains('focus') ||
                            element.hasAttribute('data-focus-visible-added');
      
      if (!hasCustomFocus) {
        missingFocusStyles = true;
      }
    }
  });
  
  if (missingFocusStyles) {
    issues.push({
      type: 'accessibility',
      severity: 'medium',
      description: 'Some interactive elements may lack visible focus indicators',
      location: 'Multiple interactive elements',
      suggestion: 'Ensure all interactive elements have visible focus indicators for keyboard users',
      affectedStakeholders: ['general', 'auditor', 'project-owner', 'admin'],
      wcagCriterion: 'WCAG 2.4.7 Focus Visible'
    });
  }
  
  // Check for consistent heading hierarchy
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  let previousLevel = 0;
  let skippedHeadingLevel = false;
  
  headings.forEach(heading => {
    const currentLevel = parseInt(heading.tagName.substring(1));
    
    if (previousLevel > 0 && currentLevel > previousLevel + 1) {
      skippedHeadingLevel = true;
    }
    
    previousLevel = currentLevel;
  });
  
  if (skippedHeadingLevel) {
    issues.push({
      type: 'accessibility',
      severity: 'medium',
      description: 'Heading levels are skipped in the document',
      location: 'Document structure',
      suggestion: 'Maintain a proper heading hierarchy without skipping levels',
      affectedStakeholders: ['general', 'auditor', 'project-owner', 'admin'],
      wcagCriterion: 'WCAG 1.3.1 Info and Relationships'
    });
  }
  
  return issues;
};

/**
 * Validates the auditor experience
 */
const validateAuditorExperience = (): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];
  
  // Check for technical information presentation
  const codeBlocks = document.querySelectorAll('pre, code');
  if (codeBlocks.length > 0) {
    let missingSemantics = false;
    
    codeBlocks.forEach(block => {
      if (!block.hasAttribute('lang') && !block.parentElement?.hasAttribute('lang')) {
        missingSemantics = true;
      }
    });
    
    if (missingSemantics) {
      issues.push({
        type: 'accessibility',
        severity: 'low',
        description: 'Code blocks missing language specification',
        location: 'Technical content sections',
        suggestion: 'Add language attributes to code blocks for better syntax highlighting and screen reader support',
        affectedStakeholders: ['auditor'],
        wcagCriterion: 'WCAG 3.1.1 Language of Parts'
      });
    }
  }
  
  // Check for data tables
  const tables = document.querySelectorAll('table');
  tables.forEach(table => {
    if (!table.querySelector('th')) {
      issues.push({
        type: 'accessibility',
        severity: 'medium',
        description: 'Data table missing header cells',
        location: 'Data table',
        suggestion: 'Add proper <th> elements to identify column and row headers',
        affectedStakeholders: ['auditor', 'admin'],
        wcagCriterion: 'WCAG 1.3.1 Info and Relationships'
      });
    }
  });
  
  return issues;
};

/**
 * Validates the project owner experience
 */
const validateProjectOwnerExperience = (): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];
  
  // Check for dashboard elements
  const dashboardElements = document.querySelectorAll('[data-dashboard], .dashboard, #dashboard');
  if (dashboardElements.length > 0) {
    // Check for data visualization accessibility
    const charts = document.querySelectorAll('[data-chart], .chart, canvas');
    charts.forEach(chart => {
      if (!chart.getAttribute('aria-label') && !chart.getAttribute('aria-labelledby')) {
        issues.push({
          type: 'accessibility',
          severity: 'medium',
          description: 'Data visualization missing accessible name or description',
          location: 'Dashboard chart or graph',
          suggestion: 'Add aria-label or aria-labelledby to provide accessible names for charts',
          affectedStakeholders: ['project-owner', 'admin'],
          wcagCriterion: 'WCAG 1.1.1 Non-text Content'
        });
      }
    });
    
    // Check for responsive layout on dashboard
    const dashboardGrid = document.querySelector('.dashboard-grid, .dashboard-layout');
    if (dashboardGrid) {
      const style = window.getComputedStyle(dashboardGrid);
      if (!style.display.includes('grid') && !style.display.includes('flex')) {
        issues.push({
          type: 'responsive',
          severity: 'low',
          description: 'Dashboard layout may not be fully responsive',
          location: 'Project dashboard',
          suggestion: 'Use CSS Grid or Flexbox for responsive dashboard layouts',
          affectedStakeholders: ['project-owner', 'admin']
        });
      }
    }
  }
  
  return issues;
};

/**
 * Validates the admin experience
 */
const validateAdminExperience = (): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];
  
  // Check for admin-specific controls
  const adminControls = document.querySelectorAll('[data-admin], .admin-control, #admin-panel');
  if (adminControls.length > 0) {
    // Check for bulk action accessibility
    const bulkActions = document.querySelectorAll('[data-bulk-action], .bulk-action');
    bulkActions.forEach(action => {
      const hasLabel = action.hasAttribute('aria-label') || 
                      action.hasAttribute('aria-labelledby') ||
                      action.textContent?.trim().length > 0;
      
      if (!hasLabel) {
        issues.push({
          type: 'accessibility',
          severity: 'high',
          description: 'Bulk action control missing accessible name',
          location: 'Admin interface',
          suggestion: 'Add clear labels to all bulk action controls',
          affectedStakeholders: ['admin'],
          wcagCriterion: 'WCAG 2.4.6 Headings and Labels'
        });
      }
    });
    
    // Check for status indicators
    const statusIndicators = document.querySelectorAll('[data-status], .status-indicator');
    statusIndicators.forEach(indicator => {
      if (!indicator.hasAttribute('aria-label') && !indicator.hasAttribute('title')) {
        issues.push({
          type: 'accessibility',
          severity: 'medium',
          description: 'Status indicator missing accessible name',
          location: 'Admin interface',
          suggestion: 'Add aria-label or title to status indicators',
          affectedStakeholders: ['admin'],
          wcagCriterion: 'WCAG 1.4.1 Use of Color'
        });
      }
    });
  }
  
  return issues;
};

/**
 * Validates experiences for all stakeholder types
 */
export const validateAllStakeholderExperiences = (): ValidationIssue[] => {
  const stakeholderTypes: StakeholderType[] = ['general', 'auditor', 'project-owner', 'admin'];
  
  // Get issues specific to each stakeholder type
  const allIssues = stakeholderTypes.flatMap(type => validateStakeholderExperience(type));
  
  // Remove duplicates based on description + location
  const uniqueIssues = allIssues.filter((issue, index, self) => 
    index === self.findIndex(i => i.description === issue.description && i.location === issue.location)
  );
  
  return uniqueIssues;
};
