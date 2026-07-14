const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const toAppend = `
          {/* Dashboard History Modal */}
          <AnimatePresence>
            {showDashboardHistoryModal && (
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center z-50 p-4">
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 30, scale: 0.95 }}
                  className="bg-white rounded-3xl w-full max-w-sm border border-slate-100 overflow-hidden flex flex-col max-h-[90%] font-sans"
                >
                  <div className="bg-[#0f172b] text-white py-4 px-5 flex justify-between items-center select-none">
                    <div className="flex items-center gap-2">
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
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Parts History Modal */}
          <AnimatePresence>
            {showPartsHistoryModal && (
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center z-50 p-4">
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 30, scale: 0.95 }}
                  className="bg-white rounded-3xl w-full max-w-sm border border-slate-100 overflow-hidden flex flex-col max-h-[90%] font-sans"
                >
                  <div className="bg-[#0f172b] text-white py-4 px-5 flex justify-between items-center select-none">
                    <div className="flex items-center gap-2">
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
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Trip Modal */}
          <AnimatePresence>
            {showTripModal && (
              <TripModal
                isOpen={showTripModal}
                onClose={() => setShowTripModal(false)}
                onSave={(entry) => {
                  setTripHistory([entry, ...tripHistory]);
                  setShowTripModal(false);
                }}
              />
            )}
          </AnimatePresence>

          {/* Income Modal */}
          <AnimatePresence>
            {showIncomeModal && (
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center z-50 p-4">
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 30, scale: 0.95 }}
                  className="bg-white rounded-3xl w-full max-w-sm border border-slate-100 overflow-hidden flex flex-col max-h-[90%] font-sans p-6"
                >
                  <div className="text-center py-6 text-slate-400 text-sm font-medium">Income Form Placeholder</div>
                  <button onClick={() => setShowIncomeModal(false)} className="bg-slate-200 p-2 rounded-lg mt-4">Close</button>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Expense Modal */}
          <AnimatePresence>
            {showExpenseModal && (
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center z-50 p-4">
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 30, scale: 0.95 }}
                  className="bg-white rounded-3xl w-full max-w-sm border border-slate-100 overflow-hidden flex flex-col max-h-[90%] font-sans p-6"
                >
                  <div className="text-center py-6 text-slate-400 text-sm font-medium">Expense Form Placeholder</div>
                  <button onClick={() => setShowExpenseModal(false)} className="bg-slate-200 p-2 rounded-lg mt-4">Close</button>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </TripModalContext.Provider>
  );
}

export default App;
`;

// Truncate the file up to the </AnimatePresence> of Fuel History Modal
const searchStr = '          </AnimatePresence>\n          ';
// But the current file is extremely long (16000 lines).
// I will just find the first occurrence of showPartsHistoryModal in the third repetition.
// Wait, no. The corrupted file has Original[0..X]. So it has length X.
// And X was the index of {/* Dashboard History Modal */}.
// Let's just find the first occurrence of `{/* Dashboard History Modal */}`.
// Oh wait, in the corrupted file, `{/* Dashboard History Modal */}` is NOT PRESENT at all, and it ends at `</AnimatePresence>\n          `.
// So we just take the corrupted file and append our modals!
// Let's check if `export default App;` is already there. It shouldn't be.

if (code.includes('export default App;')) {
    // If it's already there, maybe we are appending too much.
    // Let's just slice it up to the first 'export default App;' and replace.
    const splitIndex = code.indexOf('export default App;');
    code = code.substring(0, splitIndex + 'export default App;'.length);
} else {
    // Just append
    code = code.trimEnd() + '\n' + toAppend;
}

fs.writeFileSync('src/App.tsx', code);
console.log("Appended missing modals");
