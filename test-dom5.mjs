import fs from 'fs';
import { JSDOM } from 'jsdom';

const html = fs.readFileSync('rendered.html', 'utf8');
const dom = new JSDOM(html);
const doc = dom.window.document;

function query(sel) {
  const el = doc.querySelector(sel);
  if (el) {
    console.log("Found:", sel);
    console.log("Text:", el.textContent?.trim());
    console.log("Class:", el.className);
    console.log("InnerHTML:", el.innerHTML);
    
    // Also, print the path
    let current = el;
    let path = [];
    while (current && current.tagName) {
      path.unshift(current.tagName + (current.id ? '#'+current.id : '') + '.' + current.className.split(' ').join('.'));
      current = current.parentElement;
    }
    console.log("Path:", path.join(' > '));
  } else {
    console.log("Not found:", sel);
  }
}

// Let's try to query for ANY button that is inside 6 divs!
const buttons = doc.querySelectorAll('div > div > div > div > div > div > div > button');
buttons.forEach((b, i) => {
    let path = [];
    let current = b;
    while(current && current.tagName !== 'BODY') {
        let nth = 1;
        let sibling = current.previousElementSibling;
        while(sibling) {
            if (sibling.tagName === current.tagName) nth++;
            sibling = sibling.previousElementSibling;
        }
        path.unshift(`${current.tagName.toLowerCase()}${current.id ? '#'+current.id : ''}:nth-of-type(${nth})`);
        current = current.parentElement;
    }
    console.log("Button", i, path.join(' > '), b.textContent?.trim());
});

