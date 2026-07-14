import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

const startIndex = content.indexOf('<div className="p-5 flex flex-col gap-5 overflow-y-auto bg-slate-50">');
const endIndex = content.indexOf('<div className="bg-white border-t border-slate-100 p-4 flex gap-2.5">', startIndex);

console.log("START: ", startIndex);
console.log("END: ", endIndex);
