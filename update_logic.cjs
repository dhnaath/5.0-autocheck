const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const target1 = `                  // 1. PENGELUARAN (Expenses)
                  const recentFuelExpenses = isAll
                    ? history
                    : history.filter((h) => h.timestamp >= cutoff);

                  const recentGeneralExpenses = isAll
                    ? expenseHistory
                    : expenseHistory.filter((h) => h.timestamp >= cutoff);

                  const expByDate = recentGeneralExpenses.reduce(
                    (acc: any, curr: any) => {
                      if (!acc[curr.date])
                        acc[curr.date] = {
                          date: curr.date,
                          totalCost: 0,
                          items: [],
                        };
                      acc[curr.date].totalCost += curr.cost;
                      acc[curr.date].items.push({ ...curr, type: "general" });
                      return acc;
                    },
                    {},
                  );

                  const expList = Object.values(expByDate).sort(
                    (a: any, b: any) =>
                      b.items[0].timestamp - a.items[0].timestamp,
                  );`;

const rep1 = `                  // 1. KEUANGAN (Expenses & Income)
                  const recentFuelExpenses = isAll
                    ? history
                    : history.filter((h) => h.timestamp >= cutoff);

                  const recentGeneralExpenses = isAll
                    ? expenseHistory
                    : expenseHistory.filter((h) => h.timestamp >= cutoff);

                  const recentIncome = isAll
                    ? incomeHistory
                    : incomeHistory.filter((h) => h.timestamp >= cutoff);

                  const keuanganByDate: any = {};
                  recentGeneralExpenses.forEach((curr: any) => {
                    if (!keuanganByDate[curr.date]) {
                      keuanganByDate[curr.date] = { date: curr.date, totalCost: 0, totalInc: 0, items: [] };
                    }
                    keuanganByDate[curr.date].totalCost += curr.cost;
                    keuanganByDate[curr.date].items.push({ ...curr, type: "general" });
                  });

                  recentIncome.forEach((curr: any) => {
                    if (!keuanganByDate[curr.date]) {
                      keuanganByDate[curr.date] = { date: curr.date, totalCost: 0, totalInc: 0, items: [] };
                    }
                    keuanganByDate[curr.date].totalInc += curr.total;
                    keuanganByDate[curr.date].items.push({ ...curr, type: "income" });
                  });

                  const keuanganList = Object.values(keuanganByDate).map((day: any) => {
                    day.items.sort((a: any, b: any) => b.timestamp - a.timestamp);
                    return day;
                  }).sort((a: any, b: any) => b.items[0].timestamp - a.items[0].timestamp);`;

code = code.replace(target1, rep1);

const target2 = `                  // 3. PENDAPATAN (Income)
                  const recentIncome = isAll
                    ? incomeHistory
                    : incomeHistory.filter((h) => h.timestamp >= cutoff);

                  const incByDate = recentIncome.reduce(
                    (acc: any, curr: any) => {
                      if (!acc[curr.date])
                        acc[curr.date] = {
                          date: curr.date,
                          totalInc: 0,
                          items: [],
                        };
                      acc[curr.date].totalInc += curr.total;
                      acc[curr.date].items.push(curr);
                      return acc;
                    },
                    {},
                  );

                  const incList = Object.values(incByDate).sort(
                    (a: any, b: any) =>
                      b.items[0].timestamp - a.items[0].timestamp,
                  );`;

code = code.replace(target2, "");
fs.writeFileSync('src/App.tsx', code);
