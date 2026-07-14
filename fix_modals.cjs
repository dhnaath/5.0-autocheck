const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Fix Fuel History Modal
const fuelHistoryOld = `                    <div className="flex items-center gap-2">
                      <HistoryIcon className="w-5 h-5 text-indigo-400" />
                      <span className="font-bold tracking-tight">
                        Riwayat Bahan Bakar Hari Ini
                      </span>
                    </div>
                    <button
                      onClick={() => setShowFuelHistoryModal(false)}
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors active:scale-95 text-white"
                    >
                      <LucideIcons.X className="w-5 h-5" />
                    </button>
                  </div>
                  <div
                    className="p-4 flex flex-col gap-3 overflow-y-auto"
                    style={{ maxHeight: "400px" }}
                  >
                    {(() => {
                      const todayFuelLogs = history.filter(log => {
                        const d = new Date(log.timestamp);
                        const today = new Date();
                        return d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
                      }).sort((a, b) => b.timestamp - a.timestamp);

                      if (todayFuelLogs.length === 0) {
                        return (
                          <div className="text-center py-6 text-slate-400 text-sm font-medium">
                            Belum ada riwayat hari ini
                          </div>
                        );
                      }

                      return todayFuelLogs.map((log) => (`;

const fuelHistoryNew = `                    <div className="flex items-center gap-2">
                      <HistoryIcon className="w-5 h-5 text-indigo-400" />
                      <span className="font-bold tracking-tight">
                        Riwayat Bahan Bakar
                      </span>
                    </div>
                    <button
                      onClick={() => setShowFuelHistoryModal(false)}
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors active:scale-95 text-white"
                    >
                      <LucideIcons.X className="w-5 h-5" />
                    </button>
                  </div>
                  <div
                    className="p-4 flex flex-col gap-3 overflow-y-auto"
                    style={{ maxHeight: "400px" }}
                  >
                    {(() => {
                      const fuelLogs = history.sort((a, b) => b.timestamp - a.timestamp);

                      if (fuelLogs.length === 0) {
                        return (
                          <div className="text-center py-6 text-slate-400 text-sm font-medium">
                            Belum ada riwayat
                          </div>
                        );
                      }

                      return fuelLogs.map((log) => (`;

if (code.includes(fuelHistoryOld)) {
  code = code.replace(fuelHistoryOld, fuelHistoryNew);
  console.log("Fuel history modal fixed.");
} else {
  console.log("Could not find fuel history modal old text.");
}

// 2. Fix Dashboard History Modal
const dashboardHistoryOld = `                    <div className="flex items-center gap-2">
                      <LucideIcons.Archive className="w-5 h-5 text-indigo-400" />
                      <span className="font-bold tracking-tight">Arsip Keseluruhan Hari Ini</span>
                    </div>
                    <button
                      onClick={() => setShowDashboardHistoryModal(false)}
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors active:scale-95 text-white"
                    >
                      <LucideIcons.X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-4 flex flex-col gap-3 overflow-y-auto" style={{ maxHeight: "400px" }}>
                    <div className="text-center py-6 text-slate-400 text-sm font-medium">Belum ada arsip hari ini</div>
                  </div>`;

const dashboardHistoryNew = `                    <div className="flex items-center gap-2">
                      <LucideIcons.Archive className="w-5 h-5 text-indigo-400" />
                      <span className="font-bold tracking-tight">Arsip Keseluruhan</span>
                    </div>
                    <button
                      onClick={() => setShowDashboardHistoryModal(false)}
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors active:scale-95 text-white"
                    >
                      <LucideIcons.X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-4 flex flex-col gap-3 overflow-y-auto" style={{ maxHeight: "400px" }}>
                    {(() => {
                      const allLogs = [...history, ...expenses, ...incomes, ...trips].sort((a, b) => (b.timestamp || b.date) - (a.timestamp || a.date));
                      if (allLogs.length === 0) {
                         return <div className="text-center py-6 text-slate-400 text-sm font-medium">Belum ada arsip</div>;
                      }
                      return allLogs.map((log: any, idx) => (
                        <div key={idx} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex justify-between items-center">
                          <div className="flex flex-col gap-1">
                            <span className="font-bold text-slate-800 text-sm">{log.type === "fuel" ? "Bahan Bakar" : log.type === "expense" ? "Pengeluaran" : log.type === "income" ? "Pendapatan" : log.type === "trip" ? "Perjalanan" : "Lainnya"}</span>
                            <span className="text-xs text-slate-500 font-medium">{new Date(log.timestamp || log.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'})}</span>
                          </div>
                          {log.amount && <span className="font-bold text-sm text-slate-700">{log.type === "income" ? "+" : "-"}Rp {log.amount.toLocaleString('id-ID')}</span>}
                        </div>
                      ));
                    })()}
                  </div>`;

if (code.includes(dashboardHistoryOld)) {
  code = code.replace(dashboardHistoryOld, dashboardHistoryNew);
  console.log("Dashboard history modal fixed.");
} else {
  console.log("Could not find dashboard history modal old text.");
}

// 3. Fix Parts History Modal
const partsHistoryOld = `                    <div className="flex items-center gap-2">
                      <HistoryIcon className="w-5 h-5 text-indigo-400" />
                      <span className="font-bold tracking-tight">Riwayat Suku Cadang Hari Ini</span>
                    </div>
                    <button
                      onClick={() => setShowPartsHistoryModal(false)}
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors active:scale-95 text-white"
                    >
                      <LucideIcons.X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-4 flex flex-col gap-3 overflow-y-auto" style={{ maxHeight: "400px" }}>
                    <div className="text-center py-6 text-slate-400 text-sm font-medium">Belum ada riwayat hari ini</div>
                  </div>`;

const partsHistoryNew = `                    <div className="flex items-center gap-2">
                      <HistoryIcon className="w-5 h-5 text-indigo-400" />
                      <span className="font-bold tracking-tight">Riwayat Suku Cadang</span>
                    </div>
                    <button
                      onClick={() => setShowPartsHistoryModal(false)}
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors active:scale-95 text-white"
                    >
                      <LucideIcons.X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-4 flex flex-col gap-3 overflow-y-auto" style={{ maxHeight: "400px" }}>
                     {(() => {
                      const allExpenses = expenses.filter(e => e.category === "Suku Cadang").sort((a, b) => b.timestamp - a.timestamp);
                      if (allExpenses.length === 0) {
                         return <div className="text-center py-6 text-slate-400 text-sm font-medium">Belum ada riwayat</div>;
                      }
                      return allExpenses.map((log: any, idx) => (
                        <div key={idx} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex justify-between items-center">
                          <div className="flex flex-col gap-1">
                            <span className="font-bold text-slate-800 text-sm">{log.title || "Penggantian Suku Cadang"}</span>
                            <span className="text-xs text-slate-500 font-medium">{new Date(log.timestamp).toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'})}</span>
                          </div>
                          {log.amount && <span className="font-bold text-sm text-slate-700">-Rp {log.amount.toLocaleString('id-ID')}</span>}
                        </div>
                      ));
                    })()}
                  </div>`;

if (code.includes(partsHistoryOld)) {
  code = code.replace(partsHistoryOld, partsHistoryNew);
  console.log("Parts history modal fixed.");
} else {
  console.log("Could not find parts history modal old text.");
}

fs.writeFileSync('src/App.tsx', code);
