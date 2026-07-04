const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/const saved = localStorage\.getItem\("fc_max_bars"\);\n\s*return saved \? parseInt\(saved, 10\) : 7;/g, 'const saved = localStorage.getItem("fc_max_bars");\n    return saved ? parseInt(saved, 10) : 10;');
code = code.replace(/setMaxBars\(7\);/g, 'setMaxBars(10);');

fs.writeFileSync('src/App.tsx', code);
console.log("Done");
