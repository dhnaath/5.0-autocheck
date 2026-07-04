const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/  onPress\?: \(\) => void;\n}\) => \{/, '  onPress?: () => void;\n  key?: React.Key;\n}) => {');

fs.writeFileSync('src/App.tsx', code);
