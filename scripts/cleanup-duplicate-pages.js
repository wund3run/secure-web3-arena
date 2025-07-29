import fs from 'fs';
import path from 'path';

const filesToDelete = [
  // Main Directory
  'src/pages/SecurityAuditsPage.tsx',
  'src/pages/RequestAuditPage.tsx',
  'src/pages/MarketplacePage.tsx',
  'src/pages/Forum.tsx',

  // Business Directory
  'src/pages/business/ContactPage.tsx',
  'src/pages/business/Careers.tsx',
  'src/pages/business/BusinessPricing.tsx',

  // Community Directory
  'src/pages/community/Forum.tsx',
  'src/pages/community/Events.tsx',
  'src/pages/community/Leaderboard.tsx',
  'src/pages/community/Challenges.tsx',

  // Resources Directory
  'src/pages/resources/SecurityGuidesPage.tsx',
  'src/pages/resources/Templates.tsx',
  'src/pages/resources/Tutorials.tsx',
  'src/pages/resources/KnowledgeBase.tsx',

  // Services Directory
  'src/pages/services/CodeReviews.tsx',
  'src/pages/services/Consulting.tsx',
  'src/pages/services/PenetrationTesting.tsx',

  // Support Directory
  'src/pages/support/FAQ.tsx',
  'src/pages/support/Support.tsx',

  // Tools Directory
  'src/pages/tools/AITools.tsx',
  'src/pages/tools/SecurityInsights.tsx',
  'src/pages/tools/VulnerabilityScanner.tsx',
  'src/pages/tools/PlatformReports.tsx',
  
  // Old Placeholder
  'src/pages/PlaceholderPage.tsx'
];

const projectRoot = process.cwd();

filesToDelete.forEach(file => {
  const filePath = path.join(projectRoot, file);
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      console.log(`Successfully deleted ${filePath}`);
    } catch (err) {
      console.error(`Error deleting file: ${err.message}`);
    }
  } else {
    console.log(`File not found: ${filePath}`);
  }
});
