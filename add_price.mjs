import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Add state variable
content = content.replace(
  '  const [partFormLifespan, setPartFormLifespan] = useState<string>("");\n',
  '  const [partFormLifespan, setPartFormLifespan] = useState<string>("");\n  const [partFormPrice, setPartFormPrice] = useState<string>("");\n'
);

// 2. Init openAddPart
content = content.replace(
  '    setPartFormLifespan("10000");\n',
  '    setPartFormLifespan("10000");\n    setPartFormPrice("");\n'
);

// 3. Init openEditPart
content = content.replace(
  '    setPartFormLifespan(part.lifespanKm?.toString() || "");\n',
  '    setPartFormLifespan(part.lifespanKm?.toString() || "");\n    setPartFormPrice(part.price?.toString() || "");\n'
);

// 4. Update savePart
content = content.replace(
  '    const lifespanNum = parseFloat(partFormLifespan) || 10000;\n',
  '    const lifespanNum = parseFloat(partFormLifespan) || 10000;\n    const priceNum = parseFloat(partFormPrice) || 0;\n'
);

content = content.replace(
  '                lifespanKm: lifespanNum,\n',
  '                lifespanKm: lifespanNum,\n                price: priceNum,\n'
);

content = content.replace(
  '        lifespanKm: lifespanNum,\n',
  '        lifespanKm: lifespanNum,\n        price: priceNum,\n'
);

// 5. Add UI Inputs
const uiRow = `
                    <div className="flex gap-4">
                      <div className="flex flex-col gap-2 flex-1 w-1/2">
                        <label className="text-xs font-bold text-slate-700 leading-tight">
                          Harga (Opsional):
                        </label>
                        <input
                          type="number"
                          value={partFormPrice}
                          onChange={(e) => setPartFormPrice(e.target.value)}
                          placeholder="50000"
                          className="w-full bg-white border border-slate-200 text-slate-900 text-sm font-bold py-3 px-4 rounded-xl outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                        />
                      </div>
                      <div className="flex flex-col gap-2 flex-1 w-1/2">
                        <label className="text-xs font-bold text-slate-700 leading-tight">
                          Biaya / KM (Estimasi):
                        </label>
                        <div className="w-full bg-slate-100 border border-slate-200 text-slate-500 text-sm font-bold py-3 px-4 rounded-xl outline-none select-none flex items-center justify-between overflow-hidden">
                          <span className="truncate">
                            {(() => {
                              const price = parseFloat(partFormPrice) || 0;
                              const lifespan = parseFloat(partFormLifespan) || 0;
                              if (lifespan <= 0 || price <= 0) return "Rp 0";
                              return "Rp " + (price / lifespan).toFixed(2);
                            })()}
                          </span>
                          <span className="text-xs font-normal text-slate-400 ml-2 whitespace-nowrap">/ KM</span>
                        </div>
                      </div>
                    </div>
`;

content = content.replace(
  `                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-700 leading-tight">
                        Catatan:
                      </label>`,
  uiRow + `                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-700 leading-tight">
                        Catatan:
                      </label>`
);

fs.writeFileSync('src/App.tsx', content);
