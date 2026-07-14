const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const targetStr = `                      const todayFuelLogs = [...history]
                        // removed filter
                        // removed filter
                        // removed filter
                      .sort((a, b) => b.timestamp - a.timestamp);`;

const newStr = `                      const todayFuelLogs = [...history].sort((a, b) => b.timestamp - a.timestamp);`;

code = code.replace(targetStr, newStr);
fs.writeFileSync('src/App.tsx', code);
