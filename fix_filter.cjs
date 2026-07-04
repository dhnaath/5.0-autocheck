const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const targetStr = `                        <button
                          onClick={() => setShowHistoryMenu(!showHistoryMenu)}
                          className="w-10 h-10 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center bg-white active:scale-95"
                        >
                          <MoreHorizontal className="w-5 h-5 text-slate-500" />
                        </button>`;

const replacementStr = `                        <button
                          onClick={() => setShowHistoryMenu(!showHistoryMenu)}
                          className="w-10 h-10 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center bg-white active:scale-95"
                        >
                          <ListFilter className="w-5 h-5 text-slate-500" />
                        </button>`;

if (code.includes(targetStr)) {
  code = code.replace(targetStr, replacementStr);
  fs.writeFileSync('src/App.tsx', code);
  console.log("Fixed successfully.");
} else {
  console.log("Could not find the target string.");
}
