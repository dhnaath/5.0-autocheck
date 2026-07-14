import { JSDOM } from "jsdom";
import fs from "fs";

const html = fs.readFileSync("rendered.html", "utf-8");
const dom = new JSDOM(`<!DOCTYPE html><div id="root">${html}</div>`);
const root = dom.window.document.querySelector("div#root");
const mainApp = root.firstElementChild.firstElementChild.firstElementChild; // .w-full.h-full.bg-[#000000]...
console.log(mainApp.children.length);
for (let i=0; i<mainApp.children.length; i++) {
    console.log(`Child ${i+1}: ${mainApp.children[i].className.substring(0, 40)}`);
}
