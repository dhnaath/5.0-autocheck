const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const dashStart = code.indexOf('{/* Dashboard History Modal */}');
const nextModal = code.indexOf('showPartsHistoryModal');

if (dashStart !== -1 && nextModal !== -1) {
    let sub = code.substring(dashStart, nextModal);
    sub = sub.replace('Belum ada riwayat hari ini', 'Belum ada arsip hari ini');
    sub = sub.replace('let IconComp = HistoryIcon;', 'let IconComp = LucideIcons.Archive;');
    code = code.substring(0, dashStart) + sub + code.substring(nextModal);
    fs.writeFileSync('src/App.tsx', code);
    console.log("Fixed dashboard text");
} else {
    console.log("Could not find blocks");
}
