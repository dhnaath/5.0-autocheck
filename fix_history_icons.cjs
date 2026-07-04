const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  /onClick=\{\(\) => setShowFuelHistoryModal\(true\)\}\s*className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-slate-500 hover:text-slate-700 "\s*>\s*<LucideIcons\.Archive className="w-5 h-5" \/>/g,
  `onClick={() => setShowFuelHistoryModal(true)}
                        className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-slate-500 hover:text-slate-700 "
                      >
                        <HistoryIcon className="w-5 h-5" />`
);

code = code.replace(
  /onClick=\{\(\) => setShowPartsHistoryModal\(true\)\}\s*className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-slate-500 hover:text-slate-700 "\s*>\s*<LucideIcons\.Archive className="w-5 h-5" \/>/g,
  `onClick={() => setShowPartsHistoryModal(true)}
                        className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-slate-500 hover:text-slate-700 "
                      >
                        <HistoryIcon className="w-5 h-5" />`
);

fs.writeFileSync('src/App.tsx', code);
console.log("Fixed history icons");
