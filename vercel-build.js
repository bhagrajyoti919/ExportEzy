#!/usr/bin/env node
import { execSync } from 'child_process';
import { readdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function runBuild() {
  try {
    console.log('Starting Vercel build process...');
    console.log('Current directory:', process.cwd());
    
    const contents = await readdir('.');
    console.log('Directory contents:', contents);
    
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
}

runBuild();
