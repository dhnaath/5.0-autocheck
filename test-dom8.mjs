import fs from 'fs';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';

const code = fs.readFileSync('src/App.tsx', 'utf8');
const ast = parse(code, {
  sourceType: 'module',
  plugins: ['jsx', 'typescript'],
});

traverse.default(ast, {
  JSXElement(path) {
    if (path.node.openingElement.name.name === 'span') {
        const parent = path.parent;
        if (parent.type === 'JSXElement') {
            const children = path.node.children;
            const text = children.map(c => c.type === 'JSXText' ? c.value : '').join('');
            if (text.includes("Hari Ini")) {
                console.log("Found 'Hari Ini' at line:", path.node.loc.start.line, text.trim());
            }
        }
    }
  }
});
