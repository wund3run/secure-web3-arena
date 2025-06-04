
#!/bin/bash

echo "🔍 Starting Security Audit for Escrow Smart Contracts..."

# Create logs directory if it doesn't exist
mkdir -p logs

# Ethereum/Solidity Security Checks
echo "📋 Running Solidity security checks..."

# Check if slither is installed
if command -v slither &> /dev/null; then
    echo "Running Slither analysis..."
    slither src/utils/blockchain/contracts/solidity/ --json logs/slither-report.json || echo "Slither analysis completed with warnings"
else
    echo "⚠️  Slither not installed. Install with: pip install slither-analyzer"
fi

# Check if solhint is installed
if command -v solhint &> /dev/null; then
    echo "Running Solhint analysis..."
    solhint 'src/utils/blockchain/contracts/solidity/**/*.sol' > logs/solhint-report.txt || echo "Solhint analysis completed with warnings"
else
    echo "⚠️  Solhint not installed. Install with: npm install -g solhint"
fi

# Check if mythril is installed
if command -v myth &> /dev/null; then
    echo "Running Mythril analysis..."
    myth analyze src/utils/blockchain/contracts/solidity/EscrowContract.sol --json > logs/mythril-report.json || echo "Mythril analysis completed with warnings"
else
    echo "⚠️  Mythril not installed. Install with: pip install mythril"
fi

# Rust/Solana Security Checks
echo "📋 Running Rust security checks..."

# Check if cargo-audit is installed
if command -v cargo-audit &> /dev/null; then
    echo "Running Cargo Audit..."
    cd src/utils/blockchain/contracts/rust/escrow_program
    cargo audit --json > ../../../../../logs/cargo-audit-report.json || echo "Cargo audit completed with warnings"
    cd - > /dev/null
else
    echo "⚠️  Cargo Audit not installed. Install with: cargo install cargo-audit"
fi

# TypeScript/JavaScript Security Checks
echo "📋 Running npm audit..."
npm audit --json > logs/npm-audit-report.json || echo "npm audit completed with warnings"

echo "✅ Security audit completed. Check logs/ directory for detailed reports."
echo ""
echo "📊 Summary of generated reports:"
echo "  - logs/slither-report.json (if Slither installed)"
echo "  - logs/solhint-report.txt (if Solhint installed)" 
echo "  - logs/mythril-report.json (if Mythril installed)"
echo "  - logs/cargo-audit-report.json (if Cargo Audit installed)"
echo "  - logs/npm-audit-report.json"
echo ""
echo "🔧 To install missing tools:"
echo "  - Slither: pip install slither-analyzer"
echo "  - Solhint: npm install -g solhint"
echo "  - Mythril: pip install mythril"
echo "  - Cargo Audit: cargo install cargo-audit"
