const fs = require('fs');
const js = fs.readFileSync('dist/assets/index-DpHN-Kxn.js', 'utf8');
console.log(js.length);
console.log(js.indexOf('Suku Cadang'));
console.log(js.indexOf('Dashboard'));
