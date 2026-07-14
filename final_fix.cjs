const fs = require('fs');
let lines = fs.readFileSync('src/App.tsx', 'utf8').split('\n');

// 1. First part is lines 0 to 5947 (which is 5948 lines)
const partA = lines.slice(0, 5948).join('\n');

// 2. Find the index of the string "{/* Dashboard History Modal */}"
// But wait, there might be multiple occurrences if the file is weird, but we appended it at the end.
// So let's search from the end.
let dashboardIdx = -1;
for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].includes('{/* Dashboard History Modal */}')) {
        dashboardIdx = i;
        break;
    }
}

let partB = "";
if (dashboardIdx !== -1) {
    partB = lines.slice(dashboardIdx).join('\n');
}

let finalCode = partA + '\n' + partB;
fs.writeFileSync('src/App.tsx', finalCode);
console.log("FINAL FIX DONE");
