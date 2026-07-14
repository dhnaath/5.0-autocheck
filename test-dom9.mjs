import { JSDOM } from "jsdom";
import fs from "fs";

const html = fs.readFileSync("rendered.html", "utf-8");
const dom = new JSDOM(`<!DOCTYPE html><div id="root">${html}</div>`);
const root = dom.window.document.querySelector("div#root");

// We can just dump the tags and classnames of children of `root > div > div`
const mainApp = root.firstElementChild.firstElementChild;
if (mainApp) {
    for (let i=0; i<mainApp.children.length; i++) {
        console.log(`Child ${i+1}: ${mainApp.children[i].tagName} ${mainApp.children[i].className.substring(0, 50)}`);
    }
}
