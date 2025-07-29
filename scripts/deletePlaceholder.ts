import fs from 'fs';
import path from 'path';

const filePath = path.join(__dirname, '..', 'pages', 'PlaceholderPage.tsx');

if (fs.existsSync(filePath)) {
  fs.unlinkSync(filePath);
  console.log('Deleted PlaceholderPage.tsx');
} else {
  console.log('PlaceholderPage.tsx not found');
}
