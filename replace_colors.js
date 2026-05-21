import fs from 'fs';
import path from 'path';

const directoryPath = path.join(process.cwd(), 'src/components');

function replaceColorsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Background colors
  content = content.replace(/bg-\[#0a0a0f\]/g, 'bg-theme-bg');
  content = content.replace(/bg-[#0f0f0f]/g, 'bg-theme-bg');
  content = content.replace(/bg-[#1a1a2e]/g, 'bg-theme-bg');
  
  // Accents
  content = content.replace(/bg-\[#5e67e6\]/g, 'bg-theme-accent');
  content = content.replace(/text-\[#5e67e6\]/g, 'text-theme-accent');
  content = content.replace(/border-\[#5e67e6\]/g, 'border-theme-accent');
  content = content.replace(/ring-\[#5e67e6\]/g, 'ring-theme-accent');
  content = content.replace(/shadow-\[#5e67e6\]/g, 'shadow-theme-accent');
  content = content.replace(/rgba\(94, 103, 230,/g, 'rgba(var(--theme-accent),');
  
  // Lime Accents
  content = content.replace(/bg-\[#c8ff00\]/g, 'bg-theme-accent');
  content = content.replace(/text-\[#c8ff00\]/g, 'text-theme-accent');
  content = content.replace(/rgba\(200, 255, 0,/g, 'rgba(var(--theme-accent),');

  // Text colors
  content = content.replace(/text-[#8f8f8f]/g, 'text-theme-muted');
  content = content.replace(/text-[#5c5c5c]/g, 'text-theme-muted');
  content = content.replace(/text-[#b5b5b5]/g, 'text-theme-muted');

  fs.writeFileSync(filePath, content, 'utf8');
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      replaceColorsInFile(fullPath);
    }
  }
}

walkDir(directoryPath);
console.log('Colors replaced successfully!');
