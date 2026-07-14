import fs from 'fs';

const lines = fs.readFileSync('src/App.tsx', 'utf-8').split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('savePart')) {
    console.log(`Line ${i - 1}: ${lines[i - 1].trim()}`);
    console.log(`Line ${i}: ${lines[i].trim()}`);
    console.log(`Line ${i + 1}: ${lines[i + 1].trim()}`);
  }
}
