const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../src/pages/PlaceholderPage.tsx');

if (fs.existsSync(filePath)) {
  try {
    fs.unlinkSync(filePath);
    console.log(`Successfully deleted ${filePath}`);
  } catch (err) {
    console.error(`Error deleting file: ${err.message}`);
    process.exit(1);
  }
} else {
  console.log(`File not found: ${filePath}`);
}
