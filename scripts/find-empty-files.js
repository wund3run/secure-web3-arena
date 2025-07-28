#!/usr/bin/env node

/**
 * Empty Files Detection Script
 * 
 * This script identifies all empty files in the codebase and provides
 * a detailed analysis of their locations and types.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directories to exclude from analysis
const EXCLUDED_DIRS = [
  '.git',
  'node_modules',
  '.npm',
  'dist',
  'build',
  'coverage',
  '.next',
  '.nuxt',
  '.cache',
  'playwright-report',
  'test-results'
];

// File extensions to categorize
const FILE_CATEGORIES = {
  'Documentation': ['.md', '.txt', '.rst'],
  'JavaScript/TypeScript': ['.js', '.ts', '.jsx', '.tsx', '.mjs'],
  'Styles': ['.css', '.scss', '.sass', '.less'],
  'Config': ['.json', '.yaml', '.yml', '.toml', '.ini', '.env'],
  'SQL': ['.sql'],
  'Other': []
};

class EmptyFileDetector {
  constructor(rootDir) {
    this.rootDir = rootDir;
    this.emptyFiles = [];
    this.totalFiles = 0;
    this.scannedFiles = 0;
  }

  shouldExcludeDir(dirPath) {
    const dirName = path.basename(dirPath);
    return EXCLUDED_DIRS.includes(dirName) || dirName.startsWith('.');
  }

  categorizeFile(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    
    for (const [category, extensions] of Object.entries(FILE_CATEGORIES)) {
      if (extensions.includes(ext)) {
        return category;
      }
    }
    return 'Other';
  }

  async scanDirectory(dirPath) {
    try {
      const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        const relativePath = path.relative(this.rootDir, fullPath);
        
        if (entry.isDirectory()) {
          if (!this.shouldExcludeDir(fullPath)) {
            await this.scanDirectory(fullPath);
          }
        } else if (entry.isFile()) {
          this.totalFiles++;
          
          try {
            const stats = await fs.promises.stat(fullPath);
            this.scannedFiles++;
            
            if (stats.size === 0) {
              this.emptyFiles.push({
                path: relativePath,
                absolutePath: fullPath,
                category: this.categorizeFile(fullPath),
                extension: path.extname(fullPath).toLowerCase() || 'no extension'
              });
            }
          } catch (error) {
            console.warn(`Warning: Could not check file ${relativePath}: ${error.message}`);
          }
        }
      }
    } catch (error) {
      console.warn(`Warning: Could not scan directory ${dirPath}: ${error.message}`);
    }
  }

  async scan() {
    console.log(`🔍 Scanning for empty files in: ${this.rootDir}`);
    console.log(`📁 Excluding directories: ${EXCLUDED_DIRS.join(', ')}\n`);
    
    await this.scanDirectory(this.rootDir);
    
    return this.generateReport();
  }

  generateReport() {
    const report = {
      summary: {
        totalFiles: this.totalFiles,
        scannedFiles: this.scannedFiles,
        emptyFiles: this.emptyFiles.length,
        emptyFilePercentage: ((this.emptyFiles.length / this.scannedFiles) * 100).toFixed(2)
      },
      emptyFiles: this.emptyFiles,
      categorized: this.categorizeEmptyFiles(),
      recommendations: this.generateRecommendations()
    };

    return report;
  }

  categorizeEmptyFiles() {
    const categorized = {};
    
    this.emptyFiles.forEach(file => {
      if (!categorized[file.category]) {
        categorized[file.category] = [];
      }
      categorized[file.category].push(file);
    });

    return categorized;
  }

  generateRecommendations() {
    const recommendations = [];
    const categorized = this.categorizeEmptyFiles();

    if (categorized['Documentation'] && categorized['Documentation'].length > 0) {
      recommendations.push({
        category: 'Documentation',
        issue: `Found ${categorized['Documentation'].length} empty documentation files`,
        suggestion: 'Consider adding content to these files or removing them if no longer needed'
      });
    }

    if (categorized['JavaScript/TypeScript'] && categorized['JavaScript/TypeScript'].length > 0) {
      recommendations.push({
        category: 'Code Files',
        issue: `Found ${categorized['JavaScript/TypeScript'].length} empty code files`,
        suggestion: 'These files may be placeholders or incomplete implementations that need attention'
      });
    }

    if (categorized['Config'] && categorized['Config'].length > 0) {
      recommendations.push({
        category: 'Configuration',
        issue: `Found ${categorized['Config'].length} empty configuration files`,
        suggestion: 'Empty config files might cause issues - verify if they should contain default configurations'
      });
    }

    return recommendations;
  }

  printReport(report) {
    console.log('📊 EMPTY FILES ANALYSIS REPORT');
    console.log('═'.repeat(50));
    
    // Summary
    console.log('\n📈 SUMMARY:');
    console.log(`   Total files found: ${report.summary.totalFiles}`);
    console.log(`   Files scanned: ${report.summary.scannedFiles}`);
    console.log(`   Empty files: ${report.summary.emptyFiles}`);
    console.log(`   Empty file percentage: ${report.summary.emptyFilePercentage}%`);

    // Categorized results
    console.log('\n📂 EMPTY FILES BY CATEGORY:');
    Object.entries(report.categorized).forEach(([category, files]) => {
      console.log(`\n   ${category} (${files.length} files):`);
      files.forEach(file => {
        console.log(`     • ${file.path} ${file.extension !== 'no extension' ? `(${file.extension})` : ''}`);
      });
    });

    // All empty files list
    console.log('\n📋 COMPLETE LIST OF EMPTY FILES:');
    report.emptyFiles.forEach((file, index) => {
      console.log(`   ${index + 1}. ${file.path}`);
    });

    // Recommendations
    if (report.recommendations.length > 0) {
      console.log('\n💡 RECOMMENDATIONS:');
      report.recommendations.forEach((rec, index) => {
        console.log(`\n   ${index + 1}. ${rec.category}:`);
        console.log(`      Issue: ${rec.issue}`);
        console.log(`      Suggestion: ${rec.suggestion}`);
      });
    }

    console.log('\n' + '═'.repeat(50));
    console.log('✅ Analysis complete!');
  }
}

// Main execution
async function main() {
  const rootDir = process.argv[2] || process.cwd();
  
  try {
    const detector = new EmptyFileDetector(rootDir);
    const report = await detector.scan();
    detector.printReport(report);
    
    // Save report to file
    const reportPath = path.join(rootDir, 'empty-files-report.json');
    await fs.promises.writeFile(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n💾 Detailed report saved to: ${reportPath}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Check if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export default EmptyFileDetector;