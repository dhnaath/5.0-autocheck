import { JSDOM } from "jsdom";
import fs from "fs";

const html = fs.readFileSync("rendered.html", "utf-8");
const dom = new JSDOM(`<!DOCTYPE html><div id="root">${html}</div>`);
const document = dom.window.document;
const element = document.querySelector("div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(4) > div:nth-of-type(1) > div:nth-of-type(1)");
if (element) {
    console.log("Element found:", element.outerHTML.substring(0, 500));
} else {
    console.log("Element not found. Checking nth-child logic...");
    const root = document.querySelector("div#root");
    let node = root.firstElementChild; // > div:nth-of-type(1)
    if(node) {
        node = node.firstElementChild; // > div:nth-of-type(1)
        if(node) {
            // this node has multiple children
            const children = Array.from(node.children);
            for(let i=0; i<children.length; i++) {
                console.log(`Child ${i+1}: ${children[i].tagName} ${children[i].className.substring(0, 50)}`);
            }
        }
    }
}
