const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/const allLogs = \[\.\.\.history, \.\.\.expenses, \.\.\.incomes, \.\.\.trips\]/g, 'const allLogs = [...history, ...expenseHistory, ...incomeHistory, ...tripHistory]');
code = code.replace(/const allExpenses = expenses\.filter/g, 'const allExpenses = expenseHistory.filter');

fs.writeFileSync('src/App.tsx', code);
