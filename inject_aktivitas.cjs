const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const target = `                        ))}
                    </div>
                  );`;

const rep = `                        ))}

                      {/* AKTIVITAS SECTION */}
                      {historySubTab === "aktivitas" &&
                        (riwayatList.length === 0 ? (
                          <div className="bg-slate-50 border border-dashed border-slate-300 rounded-3xl p-10 text-center flex flex-col items-center justify-center gap-2">
                            <h4 className="font-bold text-slate-700 text-sm">
                              Belum ada aktivitas
                            </h4>
                          </div>
                        ) : (
                          riwayatList.map((day: any) => (
                            <div key={day.date} className="flex flex-col gap-2 animate-fade-in">
                              <div className="flex justify-between items-center px-1">
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                  {formatDateDisplay(day.date)}
                                </span>
                              </div>
                              <div className="flex flex-col gap-2">
                                {day.items.map((item: any, idx: number) => {
                                  if (item.type === "trip") {
                                    return (
                                      <SwipeActionRow
                                        key={item.id || idx}
                                        onEdit={() => { setSelectedTripForEdit(item); setShowTripModal(true); }}
                                        onDelete={() => {
                                          if (confirm("Hapus perjalanan ini?")) {
                                            const updated = tripHistory.filter((t: any) => t.id !== item.id);
                                            setTripHistory(updated);
                                            localStorage.setItem("fc_trip_history", JSON.stringify(updated));
                                          }
                                        }}
                                        onPress={() => { setSelectedTripForEdit(item); setShowTripModal(true); }}
                                      >
                                        <div className="bg-white border border-emerald-100 hover:border-emerald-200 rounded-2xl p-4 flex items-center justify-between transition-all w-full cursor-pointer">
                                          <div className="flex items-center gap-3 w-full">
                                            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                                              <MapPinned className="w-5 h-5" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                              <div className="text-sm font-bold text-slate-800 truncate">
                                                {item.originName && item.destinationName ? \`\${item.originName} - \${item.destinationName}\` : "Perjalanan"}
                                              </div>
                                              <div className="text-[11px] font-bold tracking-wide text-slate-400 uppercase mt-0.5">
                                                {item.distance?.toFixed(1)} km
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </SwipeActionRow>
                                    );
                                  }
                                  return (
                                    <SwipeActionRow
                                      key={item.id || idx}
                                      onEdit={() => {
                                        if (item.type === "bbm") {
                                          const log = history.find((h: any) => h.id === item.id);
                                          if (log) openEditModal(log);
                                        } else if (item.type === "parts") {
                                          const expense = expenseHistory.find((e: any) => e.id === item.id);
                                          if (expense) openExpenseModal(expense);
                                        }
                                      }}
                                      onDelete={() => {
                                        if (item.type === "bbm") {
                                          if (confirm("Hapus log BBM ini?")) { handleDeleteItem(item.id); }
                                        } else if (item.type === "parts") {
                                          if (confirm("Hapus pengeluaran ini?")) { deleteExpense(item.id); }
                                        }
                                      }}
                                      onPress={() => {
                                        if (item.type === "bbm") {
                                          const log = history.find((h: any) => h.id === item.id);
                                          if (log) openEditModal(log);
                                        } else if (item.type === "parts") {
                                          const expense = expenseHistory.find((e: any) => e.id === item.id);
                                          if (expense) openExpenseModal(expense);
                                        }
                                      }}
                                    >
                                      <div className="bg-white border border-slate-100 hover:border-slate-200 rounded-2xl p-4 flex items-center justify-between transition-all w-full cursor-pointer">
                                        <div className="flex items-center gap-3 w-full">
                                          <div className={\`w-10 h-10 rounded-full flex items-center justify-center shrink-0 \${item.type === "bbm" ? "bg-sky-50 text-sky-500" : "bg-orange-50 text-orange-500"}\`}>
                                            {item.type === "bbm" ? <Droplets className="w-5 h-5" /> : <Wrench className="w-5 h-5" />}
                                          </div>
                                          <div className="flex-1 min-w-0">
                                            <div className="text-sm font-bold text-slate-800 truncate">
                                              {item.type === "bbm" ? "Isi BBM" : "Servis " + item.name}
                                            </div>
                                            <div className="text-[11px] font-bold tracking-wide text-slate-400 uppercase mt-0.5">
                                              {item.type === "bbm" ? formatCurrency(item.price) : formatCurrency(item.cost)}
                                            </div>
                                          </div>
                                          <div className="flex items-center gap-3 shrink-0">
                                            {item.type === "bbm" && (
                                              <div className="font-mono text-sm font-bold text-sky-600">
                                                +{formatNumber(item.volume, 2)} {volUnit === "gallon" ? "G" : "L"}
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </SwipeActionRow>
                                  );
                                })}
                              </div>
                            </div>
                          ))
                        ))}
                    </div>
                  );`;

code = code.replace(target, rep);
fs.writeFileSync('src/App.tsx', code);
