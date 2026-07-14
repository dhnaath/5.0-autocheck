const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const targetToRemove = `                  // 3. PENDAPATAN (Income)
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

code = code.replace(targetToRemove, "");

// also fix unterminated regex or wrong tag
// wait, the error said:
// 4033|                    </div>
// 4034|                  )}
// 4035|                  {activeTab === "map" && (
const searchJSX = `</div>
                    </div>
                  )}
                  {activeTab === "map" && (`;
code = code.replace(searchJSX, `                    </div>
                  </div>
                )}
                {activeTab === "map" && (`);

fs.writeFileSync('src/App.tsx', code);
