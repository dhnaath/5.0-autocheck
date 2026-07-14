import fs from 'fs';
import { JSDOM } from 'jsdom';

const html = fs.readFileSync('rendered.html', 'utf8');
const dom = new JSDOM(html);
const doc = dom.window.document;

function query(sel) {
  const el = doc.querySelector(sel);
  if (el) {
    console.log("Selector:", sel);
    console.log("Outer HTML:", el.outerHTML);
  } else {
    console.log("Not found:", sel);
  }
}

query("div#root > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > button:nth-of-type(1)");
