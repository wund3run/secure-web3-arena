#!/bin/bash
# Task Master CLI Wrapper
export PATH="/Users/tarunrama/.npm-global/bin:$PATH"

# Add npm global bin to PATH if not already there
if [[ ":$PATH:" != *":/Users/tarunrama/.npm-global/bin:"* ]]; then
    export PATH="/Users/tarunrama/.npm-global/bin:$PATH"
fi

# If task-master exists and is executable, use it
if [ -x "/Users/tarunrama/.npm-global/bin/task-master" ]; then
    "/Users/tarunrama/.npm-global/bin/task-master" "$@"
else
    echo "Task Master CLI not found. Please install with: npm install -g task-master-ai@latest"
    exit 1
fi
