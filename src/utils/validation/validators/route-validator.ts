
import { ValidationIssue } from "../types";
import { extractRoutesFromApp } from "@/utils/navigation";

/**
 * Validates route structure and navigation elements across the application
 * @returns Array of validation issues related to routing and navigation
 */
export const validateRoutes = (): ValidationIssue[] => {
  const routeIssues: ValidationIssue[] = [];
  
  // Get all valid routes from the application
  const validRoutes = extractRoutesFromApp();
  
  // Check for potential 404 links (links that point to non-existent routes)
  const links = document.querySelectorAll('a');
  
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href === '#' || href.startsWith('http')) {
      return; // Skip empty, placeholder or external links
    }
    
    // Extract the base route without query parameters or hash
    const baseRoute = href.split('?')[0].split('#')[0];
    
    // Check if the link matches any known route pattern
    const isValidRoute = validRoutes.some(validRoute => {
      if (validRoute === baseRoute) return true;
      
      // Handle dynamic route patterns (e.g., /audit/:id)
      if (validRoute.includes(':')) {
        const routeParts = validRoute.split('/');
        const hrefParts = baseRoute.split('/');
        
        if (routeParts.length !== hrefParts.length) return false;
        
        return routeParts.every((part, index) => {
          if (part.startsWith(':')) return true; // Dynamic part
          return part === hrefParts[index];
        });
      }
      
      return false;
    });
    
    if (!isValidRoute) {
      routeIssues.push({
        type: 'navigation',
        severity: 'medium',
        description: 'Link may lead to non-existent route',
        location: `${href}: ${link.textContent || 'unnamed link'}`,
        suggestion: 'Verify this route exists or update the href attribute',
        affectedStakeholders: ['general', 'project-owner', 'auditor', 'admin']
      });
    }
  });
  
  // Check for link visibility and accessibility
  const mainNavLinks = document.querySelectorAll('nav a, header a');
  mainNavLinks.forEach(link => {
    const style = window.getComputedStyle(link);
    if (parseInt(style.fontSize) < 12) {
      routeIssues.push({
        type: 'navigation',
        severity: 'medium',
        description: 'Navigation link font size too small',
        location: `${link.getAttribute('href')}: ${link.textContent || 'unnamed link'}`,
        suggestion: 'Increase font size to at least 14px for better readability',
        affectedStakeholders: ['general', 'auditor', 'project-owner', 'admin']
      });
    }
    
    // Check link text for clarity
    const linkText = link.textContent?.trim().toLowerCase();
    if (linkText === 'click here' || linkText === 'here' || linkText === 'link') {
      routeIssues.push({
        type: 'content',
        severity: 'medium',
        description: 'Non-descriptive link text',
        location: `${link.getAttribute('href')}: ${link.textContent || 'unnamed link'}`,
        suggestion: 'Use descriptive link text that explains where the link leads',
        affectedStakeholders: ['general', 'auditor', 'project-owner', 'admin']
      });
    }
  });
  
  // Check for duplicate links to the same destination in close proximity
  const linkMap = new Map();
  mainNavLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    
    if (!linkMap.has(href)) {
      linkMap.set(href, [link]);
    } else {
      linkMap.get(href).push(link);
    }
  });
  
  // Report duplicates that are close to each other
  linkMap.forEach((links, href) => {
    if (links.length > 1) {
      for (let i = 0; i < links.length - 1; i++) {
        const rect1 = links[i].getBoundingClientRect();
        const rect2 = links[i+1].getBoundingClientRect();
        
        // Check if links are within close proximity
        const closeProximity = Math.abs(rect1.left - rect2.left) < 100 && 
                              Math.abs(rect1.top - rect2.top) < 100;
                              
        if (closeProximity && links[i].textContent === links[i+1].textContent) {
          routeIssues.push({
            type: 'navigation',
            severity: 'low',
            description: 'Duplicate navigation links to the same destination',
            location: `${href}: ${links[i].textContent || 'unnamed link'}`,
            suggestion: 'Remove duplicate links or differentiate their context',
            affectedStakeholders: ['general', 'auditor', 'project-owner', 'admin']
          });
          break; // Only report once per group
        }
      }
    }
  });
  
  return routeIssues;
};
