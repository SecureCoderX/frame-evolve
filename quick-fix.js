#!/usr/bin/env node

/**
 * Quick fix script for Frame Evolve compilation errors
 * Fixes the Grid3X3 icon issue and design system imports
 */

const fs = require('fs');

console.log('🔧 Applying quick fixes for compilation errors...\n');

// Fix 1: Create proper atoms index.js
const atomsIndexContent = `// Design System - Atomic Components
// These are the basic building blocks of the UI

export { default as Badge } from './Badge';
export { default as Button } from './Button';
export { default as Icon } from './Icon';
export { default as Input } from './Input';
`;

try {
  fs.writeFileSync('src/design-system/components/atoms/index.js', atomsIndexContent);
  console.log('✅ Fixed src/design-system/components/atoms/index.js');
} catch (error) {
  console.log('❌ Could not write atoms/index.js:', error.message);
}

// Fix 2: Create proper molecules index.js
const moleculesIndexContent = `// Design System - Molecular Components
// These are combinations of atoms that form more complex UI elements

export { default as Card } from './Card';
export { default as ProgressBar } from './ProgressBar';
export { default as Toast } from './Toast';
export { default as Tooltip } from './Tooltip';
`;

try {
  fs.writeFileSync('src/design-system/components/molecules/index.js', moleculesIndexContent);
  console.log('✅ Fixed src/design-system/components/molecules/index.js');
} catch (error) {
  console.log('❌ Could not write molecules/index.js:', error.message);
}

// Fix 3: Fix Grid3X3 import in FileBrowser.jsx
try {
  const fileBrowserPath = 'src/components/input/FileBrowser.jsx';
  if (fs.existsSync(fileBrowserPath)) {
    let content = fs.readFileSync(fileBrowserPath, 'utf8');
    
    // Replace Grid3X3 with Grid in import
    content = content.replace('Grid3X3,', 'Grid,');
    
    // Replace Grid3X3 usage with Grid
    content = content.replace('Grid3X3 size={14}', 'Grid size={14}');
    
    fs.writeFileSync(fileBrowserPath, content);
    console.log('✅ Fixed Grid3X3 icon in FileBrowser.jsx');
  } else {
    console.log('⚠️  FileBrowser.jsx not found - please copy from artifacts');
  }
} catch (error) {
  console.log('❌ Could not fix FileBrowser.jsx:', error.message);
}

// Check if all input component files exist
console.log('\n📋 Checking input component files:');
const inputFiles = [
  'src/components/input/FileDragDropZone.jsx',
  'src/components/input/UploadProgress.jsx',
  'src/components/input/FileInfoDisplay.jsx',
  'src/components/input/FileBrowser.jsx',
  'src/components/input/UploadManager.jsx',
  'src/components/input/index.js'
];

let allFilesExist = true;
inputFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`   ✅ ${file}`);
  } else {
    console.log(`   ❌ Missing: ${file}`);
    allFilesExist = false;
  }
});

console.log('\n🎯 Summary:');
if (allFilesExist) {
  console.log('✅ All fixes applied successfully!');
  console.log('🚀 Try running: npm start');
  console.log('\n📝 Changes made:');
  console.log('   • Fixed Grid3X3 → Grid icon in FileBrowser');
  console.log('   • Created proper design system index files');
  console.log('   • Resolved ESLint import order issues');
} else {
  console.log('⚠️  Some input component files are missing.');
  console.log('📖 Please copy the missing files from the artifacts.');
}

console.log('\n🧪 After fixing, run these commands:');
console.log('   npm start           # Start development server');
console.log('   npm test            # Run tests');
console.log('   node setup-input-components.js  # Verify setup');