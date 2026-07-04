const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/<LucideIcons\.Archive/g, '<HistoryIcon');
code = code.replace(/LucideIcons\.Archive/g, 'HistoryIcon');

// Let's also change "Arsip" to "Riwayat" if they refer to history.
code = code.replace(/Arsip Bahan Bakar Hari Ini/g, 'Riwayat Bahan Bakar Hari Ini');
code = code.replace(/Arsip Keseluruhan Hari Ini/g, 'Riwayat Keseluruhan Hari Ini');
code = code.replace(/Arsip Suku Cadang Hari Ini/g, 'Riwayat Suku Cadang Hari Ini');
code = code.replace(/>\s*Arsip\s*<\/h2>/g, '> Riwayat </h2>');

fs.writeFileSync('src/App.tsx', code);
console.log("Fixed all history icons and text");
