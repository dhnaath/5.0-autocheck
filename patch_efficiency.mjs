import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

const searchStr = `                          <div className="flex flex-col gap-2 pt-4 border-t border-slate-100">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                              {lang === "id" ? "Tipe Transmisi" : "Transmission Type"}
                            </label>`;

const replaceStr = `                          <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                              {lang === "id" ? "Estimasi Efisiensi (KM/L)" : "Est. Efficiency (KM/L)"}
                            </label>
                            <input
                              type="number"
                              value={dashboardEfficiency || ""}
                              onChange={(e) => setDashboardEfficiency(parseFloat(e.target.value) || 0)}
                              className="py-3 px-4 bg-slate-50 text-slate-900 text-sm font-bold border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all font-mono"
                            />
                          </div>

                          <div className="flex flex-col gap-2 pt-4 border-t border-slate-100">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                              {lang === "id" ? "Tipe Transmisi" : "Transmission Type"}
                            </label>`;

content = content.replace(searchStr, replaceStr);
fs.writeFileSync('src/App.tsx', content);
