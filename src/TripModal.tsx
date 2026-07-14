import React, { useState } from "react";
import { Compass, Calculator, Coins, MapPin } from "lucide-react";

export function TripModal({ isOpen, onClose, onSave, onDelete, dashboardEfficiency, activeFuelPrice, initialData }: any) {
  const [origin, setOrigin] = useState(initialData?.originName || "");
  const [destination, setDestination] = useState(initialData?.destinationName || "");
  const [distance, setDistance] = useState<number | "">(initialData?.distance || "");

  if (!isOpen) return null;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(val);
  };

  const distVal = Number(distance) || 0;
  const estFuelUsed = dashboardEfficiency > 0 ? distVal / dashboardEfficiency : 0;
  const estCost = estFuelUsed * (activeFuelPrice || 0);

  const handleSave = () => {
    if (!origin || !destination || distVal <= 0) return;
    onSave({
      originName: origin,
      destinationName: destination,
      distance: distVal,
      estFuelUsed,
      notes: ""
    });
  };

  return (
    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center z-50 p-4">
      <div
        className="bg-white rounded-3xl w-full max-w-sm border border-slate-100 overflow-hidden flex flex-col font-sans"
        style={{ animation: "fade-in 0.2s ease-out" }}
      >
        <div className="bg-slate-900 text-white py-4 px-5 flex justify-between items-center select-none">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-indigo-400" />
            <span className="font-bold tracking-tight">
              Catat Perjalanan
            </span>
          </div>
        </div>

        <div className="p-5 flex flex-col gap-5 bg-slate-50 overflow-y-auto">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-700 leading-tight">
              Titik Awal
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="Lokasi Awal"
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 text-slate-900 text-sm font-bold rounded-xl outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-700 leading-tight">
              Titik Akhir
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-400" />
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Tujuan"
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 text-slate-900 text-sm font-bold rounded-xl outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-700 leading-tight">
              Total Jarak (KM)
            </label>
            <input
              type="number"
              value={distance}
              onChange={(e) => setDistance(parseFloat(e.target.value) || "")}
              placeholder="0"
              className="w-full px-4 py-3 bg-white border border-slate-200 text-slate-900 text-sm font-bold rounded-xl outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Biaya & Estimasi */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col gap-3 mt-1 shadow-sm">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-100 pb-2">
              <Calculator className="w-3.5 h-3.5 text-slate-400" />
              Statistik Biaya
            </h4>
            <div className="flex justify-between items-end">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Est. Bahan Bakar</span>
                <span className="text-sm font-bold text-slate-800 font-mono">
                  {estFuelUsed.toFixed(2)} L
                </span>
              </div>
              <div className="flex flex-col items-end gap-0.5">
                <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider flex items-center gap-1">
                  <Coins className="w-3 h-3" /> Est. Biaya
                </span>
                <span className="text-lg font-bold text-emerald-700 font-mono leading-none">
                  {formatCurrency(estCost)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white border-t border-slate-100 flex gap-3">
          {onDelete && initialData && (
            <button
              onClick={() => {
                if (confirm("Hapus perjalanan ini?")) {
                  onDelete();
                }
              }}
              className="py-3 px-4 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl hover:bg-rose-100 transition-colors flex items-center justify-center shrink-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
            </button>
          )}
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-colors text-sm"
          >
            Batal
          </button>
          <button
            onClick={() => {
              if (!origin) { alert("Titik Awal wajib diisi!"); return; }
              if (!destination) { alert("Titik Akhir wajib diisi!"); return; }
              if (distVal <= 0) { alert("Total Jarak wajib diisi!"); return; }
              handleSave();
            }}
            className="flex-1 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors text-sm"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
