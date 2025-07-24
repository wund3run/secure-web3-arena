#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Function to print status
print_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✓ $2${NC}"
    else
        echo -e "${RED}✗ $2${NC}"
        exit 1
    fi
}

# Function to run tests with retry
run_tests_with_retry() {
    local max_attempts=3
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        echo -e "${YELLOW}Test attempt $attempt of $max_attempts${NC}"
        npm test "$1"
        
        if [ $? -eq 0 ]; then
            return 0
        fi
        
        attempt=$((attempt + 1))
        if [ $attempt -le $max_attempts ]; then
            echo -e "${YELLOW}Retrying in 5 seconds...${NC}"
            sleep 5
        fi
    done
    
    return 1
}

# Start deployment testing
echo "Starting deployment testing process..."

# 1. Check environment
echo -e "\n${YELLOW}Checking environment...${NC}"
node -v
npm -v
print_status $? "Environment check"

# 2. Install dependencies
echo -e "\n${YELLOW}Installing dependencies...${NC}"
npm ci
print_status $? "Dependencies installation"

# 3. Lint check
echo -e "\n${YELLOW}Running lint checks...${NC}"
npm run lint
print_status $? "Lint checks"

# 4. Type checking
echo -e "\n${YELLOW}Running type checks...${NC}"
npm run type-check
print_status $? "Type checks"

# 5. Unit tests
echo -e "\n${YELLOW}Running unit tests...${NC}"
run_tests_with_retry "src/tests/navigation/NavigationLinks.test.tsx"
print_status $? "Navigation tests"

run_tests_with_retry "src/tests/error/ComprehensiveErrorBoundary.test.tsx"
print_status $? "Error handling tests"

# 6. Build check
echo -e "\n${YELLOW}Running build check...${NC}"
npm run build
print_status $? "Build check"

# 7. Performance check
echo -e "\n${YELLOW}Running performance checks...${NC}"
npm run lighthouse
print_status $? "Performance checks"

# 8. Security audit
echo -e "\n${YELLOW}Running security audit...${NC}"
npm audit
print_status $? "Security audit"

# 9. Check bundle size
echo -e "\n${YELLOW}Checking bundle size...${NC}"
npm run analyze-bundle
print_status $? "Bundle size check"

# Final status
echo -e "\n${GREEN}All deployment tests completed successfully!${NC}"

# Generate test report
echo -e "\n${YELLOW}Generating test report...${NC}"
cat << EOF > test-report.md
# Deployment Test Report

## Test Results
- Environment Check: ✓
- Dependencies: ✓
- Lint Checks: ✓
- Type Checks: ✓
- Unit Tests: ✓
- Build Check: ✓
- Performance: ✓
- Security: ✓
- Bundle Size: ✓

## Test Details
- Date: $(date)
- Node Version: $(node -v)
- NPM Version: $(npm -v)
- Commit: $(git rev-parse HEAD)

## Performance Metrics
$(npm run lighthouse -- --json)

## Bundle Size
$(npm run analyze-bundle -- --json)

## Notes
- All tests passed successfully
- Ready for deployment
EOF

print_status $? "Test report generation"

echo -e "\n${GREEN}Deployment testing completed. See test-report.md for details.${NC}" 