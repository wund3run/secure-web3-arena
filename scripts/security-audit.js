
#!/usr/bin/env node

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Configuration
const CONFIG = {
  port: process.env.AUDIT_PORT || 3001,
  logLevel: process.env.LOG_LEVEL || 'info',
  timeout: 30000
};

// Audit results storage
let auditResults = {
  status: 'idle', // idle, running, completed, error
  progress: 0,
  results: {},
  startTime: null,
  endTime: null,
  reports: []
};

console.log('🔍 Starting Security Audit Server for Escrow Smart Contracts...');

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
function runSecurityTool(command, outputFile, description, callback) {
  console.log(`Running ${description}...`);
  
  return new Promise((resolve, reject) => {
    try {
      const child = spawn('sh', ['-c', command], {
        stdio: ['pipe', 'pipe', 'pipe'],
        timeout: CONFIG.timeout
      });

      let stdout = '';
      let stderr = '';

      child.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      child.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      child.on('close', (code) => {
        const output = stdout || stderr;
        
        if (outputFile && output) {
          const reportPath = path.join(logsDir, outputFile);
          fs.writeFileSync(reportPath, output);
          
          auditResults.reports.push({
            name: description,
            file: outputFile,
            path: reportPath,
            status: code === 0 ? 'success' : 'warning',
            timestamp: new Date().toISOString()
          });
        }

        console.log(`${code === 0 ? '✅' : '⚠️'} ${description} completed`);
        
        if (callback) callback(code === 0, output);
        resolve({ success: code === 0, output, code });
      });

      child.on('error', (error) => {
        console.log(`❌ ${description} failed:`, error.message);
        if (callback) callback(false, error.message);
        reject(error);
      });

    } catch (error) {
      console.log(`❌ ${description} failed:`, error.message);
      if (callback) callback(false, error.message);
      reject(error);
    }
  });
}

// Security audit functions
async function runSolidityAudit() {
  console.log('\n📋 Running Solidity security checks...');
  const tools = [];

  if (commandExists('slither')) {
    tools.push(runSecurityTool(
      'slither src/utils/blockchain/contracts/solidity/ --json',
      'slither-report.json',
      'Slither analysis'
    ));
  }

  if (commandExists('solhint')) {
    tools.push(runSecurityTool(
      "solhint 'src/utils/blockchain/contracts/solidity/**/*.sol'",
      'solhint-report.txt',
      'Solhint analysis'
    ));
  }

  if (commandExists('myth')) {
    tools.push(runSecurityTool(
      'myth analyze src/utils/blockchain/contracts/solidity/EscrowContract.sol --json',
      'mythril-report.json',
      'Mythril analysis'
    ));
  }

  return Promise.allSettled(tools);
}

async function runRustAudit() {
  console.log('\n📋 Running Rust security checks...');
  
  if (commandExists('cargo-audit')) {
    const originalDir = process.cwd();
    try {
      const rustDir = 'src/utils/blockchain/contracts/rust/escrow_program';
      if (fs.existsSync(rustDir)) {
        process.chdir(rustDir);
        await runSecurityTool(
          'cargo audit --json',
          '../../../../../logs/cargo-audit-report.json',
          'Cargo Audit'
        );
      }
    } finally {
      process.chdir(originalDir);
    }
  }
}

async function runNpmAudit() {
  console.log('\n📋 Running npm audit...');
  return runSecurityTool('npm audit --json', 'npm-audit-report.json', 'npm audit');
}

// Main audit function
async function runFullAudit() {
  auditResults.status = 'running';
  auditResults.startTime = new Date().toISOString();
  auditResults.progress = 0;
  auditResults.reports = [];

  try {
    // Run Solidity audit (40% of progress)
    await runSolidityAudit();
    auditResults.progress = 40;

    // Run Rust audit (20% of progress)
    await runRustAudit();
    auditResults.progress = 60;

    // Run npm audit (40% of progress)
    await runNpmAudit();
    auditResults.progress = 100;

    auditResults.status = 'completed';
    auditResults.endTime = new Date().toISOString();
    
    console.log('\n✅ Security audit completed successfully!');
    return auditResults;

  } catch (error) {
    auditResults.status = 'error';
    auditResults.endTime = new Date().toISOString();
    console.error('❌ Security audit failed:', error.message);
    throw error;
  }
}

// HTTP Server for web interface
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  try {
    switch (pathname) {
      case '/api/audit/start':
        if (req.method === 'POST') {
          if (auditResults.status === 'running') {
            res.writeHead(409, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Audit already running' }));
            return;
          }

          // Start audit in background
          runFullAudit().catch(console.error);
          
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Audit started', status: 'running' }));
        }
        break;

      case '/api/audit/status':
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(auditResults));
        break;

      case '/api/audit/reports':
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(auditResults.reports));
        break;

      case '/api/audit/report':
        const filename = parsedUrl.query.file;
        if (filename && auditResults.reports.find(r => r.file === filename)) {
          const filePath = path.join(logsDir, filename);
          if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ content, filename }));
          } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Report not found' }));
          }
        } else {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid filename' }));
        }
        break;

      case '/api/audit/download':
        const downloadFile = parsedUrl.query.file;
        if (downloadFile && auditResults.reports.find(r => r.file === downloadFile)) {
          const filePath = path.join(logsDir, downloadFile);
          if (fs.existsSync(filePath)) {
            res.writeHead(200, {
              'Content-Type': 'application/octet-stream',
              'Content-Disposition': `attachment; filename="${downloadFile}"`
            });
            fs.createReadStream(filePath).pipe(res);
          } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'File not found' }));
          }
        } else {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid filename' }));
        }
        break;

      case '/api/tools/check':
        const tools = {
          slither: commandExists('slither'),
          solhint: commandExists('solhint'),
          mythril: commandExists('myth'),
          cargoAudit: commandExists('cargo-audit')
        };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(tools));
        break;

      default:
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not found' }));
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: error.message }));
  }
});

// Start server if run directly
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('--server')) {
    server.listen(CONFIG.port, () => {
      console.log(`🌐 Security Audit Server running on http://localhost:${CONFIG.port}`);
      console.log('\nAvailable endpoints:');
      console.log('  POST /api/audit/start - Start security audit');
      console.log('  GET  /api/audit/status - Get audit status');
      console.log('  GET  /api/audit/reports - List all reports');
      console.log('  GET  /api/audit/report?file=<filename> - Get specific report');
      console.log('  GET  /api/audit/download?file=<filename> - Download report');
      console.log('  GET  /api/tools/check - Check installed tools');
    });
  } else {
    // Run audit directly
    runFullAudit().then(() => {
      console.log('\n📊 Summary of generated reports:');
      auditResults.reports.forEach(report => {
        console.log(`  - ${report.name}: ${report.file} (${report.status})`);
      });
      
      console.log('\n🔧 To install missing tools:');
      console.log('  - Slither: pip install slither-analyzer');
      console.log('  - Solhint: npm install -g solhint');
      console.log('  - Mythril: pip install mythril');
      console.log('  - Cargo Audit: cargo install cargo-audit');
      
      process.exit(0);
    }).catch((error) => {
      console.error('Audit failed:', error);
      process.exit(1);
    });
  }
}

module.exports = {
  runFullAudit,
  runSolidityAudit,
  runRustAudit,
  runNpmAudit,
  auditResults,
  server
};
