const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  /const minDistanceRange = volume \* maxEff; \/\/ maxEff means[\s\S]*?\/\/ maxDistance = volume \* minEff\n      const minDistanceRange = volume \* maxEff;/,
  'const minDistanceRange = volume * maxEff;'
);

fs.writeFileSync('src/App.tsx', code);
console.log("Fixed");
