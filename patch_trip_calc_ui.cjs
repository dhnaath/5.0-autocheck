const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// The block to replace starts here:
const searchString = '<div className="flex flex-col gap-2">\n                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center block mt-1.5">\n                        {t.trip_distance_lbl}\n                      </label>';

const uiStart = code.indexOf(searchString);
if (uiStart === -1) throw new Error("Could not find start");

const uiEndStr = '</div>\n                    )}';
const uiEnd = code.indexOf(uiEndStr, uiStart) + uiEndStr.length;
if (uiEnd === -1) throw new Error("Could not find end");

let replacement = `
                    <div className="flex bg-slate-100 rounded-xl p-1 mb-2 mt-2">
                      <button
                        onClick={() => setTripCalcMode("distance")}
                        className={\`flex-1 py-2 text-xs font-bold rounded-lg transition-all \${tripCalcMode === "distance" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"}\`}
                      >
                        {lang === "id" ? "Berdasarkan Jarak" : "By Distance"}
                      </button>
                      <button
                        onClick={() => setTripCalcMode("volume")}
                        className={\`flex-1 py-2 text-xs font-bold rounded-lg transition-all \${tripCalcMode === "volume" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"}\`}
                      >
                        {lang === "id" ? "Berdasarkan Volume" : "By Volume"}
                      </button>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center block mt-1.5">
                        {tripCalcMode === "distance" ? t.trip_distance_lbl : (lang === "id" ? \`Volume (\${volUnit === "gallon" ? "Gallon" : "Liter"})\` : \`Volume (\${volUnit === "gallon" ? "Gallons" : "Liters"})\`)}
                      </label>
                      <input
                        type="number"
                        id="calc-trip-distance-input"
                        placeholder={tripCalcMode === "distance" ? t.trip_distance_placeholder : (lang === "id" ? "Masukkan volume..." : "Enter volume...")}
                        value={tripCalcMode === "distance" ? tripDistanceVal : tripVolumeVal}
                        onChange={(e) => tripCalcMode === "distance" ? setTripDistanceVal(e.target.value) : setTripVolumeVal(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-base font-bold py-3 px-4 rounded-2xl text-center outline-none focus:border-slate-800 focus:bg-white focus:ring-1 focus:ring-slate-800 placeholder:text-slate-300"
                      />
                    </div>

                    {tripCalcDetails ? (
                      <div className="bg-slate-900 text-white rounded-2xl p-4 text-center mt-1 text-xs font-mono font-bold leading-normal flex flex-col gap-1 border border-slate-950">
                        <span className="text-xs uppercase font-bold tracking-widest text-emerald-400 block mb-1">
                          {lang === "id"
                            ? "ESTIMASI KEBUTUHAN PERJALANAN"
                            : "ESTIMATED TRAVEL BUDGETS"}
                        </span>
                        
                        {tripCalcDetails.type === "distance" ? (
                          <>
                            <div>
                              {lang === "id" ? "Kebutuhan BBM:" : "Fuel Required:"}{" "}
                              <strong className="text-slate-100">
                                ±{" "}
                                {formatNumber(tripCalcDetails.minVolumeRequired, 2)}{" "}
                                s/d{" "}
                                {formatNumber(tripCalcDetails.maxVolumeRequired, 2)}{" "}
                                {volUnit === "gallon" ? "Gallon" : "Liter"}
                              </strong>
                            </div>
                            <div>
                              {lang === "id"
                                ? "Estimasi Biaya:"
                                : "Budget Required:"}{" "}
                              <strong className="text-emerald-400 text-sm font-sans block mt-1">
                                {formatCurrency(tripCalcDetails.minCostRange)} ~{" "}
                                {formatCurrency(tripCalcDetails.maxCostRange)}
                              </strong>
                            </div>
                          </>
                        ) : (
                          <>
                            <div>
                              {lang === "id" ? "Estimasi Jarak:" : "Estimated Distance:"}{" "}
                              <strong className="text-slate-100">
                                ±{" "}
                                {formatNumber(tripCalcDetails.minDistanceRange, 1)}{" "}
                                s/d{" "}
                                {formatNumber(tripCalcDetails.maxDistanceRange, 1)}{" "}
                                {lang === "id" ? "KM" : "Miles"}
                              </strong>
                            </div>
                            <div>
                              {lang === "id"
                                ? "Estimasi Biaya:"
                                : "Budget Required:"}{" "}
                              <strong className="text-emerald-400 text-sm font-sans block mt-1">
                                {formatCurrency(tripCalcDetails.exactCost)}
                              </strong>
                            </div>
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="border border-dashed border-slate-200 rounded-2xl p-4 text-center items-center justify-center text-slate-400 text-xs font-medium bg-slate-50">
                        {t.trip_calc_empty}
                      </div>
                    )}`;

code = code.substring(0, uiStart) + replacement + code.substring(uiEnd);

fs.writeFileSync('src/App.tsx', code);
console.log("Trip UI patched");
