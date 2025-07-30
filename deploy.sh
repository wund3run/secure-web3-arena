#!/bin/bash

# Production Deployment Script for Secure Web3 Arena
# This script handles the complete production deployment process

set -e

echo "🚀 Starting production deployment for Secure Web3 Arena..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

print_status "Validating project structure..."

# Install dependencies
print_status "Installing production dependencies..."
npm ci --production=false

# Run security audit
print_status "Running security audit..."
npm audit fix || print_warning "Some security issues couldn't be automatically fixed"

# Build the project
print_status "Building production bundle..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    print_error "Build failed - dist directory not created"
    exit 1
fi

print_status "Build completed successfully!"

# Generate deployment report
echo "📊 Deployment Report" > deployment-report.txt
echo "===================" >> deployment-report.txt
echo "Date: $(date)" >> deployment-report.txt
echo "Commit: $(git rev-parse HEAD)" >> deployment-report.txt
echo "Branch: $(git branch --show-current)" >> deployment-report.txt
echo "" >> deployment-report.txt
echo "Build Statistics:" >> deployment-report.txt
ls -la dist/ >> deployment-report.txt
echo "" >> deployment-report.txt
echo "Package Dependencies:" >> deployment-report.txt
npm list --production >> deployment-report.txt 2>/dev/null || true

print_status "Deployment report generated: deployment-report.txt"

# Deployment instructions
echo ""
echo "🎉 Production build completed successfully!"
echo ""
echo "📋 Next Steps:"
echo "1. Upload the 'dist' folder to your web server"
echo "2. Configure your web server to serve index.html for all routes (SPA mode)"
echo "3. Set up environment variables for production"
echo "4. Configure SSL certificates"
echo "5. Set up monitoring and logging"
echo ""
echo "🔧 For platforms like Vercel, Netlify, or similar:"
echo "   - Point build output to: dist"
echo "   - Set build command to: npm run build"
echo "   - Set install command to: npm ci"
echo ""
echo "🌐 Environment Variables needed:"
echo "   - VITE_SUPABASE_URL"
echo "   - VITE_SUPABASE_ANON_KEY"
echo "   - VITE_APP_ENV=production"
echo ""

print_status "Production deployment preparation complete!"
