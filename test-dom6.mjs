import { JSDOM } from "jsdom";
import fs from "fs";

const html = fs.readFileSync("rendered.html", "utf-8");
const dom = new JSDOM(`<!DOCTYPE html><div id="root">${html}</div>`);
const root = dom.window.document.querySelector("div#root");

let node = root;
const path = [1, 1, 1, 4, 1, 1];
let currentPath = "div#root";
for (let i = 0; i < path.length; i++) {
    const children = Array.from(node.children).filter(c => c.tagName === "DIV");
    if (children.length >= path[i]) {
        node = children[path[i] - 1];
        currentPath += ` > div:nth-of-type(${path[i]})`;
        console.log(`Step ${i}: ${currentPath} -> class="${node.className}"`);
    } else {
        console.log(`Step ${i}: Child not found at ${currentPath}`);
        break;
    }
}
console.log(node.outerHTML.substring(0, 500));
