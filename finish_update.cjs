const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Change "riwayat" to "aktivitas" for the riwayat block
const target1 = `                      {/* RIWAYAT SECTION */}
                      {historySubTab === "riwayat" &&`;

const rep1 = `                      {/* AKTIVITAS SECTION */}
                      {historySubTab === "aktivitas" &&`;

code = code.replace(target1, rep1);

// Find the start of the PENDAPATAN SECTION
const pendStart = code.indexOf('{/* PENDAPATAN SECTION */}');
if (pendStart !== -1) {
  // Find the end of this block
  // It ends before TAB 3: SETTINGS VIEW or similar.
  // Actually, wait, it ends before the closing of the history view.
  const endDiv = code.indexOf('</div>\n            )}\n            {/* TAB 3:');
  if (endDiv !== -1) {
    code = code.slice(0, pendStart) + code.slice(endDiv);
  } else {
    // try finding map tab
    const tab4Idx = code.indexOf('{activeTab === "map" && (');
    if (tab4Idx !== -1) {
      // Find the closing </div> for the history tab before tab4Idx
      const beforeTab4 = code.lastIndexOf('</div>', tab4Idx);
      const beforeThat = code.lastIndexOf('</div>', beforeTab4 - 1);
      
      code = code.slice(0, pendStart) + code.slice(beforeThat);
    }
  }
}

fs.writeFileSync('src/App.tsx', code);
