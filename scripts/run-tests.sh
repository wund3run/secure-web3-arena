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

echo "Starting comprehensive test suite..."

# 1. Unit Tests
echo -e "\n${YELLOW}Running unit tests...${NC}"
npm run test:unit
print_status $? "Unit tests"

# 2. Integration Tests
echo -e "\n${YELLOW}Running integration tests...${NC}"
npm run test:integration
print_status $? "Integration tests"

# 3. E2E Tests
echo -e "\n${YELLOW}Running E2E tests...${NC}"
npm run test:e2e
print_status $? "E2E tests"

# 4. Performance Tests
echo -e "\n${YELLOW}Running performance tests...${NC}"
npm run test:performance
print_status $? "Performance tests"

# 5. Accessibility Tests
echo -e "\n${YELLOW}Running accessibility tests...${NC}"
npm run test:a11y
print_status $? "Accessibility tests"

# 6. Security Tests
echo -e "\n${YELLOW}Running security tests...${NC}"
npm run test:security
print_status $? "Security tests"

echo -e "\n${GREEN}All tests completed successfully!${NC}" 