const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// I know that the first part is up to dashStart. 
// dashStart was code.indexOf('{/* Dashboard History Modal */}');
// Wait, in the corrupted file, there might be multiple occurrences.
// The first one is at the original dashStart.
const firstDashStart = code.indexOf('{/* Dashboard History Modal */}');

// The original nextModal was code.indexOf('showPartsHistoryModal');
// Which is the very first occurrence of 'showPartsHistoryModal'.
const firstNextModal = code.indexOf('showPartsHistoryModal');

// The length of Part B is (firstDashStart - firstNextModal).
// So Part C starts at firstDashStart + (firstDashStart - firstNextModal).

const partA = code.substring(0, firstDashStart);
const partC = code.substring(firstDashStart + (firstDashStart - firstNextModal));

// Then I also need to apply the text changes I actually wanted in Part C!
// Since the Dashboard History Modal is in Part C (after dashStart in original).
let correctCode = partA + partC;

// Now let's carefully replace the things in correctCode.
correctCode = correctCode.replace(
  /\{\/\* Dashboard History Modal \*\/\}([\s\S]*?)Belum ada riwayat hari ini/,
  '{/* Dashboard History Modal */}$1Belum ada arsip hari ini'
);

correctCode = correctCode.replace(
  /\{\/\* Dashboard History Modal \*\/\}([\s\S]*?)let IconComp = HistoryIcon;/,
  '{/* Dashboard History Modal */}$1let IconComp = LucideIcons.Archive;'
);


fs.writeFileSync('src/App.tsx', correctCode);
console.log("Recovered!");
