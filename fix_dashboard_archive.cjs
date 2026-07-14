const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  /onClick=\{\(\) => setShowDashboardHistoryModal\(true\)\}\s*className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-slate-500 hover:text-slate-700 "\s*>\s*<HistoryIcon className="w-5 h-5" \/>/,
  `onClick={() => setShowDashboardHistoryModal(true)}
                        className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-slate-500 hover:text-slate-700 "
                      >
                        <LucideIcons.Archive className="w-5 h-5" />`
);

code = code.replace(
  /<HistoryIcon className="w-5 h-5 text-indigo-400" \/>\s*<span className="font-bold tracking-tight">\s*Riwayat Keseluruhan Hari Ini\s*<\/span>/,
  `<LucideIcons.Archive className="w-5 h-5 text-indigo-400" />
                      <span className="font-bold tracking-tight">
                        Arsip Keseluruhan Hari Ini
                      </span>`
);

fs.writeFileSync('src/App.tsx', code);
console.log("Fixed dashboard archive");
