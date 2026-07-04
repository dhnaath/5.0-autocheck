const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// I will look for all rounded-b-[20px] logic.
const matches = code.match(/className=\{`([^`]+)`\}/g);
if (matches) {
  matches.forEach(m => {
    if (m.includes('rounded-b-[20px]')) {
      console.log(m);
    }
  });
}
