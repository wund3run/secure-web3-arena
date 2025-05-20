
import { ValidationIssue, StakeholderType } from "../types";

/**
 * Validates UI/UX elements based on stakeholder type
 * @param stakeholderType The type of stakeholder to validate for
 * @returns Array of validation issues specific to the stakeholder type
 */
export const validateStakeholderExperience = (stakeholderType: StakeholderType): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];
  
  switch (stakeholderType) {
    case 'auditor':
      // Auditor-specific validations
      const auditTools = document.querySelectorAll('[data-audit-tool]');
      if (auditTools.length === 0) {
        issues.push({
          type: 'ui',
          severity: 'medium',
          description: 'No audit tools found on the page for auditors',
          location: 'Current page',
          suggestion: 'Add audit-specific tools and controls for auditor stakeholders',
          affectedStakeholders: ['auditor'],
          wcagCriterion: 'WCAG 3.2.1 (On Focus)'
        });
      }
      
      // Check for audit report generation functionality
      const reportButtons = document.querySelectorAll('button, a').length;
      const reportRelatedElements = Array.from(document.querySelectorAll('button, a')).filter(
        el => el.textContent?.toLowerCase().includes('report') || 
              el.textContent?.toLowerCase().includes('audit') ||
              el.getAttribute('href')?.includes('report') ||
              el.getAttribute('href')?.includes('audit')
      );
      
      if (reportRelatedElements.length === 0 && window.location.pathname.includes('/dashboard')) {
        issues.push({
          type: 'functionality',
          severity: 'high',
          description: 'No report generation functionality visible for auditors',
          location: 'Dashboard',
          suggestion: 'Add clear access points to report generation tools',
          affectedStakeholders: ['auditor'],
          wcagCriterion: 'WCAG 2.4.6 (Headings and Labels)'
        });
      }
      break;
      
    case 'project-owner':
      // Project owner specific validations
      const projectStatusElements = document.querySelectorAll('[data-project-status]');
      if (projectStatusElements.length === 0 && window.location.pathname.includes('/dashboard')) {
        issues.push({
          type: 'ui',
          severity: 'high',
          description: 'Project status information missing for project owners',
          location: 'Dashboard',
          suggestion: 'Add project status indicators with clear visibility for project owners',
          affectedStakeholders: ['project-owner'],
          wcagCriterion: 'WCAG 1.3.1 (Info and Relationships)'
        });
      }
      
      // Check for request audit functionality
      const requestAuditLinks = Array.from(document.querySelectorAll('a')).filter(
        a => a.textContent?.toLowerCase().includes('request audit') || 
             a.getAttribute('href')?.includes('request-audit')
      );
      
      if (requestAuditLinks.length === 0 && 
          (window.location.pathname === '/' || window.location.pathname.includes('/dashboard'))) {
        issues.push({
          type: 'navigation',
          severity: 'high',
          description: 'No clear path to request audit functionality for project owners',
          location: 'Home or Dashboard',
          suggestion: 'Add prominent request audit button/link for project owners',
          affectedStakeholders: ['project-owner'],
          wcagCriterion: 'WCAG 2.4.2 (Page Titled)'
        });
      }
      break;
      
    case 'admin':
      // Admin specific validations
      const adminControls = document.querySelectorAll('[data-admin-control]');
      if (adminControls.length === 0 && window.location.pathname.includes('/admin')) {
        issues.push({
          type: 'ui',
          severity: 'medium',
          description: 'Limited administrative controls for platform management',
          location: 'Admin section',
          suggestion: 'Add comprehensive admin controls with data-admin-control attribute',
          affectedStakeholders: ['admin'],
          wcagCriterion: 'WCAG 3.3.2 (Labels or Instructions)'
        });
      }
      break;
      
    case 'general':
    default:
      // General user validations
      const mainContent = document.querySelector('main');
      if (mainContent && window.getComputedStyle(mainContent).maxWidth === 'none') {
        issues.push({
          type: 'responsive',
          severity: 'medium',
          description: 'Main content area has no max-width, may cause readability issues on large screens',
          location: 'Main content area',
          suggestion: 'Add max-width constraint to main content for better readability',
          affectedStakeholders: ['general', 'auditor', 'project-owner', 'admin'],
          wcagCriterion: 'WCAG 1.4.8 (Visual Presentation)'
        });
      }
      
      // Check for consistent navigation across pages
      const navItems = document.querySelectorAll('nav a').length;
      if (navItems === 0 && !window.location.pathname.includes('/auth')) {
        issues.push({
          type: 'navigation',
          severity: 'high',
          description: 'Page lacks navigation elements',
          location: 'Current page',
          suggestion: 'Add consistent navigation to improve user orientation',
          affectedStakeholders: ['general', 'auditor', 'project-owner'],
          wcagCriterion: 'WCAG 3.2.3 (Consistent Navigation)'
        });
      }
  }
  
  return issues;
};

/**
 * Run validation for all stakeholder types
 */
export const validateAllStakeholderExperiences = (): ValidationIssue[] => {
  return [
    ...validateStakeholderExperience('auditor'),
    ...validateStakeholderExperience('project-owner'),
    ...validateStakeholderExperience('admin'),
    ...validateStakeholderExperience('general')
  ];
};
