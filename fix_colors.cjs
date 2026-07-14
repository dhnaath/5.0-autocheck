const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  /<span className=\{\`text-\[10px\] font-bold uppercase transition-colors duration-500 \$\{(activeBar \/ maxBars >= 0\.75 \? "text-white\/80" : "text-slate-500")\}\`\}>\s*Full\s*<\/span>/,
  '<span className={`text-[10px] font-bold uppercase transition-colors duration-500 ${activeBar / maxBars >= 0.75 ? "text-white" : "text-slate-900"}`}>\n                          Full\n                        </span>'
);

code = code.replace(
  /<span className=\{\`text-lg font-bold font-mono leading-tight mb-\[10px\] transition-colors duration-500 \$\{(activeBar \/ maxBars >= 0\.25 \? "text-white" : "text-slate-400")\}\`\}>/,
  '<span className={`text-lg font-bold font-mono leading-tight mb-[10px] transition-colors duration-500 ${activeBar / maxBars >= 0.25 ? "text-white" : "text-slate-900"}`}>'
);

code = code.replace(
  /<span className=\{\`text-\[10px\] font-bold uppercase transition-colors duration-500 \$\{(activeBar \/ maxBars >= 0\.25 \? "text-white\/80" : "text-slate-400")\}\`\}>\s*Empty\s*<\/span>/,
  '<span className={`text-[10px] font-bold uppercase transition-colors duration-500 ${activeBar / maxBars >= 0.25 ? "text-white" : "text-slate-900"}`}>\n                          Empty\n                        </span>'
);

fs.writeFileSync('src/App.tsx', code);
console.log("Done");
