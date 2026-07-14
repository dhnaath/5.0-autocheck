const fs = require('fs');
const code = fs.readFileSync('src/App.tsx', 'utf8');
let round = 0, curly = 0, square = 0;
let inString = false, stringChar = '';
let line = 1, col = 0;

for (let i = 0; i < code.length; i++) {
  const c = code[i];
  if (c === '\n') { line++; col = 0; continue; }
  col++;
  
  if (inString) {
    if (c === '\\') { i++; continue; }
    if (c === stringChar) { inString = false; }
    continue;
  }
  
  if (c === '"' || c === "'" || c === '`') {
    inString = true;
    stringChar = c;
    continue;
  }
  
  if (c === '(') round++;
  else if (c === ')') {
    round--;
    if (round < 0) { console.log(`Unmatched ) at line ${line}:${col}`); break; }
  }
  else if (c === '{') curly++;
  else if (c === '}') {
    curly--;
    if (curly < 0) { console.log(`Unmatched } at line ${line}:${col}`); break; }
  }
  else if (c === '[') square++;
  else if (c === ']') {
    square--;
    if (square < 0) { console.log(`Unmatched ] at line ${line}:${col}`); break; }
  }
}
console.log(`round: ${round}, curly: ${curly}, square: ${square}`);
