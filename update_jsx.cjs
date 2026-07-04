const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const target1 = `                      historySubTab === "pengeluaran" ? "rounded-b-[20px] rounded-tr-[20px]" :
                      historySubTab === "pendapatan" ? "rounded-b-[20px] rounded-tl-[20px]" :
                      "rounded-[20px]"
                    }\`}>
                      <div className="text-[10px] sm:text-xs font-bold tracking-widest text-slate-400 capitalize text-center w-full relative z-20">
                        {historyMode}
                      </div>

                      {/* PENGELUARAN SECTION */}
                      {historySubTab === "pengeluaran" &&`;

const rep1 = `                      historySubTab === "keuangan" ? "rounded-b-[20px] rounded-tl-[20px]" :
                      "rounded-[20px]"
                    }\`}>
                      <div className="text-[10px] sm:text-xs font-bold tracking-widest text-slate-400 capitalize text-center w-full relative z-20">
                        {historyMode}
                      </div>

                      {/* KEUANGAN SECTION */}
                      {historySubTab === "keuangan" &&`;

code = code.replace(target1, rep1);

const target2 = `                      {/* PENGELUARAN SECTION */}
                      {historySubTab === "pengeluaran" &&
                        (expList.length === 0 ? (`;

const rep2 = `                      {/* KEUANGAN SECTION */}
                      {historySubTab === "keuangan" &&
                        (keuanganList.length === 0 ? (`;

code = code.replace(target2, rep2);

const target3 = `                            <h4 className="font-bold text-slate-700 text-sm">
                              Belum ada pengeluaran
                            </h4>
                          </div>
                        ) : (
                          expList.map((day: any) => (`;

const rep3 = `                            <h4 className="font-bold text-slate-700 text-sm">
                              Belum ada transaksi
                            </h4>
                          </div>
                        ) : (
                          keuanganList.map((day: any) => (`;

code = code.replace(target3, rep3);

const target4 = `                                <span className="text-xs font-bold text-rose-600">
                                  {formatCurrency(day.totalCost)}
                                </span>
                              </div>
                              <div className="flex flex-col gap-2">
                                {day.items.map((item: any) => (`;

const rep4 = `                                <div className="flex gap-2">
                                  {day.totalCost > 0 && <span className="text-xs font-bold text-rose-600">
                                    {formatCurrency(day.totalCost)}
                                  </span>}
                                  {day.totalInc > 0 && <span className="text-xs font-bold text-emerald-600">
                                    {formatCurrency(day.totalInc)}
                                  </span>}
                                </div>
                              </div>
                              <div className="flex flex-col gap-2">
                                {day.items.map((item: any) => (`;

code = code.replace(target4, rep4);

const target5 = `                                  <SwipeActionRow
                                    key={item.id}
                                    onEdit={() => {
                                      if (item.type === "general") {
                                        openExpenseModal(item);
                                      } else {
                                        const log = history.find((h: any) => h.id === item.id);
                                        if (log) openEditModal(log);
                                      }
                                    }}
                                    onDelete={() => {
                                      if (item.type === "general") {
                                        deleteExpense(item.id);
                                      } else {
                                        if (confirm("Hapus log BBM ini?")) {
                                          handleDeleteItem(item.id);
                                        }
                                      }
                                    }}
                                    onPress={() => {
                                      if (item.type === "general") {
                                        openExpenseModal(item);
                                      } else {
                                        const log = history.find((h: any) => h.id === item.id);
                                        if (log) openEditModal(log);
                                      }
                                    }}
                                  >
                                    <div className="bg-white border border-rose-100 hover:border-rose-200 rounded-2xl p-4 flex items-center justify-between transition-all w-full cursor-pointer">
                                      <div className="flex items-center gap-3 w-full">
                                        <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
                                          {item.type === "general" ? (
                                            <TrendingDown className="w-5 h-5" />
                                          ) : (
                                            <Flame className="w-5 h-5" />
                                          )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <div className="text-sm font-bold text-slate-800">
                                            {item.type === "general"
                                              ? item.platform
                                                ? \`\${item.platform} - \${item.notes || "Pengeluaran"}\`
                                                : item.notes || "Pengeluaran"
                                              : item.fuelType}
                                          </div>
                                          <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                                            {item.type === "general" ? (
                                              <div className="flex flex-wrap gap-1">
                                                {item.odometer > 0 ? (
                                                  <span>
                                                    Odo: {item.odometer} Km
                                                  </span>
                                                ) : null}
                                                {item.distance > 0 ? (
                                                  <span>
                                                    | Jarak: {item.distance} Km
                                                  </span>
                                                ) : null}
                                                {item.otherCost !== 0 &&
                                                item.otherCost !== undefined ? (
                                                  <span>
                                                    | Lain:{" "}
                                                    {formatCurrency(
                                                      item.otherCost || 0,
                                                    )}
                                                  </span>
                                                ) : null}
                                              </div>
                                            ) : (
                                              \`BBM \${formatNumber(item.volume, 2)} \${
                                                volUnit === "gallon"
                                                  ? "Gal"
                                                  : "L"
                                              }\`
                                            )}
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-3 shrink-0">
                                          <div className="font-mono text-base font-bold text-rose-600">
                                            {formatCurrency(
                                              item.type === "general"
                                                ? item.cost
                                                : item.totalPrice,
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </SwipeActionRow>`;

