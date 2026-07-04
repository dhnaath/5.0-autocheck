import fs from 'fs';
import { JSDOM } from 'jsdom';

const html = fs.readFileSync('rendered.html', 'utf8');
const dom = new JSDOM(html);
const doc = dom.window.document;

function query(sel) {
  const el = doc.querySelector(sel);
  if (el) {
    console.log("Selector:", sel);
    console.log("Text:", el.textContent?.trim());
    console.log("Class:", el.className);
    console.log("InnerHTML:", el.innerHTML);
  } else {
    console.log("Not found:", sel);
  }
}

query("div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(4) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > span:nth-of-type(1)");
