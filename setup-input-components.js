#!/usr/bin/env node

/**
 * Debug script to identify import/export issues in Frame Evolve
 * This helps find which components are causing the "invalid element type" error
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Debugging import/export issues in Frame Evolve...\n');

// Check 1: Design System Component Files
console.log('📦 Checking Design System Component Files:');
const designSystemFiles = [
  'src/design-system/components/atoms/Button.jsx',
  'src/design-system/components/atoms/Input.jsx',
  'src/design-system/components/atoms/Badge.jsx',
  'src/design-system/components/atoms/Icon.jsx',
  'src/design-system/components/molecules/Card.jsx',
  'src/design-system/components/molecules/Toast.jsx',
  'src/design-system/components/molecules/Tooltip.jsx',
  'src/design-system/components/molecules/ProgressBar.jsx'
];

designSystemFiles.forEach(file => {
  if (fs.existsSync(file)) {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const hasDefaultExport = content.includes('export default');
      const hasNamedExport = content.includes('export {') || content.includes('export const');
      
      console.log(`   ${hasDefaultExport ? '✅' : '❌'} ${file} ${hasDefaultExport ? '(has default export)' : '(missing default export)'}`);
      
      if (!hasDefaultExport) {
        console.log(`      🔧 Fix: Add "export default ComponentName;" to end of file`);
      }
    } catch (error) {
      console.log(`   ❌ ${file} (error reading file)`);
    }
  } else {
    console.log(`   ❌ ${file} (file not found)`);
  }
});

// Check 2: Design System Index Files
console.log('\n📋 Checking Design System Index Files:');
const indexFiles = [
  'src/design-system/components/atoms/index.js',
  'src/design-system/components/molecules/index.js',
  'src/design-system/components/organisms/index.js',
  'src/design-system/index.js'
];

indexFiles.forEach(file => {
  if (fs.existsSync(file)) {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const hasExports = content.includes('export');
      
      console.log(`   ${hasExports ? '✅' : '❌'} ${file} ${hasExports ? '(has exports)' : '(no exports found)'}`);
      
      if (hasExports) {
        const exportCount = (content.match(/export/g) || []).length;
        console.log(`      📊 Found ${exportCount} export statements`);
      }
    } catch (error) {
      console.log(`   ❌ ${file} (error reading file)`);
    }
  } else {
    console.log(`   ❌ ${file} (file not found)`);
    
    // Suggest creating the file
    if (file.includes('atoms/index.js')) {
      console.log(`      💡 Create with: echo "export { default as Button } from './Button';" > ${file}`);
    } else if (file.includes('molecules/index.js')) {
      console.log(`      💡 Create with: echo "export { default as Card } from './Card';" > ${file}`);
    }
  }
});

// Check 3: Input Components
console.log('\n🎯 Checking Input Component Files:');
const inputFiles = [
  'src/components/input/FileDragDropZone.jsx',
  'src/components/input/UploadProgress.jsx',
  'src/components/input/FileInfoDisplay.jsx',
  'src/components/input/FileBrowser.jsx',
  'src/components/input/UploadManager.jsx',
  'src/components/input/index.js'
];

inputFiles.forEach(file => {
  if (fs.existsSync(file)) {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const hasDefaultExport = content.includes('export default');
      
      console.log(`   ${hasDefaultExport ? '✅' : '❌'} ${file} ${hasDefaultExport ? '(has default export)' : '(missing default export)'}`);
    } catch (error) {
      console.log(`   ❌ ${file} (error reading file)`);
    }
  } else {
    console.log(`   ❌ ${file} (file not found)`);
  }
});

// Check 4: Current HomeView Imports
console.log('\n🏠 Checking HomeView Imports:');
const homeViewPath = 'src/components/views/HomeView.jsx';
if (fs.existsSync(homeViewPath)) {
  try {
    const content = fs.readFileSync(homeViewPath, 'utf8');
    const importLines = content.split('\n').filter(line => line.trim().startsWith('import'));
    
    console.log('   Current imports in HomeView:');
    importLines.forEach(line => {
      console.log(`   📄 ${line.trim()}`);
    });
    
    // Check for problematic imports
    const hasDesignSystemImports = content.includes('design-system/components');
    const hasInputImports = content.includes('../input');
    
    if (hasDesignSystemImports) {
      console.log('   ⚠️  Using design system imports - may cause issues if index files missing');
    }
    if (hasInputImports) {
      console.log('   ⚠️  Using input component imports - may cause issues if components missing');
    }
    
  } catch (error) {
    console.log('   ❌ Error reading HomeView.jsx');
  }
} else {
  console.log('   ❌ HomeView.jsx not found');
}

// Suggestions
console.log('\n💡 Debugging Suggestions:');
console.log('1. 🔧 Replace HomeView.jsx with the debug version (uses inline components)');
console.log('2. 📦 Ensure all design system components have "export default ComponentName"');
console.log('3. 📋 Create missing index.js files in design system folders');
console.log('4. 🧪 Test with npm start after each fix');

console.log('\n🚀 Quick Fix Commands:');
console.log('# Use debug version of HomeView:');
console.log('cp HomeView-debug.jsx src/components/views/HomeView.jsx');

console.log('\n# Create atoms index file:');
console.log('echo "export { default as Button } from \'./Button\';" > src/design-system/components/atoms/index.js');

console.log('\n# Create molecules index file:');
console.log('echo "export { default as Card } from \'./Card\';" > src/design-system/components/molecules/index.js');

console.log('\n# Test compilation:');
console.log('npm start');

console.log('\n🎯 Expected Result:');
console.log('After fixes, you should see Frame Evolve loading without import errors.');