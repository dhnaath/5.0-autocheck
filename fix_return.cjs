const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/                  \);\n                    <div className/g, '                  );\n                  return (\n                    <div className');

fs.writeFileSync('src/App.tsx', code);
console.log("Done");
