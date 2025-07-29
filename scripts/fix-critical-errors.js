#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Fix empty interfaces
function fixEmptyInterfaces(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix empty interface declarations
    content = content.replace(
      /export interface \w+\s*extends\s*\w+\s*\{\s*\}\s*/g,
      ''
    );
    
    // Fix interface declarations that are equivalent to their supertype
    content = content.replace(
      /interface (\w+) extends (\w+) \{\s*\}/g,
      'type $1 = $2'
    );
    
    fs.writeFileSync(filePath, content);
    console.log(`Fixed empty interfaces in ${filePath}`);
  } catch (error) {
    console.error(`Error fixing ${filePath}:`, error.message);
  }
}

// Fix require() imports
function fixRequireImports(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace require() with import
    content = content.replace(
      /const\s+(\w+)\s*=\s*require\(['"]([^'"]+)['"]\)/g,
      "import $1 from '$2'"
    );
    
    fs.writeFileSync(filePath, content);
    console.log(`Fixed require imports in ${filePath}`);
  } catch (error) {
    console.error(`Error fixing ${filePath}:`, error.message);
  }
}

// Fix unnecessary escape characters
function fixEscapeCharacters(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix unnecessary escape characters in regex
    content = content.replace(/\\\+/g, '+');
    
    fs.writeFileSync(filePath, content);
    console.log(`Fixed escape characters in ${filePath}`);
  } catch (error) {
    console.error(`Error fixing ${filePath}:`, error.message);
  }
}

// Files to fix
const filesToFix = [
  'src/components/ui/command.tsx',
  'src/components/ui/textarea.tsx',
  'src/utils/validation/InputValidator.ts',
  'src/types/global.d.ts',
  'tailwind.config.ts'
];

console.log('Fixing critical errors...');

filesToFix.forEach(file => {
  if (fs.existsSync(file)) {
    fixEmptyInterfaces(file);
    fixRequireImports(file);
    fixEscapeCharacters(file);
  }
});

console.log('Critical error fixes completed!'); 