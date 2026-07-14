const fs = require('fs');
const babel = require('@babel/parser');
try {
  babel.parse(fs.readFileSync('src/App.tsx', 'utf8'), { sourceType: 'module', plugins: ['jsx', 'typescript'] });
  console.log('JSX is valid');
} catch (e) {
  console.log(e);
}
