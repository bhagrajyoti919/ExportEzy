const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting Vercel build process...');
console.log('Current directory:', process.cwd());
console.log('Node version:', process.version);

try {
  // List directory contents
  console.log('Directory contents:', fs.readdirSync('.'));
  
  // Install dependencies
  console.log('Installing dependencies...');
  execSync('npm install --prefer-offline', { stdio: 'inherit' });
  
  // Build the project
  console.log('Running build...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('Build completed successfully!');
  process.exit(0);
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
