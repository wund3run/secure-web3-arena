export interface AuditorNavigationLink {
  path: string;
  label: string;
  description: string;
  isActive?: boolean;
  requiredRole?: 'auditor';
}

export const auditorNavigationLinks: AuditorNavigationLink[] = [
  {
    path: '/dashboard/auditor',
    label: 'Auditor Dashboard',
    description: 'Your main auditor workspace with active projects and metrics',
  },
  {
    path: '/auditor/opportunities',
    label: 'Browse Opportunities',
    description: 'Find and apply to new audit projects',
  },
  {
    path: '/auditor/preparation',
    label: 'Audit Preparation',
    description: 'Prepare for active audits and communicate with clients',
  },
  {
    path: '/audits',
    label: 'My Audits',
    description: 'View and manage all your audit projects',
  },
  {
    path: '/auditor/enhanced-dashboard',
    label: 'Enhanced Dashboard',
    description: 'Advanced auditor features and analytics',
  },
  {
    path: '/phase4',
    label: 'AI-Powered Tools',
    description: 'AI analysis, blockchain integration, and enterprise features',
  },
  {
    path: '/profile',
    label: 'Profile Management',
    description: 'Update your auditor profile and credentials',
  },
  {
    path: '/professional-growth',
    label: 'Professional Growth',
    description: 'Skills development and certification tracking',
  },
  {
    path: '/marketplace',
    label: 'Marketplace',
    description: 'Browse the full marketplace of available audits',
  },
  {
    path: '/messages',
    label: 'Messages',
    description: 'Client communications and project discussions',
  },
  {
    path: '/analytics',
    label: 'Analytics',
    description: 'Performance metrics and earnings tracking',
  }
];

export const auditWorkflowSteps = [
  {
    step: 1,
    title: 'Browse & Apply',
    description: 'Find suitable audit projects and submit proposals',
    path: '/auditor/opportunities',
    icon: 'Search',
  },
  {
    step: 2,
    title: 'Prepare',
    description: 'Set up tools, review requirements, communicate with client',
    path: '/auditor/preparation',
    icon: 'FileText',
  },
  {
    step: 3,
    title: 'Conduct Audit',
    description: 'Perform security analysis using AI-powered tools',
    path: '/phase4',
    icon: 'Shield',
  },
  {
    step: 4,
    title: 'Complete & Submit',
    description: 'Finalize findings, upload deliverables, submit to client',
    path: '/audits',
    icon: 'CheckCircle',
  }
];

export const getNavigationForUserRole = (userRole: string | null) => {
  if (userRole === 'auditor') {
    return auditorNavigationLinks;
  }
  
  // Return filtered links for other roles
  return auditorNavigationLinks.filter(link => !link.requiredRole);
};

export const getNextStepInWorkflow = (currentPath: string) => {
  const currentStepIndex = auditWorkflowSteps.findIndex(step => 
    currentPath.includes(step.path.split('/').pop() || '')
  );
  
  if (currentStepIndex >= 0 && currentStepIndex < auditWorkflowSteps.length - 1) {
    return auditWorkflowSteps[currentStepIndex + 1];
  }
  
  return null;
};

export const getPreviousStepInWorkflow = (currentPath: string) => {
  const currentStepIndex = auditWorkflowSteps.findIndex(step => 
    currentPath.includes(step.path.split('/').pop() || '')
  );
  
  if (currentStepIndex > 0) {
    return auditWorkflowSteps[currentStepIndex - 1];
  }
  
  return null;
};

export const validateRoute = (path: string): boolean => {
  const validPaths = [
    ...auditorNavigationLinks.map(link => link.path),
    '/audit-details/:id',
    '/request-audit',
    '/service-provider-onboarding',
    '/auth'
  ];
  
  // Check exact matches
  if (validPaths.includes(path)) {
    return true;
  }
  
  // Check pattern matches (e.g., /audit-details/123)
  const patternMatches = [
    /^\/audit-details\/[a-zA-Z0-9-]+$/,
    /^\/audits\/[a-zA-Z0-9-]+$/,
    /^\/profile\/[a-zA-Z0-9-]+$/
  ];
  
  return patternMatches.some(pattern => pattern.test(path));
}; 