#!/bin/bash
# Script to find and delete empty .md files in secure-web3-arena

cd "/Users/tarunrama/Documents/cursor repo hawkly/secure-web3-arena"

echo "Finding and deleting empty .md files..."

# List of suspected empty .md files based on analysis
empty_files=(
    "HAWKLY_UI_OVERHAUL_TESTING_PLAN.md"
    "IMPLEMENTATION_STATUS_REPORT_JULY_2025.md"  
    "UI_OVERHAUL_PRODUCTION_LAUNCH_PLAN.md"
    "HAWKLY_UI_OVERHAUL_IMPLEMENTATION_COMPLETE.md"
    "IMPLEMENTATION_STATUS_UPDATE_AUGUST_4.md"
    "platformstructure.md"
    "COMPLETE_PLATFORM_MAPPING_ANALYSIS.md"
    "IMPLEMENTATION_STATUS_UPDATE_AUGUST_5.md"
    "UI_OVERHAUL_PRODUCTION_LAUNCH_CHECKLIST.md"
    "IMPLEMENTATION_STATUS_UPDATE_AUGUST_9_UPDATE2.md"
    "SMART_CONTRACT_AUDIT_UI_IMPLEMENTATION_REPORT.md"
    "PENETRATION_TESTING_UI_IMPLEMENTATION_PLAN.md"
    "IMPLEMENTATION_STATUS_UPDATE_AUGUST_1.md"
    "IMPLEMENTATION_STATUS_UPDATE_AUGUST_9_FINAL.md"
    "PENETRATION_TESTING_IMPLEMENTATION_REPORT.md"
    "DASHBOARD_UI_IMPLEMENTATION_PLAN.md"
    "IMPLEMENTATION_STATUS_UPDATE_AUGUST_9_REPLACEMENT.md"
    "INTEGRATION_TESTING_COMPLETE.md"
    "IMPLEMENTATION_STATUS_UPDATE_JULY_31.md"
    "DASHBOARD_UI_IMPLEMENTATION_GUIDE.md"
    "DEPLOYMENT.md"
    "HAWKLY_UI_OVERHAUL_EXECUTIVE_SUMMARY.md"
    "RBAC_STATUS_REPORT.md"
    "IMPLEMENTATION_STATUS_UPDATE_JULY_30.md"
    "AUDIT_REPORT_UI_IMPLEMENTATION.md"
    "MARKETPLACE_UI_IMPLEMENTATION_REPORT.md"
    "HAWKLY_UI_OVERHAUL_QUICKSTART_GUIDE.md"
    "INDEX_PAGE_REPLACEMENT_COMPLETE.md"
    "HAWKLY_UI_OVERHAUL_IMPLEMENTATION_TRACKING.md"
    "PROJECT_DETAILS_UI_IMPLEMENTATION_REPORT.md"
    "GIT_PUSH_DEPLOYMENT_SUCCESS.md"
    "IMPLEMENTATION_STATUS_UPDATE.md"
)

deleted_count=0

# Check each file and delete if empty
for file in "${empty_files[@]}"; do
    if [[ -f "$file" && ! -s "$file" ]]; then
        echo "Deleting empty file: $file"
        rm "$file"
        ((deleted_count++))
    fi
done

# Also find any other empty .md files using find command
echo "Checking for any additional empty .md files..."
find . -name "*.md" -type f -empty -print0 | while IFS= read -r -d '' file; do
    echo "Deleting additional empty file: $file"
    rm "$file"
    ((deleted_count++))
done

echo "Deleted $deleted_count empty .md files."
echo "Task completed."
