
#!/usr/bin/env node

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

console.log('🔍 Starting Security Audit for Escrow Smart Contracts...');

// Helper function to check if a command exists
function commandExists(command) {
  try {
    execSync(`which ${command}`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

// Helper function to run command and capture output
function runSecurityTool(command, outputFile, description) {
  console.log(`Running ${description}...`);
  try {
    const output = execSync(command, { encoding: 'utf8', timeout: 30000 });
    if (outputFile) {
      fs.writeFileSync(path.join(logsDir, outputFile), output);
    }
    console.log(`✅ ${description} completed`);
    return true;
  } catch (error) {
    console.log(`⚠️  ${description} completed with warnings`);
    if (outputFile && error.stdout) {
      fs.writeFileSync(path.join(logsDir, outputFile), error.stdout);
    }
    return false;
  }
}

// Ethereum/Solidity Security Checks
console.log('\n📋 Running Solidity security checks...');

if (commandExists('slither')) {
  runSecurityTool(
    'slither src/utils/blockchain/contracts/solidity/ --json',
    'slither-report.json',
    'Slither analysis'
  );
} else {
  console.log('⚠️  Slither not installed. Install with: pip install slither-analyzer');
}

if (commandExists('solhint')) {
  runSecurityTool(
    "solhint 'src/utils/blockchain/contracts/solidity/**/*.sol'",
    'solhint-report.txt',
    'Solhint analysis'
  );
} else {
  console.log('⚠️  Solhint not installed. Install with: npm install -g solhint');
}

if (commandExists('myth')) {
  runSecurityTool(
    'myth analyze src/utils/blockchain/contracts/solidity/EscrowContract.sol --json',
    'mythril-report.json',
    'Mythril analysis'
  );
} else {
  console.log('⚠️  Mythril not installed. Install with: pip install mythril');
}

// Rust/Solana Security Checks
console.log('\n📋 Running Rust security checks...');

if (commandExists('cargo-audit')) {
  try {
    process.chdir('src/utils/blockchain/contracts/rust/escrow_program');
    runSecurityTool(
      'cargo audit --json',
      '../../../../../logs/cargo-audit-report.json',
      'Cargo Audit'
    );
    process.chdir('../../../../../..');
  } catch (error) {
    console.log('⚠️  Error running cargo audit:', error.message);
  }
} else {
  console.log('⚠️  Cargo Audit not installed. Install with: cargo install cargo-audit');
}

// TypeScript/JavaScript Security Checks
console.log('\n📋 Running npm audit...');
runSecurityTool('npm audit --json', 'npm-audit-report.json', 'npm audit');

console.log('\n✅ Security audit completed. Check logs/ directory for detailed reports.');
console.log('\n📊 Summary of generated reports:');
console.log('  - logs/slither-report.json (if Slither installed)');
console.log('  - logs/solhint-report.txt (if Solhint installed)');
console.log('  - logs/mythril-report.json (if Mythril installed)');
console.log('  - logs/cargo-audit-report.json (if Cargo Audit installed)');
console.log('  - logs/npm-audit-report.json');
console.log('\n🔧 To install missing tools:');
console.log('  - Slither: pip install slither-analyzer');
console.log('  - Solhint: npm install -g solhint');
console.log('  - Mythril: pip install mythril');
console.log('  - Cargo Audit: cargo install cargo-audit');
