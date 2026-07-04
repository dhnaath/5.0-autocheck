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
    if (path.node.openingElement.name.name === 'div') {
      const children = path.node.children.filter(c => c.type === 'JSXElement');
      // find which child is a div
      let divCount = 0;
      children.forEach((child, index) => {
        if (child.openingElement.name.name === 'div') {
          divCount++;
          if (divCount === 2) {
            // this is a div:nth-of-type(2)
            // does it have a button as a direct child?
            const childDivChildren = child.children.filter(c => c.type === 'JSXElement');
            let buttonCount = 0;
            childDivChildren.forEach((cc, cIdx) => {
              if (cc.openingElement.name.name === 'button') {
                buttonCount++;
                if (buttonCount === 1) {
                  console.log("Found div:nth-of-type(2) > button:nth-of-type(1) at line", cc.loc.start.line);
                }
              }
            });
          }
        }
      });
    }
  }
});
