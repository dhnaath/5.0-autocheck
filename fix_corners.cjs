const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const targetStr = `                    <div className={\`bg-white border border-slate-200 p-4 flex flex-col gap-4 overflow-y-auto max-h-[600px] scrollbar-hide pb-20 relative z-0 font-sans text-left \${
                      historySubTab === "keuangan" ? "rounded-b-[20px] rounded-tl-[20px]" :
                      "rounded-[20px]"
                    }\`}>`;

const replacementStr = `                    <div className={\`bg-white border border-slate-200 p-4 flex flex-col gap-4 overflow-y-auto max-h-[600px] scrollbar-hide pb-20 relative z-0 font-sans text-left \${
                      historySubTab === "keuangan" ? "rounded-b-[20px] rounded-tl-[20px]" :
                      "rounded-b-[20px] rounded-tr-[20px]"
                    }\`}>`;

if (code.includes(targetStr)) {
  code = code.replace(targetStr, replacementStr);
  fs.writeFileSync('src/App.tsx', code);
  console.log("Fixed successfully.");
} else {
  console.log("Could not find the target string.");
}