const rep5 = `                                  <SwipeActionRow
                                    key={item.id}
                                    onEdit={() => {
                                      if (item.type === "general") {
                                        openExpenseModal(item);
                                      } else if (item.type === "income") {
                                        openIncomeModal(item);
                                      }
                                    }}
                                    onDelete={() => {
                                      if (item.type === "general") {
                                        deleteExpense(item.id);
                                      } else if (item.type === "income") {
                                        if (confirm("Hapus pendapatan ini?")) {
                                          deleteIncome(item.id);
                                        }
                                      }
                                    }}
                                    onPress={() => {
                                      if (item.type === "general") {
                                        openExpenseModal(item);
                                      } else if (item.type === "income") {
                                        openIncomeModal(item);
                                      }
                                    }}
                                  >
                                    <div className={\`bg-white border rounded-2xl p-4 flex items-center justify-between transition-all w-full cursor-pointer \${item.type === 'income' ? 'border-emerald-100 hover:border-emerald-200' : 'border-rose-100 hover:border-rose-200'}\`}>
                                      <div className="flex items-center gap-3 w-full">
                                        <div className={\`w-10 h-10 rounded-full flex items-center justify-center shrink-0 \${item.type === 'income' ? 'bg-emerald-50 text-emerald-500' : 'bg-rose-50 text-rose-500'}\`}>
                                          {item.type === "general" ? (
                                            <TrendingDown className="w-5 h-5" />
                                          ) : (
                                            <TrendingUp className="w-5 h-5" />
                                          )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <div className="text-sm font-bold text-slate-800">
                                            {item.type === "general"
                                              ? item.platform
                                                ? \`\${item.platform} - \${item.notes || "Pengeluaran"}\`
                                                : item.notes || "Pengeluaran"
                                              : item.platform || "Pendapatan"}
                                          </div>
                                          <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                                            {item.type === "general" ? (
                                              <div className="flex flex-wrap gap-1">
                                                {item.odometer > 0 ? (
                                                  <span>
                                                    Odo: {item.odometer} Km
                                                  </span>
                                                ) : null}
                                                {item.distance > 0 ? (
                                                  <span>
                                                    | Jarak: {item.distance} Km
                                                  </span>
                                                ) : null}
                                                {item.otherCost !== 0 &&
                                                item.otherCost !== undefined ? (
                                                  <span>
                                                    | Lain:{" "}
                                                    {formatCurrency(
                                                      item.otherCost || 0,
                                                    )}
                                                  </span>
                                                ) : null}
                                              </div>
                                            ) : (
                                              <div className="flex flex-wrap gap-1">
                                                {item.distance > 0
                                                ? \`\${item.distance} km \`
                                                : ""}
                                                {item.ratePerKm > 0
                                                  ? \`@ \${formatCurrency(item.ratePerKm)}/km \`
                                                  : ""}
                                                {item.otherCost !== 0
                                                  ? \`| Lain: \${formatCurrency(item.otherCost || 0)}\`
                                                  : ""}
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-3 shrink-0">
                                          <div className={\`font-mono text-base font-bold \${item.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}\`}>
                                            {formatCurrency(
                                              item.type === "general"
                                                ? item.cost
                                                : item.total,
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </SwipeActionRow>`;

code = code.replace(target5, rep5);

fs.writeFileSync('src/App.tsx', code);
