/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from "react";
import {
  Download,
  Upload,
  Fuel,
  History as HistoryIcon,
  TrendingUp,
  TrendingDown,
  FileText,
  Settings as SettingsIcon,
  ChevronLeft,
  ChevronRight,
  CircleChevronRight,
  AlertTriangle,
  CheckCircle,
  Plus,
  Trash2,
  Edit2,
  Gauge,
  Globe,
  CreditCard,
  Calculator,
  Check,
  Zap,
  RefreshCw,
  SlidersHorizontal,
  ChevronDown,
  Percent,
  MapPin,
  Flame,
  Milestone,
  Info,
  QrCode,
  Map,
  MapPinned,
  Wrench,
  Wind,
  Disc,
  Droplets,
  CircleDashed,
  Search,
  MoreHorizontal,
  Battery,
  BatteryCharging,
  BatteryWarning,
  Cog,
  PenTool,
  Activity,
  Filter,
  Layers,
  Car,
  CarFront,
  Thermometer,
  Radio,
  Speaker,
  Volume2,
  Box,
  Key,
  Lock,
  Shield,
  Bike,
  Truck,
  Bus,
  CarTaxiFront,
  Tractor,
  Crosshair,
  Target,
  Cpu,
  Plug,
  PlugZap,
  Scissors,
  Hammer,
  Power,
  Lightbulb,
  Siren,
  Timer,
  Watch,
  Clock,
  Compass,
  Bell,
  Bolt,
  Book,
  Briefcase,
  Camera,
  Circle,
  Hexagon,
  LifeBuoy,
  Link,
  Phone,
  Pickaxe,
  Pipette,
  RotateCw,
  Sparkles,
  Sprout,
  Star,
  ToggleLeft,
  ListFilter,
} from "lucide-react";
import * as LucideIcons from "lucide-react";

const SPARE_PART_ICONS = [
  "Wrench",
  "Fuel",
  "Wind",
  "Disc",
  "Settings",
  "Droplet",
  "Droplets",
  "CircleDashed",
  "Battery",
  "BatteryCharging",
  "BatteryWarning",
  "Cog",
  "PenTool",
  "Activity",
  "Filter",
  "Layers",
  "Car",
  "CarFront",
  "Thermometer",
  "Radio",
  "Speaker",
  "Volume2",
  "Box",
  "Key",
  "Lock",
  "Shield",
  "Bike",
  "Truck",
  "Bus",
  "CarTaxiFront",
  "Tractor",
  "Crosshair",
  "Target",
  "Cpu",
  "Plug",
  "PlugZap",
  "Scissors",
  "Hammer",
  "Power",
  "Lightbulb",
  "Siren",
  "Timer",
  "Watch",
  "Clock",
  "Compass",
  "Bell",
  "Bolt",
  "LifeBuoy",
  "Pickaxe",
  "Pipette",
  "RotateCw",
  "Sparkles",
  "Sprout",
  "Star",
  "Zap",
];

import { motion, AnimatePresence } from "motion/react";
import {
  FuelProfile,
  FuelLog,
  IncomeEntry,
  ExpenseEntry,
  TripEntry,
} from "./types";
import { translations } from "./utils/lang";
import { TripModal } from "./TripModal";

const DEFAULT_PRESETS = [10000, 15000, 20000, 25000];
const DEFAULT_PROFILES: FuelProfile[] = [
  { name: "Pertalite", price: 10000, color: "green" },
  { name: "Pertamax", price: 12200, color: "blue" },
  { name: "Pertamax Turbo", price: 14500, color: "red" },
];

export const getInferredColor = (profileName: string): string => {
  const name = (profileName || "").toLowerCase();
  if (name.includes("lite") && !name.includes("dexlite")) return "green";
  if (name.includes("turbo")) return "red";
  if (name.includes("max") || name.includes("pertamax")) return "blue";
  if (name.includes("dexlite")) return "amber";
  if (
    name.includes("dex") ||
    name.includes("solar") ||
    name.includes("pertamina dex")
  )
    return "gold";
  if (
    name.includes("lime") ||
    name.includes("muda") ||
    name.includes("hijau muda")
  )
    return "lime";
  if (
    name.includes("yellow") ||
    name.includes("kuning") ||
    name.includes("super")
  )
    return "yellow";
  return "green";
};

export const getFuelTheme = (profileName: string, colorKey?: string) => {
  const name = (profileName || "").toLowerCase();
  const color = (colorKey || getInferredColor(profileName)).toLowerCase();

  if (color === "green") {
    return {
      text: "text-emerald-800",
      emeraldText: "text-emerald-700",
      bg: "bg-emerald-500",
      badge: "bg-emerald-100/90 border-emerald-300 text-emerald-800",
      hexColor: "#00a282", // Pertalite green-teal
      secondaryHex: "#047857",
      cardBg: "from-emerald-100/95 via-teal-100/40 to-emerald-50/50",
      border: "border-emerald-400/80",
      gaugeTicks: "#059669",
      dotColor: "bg-emerald-500",
      barBg: "bg-gradient-to-b from-emerald-400 to-teal-500 border-emerald-600",
    };
  } else if (color === "lime") {
    return {
      text: "text-lime-800",
      emeraldText: "text-lime-700",
      bg: "bg-lime-500",
      badge: "bg-lime-100/90 border-lime-300 text-lime-800",
      hexColor: "#84cc16", // Distinct bright electric green (Lime)
      secondaryHex: "#4d7c0f",
      cardBg: "from-lime-100/95 via-emerald-100/40 to-lime-50/50",
      border: "border-lime-400/80",
      gaugeTicks: "#65a30d",
      dotColor: "bg-lime-500",
      barBg: "bg-gradient-to-b from-lime-400 to-green-500 border-lime-600",
    };
  } else if (color === "yellow") {
    return {
      text: "text-yellow-850 text-orange-950",
      emeraldText: "text-yellow-800 border-yellow-250",
      bg: "bg-yellow-500",
      badge: "bg-yellow-100/95 border-yellow-350 text-yellow-900",
      hexColor: "#eab308", // Bright vibrant yellow
      secondaryHex: "#ca8a04",
      cardBg: "from-yellow-100/95 via-orange-50/55 to-yellow-50/50",
      border: "border-yellow-405 border-yellow-400/70",
      gaugeTicks: "#ca8a04",
      dotColor: "bg-yellow-500",
      barBg: "bg-gradient-to-b from-yellow-400 to-orange-500 border-yellow-600",
    };
  } else if (color === "red") {
    return {
      text: "text-rose-800",
      emeraldText: "text-rose-700",
      bg: "bg-rose-600",
      badge: "bg-rose-100/90 border-rose-300 text-rose-800",
      hexColor: "#e11d48", // Pertamax Turbo red
      secondaryHex: "#9f1239",
      cardBg: "from-rose-100/95 via-red-100/40 to-rose-50/50",
      border: "border-rose-400/80",
      gaugeTicks: "#be123c",
      dotColor: "bg-rose-600",
      barBg: "bg-gradient-to-b from-rose-400 to-red-600 border-rose-700",
    };
  } else if (color === "blue") {
    return {
      text: "text-indigo-800",
      emeraldText: "text-indigo-700",
      bg: "bg-indigo-600",
      badge: "bg-indigo-100/90 border-indigo-300 text-indigo-800",
      hexColor: "#0077b6", // Pertamax blue
      secondaryHex: "#1e40af",
      cardBg: "from-blue-100/95 via-sky-100/40 to-blue-50/50",
      border: "border-indigo-400/80",
      gaugeTicks: "#1d4ed8",
      dotColor: "bg-indigo-600",
      barBg: "bg-gradient-to-b from-blue-400 to-sky-600 border-indigo-700",
    };
  } else if (color === "amber") {
    return {
      text: "text-orange-900",
      emeraldText: "text-orange-800",
      bg: "bg-orange-600",
      badge: "bg-orange-100/95 border-orange-300 text-orange-900",
      hexColor: "#b45309", // Dexlite dark brownish bronze/amber
      secondaryHex: "#78350f",
      cardBg: "from-orange-100/95 via-yellow-100/50 to-orange-50/50",
      border: "border-orange-400/70",
      gaugeTicks: "#a16207",
      dotColor: "bg-orange-500",
      barBg: "bg-gradient-to-b from-orange-400 to-yellow-600 border-orange-700",
    };
  } else if (color === "gold") {
    return {
      text: "text-orange-900",
      emeraldText: "text-orange-850",
      bg: "bg-orange-600",
      badge: "bg-orange-100/90 border-orange-300 text-orange-900",
      hexColor: "#ea580c", // Pertamina Dex deep golden amber/orange
      secondaryHex: "#9a3412",
      cardBg: "from-orange-100/95 via-orange-100/45 to-orange-50/50",
      border: "border-orange-400/80",
      gaugeTicks: "#ea580c",
      dotColor: "bg-orange-600",
      barBg: "bg-gradient-to-b from-orange-400 to-orange-500 border-orange-700",
    };
  } else if (color === "purple") {
    return {
      text: "text-violet-900",
      emeraldText: "text-violet-800",
      bg: "bg-violet-600",
      badge: "bg-violet-100/90 border-violet-300 text-violet-900",
      hexColor: "#7c3aed", // Purple fuel
      secondaryHex: "#5b21b6",
      cardBg: "from-violet-100/95 via-fuchsia-100/40 to-violet-50/50",
      border: "border-violet-400/80",
      gaugeTicks: "#6d28d9",
      dotColor: "bg-violet-600",
      barBg:
        "bg-gradient-to-b from-violet-400 to-fuchsia-500 border-violet-700",
    };
  }

  // Default fallback
  return {
    text: "text-emerald-800",
    emeraldText: "text-emerald-700",
    bg: "bg-emerald-500",
    badge: "bg-emerald-100/90 border-emerald-300 text-emerald-800",
    hexColor: "#00a282",
    secondaryHex: "#047857",
    cardBg: "from-emerald-100/95 via-teal-100/40 to-emerald-50/50",
    border: "border-emerald-400/80",
    gaugeTicks: "#059669",
    dotColor: "bg-emerald-500",
    barBg: "bg-gradient-to-b from-emerald-400 to-teal-500 border-emerald-600",
  };
};

const AppDrawerIcon = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <circle cx="7.5" cy="7.5" r="2.5" />
    <circle cx="16.5" cy="7.5" r="2.5" />
    <circle cx="7.5" cy="16.5" r="2.5" />
    <circle cx="16.5" cy="16.5" r="2.5" />
  </svg>
);

const SwipeActionRow = ({
  children,
  onEdit,
  onDelete,
  onPress,
}: {
  children: React.ReactNode;
  onEdit: () => void;
  onDelete: () => void;
  onPress?: () => void;
}) => {
  const [offset, setOffset] = useState(0);
  const startX = React.useRef(0);
  const isDragging = React.useRef(false);
  const draggedDist = React.useRef(0);
  const maxOffset = -120;

  const startY = React.useRef(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX - offset;
    startY.current = e.clientY;
    draggedDist.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    let newOffset = e.clientX - startX.current;
    draggedDist.current = Math.abs(e.clientX - (startX.current + offset));
    if (newOffset > 0) newOffset = 0;
    if (newOffset < maxOffset - 20) newOffset = maxOffset - 20;
    setOffset(newOffset);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    
    const verticalDist = Math.abs(e.clientY - startY.current);

    if (draggedDist.current <= 10 && verticalDist <= 10) {
      // It was a tap, not a swipe or scroll
      if (offset < -10) {
        // Tapped while open, so close it
        setOffset(0);
      } else {
        // Tapped while closed, fire onPress
        if (onPress) onPress();
      }
      return;
    }

    if (offset < maxOffset / 2) {
      setOffset(maxOffset);
    } else {
      setOffset(0);
    }
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-slate-100 touch-pan-y">
      {/* Background Actions */}
      <div className="absolute inset-y-0 right-0 flex items-center justify-end px-2 gap-2 w-[120px]">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setOffset(0);
            onEdit();
          }}
          className="w-11 h-11 flex items-center justify-center bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-colors cursor-pointer"
        >
          <LucideIcons.Edit2 className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setOffset(0);
            onDelete();
          }}
          className="w-11 h-11 flex items-center justify-center bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors cursor-pointer"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {/* Foreground Content */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ transform: `translateX(${offset}px)`, touchAction: "pan-y" }}
        className="relative z-10 w-full transition-transform duration-200 cursor-pointer"
      >
        {children}
      </div>
    </div>
  );
};

const SlideToConfirm = ({
  onConfirm,
  onPlusClick,
  onClickTrack,
  text,
  isConfirmed,
  slideIcon,
  colorClass = "bg-[#0f172b]",
  trackContent,
}: {
  onConfirm: () => void;
  onPlusClick?: () => void;
  onClickTrack?: () => void;
  text?: string;
  isConfirmed?: boolean;
  slideIcon?: React.ReactNode;
  colorClass?: string;
  trackContent?: React.ReactNode;
}) => {
  const [internalConfirmed, setInternalConfirmed] = useState(false);
  const [offset, setOffset] = useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const knobRef = React.useRef<HTMLDivElement>(null);
  const isDragging = React.useRef(false);
  const startX = React.useRef(0);
  const draggedDist = React.useRef(0);

  const confirmedState =
    isConfirmed !== undefined ? isConfirmed : internalConfirmed;

  const handlePointerDown = (e: React.PointerEvent) => {
    if (confirmedState) return;
    isDragging.current = true;
    draggedDist.current = 0;
    startX.current = e.clientX - offset;
    knobRef.current?.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !containerRef.current || !knobRef.current)
      return;

    const maxOffset =
      containerRef.current.clientWidth - knobRef.current.clientWidth - 8;
    let newOffset = e.clientX - startX.current;

    draggedDist.current = Math.abs(e.clientX - (startX.current + offset));

    if (newOffset < 0) newOffset = 0;
    if (newOffset > maxOffset) newOffset = maxOffset;

    setOffset(newOffset);

    if (newOffset >= maxOffset * 0.95) {
      isDragging.current = false;
      setInternalConfirmed(true);
      setOffset(maxOffset);
      onConfirm();
      setTimeout(() => {
        setInternalConfirmed(false);
        setOffset(0);
      }, 2000);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    knobRef.current?.releasePointerCapture(e.pointerId);

    if (draggedDist.current < 10 && offset < 10 && !confirmedState) {
      if (onPlusClick) {
        onPlusClick();
      }
    }

    if (!confirmedState) {
      setOffset(0);
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={(e) => {
        if (draggedDist.current < 20 && offset < 20 && !confirmedState) {
          if (onClickTrack) onClickTrack();
          else if (onPlusClick) onPlusClick();
        }
      }}
      className={`relative w-full h-[64px] rounded-full p-1.5 flex items-center transition-colors overflow-hidden cursor-pointer ${
        confirmedState ? "bg-emerald-500 " : `${colorClass} `
      }`}
      style={{ touchAction: "manipulation" }}
    >
      <div
        className={`absolute inset-0 flex items-center pointer-events-none transition-opacity duration-300 ${offset > 20 ? "opacity-0" : "opacity-100"}`}
      >
        {trackContent ? (
          trackContent
        ) : (
          <span className="w-full text-center text-white text-[13px] font-bold tracking-[0.1em] uppercase">
            {text}
          </span>
        )}
      </div>

      <div
        ref={knobRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onClick={(e) => {
          e.stopPropagation();
          if (draggedDist.current < 20 && offset < 20 && !confirmedState) {
            if (onPlusClick) onPlusClick();
          }
        }}
        className={`h-[52px] w-[52px] rounded-full bg-white flex items-center justify-center cursor-grab active:cursor-grabbing z-10 transition-transform ${isDragging.current ? "duration-0" : "duration-300"}`}
        style={{ transform: `translateX(${offset}px)`, touchAction: "none" }}
      >
        {confirmedState ? (
          <Check className="w-6 h-6 text-emerald-500" strokeWidth={3} />
        ) : (
          slideIcon || <ChevronRight className="w-5 h-5 text-slate-400" />
        )}
      </div>
    </div>
  );
};

export default function App() {
  // --- Persistent States from LocalStorage ---
  const [hasOnboarded, setHasOnboarded] = useState<boolean>(() => {
    return localStorage.getItem("fc_has_onboarded") === "true";
  });

  const [initialOdometer, setInitialOdometer] = useState<number>(() => {
    const saved = localStorage.getItem("fc_initial_odometer");
    return saved ? parseInt(saved, 10) : 0;
  });

  const [vehicleModel, setVehicleModel] = useState<string>(() => {
    return localStorage.getItem("fc_vehicle_model") || "BMW E46";
  });

  const [vehicleType, setVehicleType] = useState<"mobil" | "motor">(() => {
    return (localStorage.getItem("fc_vehicle_type") as "mobil" | "motor") || "mobil";
  });

  const [motorType, setMotorType] = useState<"bensin" | "hybrid" | "ev">(() => {
    return (localStorage.getItem("fc_motor_type") as "bensin" | "hybrid" | "ev") || "bensin";
  });

  const [transmissionType, setTransmissionType] = useState<"manual" | "otomatis">(() => {
    return (localStorage.getItem("fc_transmission_type") as "manual" | "otomatis") || "otomatis";
  });

  const [onboardStep, setOnboardStep] = useState<number>(1);

  const [onboardOdoInput, setOnboardOdoInput] = useState<string>("");

  const [lang, setLang] = useState<"id" | "en">(() => {
    return (localStorage.getItem("fc_lang") as "id" | "en") || "id";
  });

  const [currency, setCurrency] = useState<string>(() => {
    return localStorage.getItem("fc_currency") || "IDR";
  });

  const [separator, setSeparator] = useState<"dot" | "comma">(() => {
    return (localStorage.getItem("fc_separator") as "dot" | "comma") || "dot";
  });

  const [volUnit, setVolUnit] = useState<"liter" | "gallon">(() => {
    return (
      (localStorage.getItem("fc_vol_unit") as "liter" | "gallon") || "liter"
    );
  });

  const [fuelProfiles, setFuelProfiles] = useState<FuelProfile[]>(() => {
    const saved = localStorage.getItem("fc_fuel_profiles");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.map((p: FuelProfile) => ({
            ...p,
            color: p.color || getInferredColor(p.name),
          }));
        }
      } catch (e) {
        console.error(e);
      }
    }
    return DEFAULT_PROFILES;
  });

  const [nominalButtons, setNominalButtons] = useState<number[]>(() => {
    const saved = localStorage.getItem("fc_nominal_buttons");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 4) {
        return DEFAULT_PRESETS;
      }
      return parsed;
    }
    return DEFAULT_PRESETS;
  });

  const [history, setHistory] = useState<FuelLog[]>(() => {
    const saved = localStorage.getItem("fc_logs");
    return saved ? JSON.parse(saved) : [];
  });

  const [spareParts, setSpareParts] = useState<any[]>(() => {
    const defaultParts = [
      { id: "1", name: "Filter Bahan Bakar", category: "Mesin", icon: "Fuel", lastOdo: 0, lastDate: Date.now(), lifespanKm: 10000, lifespanMonths: 12 },
      { id: "2", name: "Oli Mesin", category: "Mesin", icon: "Droplet", lastOdo: 0, lastDate: Date.now(), lifespanKm: 2500, lifespanMonths: 3 },
      { id: "3", name: "Filter Udara", category: "Mesin", icon: "Wind", lastOdo: 0, lastDate: Date.now(), lifespanKm: 15000, lifespanMonths: 12 },
      { id: "4", name: "Carbon Cleaner", category: "Mesin", icon: "Sparkles", lastOdo: 0, lastDate: Date.now(), lifespanKm: 8000, lifespanMonths: 12 },
      { id: "5", name: "Tune Up", category: "Mesin", icon: "Wrench", lastOdo: 0, lastDate: Date.now(), lifespanKm: 8000, lifespanMonths: 12 },
      { id: "6", name: "Oli Transmisi", category: "Transmisi", icon: "Settings", lastOdo: 0, lastDate: Date.now(), lifespanKm: 8000, lifespanMonths: 12 },
      { id: "7", name: "Kampas Rem", category: "Roda & Rem", icon: "Disc", lastOdo: 0, lastDate: Date.now(), lifespanKm: 15000, lifespanMonths: 12 },
      { id: "8", name: "V-Belt CVT", category: "Transmisi", icon: "CircleDashed", lastOdo: 0, lastDate: Date.now(), lifespanKm: 20000, lifespanMonths: 24 },
      { id: "9", name: "Cakram Rem", category: "Roda & Rem", icon: "Disc", lastOdo: 0, lastDate: Date.now(), lifespanKm: 25000, lifespanMonths: 24 },
      { id: "10", name: "Cairan Pendingin", category: "Mesin", icon: "Thermometer", lastOdo: 0, lastDate: Date.now(), lifespanKm: 10000, lifespanMonths: 12 },
      { id: "11", name: "Busi", category: "Mesin", icon: "Zap", lastOdo: 0, lastDate: Date.now(), lifespanKm: 10000, lifespanMonths: 12 },
      { id: "12", name: "Aki", category: "Kelistrikan", icon: "Battery", lastOdo: 0, lastDate: Date.now(), lifespanKm: 50000, lifespanMonths: 24 },
      { id: "13", name: "Roller CVT", category: "Transmisi", icon: "Cog", lastOdo: 0, lastDate: Date.now(), lifespanKm: 15000, lifespanMonths: 12 },
      { id: "14", name: "Filter Oli Mesin", category: "Mesin", icon: "Filter", lastOdo: 0, lastDate: Date.now(), lifespanKm: 5000, lifespanMonths: 12 },
      { id: "15", name: "Tensioner V-Belt", category: "Transmisi", icon: "Cog", lastOdo: 0, lastDate: Date.now(), lifespanKm: 20000, lifespanMonths: 24 },
      { id: "16", name: "Minyak Rem", category: "Roda & Rem", icon: "Droplet", lastOdo: 0, lastDate: Date.now(), lifespanKm: 20000, lifespanMonths: 24 },
      { id: "17a", name: "Ban Depan", category: "Roda & Rem", icon: "CircleDashed", lastOdo: 0, lastDate: Date.now(), lifespanKm: 30000, lifespanMonths: 24 },
      { id: "17b", name: "Ban Belakang", category: "Roda & Rem", icon: "CircleDashed", lastOdo: 0, lastDate: Date.now(), lifespanKm: 30000, lifespanMonths: 24 },
      { id: "18", name: "Oli Shock Breaker", category: "Suspensi", icon: "Activity", lastOdo: 0, lastDate: Date.now(), lifespanKm: 15000, lifespanMonths: 24 }
    ];

    const saved = localStorage.getItem("fc_spareparts_v4") || localStorage.getItem("fc_spareparts_v3");
    if (saved) {
      let parsed = JSON.parse(saved);
      if (parsed.length > 0 && parsed[0].category) {
         // Auto-add new default parts if they don't exist yet
         const existingNames = new Set(parsed.map((p: any) => p.name));
         const toAdd = defaultParts.filter(dp => !existingNames.has(dp.name));
         // Also handle "Ban" to "Ban Depan" / "Ban Belakang" migration if we want, but adding them is safer
         return [...parsed, ...toAdd];
      }
    }
    return defaultParts;
  });

  // Save changes to spare parts
  useEffect(() => {
    localStorage.setItem("fc_spareparts_v4", JSON.stringify(spareParts));
  }, [spareParts]);

  // --- Vehicle Preferences ---

  const [taxAmount, setTaxAmount] = useState<string>(
    () => localStorage.getItem("fc_tax_amount") || "",
  );
  const [taxDate, setTaxDate] = useState<string>(
    () => localStorage.getItem("fc_tax_date") || "",
  );

  useEffect(() => {
    localStorage.setItem("fc_tax_amount", taxAmount);
  }, [taxAmount]);
  useEffect(() => {
    localStorage.setItem("fc_tax_date", taxDate);
  }, [taxDate]);

  const [vehiclePlate, setVehiclePlate] = useState<string>(() => {
    return localStorage.getItem("fc_vehicle_plate") || "B 1234 ABC";
  });

  const [tankCapacity, setTankCapacity] = useState<number>(() => {
    const saved = localStorage.getItem("fc_tank_capacity");
    return saved ? parseFloat(saved) : 4.2;
  });

  const [maxBars, setMaxBars] = useState<number>(() => {
    const saved = localStorage.getItem("fc_max_bars");
    return saved ? parseInt(saved, 10) : 7;
  });

  const [dashboardEfficiency, setDashboardEfficiency] = useState<number>(() => {
    const saved = localStorage.getItem("fc_efficiency");
    return saved ? parseFloat(saved) : 45;
  });

  // --- Internal Calibration values ---
  const [totalLiterMasukInternal, setTotalLiterMasukInternal] =
    useState<number>(() => {
      return parseFloat(localStorage.getItem("fc_total_l_internal") || "0");
    });

  const [totalLompatanBarInternal, setTotalLompatanBarInternal] =
    useState<number>(() => {
      return parseFloat(localStorage.getItem("fc_total_b_internal") || "0");
    });

  // --- UI Operational state ---
  const [activeTab, setActiveTab] = useState<
    "fuel" | "parts" | "dashboard" | "history" | "settings"
  >("fuel");
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const [activeBar, setActiveBar] = useState<number>(3);
  const [selectedProfileIndex, setSelectedProfileIndex] = useState<number>(0);
  const [isFuelSelectOpen, setIsFuelSelectOpen] = useState<boolean>(false);

  // Purchase input configuration
  const [purchaseTab, setPurchaseTab] = useState<
    "buttons" | "manualPrice" | "manualLiters" | "slider"
  >("buttons");
  const [nominalSelected, setNominalSelected] = useState<number>(0);
  const [typedPrice, setTypedPrice] = useState<string>("");
  const [typedVolume, setTypedVolume] = useState<string>("");
  const [precisionSliderValue, setPrecisionSliderValue] = useState<number>(0);

  // --- Step-by-Step Logging Modal ---
  const [showLogModal, setShowLogModal] = useState<boolean>(false);
  const [logModalStep, setLogModalStep] = useState<number>(1);
  const [logOdoInput, setLogOdoInput] = useState<string>("");
  const [logBarAfter, setLogBarAfter] = useState<number>(7);
  const [logEfficiencyInput, setLogEfficiencyInput] = useState<string>("");

  // --- Edit Log Modal ---
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [editLogId, setEditLogId] = useState<string | null>(null);
  const [editLogOdo, setEditLogOdo] = useState<string>("");
  const [editLogBarAfter, setEditLogBarAfter] = useState<number>(1);

  // --- Parts Add/Edit Modal ---
  const [showPartModal, setShowPartModal] = useState<boolean>(false);
  const [partFormId, setPartFormId] = useState<string | null>(null);
  const [partFormName, setPartFormName] = useState<string>("");
  const [partFormMerk, setPartFormMerk] = useState<string>("");
  const [partFormNotes, setPartFormNotes] = useState<string>("");
  const [partFormLifespan, setPartFormLifespan] = useState<string>("");
  const [partFormLastOdo, setPartFormLastOdo] = useState<string>("");
  const [partFormIcon, setPartFormIcon] = useState<string>("Wrench");

  const [showServiceActionModal, setShowServiceActionModal] =
    useState<boolean>(false);
  const [serviceActionPartId, setServiceActionPartId] = useState<string | null>(
    null,
  );
  const [serviceActionCost, setServiceActionCost] = useState<string>("");
  const [serviceActionMerk, setServiceActionMerk] = useState<string>("");
  const [serviceActionNotes, setServiceActionNotes] = useState<string>("");
  const [serviceActionType, setServiceActionType] = useState<
    "ganti_baru" | "perbaiki"
  >("ganti_baru");

  // --- Sync Mode ---
  const [showSyncModal, setShowSyncModal] = useState<boolean>(false);
  const [syncOdoInput, setSyncOdoInput] = useState<string>("");
  const [syncBarAfter, setSyncBarAfter] = useState<number>(1);
  const [expandedPartId, setExpandedPartId] = useState<string | null>(null);
  const [settingsTab, setSettingsTab] = useState<
    | "main"
    | "localization"
    | "fuel"
    | "vehicle"
    | "buttons"
    | "platforms"
    | "reset"
  >("main");
  const [showQuickActionPopup, setShowQuickActionPopup] =
    useState<boolean>(false);

  // --- Income Tracking ---
  const [incomeHistory, setIncomeHistory] = useState<IncomeEntry[]>(() => {
    const saved = localStorage.getItem("fc_income");
    return saved ? JSON.parse(saved) : [];
  });
  const [showIncomeModal, setShowIncomeModal] = useState<boolean>(false);
  const [selectedIncomeForEdit, setSelectedIncomeForEdit] =
    useState<IncomeEntry | null>(null);
  const [incomeRate, setIncomeRate] = useState<string>("");
  const [incomeDistance, setIncomeDistance] = useState<string>("");
  const [incomeOtherCost, setIncomeOtherCost] = useState<string>("");
  const [incomeTotal, setIncomeTotal] = useState<string>("");
  const [incomeNotes, setIncomeNotes] = useState<string>("");
  const [incomeDate, setIncomeDate] = useState<string>("");
  const [incomePlatform, setIncomePlatform] = useState<string>("");
  const [incomePlatforms, setIncomePlatforms] = useState<string[]>(() => {
    const saved = localStorage.getItem("fc_income_platforms");
    return saved
      ? JSON.parse(saved)
      : ["Gojek", "Grab", "Maxim", "inDrive", "ShopeeFood", "SPX Instant"];
  });
  const [dashboardPlatforms, setDashboardPlatforms] = useState<string[]>(() => {
    const saved = localStorage.getItem("fc_dashboard_platforms");
    return saved ? JSON.parse(saved) : ["Gojek", "Grab"];
  });
  const [newPlatformName, setNewPlatformName] = useState<string>("");

  // --- Expense Tracking ---
  const [expenseHistory, setExpenseHistory] = useState<ExpenseEntry[]>(() => {
    const saved = localStorage.getItem("fc_expense");
    return saved ? JSON.parse(saved) : [];
  });
  const [showExpenseModal, setShowExpenseModal] = useState<boolean>(false);
  const [selectedExpenseForEdit, setSelectedExpenseForEdit] =
    useState<ExpenseEntry | null>(null);
  const [expenseOdo, setExpenseOdo] = useState<string>("");
  const [expenseDistance, setExpenseDistance] = useState<string>("");
  const [expenseOtherCost, setExpenseOtherCost] = useState<string>("");
  const [expenseCost, setExpenseCost] = useState<string>("");
  const [expenseNotes, setExpenseNotes] = useState<string>("");
  const [expenseDate, setExpenseDate] = useState<string>("");
  const [expensePlatform, setExpensePlatform] = useState<string>("");

  // --- Trip Tracking ---
  const [tripHistory, setTripHistory] = useState<any[]>(() => {
    const saved = localStorage.getItem("fc_trip_history");
    return saved ? JSON.parse(saved) : [];
  });
  const [showTripModal, setShowTripModal] = useState<boolean>(false);
  const [selectedTripForEdit, setSelectedTripForEdit] =
    useState<TripEntry | null>(null);
  const [tripOriginText, setTripOriginText] = useState<string>("");
  const [tripDestinationText, setTripDestinationText] = useState<string>("");
  const [tripNotesVal, setTripNotesVal] = useState<string>("");

  const [historySubTab, setHistorySubTab] = useState<
    "pengeluaran" | "riwayat" | "pendapatan"
  >("riwayat");
  const [dashboardSubTab, setDashboardSubTab] = useState<
    "keuangan" | "pengeluaran" | "pendapatan"
  >("keuangan");
  const [dashboardMode, setDashboardMode] = useState<
    "harian" | "mingguan" | "bulanan" | "semesteran" | "tahunan"
  >("bulanan");
  const [showDashboardMenu, setShowDashboardMenu] = useState<boolean>(false);
  const [showDashboardAddMenu, setShowDashboardAddMenu] = useState<boolean>(false);
  const [showHistoryMenu, setShowHistoryMenu] = useState<boolean>(false);
  const [showHistoryAddMenu, setShowHistoryAddMenu] = useState<boolean>(false);
  const [historyMode, setHistoryMode] = useState<
    "harian" | "mingguan" | "bulanan" | "semesteran" | "tahunan" | "semua"
  >("bulanan");
  const [partsGrouping, setPartsGrouping] = useState<
    "kategori" | "status" | "semua"
  >("semua");
  const [showPartsGroupingMenu, setShowPartsGroupingMenu] =
    useState<boolean>(false);
  const [showPartsHistoryModal, setShowPartsHistoryModal] =
    useState<boolean>(false);
  const [showFuelHistoryModal, setShowFuelHistoryModal] =
    useState<boolean>(false);
  const [fuelHistoryMode, setFuelHistoryMode] = useState<
    "harian" | "mingguan" | "bulanan" | "semesteran" | "tahunan" | "semua"
  >("semua");
  const [showFuelHistoryModeMenu, setShowFuelHistoryModeMenu] =
    useState<boolean>(false);
  const [showFuelSettingsModal, setShowFuelSettingsModal] =
    useState<boolean>(false);
  const [showCalculatorModal, setShowCalculatorModal] =
    useState<boolean>(false);

  // Save changes to localStorage on State Change
  useEffect(() => {
    localStorage.setItem("fc_vehicle_model", vehicleModel);
  }, [vehicleModel]);
  useEffect(() => {
    localStorage.setItem("fc_vehicle_type", vehicleType);
  }, [vehicleType]);
  useEffect(() => {
    localStorage.setItem("fc_motor_type", motorType);
  }, [motorType]);
  useEffect(() => {
    localStorage.setItem("fc_transmission_type", transmissionType);
  }, [transmissionType]);
  useEffect(() => {
    localStorage.setItem("fc_vehicle_plate", vehiclePlate);
  }, [vehiclePlate]);
  useEffect(() => {
    localStorage.setItem("fc_lang", lang);
  }, [lang]);
  useEffect(() => {
    localStorage.setItem("fc_currency", currency);
  }, [currency]);
  useEffect(() => {
    localStorage.setItem("fc_separator", separator);
  }, [separator]);
  useEffect(() => {
    localStorage.setItem("fc_vol_unit", volUnit);
  }, [volUnit]);
  useEffect(() => {
    localStorage.setItem("fc_fuel_profiles", JSON.stringify(fuelProfiles));
  }, [fuelProfiles]);
  useEffect(() => {
    localStorage.setItem("fc_nominal_buttons", JSON.stringify(nominalButtons));
  }, [nominalButtons]);
  useEffect(() => {
    localStorage.setItem("fc_income", JSON.stringify(incomeHistory));
  }, [incomeHistory]);
  useEffect(() => {
    localStorage.setItem("fc_expense", JSON.stringify(expenseHistory));
  }, [expenseHistory]);
  useEffect(() => {
    localStorage.setItem(
      "fc_income_platforms",
      JSON.stringify(incomePlatforms),
    );
  }, [incomePlatforms]);
  useEffect(() => {
    localStorage.setItem(
      "fc_dashboard_platforms",
      JSON.stringify(dashboardPlatforms),
    );
  }, [dashboardPlatforms]);
  useEffect(() => {
    localStorage.setItem("fc_logs", JSON.stringify(history));
  }, [history]);
  useEffect(() => {
    localStorage.setItem("fc_tank_capacity", tankCapacity.toString());
  }, [tankCapacity]);
  useEffect(() => {
    localStorage.setItem("fc_max_bars", maxBars.toString());
  }, [maxBars]);
  useEffect(() => {
    localStorage.setItem("fc_efficiency", dashboardEfficiency.toString());
  }, [dashboardEfficiency]);
  useEffect(() => {
    localStorage.setItem(
      "fc_total_l_internal",
      totalLiterMasukInternal.toString(),
    );
  }, [totalLiterMasukInternal]);
  useEffect(() => {
    localStorage.setItem(
      "fc_total_b_internal",
      totalLompatanBarInternal.toString(),
    );
  }, [totalLompatanBarInternal]);

  // Translate helper
  const t = useMemo(() => {
    return translations[lang] || translations.id;
  }, [lang]);

  // Dynamic localization formatters
  const formatCurrency = (val: number) => {
    const formattedVal = Math.round(val).toLocaleString(
      separator === "dot" ? "id-ID" : "en-US",
      {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      },
    );
    return `${currency} ${formattedVal}`;
  };

  const formatVolume = (val: number) => {
    const formatted = val.toLocaleString(
      separator === "dot" ? "id-ID" : "en-US",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    );
    return `${formatted} ${volUnit === "gallon" ? "Gal" : "L"}`;
  };

  const formatNumber = (val: number, decimals = 0) => {
    return val.toLocaleString(separator === "dot" ? "id-ID" : "en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  const formatDateDisplay = (dateInput: string | number | Date) => {
    if (!dateInput) return "";
    const dateObj = new Date(dateInput);
    if (isNaN(dateObj.getTime())) return String(dateInput);
    return dateObj.toLocaleDateString(lang === "id" ? "id-ID" : "en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // --- Mathematical Formulas ---
  // Replicates real fuel gauges with reserves
  const estimatedRemainingVolume = useMemo(() => {
    if (activeBar === 0) return 0;
    if (activeBar >= maxBars) return tankCapacity;

    const nilaiDasar =
      totalLompatanBarInternal > 0 && totalLiterMasukInternal > 0
        ? totalLiterMasukInternal / totalLompatanBarInternal
        : tankCapacity / maxBars;

    let arrayVolumeBar: number[] = [];
    const batasBawah = Math.ceil(maxBars * 0.3);
    const batasAtas = maxBars - Math.ceil(maxBars * 0.1);

    for (let i = 0; i < maxBars; i++) {
      if (i < batasBawah) arrayVolumeBar[i] = nilaiDasar * 1.6;
      else if (i >= batasAtas) arrayVolumeBar[i] = nilaiDasar * 0.3;
      else arrayVolumeBar[i] = nilaiDasar * 0.9;
    }

    const totalVolumeAwal = arrayVolumeBar.reduce((a, b) => a + b, 0);
    const fKoreksi = tankCapacity / (totalVolumeAwal || 1);
    for (let i = 0; i < maxBars; i++) arrayVolumeBar[i] *= fKoreksi;

    let totalSelisih = 0;
    for (let i = 0; i < batasBawah; i++) {
      const nilaiAsli = arrayVolumeBar[i];
      const nilaiBulat = Math.round(nilaiAsli * 20) / 20;
      totalSelisih += nilaiAsli - nilaiBulat;
      arrayVolumeBar[i] = nilaiBulat;
    }

    const jBarSisa = maxBars - batasBawah;
    if (jBarSisa > 0) {
      const subPerBar = totalSelisih / jBarSisa;
      for (let i = batasBawah; i < maxBars; i++) arrayVolumeBar[i] += subPerBar;
    }

    let totalSisa = 0;
    for (let i = 0; i < activeBar; i++) {
      totalSisa += arrayVolumeBar[i] || 0;
    }
    return Math.min(totalSisa, tankCapacity);
  }, [
    activeBar,
    maxBars,
    tankCapacity,
    totalLiterMasukInternal,
    totalLompatanBarInternal,
  ]);

  const emptySpaceVolume = useMemo(() => {
    return Math.max(0, tankCapacity - estimatedRemainingVolume);
  }, [tankCapacity, estimatedRemainingVolume]);

  const activeFuelPrice = useMemo(() => {
    const profile = fuelProfiles[selectedProfileIndex];
    return profile ? profile.price : 10000;
  }, [fuelProfiles, selectedProfileIndex]);

  const fuelColorConfig = useMemo(() => {
    const profile = fuelProfiles[selectedProfileIndex];
    return getFuelTheme(profile?.name || "", profile?.color);
  }, [fuelProfiles, selectedProfileIndex]);

  // Calculate dynamic volume representing the active purchasing configuration
  const resolvedPurchaseMetric = useMemo(() => {
    let cost = 0;
    if (purchaseTab === "buttons") {
      cost = nominalSelected;
    } else if (purchaseTab === "manualPrice") {
      cost = parseFloat(typedPrice) || 0;
    } else if (purchaseTab === "manualLiters") {
      const vol = parseFloat(typedVolume) || 0;
      cost = vol * activeFuelPrice;
    } else if (purchaseTab === "slider") {
      cost = precisionSliderValue;
    }

    const volume = cost / (activeFuelPrice || 1);
    return { cost, volume };
  }, [
    purchaseTab,
    nominalSelected,
    typedPrice,
    typedVolume,
    precisionSliderValue,
    activeFuelPrice,
  ]);

  // Maximum price to perfectly fill up current remaining empty volume
  const maxPriceToFillTank = useMemo(() => {
    return emptySpaceVolume * activeFuelPrice;
  }, [emptySpaceVolume, activeFuelPrice]);

  // Adjust precision slider max threshold dynamically
  const sliderMaxVal = useMemo(() => {
    return Math.max(1000, Math.ceil(maxPriceToFillTank / 100) * 100);
  }, [maxPriceToFillTank]);

  // Warning check for overflow indicators
  const isOverflowRisk = useMemo(() => {
    if (resolvedPurchaseMetric.volume === 0) return false;
    // 0.05 buffer
    return resolvedPurchaseMetric.volume > emptySpaceVolume + 0.05;
  }, [resolvedPurchaseMetric.volume, emptySpaceVolume]);

  // --- Odometer trackers ---
  const lastLoggedOdometer = useMemo(() => {
    if (history.length === 0) {
      return localStorage.getItem("fc_initial_odometer") !== null ? initialOdometer : null;
    }
    return history[history.length - 1].odoBefore;
  }, [history, initialOdometer]);

  const baselineOdometer = useMemo(() => {
    if (history.length === 0) {
      return localStorage.getItem("fc_initial_odometer") !== null ? initialOdometer : null;
    }
    return history[0].odoBefore;
  }, [history, initialOdometer]);

  // Active weekly expenditures
  const weeklyExpenditures = useMemo(() => {
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    let cost = 0;
    let volume = 0;
    history.forEach((log) => {
      if (log.timestamp >= sevenDaysAgo) {
        cost += log.totalPrice;
        volume += log.volume;
      }
    });
    return { cost, volume };
  }, [history]);

  // Active monthly expenditures
  const monthlyExpenditures = useMemo(() => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    let cost = 0;
    let volume = 0;
    history.forEach((log) => {
      const logDate = new Date(log.timestamp);
      if (
        logDate.getMonth() === currentMonth &&
        logDate.getFullYear() === currentYear
      ) {
        cost += log.totalPrice;
        volume += log.volume;
      }
    });
    return { cost, volume };
  }, [history]);

  // Expected mileage range before empty
  const expectedMileageRange = useMemo(() => {
    const minEff = Math.max(5, dashboardEfficiency - 2);
    const maxEff = dashboardEfficiency + 2;
    const minDistance = estimatedRemainingVolume * minEff;
    const maxDistance = estimatedRemainingVolume * maxEff;
    return { minDistance, maxDistance };
  }, [estimatedRemainingVolume, dashboardEfficiency]);

  // --- Slide carousel data array ---
  const carouselItems = useMemo(() => {
    return [
      {
        title: t.weekly_spent,
        value: formatCurrency(weeklyExpenditures.cost),
        meta: `${t.volume}: ± ${formatNumber(weeklyExpenditures.volume, 2)} ${volUnit === "gallon" ? "Gal" : "L"}`,
      },
      {
        title: t.monthly_spent,
        value: formatCurrency(monthlyExpenditures.cost),
        meta: `${t.volume}: ± ${formatNumber(monthlyExpenditures.volume, 2)} ${volUnit === "gallon" ? "Gal" : "L"}`,
      },
      {
        title: t.prev_distance,
        value:
          lastLoggedOdometer !== null
            ? `${formatNumber(lastLoggedOdometer)} KM`
            : "-- KM",
        meta:
          baselineOdometer !== null && lastLoggedOdometer !== null
            ? t.odo_prev_progress.replace(
                "{val}",
                formatNumber(lastLoggedOdometer - baselineOdometer),
              )
            : t.odo_not_recorded,
      },
      {
        title: t.expected_distance,
        value:
          activeBar === 0
            ? "READY"
            : `± ${formatNumber(expectedMileageRange.minDistance)} - ${formatNumber(expectedMileageRange.maxDistance)} KM`,
        meta: t.expected_range_hint,
      },
    ];
  }, [
    weeklyExpenditures,
    monthlyExpenditures,
    lastLoggedOdometer,
    baselineOdometer,
    expectedMileageRange,
    activeBar,
    t,
    volUnit,
  ]);

  // Trip Calculator active estimations
  const [tripDistanceVal, setTripDistanceVal] = useState<string>("");
  const tripCalcDetails = useMemo(() => {
    const distance = parseFloat(tripDistanceVal) || 0;
    if (distance <= 0) return null;
    const minEff = dashboardEfficiency + 2;
    const maxEff = Math.max(5, dashboardEfficiency - 2);
    const minVolumeRequired = distance / minEff;
    const maxVolumeRequired = distance / maxEff;
    const minCostRange = minVolumeRequired * activeFuelPrice;
    const maxCostRange = maxVolumeRequired * activeFuelPrice;
    return {
      minVolumeRequired,
      maxVolumeRequired,
      minCostRange,
      maxCostRange,
    };
  }, [tripDistanceVal, dashboardEfficiency, activeFuelPrice]);

  // --- Parts Handlers ---
  const openServiceActionModal = (partId: string) => {
    const part = spareParts.find(p => p.id === partId);
    setServiceActionPartId(partId);
    setServiceActionCost("");
    setServiceActionMerk(part?.merk || "");
    setServiceActionNotes(part?.notes || "");
    setServiceActionType("ganti_baru");
    setShowServiceActionModal(true);
  };

  const submitServiceAction = () => {
    if (!serviceActionPartId) return;
    const part = spareParts.find((p) => p.id === serviceActionPartId);
    if (!part) return;

    const costNum = parseFloat(serviceActionCost);
    if (!isNaN(costNum) && costNum > 0) {
      const entry: ExpenseEntry = {
        id: Math.random().toString(36).substring(2, 9),
        date: new Date().toLocaleDateString("en-CA"),
        timestamp: Date.now(),
        cost: costNum,
        notes: `Servis: ${part.name} (${serviceActionType === "ganti_baru" ? "Ganti Baru" : "Perbaiki"})`,
        platform: "Servis & Suku Cadang",
      };
      setExpenseHistory((prev) => [...prev, entry]);
    }

    handleRecordService(serviceActionPartId, serviceActionMerk, serviceActionNotes);
    setShowServiceActionModal(false);
    setServiceActionPartId(null);
  };

  const handleRecordService = (partId: string, merk?: string, notes?: string) => {
    setSpareParts((prev) =>
      prev.map((p) =>
        p.id === partId
          ? { ...p, lastOdo: lastLoggedOdometer || 0, lastDate: Date.now(), ...(merk !== undefined ? { merk } : {}), ...(notes !== undefined ? { notes } : {}) }
          : p,
      ),
    );
  };

  const handleCompleteOnboarding = (odo: number) => {
    localStorage.setItem("fc_initial_odometer", odo.toString());
    localStorage.setItem("fc_has_onboarded", "true");
    setInitialOdometer(odo);
    setHasOnboarded(true);

    // Update all default spare parts lastOdo to start fresh at the new odometer
    setSpareParts((prev) =>
      prev.map((part) => ({
        ...part,
        lastOdo: odo,
        lastDate: Date.now(),
      }))
    );
  };

  const openAddPart = () => {
    setPartFormId(null);
    setPartFormName("");
    setPartFormMerk("");
    setPartFormNotes("");
    setPartFormLifespan("10000");
    setPartFormLastOdo((lastLoggedOdometer || 0).toString());
    setPartFormIcon("Wrench");
    setShowPartModal(true);
  };

  const openEditPart = (part: any) => {
    setPartFormId(part.id);
    setPartFormName(part.name);
    setPartFormMerk(part.merk || "");
    setPartFormNotes(part.notes || "");
    setPartFormLifespan(part.lifespanKm?.toString() || "");
    setPartFormLastOdo(part.lastOdo?.toString() || "");
    setPartFormIcon(part.icon);
    setShowPartModal(true);
  };

  const savePart = () => {
    if (!partFormName.trim()) {
      alert(
        lang === "id" ? "Nama komponen wajib diisi!" : "Part name is required!",
      );
      return;
    }
    const lifespanNum = parseFloat(partFormLifespan) || 10000;
    const lastOdoNum = parseFloat(partFormLastOdo) || 0;

    if (partFormId) {
      setSpareParts((prev) =>
        prev.map((p) =>
          p.id === partFormId
            ? {
                ...p,
                name: partFormName,
                merk: partFormMerk,
                notes: partFormNotes,
                lifespanKm: lifespanNum,
                lastOdo: lastOdoNum,
                icon: partFormIcon,
              }
            : p,
        ),
      );
    } else {
      const newPart = {
        id: Date.now().toString(),
        name: partFormName,
        merk: partFormMerk,
        notes: partFormNotes,
        icon: partFormIcon,
        lastOdo: lastOdoNum,
        lastDate: Date.now(),
        lifespanKm: lifespanNum,
        lifespanMonths: 12,
      };
      setSpareParts((prev) => [...prev, newPart]);
    }
    setShowPartModal(false);
  };

  const deletePart = () => {
    if (
      confirm(lang === "id" ? "Hapus komponen ini?" : "Delete this tracker?")
    ) {
      setSpareParts((prev) => prev.filter((p) => p.id !== partFormId));
      setShowPartModal(false);
      if (expandedPartId === partFormId) setExpandedPartId(null);
    }
  };

  // Quick preset logging prompt handlers
  const handleLogClick = () => {
    if (resolvedPurchaseMetric.cost <= 0) {
      alert(t.alert_default);
      return;
    }
    // Setup modal elements
    setLogOdoInput(
      lastLoggedOdometer !== null ? lastLoggedOdometer.toString() : "",
    );
    setLogBarAfter(maxBars);
    setLogEfficiencyInput(dashboardEfficiency.toString());
    setLogModalStep(1);
    setShowLogModal(true);
  };

  const handleFinishLog = () => {
    const odoNum = parseFloat(logOdoInput);
    if (isNaN(odoNum) || odoNum < 0) {
      alert(t.toast_fill_fields);
      return;
    }
    if (lastLoggedOdometer !== null && odoNum < lastLoggedOdometer) {
      alert(t.toast_odo_error.replace("{val}", lastLoggedOdometer.toString()));
      return;
    }
    if (logBarAfter < activeBar) {
      alert(t.toast_bar_error.replace("{val}", activeBar.toString()));
      return;
    }

    const customEff = parseFloat(logEfficiencyInput);
    if (!isNaN(customEff) && customEff > 0) {
      setDashboardEfficiency(customEff);
    }

    // Calculations
    const finalVolume = resolvedPurchaseMetric.volume;
    const jump = Math.max(0, logBarAfter - activeBar);

    if (jump > 0) {
      setTotalLiterMasukInternal((prev) => prev + finalVolume);
      setTotalLompatanBarInternal((prev) => prev + jump);
    }

    const todayDate = new Date();
    const formattedDate = todayDate.toLocaleDateString(
      lang === "en" ? "en-US" : "id-ID",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      },
    );

    const newLog: FuelLog = {
      id: crypto.randomUUID(),
      date: formattedDate,
      timestamp: todayDate.getTime(),
      fuelType: fuelProfiles[selectedProfileIndex]?.name || "BBM",
      pricePerUnit: activeFuelPrice,
      totalPrice: resolvedPurchaseMetric.cost,
      volume: finalVolume,
      odoBefore: odoNum,
      barBefore: activeBar,
      barAfter: logBarAfter,
      observedEfficiency: !isNaN(customEff) ? customEff : undefined,
    };

    setHistory((prev) => [...prev, newLog]);
    setActiveBar(logBarAfter);
    setNominalSelected(0);
    setTypedPrice("");
    setTypedVolume("");
    setPrecisionSliderValue(0);
    setShowLogModal(false);
  };

  // Safe delete one history item
  const handleDeleteItem = (id: string) => {
    const itemToDelete = history.find((x) => x.id === id);
    if (itemToDelete) {
      const jump = Math.max(0, itemToDelete.barAfter - itemToDelete.barBefore);
      setTotalLiterMasukInternal((prev) =>
        Math.max(0, prev - itemToDelete.volume),
      );
      setTotalLompatanBarInternal((prev) => Math.max(0, prev - jump));
    }
    setHistory((prev) => prev.filter((x) => x.id !== id));
  };

  const openEditModal = (log: FuelLog) => {
    setEditLogId(log.id);
    setEditLogOdo(log.odoBefore?.toString() || "");
    setEditLogBarAfter(log.barAfter);
    setShowEditModal(true);
  };

  const saveEditLog = () => {
    const odoNum = parseFloat(editLogOdo);
    if (isNaN(odoNum) || odoNum < 0) {
      alert(t.toast_fill_fields);
      return;
    }

    const itemToEdit = history.find((x) => x.id === editLogId);
    if (itemToEdit) {
      const oldJump = Math.max(0, itemToEdit.barAfter - itemToEdit.barBefore);
      const newJump = Math.max(0, editLogBarAfter - itemToEdit.barBefore);
      setTotalLompatanBarInternal((current) =>
        Math.max(0, current - oldJump + newJump),
      );
    }

    setHistory((prev) =>
      prev.map((log) =>
        log.id === editLogId
          ? { ...log, odoBefore: odoNum, barAfter: editLogBarAfter }
          : log,
      ),
    );
    setShowEditModal(false);
  };

  const openSyncModal = () => {
    setSyncOdoInput(
      lastLoggedOdometer !== null ? lastLoggedOdometer.toString() : "",
    );
    setSyncBarAfter(activeBar);
    setShowSyncModal(true);
  };

  const saveSyncOdometer = () => {
    const odoNum = parseFloat(syncOdoInput);
    if (isNaN(odoNum) || odoNum < 0) {
      alert(t.toast_fill_fields);
      return;
    }

    const syncLog: FuelLog = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      date: new Date().toLocaleDateString(lang === "id" ? "id-ID" : "en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      timestamp: Date.now(),
      fuelType: lang === "id" ? "SINKRONISASI" : "SYNC",
      pricePerUnit: 0,
      volume: 0,
      totalPrice: 0,
      odoBefore: odoNum,
      barBefore: activeBar,
      barAfter: syncBarAfter,
      observedEfficiency: dashboardEfficiency,
    };

    setHistory((prev) => [...prev, syncLog]);
    setActiveBar(syncBarAfter);
    setDashboardEfficiency(dashboardEfficiency); // Trigger re-render explicitly
    setShowSyncModal(false);
  };

  // --- Income Tracking Handlers ---
  const openIncomeModal = (editItem?: IncomeEntry) => {
    if (editItem) {
      setSelectedIncomeForEdit(editItem);
      setIncomeRate(
        editItem.ratePerKm > 0 ? editItem.ratePerKm.toString() : "",
      );
      setIncomeDistance(
        editItem.distance > 0 ? editItem.distance.toString() : "",
      );
      setIncomeOtherCost(
        editItem.otherCost > 0 ? editItem.otherCost.toString() : "",
      );
      setIncomeTotal(editItem.total?.toString() || "");
      setIncomeNotes(editItem.notes || "");
      setIncomePlatform(
        editItem.platform ||
          (incomePlatforms.length > 0 ? incomePlatforms[0] : ""),
      );
      setIncomeDate(editItem.date || new Date().toISOString().split("T")[0]);
    } else {
      setSelectedIncomeForEdit(null);
      const today = new Date().toISOString().split("T")[0];
      setIncomeRate("");
      setIncomeDistance("");
      setIncomeOtherCost("");
      setIncomeTotal("");
      setIncomeNotes("");
      setIncomePlatform(incomePlatforms.length > 0 ? incomePlatforms[0] : "");
      setIncomeDate(today);
    }
    setShowIncomeModal(true);
  };

  const handleIncomeCalc = (
    newRate: string,
    newDist: string,
    newOther: string,
  ) => {
    const r = parseFloat(newRate);
    const d = parseFloat(newDist);
    const o = parseFloat(newOther) || 0;
    if (!isNaN(r) && r > 0 && !isNaN(d) && d > 0) {
      setIncomeTotal(Math.round(r * d + o).toString());
    }
  };

  const handleIncomeRateChange = (val: string) => {
    setIncomeRate(val);
    handleIncomeCalc(val, incomeDistance, incomeOtherCost);
  };

  const handleIncomeDistanceChange = (val: string) => {
    setIncomeDistance(val);
    handleIncomeCalc(incomeRate, val, incomeOtherCost);
  };

  const handleIncomeOtherCostChange = (val: string) => {
    setIncomeOtherCost(val);
    handleIncomeCalc(incomeRate, incomeDistance, val);
  };

  const handleIncomeTotalChange = (val: string) => {
    setIncomeTotal(val);
  };

  const saveIncome = () => {
    const rate = parseFloat(incomeRate);
    const distance = parseFloat(incomeDistance);
    const otherCost = parseFloat(incomeOtherCost) || 0;
    const total = parseFloat(incomeTotal);

    // Rule: Either rate or distance must be filled. Total must be filled.
    const hasRateOrDist =
      (!isNaN(rate) && rate > 0) || (!isNaN(distance) && distance > 0);
    if (!hasRateOrDist || isNaN(total)) {
      alert(t.toast_fill_fields);
      return;
    }

    if (selectedIncomeForEdit) {
      setIncomeHistory((prev) =>
        prev.map((item) => {
          if (item.id === selectedIncomeForEdit.id) {
            return {
              ...item,
              date: incomeDate,
              ratePerKm: isNaN(rate) ? 0 : rate,
              distance: isNaN(distance) ? 0 : distance,
              otherCost,
              total,
              notes: incomeNotes,
              platform: incomePlatform,
            };
          }
          return item;
        }),
      );
    } else {
      const entry: IncomeEntry = {
        id: crypto.randomUUID(),
        date:
          incomeDate ||
          new Date().toLocaleDateString(lang === "id" ? "id-ID" : "en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
        timestamp: Date.now(),
        ratePerKm: isNaN(rate) ? 0 : rate,
        distance: isNaN(distance) ? 0 : distance,
        otherCost,
        total,
        notes: incomeNotes,
        platform: incomePlatform,
      };
      setIncomeHistory((prev) => [...prev, entry]);
    }
    setShowIncomeModal(false);
    setSelectedIncomeForEdit(null);
  };

  const deleteIncome = (id: string) => {
    if (confirm(t.income_delete)) {
      setIncomeHistory((prev) => prev.filter((x) => x.id !== id));
    }
  };

  // --- Expense Tracking Handlers ---
  const openExpenseModal = (editItem?: ExpenseEntry) => {
    if (editItem) {
      setSelectedExpenseForEdit(editItem);
      setExpenseOdo(editItem.odometer > 0 ? editItem.odometer.toString() : "");
      setExpenseDistance(
        editItem.distance > 0 ? editItem.distance.toString() : "",
      );
      setExpenseOtherCost(
        editItem.otherCost > 0 ? editItem.otherCost.toString() : "",
      );
      setExpenseCost(editItem.cost?.toString() || "");
      setExpenseNotes(editItem.notes || "");
      setExpensePlatform(
        editItem.platform ||
          (incomePlatforms.length > 0 ? incomePlatforms[0] : ""),
      );
      setExpenseDate(editItem.date || new Date().toISOString().split("T")[0]);
    } else {
      setSelectedExpenseForEdit(null);
      const today = new Date().toISOString().split("T")[0];
      setExpenseOdo("");
      setExpenseDistance("");
      setExpenseOtherCost("");
      setExpenseCost("");
      setExpenseNotes("");
      setExpensePlatform(incomePlatforms.length > 0 ? incomePlatforms[0] : ""); // share platforms
      setExpenseDate(today);
    }
    setShowExpenseModal(true);
  };

  const handleSaveExpense = () => {
    const odo = parseFloat(expenseOdo);
    const dist = parseFloat(expenseDistance);
    const otherCost = parseFloat(expenseOtherCost) || 0;
    const cost = parseFloat(expenseCost);

    // Rule: Either odo or distance must be filled. Total cost must be filled.
    const hasOdoOrDist = (!isNaN(odo) && odo > 0) || (!isNaN(dist) && dist > 0);
    if (!hasOdoOrDist || isNaN(cost) || !expenseDate) {
      alert(t.toast_fill_fields);
      return;
    }

    if (selectedExpenseForEdit) {
      setExpenseHistory((prev) =>
        prev.map((item) => {
          if (item.id === selectedExpenseForEdit.id) {
            return {
              ...item,
              date: expenseDate,
              timestamp: new Date(expenseDate).getTime(),
              odometer: isNaN(odo) ? 0 : odo,
              distance: isNaN(dist) ? 0 : dist,
              otherCost,
              cost,
              notes: expenseNotes,
              platform: expensePlatform,
            };
          }
          return item;
        }),
      );
    } else {
      const entry: ExpenseEntry = {
        id: crypto.randomUUID(),
        date: expenseDate,
        timestamp: new Date(expenseDate).getTime(),
        odometer: isNaN(odo) ? 0 : odo,
        distance: isNaN(dist) ? 0 : dist,
        otherCost,
        cost,
        notes: expenseNotes,
        platform: expensePlatform,
      };
      setExpenseHistory((prev) => [...prev, entry]);
    }
    setShowExpenseModal(false);
    setSelectedExpenseForEdit(null);
  };

  const deleteExpense = (id: string) => {
    if (confirm("Hapus pengeluaran?")) {
      setExpenseHistory((prev) => prev.filter((x) => x.id !== id));
    }
  };

  // Settings: Dynamic additions of profile rates
  const handleAddCustomProfile = () => {
    const name = lang === "en" ? "New Fuel Class" : "Jenis BBM Baru";
    const rate = 10000;
    setFuelProfiles((prev) => [...prev, { name, price: rate, color: "green" }]);
  };

  const handleUpdateProfileData = (
    index: number,
    name: string,
    price: number,
    color?: string,
  ) => {
    const updated = [...fuelProfiles];
    updated[index] = {
      name,
      price: price || 0,
      color: color || updated[index].color || "green",
    };
    setFuelProfiles(updated);
  };

  const handleDeleteProfile = (index: number) => {
    if (fuelProfiles.length <= 1) return;
    setFuelProfiles((prev) => prev.filter((_, i) => i !== index));
    if (selectedProfileIndex >= fuelProfiles.length - 1) {
      setSelectedProfileIndex(0);
    }
  };

  const handleUpdateNominalPreset = (index: number, val: number) => {
    const updated = [...nominalButtons];
    updated[index] = val || 0;
    setNominalButtons(updated);
  };

  const handleResetCalibration = () => {
    if (
      confirm(
        lang === "en"
          ? "Reset calibration? This will reset your full-to-full average efficiency tracking and fuel gauge predictions back to default."
          : "Peringatan: Opsi ini akan mengulang (reset) prediksi tingkat sisa bensin dan catatan konsumsi (KM/L) harian kembali ke awal. Data riwayat transaksi bensin tidak ikut terhapus. Yakin atur ulang kalibrasi?",
      )
    ) {
      setDashboardEfficiency(45);
      setTotalLiterMasukInternal(0);
      setTotalLompatanBarInternal(0);
      alert(
        lang === "en"
          ? "Calibration records cleared."
          : "Perhitungan kalibrasi berhasil di-reset.",
      );
    }
  };

  const handleExportData = () => {
    const data: Record<string, string> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("fc_")) {
        data[key] = localStorage.getItem(key) || "";
      }
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `fuel-calc-backup-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content);
        if (
          confirm(
            "Apakah Anda yakin ingin memulihkan data? Data saat ini akan ditimpa.",
          )
        ) {
          Object.keys(data).forEach((key) => {
            if (key.startsWith("fc_")) {
              localStorage.setItem(key, data[key]);
            }
          });
          alert("Data berhasil dipulihkan. Aplikasi akan dimuat ulang.");
          window.location.reload();
        }
      } catch (err) {
        alert("File backup tidak valid.");
      }
    };
    reader.readAsText(file);
    // Reset input
    if (event.target) {
      event.target.value = "";
    }
  };

  const handleResetWipeData = () => {
    if (confirm(t.confirm_wipe)) {
      localStorage.clear();
      setHasOnboarded(false);
      setInitialOdometer(0);
      setOnboardOdoInput("");
      setVehicleModel("BMW E46");
      setVehicleType("mobil");
      setMotorType("bensin");
      setTransmissionType("otomatis");
      setOnboardStep(1);
      setLang("id");
      setCurrency("IDR");
      setSeparator("dot");
      setVolUnit("liter");
      setFuelProfiles(DEFAULT_PROFILES);
      setNominalButtons(DEFAULT_PRESETS);
      setHistory([]);
      setTankCapacity(4.2);
      setMaxBars(7);
      setDashboardEfficiency(45);
      setTotalLiterMasukInternal(0);
      setTotalLompatanBarInternal(0);
      setActiveBar(3);
      setSelectedProfileIndex(0);
      setPurchaseTab("buttons");
      setNominalSelected(0);
      setTypedPrice("");
      setTypedVolume("");
      setPrecisionSliderValue(0);
      setTripDistanceVal("");
      alert(t.wipe_success);
    }
  };

  return (
    <>
      <div className="bg-slate-50 flex items-center justify-center p-0 sm:p-4 md:p-8 fixed inset-0 sm:static sm:h-[100dvh] overscroll-none">
        {/* Device mock style wrapper */}
        <div className="w-full h-full max-w-md bg-white sm:border border-slate-200 sm:rounded-[32px] sm: overflow-hidden flex flex-col relative sm:max-h-[820px]">
          
          {!hasOnboarded ? (
            <div className="w-full h-full bg-[#000000] flex flex-col relative overflow-hidden font-sans text-white">
              {/* Top Navigation Row */}
              <div className="flex items-center justify-between px-4 pt-4 pb-2 z-10 select-none">
                {onboardStep === 2 ? (
                  <button
                    onClick={() => setOnboardStep(1)}
                    className="flex items-center text-[#3b82f6] font-semibold text-base gap-1 hover:opacity-85 active:scale-95 transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
                    <span>{lang === "id" ? "Kembali" : "Back"}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setHasOnboarded(true)}
                    className="text-slate-500 hover:text-white transition-colors cursor-pointer p-1"
                  >
                    <LucideIcons.X className="w-6 h-6 stroke-[2]" />
                  </button>
                )}
                
                {/* Step indicator */}
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest px-3">
                  {lang === "id" ? `Langkah ${onboardStep} dari 2` : `Step ${onboardStep} of 2`}
                </div>
              </div>

              {/* Onboarding content */}
              <div className="flex-1 flex flex-col overflow-y-auto scrollbar-hide px-6 pb-6 justify-between">
                
                {onboardStep === 1 ? (
                  /* STEP 1: CONFIGURE VEHICLE */
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center">
                      <h1 className="text-2xl font-extrabold tracking-tight text-white text-center mt-2 mb-2">
                        {lang === "id" ? "Atur Kendaraan Anda" : "Set Up Your Vehicle"}
                      </h1>
                      <p className="text-sm text-slate-400 text-center leading-relaxed max-w-[310px] mx-auto">
                        {lang === "id"
                          ? "Beri tahu kami tentang kendaraan Anda agar kami dapat menyesuaikan pelacakan perawatannya."
                          : "Tell us about your vehicle so we can customize its maintenance tracking."}
                      </p>
                    </div>

                    {/* Form Field: Model Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">
                        {lang === "id" ? "Nama Model" : "Model Name"}
                      </label>
                      <input
                        type="text"
                        placeholder={
                          vehicleType === "mobil"
                            ? (lang === "id" ? "BMW E46" : "BMW E46")
                            : (lang === "id" ? "Honda Beat" : "Honda Beat")
                        }
                        value={vehicleModel}
                        onChange={(e) => setVehicleModel(e.target.value)}
                        className="w-full bg-[#1c1c1e] text-white py-3.5 px-5 rounded-2xl border border-slate-800 outline-none focus:border-slate-600 text-left text-base font-medium placeholder-slate-600 transition-colors"
                      />
                    </div>

                    {/* Option: Vehicle Type */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">
                        {lang === "id" ? "Tipe kendaraan apa?" : "What type of vehicle?"}
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => {
                            setVehicleType("mobil");
                            setMotorType("bensin");
                          }}
                           className={`flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-2xl border transition-all cursor-pointer font-bold text-sm select-none ${
                            vehicleType === "mobil"
                              ? "border-[#3b82f6] text-[#3b82f6] bg-[#3b82f6]/10 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                              : "border-slate-800 text-slate-400 hover:border-slate-700 bg-[#0c0c0e]"
                          }`}
                        >
                          <LucideIcons.Car className="w-5 h-5 stroke-[2]" />
                          <span>{lang === "id" ? "Mobil" : "Car"}</span>
                        </button>

                        <button
                          onClick={() => {
                            setVehicleType("motor");
                            setMotorType("bensin");
                          }}
                          className={`flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-2xl border transition-all cursor-pointer font-bold text-sm select-none ${
                            vehicleType === "motor"
                              ? "border-[#3b82f6] text-[#3b82f6] bg-[#3b82f6]/10 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                              : "border-slate-800 text-slate-400 hover:border-slate-700 bg-[#0c0c0e]"
                          }`}
                        >
                          {/* Safe lookup for Motorcycle or Bike icon */}
                          {(() => {
                            const IconComponent = LucideIcons.Bike;
                            return IconComponent ? <IconComponent className="w-5 h-5 stroke-[2]" /> : null;
                          })()}
                          <span>Motorbike</span>
                        </button>
                      </div>
                    </div>

                    {/* Option: Fuel Type */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">
                        {vehicleType === "motor"
                          ? (lang === "id" ? "Tipe motor apa?" : "What type of motorbike?")
                          : (lang === "id" ? "Tipe mobil apa?" : "What type of car?")
                        }
                      </label>
                      <div className={`grid ${vehicleType === "mobil" ? "grid-cols-3" : "grid-cols-2"} gap-3`}>
                        <button
                          onClick={() => setMotorType("bensin")}
                          className={`flex items-center justify-center gap-2 py-3.5 px-2 rounded-2xl border transition-all cursor-pointer font-bold text-xs sm:text-sm select-none ${
                            motorType === "bensin"
                              ? "border-[#3b82f6] text-[#3b82f6] bg-[#3b82f6]/10 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                              : "border-slate-800 text-slate-400 hover:border-slate-700 bg-[#0c0c0e]"
                          }`}
                        >
                          <LucideIcons.Fuel className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
                          <span>Bensin</span>
                        </button>

                        {vehicleType === "mobil" && (
                          <button
                            onClick={() => setMotorType("hybrid")}
                            className={`flex items-center justify-center gap-2 py-3.5 px-2 rounded-2xl border transition-all cursor-pointer font-bold text-xs sm:text-sm select-none ${
                              motorType === "hybrid"
                                ? "border-[#3b82f6] text-[#3b82f6] bg-[#3b82f6]/10 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                                : "border-slate-800 text-slate-400 hover:border-slate-700 bg-[#0c0c0e]"
                            }`}
                          >
                            {(() => {
                              const LeafIcon = (LucideIcons as any).Leaf || LucideIcons.Sprout;
                              return <LeafIcon className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />;
                            })()}
                            <span>Hybrid</span>
                          </button>
                        )}

                        <button
                          onClick={() => setMotorType("ev")}
                          className={`flex items-center justify-center gap-2 py-3.5 px-2 rounded-2xl border transition-all cursor-pointer font-bold text-xs sm:text-sm select-none ${
                            motorType === "ev"
                              ? "border-[#3b82f6] text-[#3b82f6] bg-[#3b82f6]/10 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                              : "border-slate-800 text-slate-400 hover:border-slate-700 bg-[#0c0c0e]"
                          }`}
                        >
                          <LucideIcons.Zap className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
                          <span>EV</span>
                        </button>
                      </div>
                    </div>

                    {/* Option: Transmission Type */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">
                        {lang === "id" ? "Tipe Transmisi" : "Transmission Type"}
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => setTransmissionType("manual")}
                          className={`flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-2xl border transition-all cursor-pointer font-bold text-sm select-none ${
                            transmissionType === "manual"
                              ? "border-[#f97316] text-[#f97316] bg-[#f97316]/10 shadow-[0_0_15px_rgba(249,115,22,0.15)]"
                              : "border-slate-800 text-slate-400 hover:border-slate-700 bg-[#0c0c0e]"
                          }`}
                        >
                          {/* H-shifter line art SVG */}
                          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth={2.5}>
                            <path d="M6 5v14M12 5v14M18 5v14M6 12h12" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span>Manual</span>
                        </button>

                        <button
                          onClick={() => setTransmissionType("otomatis")}
                          className={`flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-2xl border transition-all cursor-pointer font-bold text-sm select-none ${
                            transmissionType === "otomatis"
                              ? "border-[#f97316] text-[#f97316] bg-[#f97316]/10 shadow-[0_0_15px_rgba(249,115,22,0.15)]"
                              : "border-slate-800 text-slate-400 hover:border-slate-700 bg-[#0c0c0e]"
                          }`}
                        >
                          <LucideIcons.Gauge className="w-5 h-5 stroke-[2]" />
                          <span>{lang === "id" ? "Otomatis" : "Automatic"}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* STEP 2: CONFIGURE ODOMETER */
                  <div className="flex flex-col items-center">
                    {/* Custom SVG Dashboard Illustration */}
                    <div className="w-full flex justify-center py-2">
                      <svg
                        viewBox="0 0 200 160"
                        className="w-full max-w-[220px] h-auto select-none drop-shadow-2xl"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="100" cy="100" r="80" stroke="#1e293b" strokeWidth="12" strokeLinecap="round" strokeDasharray="300 400" transform="rotate(135 100 100)" />
                        <circle cx="100" cy="100" r="80" stroke="#3b82f6" strokeWidth="12" strokeLinecap="round" strokeDasharray="200 400" transform="rotate(135 100 100)" />
                        
                        {/* Needle */}
                        <g transform="rotate(45 100 100)">
                          <path d="M96 100L100 40L104 100Z" fill="#ef4444" />
                          <circle cx="100" cy="100" r="8" fill="#1e293b" stroke="#0f172a" strokeWidth="3" />
                        </g>
                        
                        {/* Center Display */}
                        <rect x="70" y="115" width="60" height="24" rx="4" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
                        <text x="100" y="126" fill="#64748b" fontSize="7" fontWeight="bold" textAnchor="middle" letterSpacing="0.05em">ODO</text>
                        <text x="100" y="135" fill="#ffffff" fontSize="9" fontWeight="extrabold" textAnchor="middle" letterSpacing="0.02em">67,890</text>
                        
                        {/* Tick marks */}
                        <path d="M35 100 L45 100" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
                        <path d="M155 100 L165 100" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
                        <path d="M100 35 L100 45" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
                        <path d="M54 54 L61 61" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
                        <path d="M146 54 L139 61" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                    </div>

                    <h1 className="text-2xl font-extrabold tracking-tight text-white text-center mt-6 mb-3">
                      {lang === "id" ? "Masukkan Odometer Anda" : "Enter Your Odometer"}
                    </h1>
                    <p className="text-sm text-slate-400 text-center leading-relaxed max-w-[290px] mx-auto">
                      {lang === "id"
                        ? "Periksa dasbor Anda untuk pembacaan tersebut. Ini membantu kami memperkirakan penggunaan komponen."
                        : "Check your dashboard for this reading. This helps us estimate component usage."}
                    </p>

                    {/* Input Form container */}
                    <div className="w-full flex flex-col gap-2 mt-8">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider self-start pl-1">
                        {lang === "id" ? "Odometer Saat Ini (km)" : "Current Odometer (km)"}
                      </label>
                      <input
                        type="number"
                        placeholder={lang === "id" ? "15000" : "15000"}
                        value={onboardOdoInput || ""}
                        onChange={(e) => setOnboardOdoInput(e.target.value)}
                        className="w-full bg-[#1c1c1e] text-white py-4 px-6 rounded-3xl border border-slate-800 outline-none focus:border-slate-600 text-center text-xl font-bold placeholder-slate-600 transition-colors"
                      />
                    </div>
                  </div>
                )}

                {/* Bottom CTA Button */}
                <div className="w-full pt-6">
                  {onboardStep === 1 ? (
                    <button
                      onClick={() => {
                        if (!vehicleModel.trim()) {
                          alert(
                            lang === "id"
                              ? "Silakan masukkan nama model kendaraan Anda."
                              : "Please enter your vehicle model name."
                          );
                          return;
                        }
                        setOnboardStep(2);
                      }}
                      className="w-full bg-[#3b82f6] text-white font-bold py-4 px-6 rounded-full hover:bg-blue-600 transition-all active:scale-98 tracking-wide text-center uppercase text-sm cursor-pointer"
                    >
                      {lang === "id" ? "Lanjut" : "Continue"}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        const odo = parseInt(onboardOdoInput, 10);
                        if (isNaN(odo) || odo < 0) {
                          alert(
                            lang === "id"
                              ? "Silakan masukkan angka odometer yang valid."
                              : "Please enter a valid odometer reading."
                          );
                          return;
                        }
                        handleCompleteOnboarding(odo);
                        setOnboardOdoInput(""); // Clear input
                      }}
                      className="w-full bg-[#2d2d30] text-white font-bold py-4 px-6 rounded-full hover:bg-slate-800 transition-all active:scale-98 tracking-wide text-center uppercase text-sm cursor-pointer"
                    >
                      {lang === "id" ? "Lanjut" : "Continue"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* APPLICATION FIXED HEADERS */}
              <div className="flex-none bg-slate-50 px-4 pt-6 pb-4 border-b border-slate-200/50 z-30">
                {activeTab === "fuel" && (
                  <div className="flex items-center justify-between w-full animate-fade-in">
                    <h2 className="text-[22px] font-bold tracking-tight font-sans text-[#0f172b] flex items-center justify-start gap-[15px]">
                      <Fuel className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5px] text-[#0f172b]" />
                      Bahan Bakar
                    </h2>
                    <div className="flex gap-2 items-center">
                      <button
                        onClick={() => setShowCalculatorModal(true)}
                        className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-slate-500 hover:text-slate-700 "
                      >
                        <Calculator className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setShowFuelHistoryModal(true)}
                        className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-slate-500 hover:text-slate-700 "
                      >
                        <LucideIcons.History className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setShowFuelSettingsModal(true)}
                        className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-slate-500 hover:text-slate-700 "
                      >
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
                {activeTab === "parts" && (
                  <div className="flex items-center justify-between w-full animate-fade-in">
                    <h2 className="text-[22px] font-bold tracking-tight font-sans text-[#0f172b] flex items-center justify-start gap-[15px]">
                      <Wrench className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5px] text-[#0f172b]" />
                      Suku Cadang
                    </h2>
                    <div className="flex gap-2 items-center">
                      <button
                        onClick={openAddPart}
                        className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-slate-500 hover:text-slate-700 "
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setShowPartsHistoryModal(true)}
                        className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-slate-500 hover:text-slate-700 "
                      >
                        <LucideIcons.History className="w-5 h-5" />
                      </button>
                      <div className="relative">
                        <button
                          onClick={() => setShowPartsGroupingMenu(!showPartsGroupingMenu)}
                          className="w-10 h-10 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center bg-white active:scale-95"
                        >
                          <ListFilter className="w-5 h-5 text-slate-500" />
                        </button>
                        <AnimatePresence>
                          {showPartsGroupingMenu && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute right-0 top-[110%] w-48 bg-white rounded-2xl border border-slate-100 z-[100] py-2 overflow-hidden flex flex-col shadow-xl"
                            >
                              <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                                Kelompokkan
                              </div>
                              <button
                                onClick={() => {
                                  setPartsGrouping("kategori");
                                  setShowPartsGroupingMenu(false);
                                }}
                                className={`w-full text-left px-4 py-3 text-sm font-bold transition-colors ${partsGrouping === "kategori" ? "text-indigo-600 bg-indigo-50" : "text-slate-600 hover:bg-slate-50"}`}
                              >
                                Kategori
                              </button>
                              <button
                                onClick={() => {
                                  setPartsGrouping("status");
                                  setShowPartsGroupingMenu(false);
                                }}
                                className={`w-full text-left px-4 py-3 text-sm font-bold transition-colors ${partsGrouping === "status" ? "text-indigo-600 bg-indigo-50" : "text-slate-600 hover:bg-slate-50"}`}
                              >
                                Status Kondisi
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "dashboard" && (
                  <div className="flex items-center justify-between w-full animate-fade-in">
                    <h2 className="text-[22px] font-bold tracking-tight font-sans text-[#0f172b] flex items-center justify-start gap-[15px]">
                      <Gauge className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5px] text-[#0f172b]" />
                      Dashboard
                    </h2>
                    <div className="flex gap-2 items-center">
                      <button
                        onClick={() => setActiveTab("history")}
                        className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-slate-500 hover:text-slate-700 "
                      >
                        <LucideIcons.History className="w-5 h-5" />
                      </button>
                      <div className="relative">
                        <button
                          onClick={() => setShowDashboardMenu(!showDashboardMenu)}
                          className="w-10 h-10 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center bg-white active:scale-95"
                        >
                          <MoreHorizontal className="w-5 h-5 text-slate-500" />
                        </button>
                        <AnimatePresence>
                          {showDashboardMenu && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute right-0 top-[110%] w-40 bg-white rounded-2xl border border-slate-100 z-[100] py-2 overflow-hidden flex flex-col"
                            >
                              {[
                                "harian",
                                "mingguan",
                                "bulanan",
                                "semesteran",
                                "tahunan",
                              ].map((mode) => (
                                <button
                                  key={mode}
                                  onClick={() => {
                                    setDashboardMode(mode as any);
                                    setShowDashboardMenu(false);
                                  }}
                                  className={`w-full text-left px-4 py-3 text-xs sm:text-sm font-bold capitalize transition-colors ${dashboardMode === mode ? "text-[#0f172b] bg-slate-50" : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"}`}
                                >
                                  {mode}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "history" && (
                  <div className="flex items-center justify-between w-full animate-fade-in">
                    <h2 className="text-[22px] font-bold tracking-tight font-sans text-[#0f172b] flex items-center justify-start gap-[15px]">
                      <MapPinned className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5px] text-[#0f172b]" />
                      Aktivitas
                    </h2>
                    <div className="flex gap-2 items-center">
                      <div className="relative">
                        <button
                          onClick={() => setShowHistoryAddMenu(!showHistoryAddMenu)}
                          className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors active:scale-95"
                        >
                          <Plus className="w-5 h-5 text-slate-500" />
                        </button>
                        <AnimatePresence>
                          {showHistoryAddMenu && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute right-0 top-[110%] w-52 bg-white border border-slate-200 rounded-2xl z-50 overflow-hidden flex flex-col font-sans"
                            >
                              <button
                                onClick={() => {
                                  setShowHistoryAddMenu(false);
                                  openIncomeModal();
                                }}
                                className="w-full text-left px-4 py-3 text-sm font-bold text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 transition-colors border-b border-slate-100 flex items-center gap-2"
                              >
                                <TrendingUp className="w-4 h-4" />
                                Pendapatan
                              </button>
                              <button
                                onClick={() => {
                                  setShowHistoryAddMenu(false);
                                  openExpenseModal();
                                }}
                                className="w-full text-left px-4 py-3 text-sm font-bold text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors border-b border-slate-100 flex items-center gap-2"
                              >
                                <TrendingDown className="w-4 h-4" />
                                Pengeluaran
                              </button>
                              <button
                                onClick={() => {
                                  setShowHistoryAddMenu(false);
                                  setShowTripModal(true);
                                }}
                                className="w-full text-left px-4 py-3 text-sm font-bold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors flex items-center gap-2"
                              >
                                <Compass className="w-4 h-4" />
                                Perjalanan
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <div className="relative">
                        <button
                          onClick={() => setShowHistoryMenu(!showHistoryMenu)}
                          className="w-10 h-10 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center bg-white active:scale-95"
                        >
                          <MoreHorizontal className="w-5 h-5 text-slate-500" />
                        </button>
                        <AnimatePresence>
                          {showHistoryMenu && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute right-0 top-[110%] w-40 bg-white rounded-2xl border border-slate-100 z-[100] py-2 overflow-hidden flex flex-col"
                            >
                              {[
                                "harian",
                                "mingguan",
                                "bulanan",
                                "semesteran",
                                "tahunan",
                                "semua",
                              ].map((mode) => (
                                <button
                                  key={mode}
                                  onClick={() => {
                                    setHistoryMode(mode as any);
                                    setShowHistoryMenu(false);
                                  }}
                                  className={`w-full text-left px-4 py-3 text-xs sm:text-sm font-bold capitalize transition-colors ${historyMode === mode ? "text-[#0f172b] bg-slate-50" : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"}`}
                                >
                                  {mode}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "map" && (
                  <div className="flex items-center justify-between w-full animate-fade-in">
                    <h2 className="text-[22px] font-bold tracking-tight font-sans text-[#0f172b] flex items-center justify-start gap-[15px]">
                      <MapPin className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5px] text-[#0f172b]" />
                      Peta SPBU
                    </h2>
                  </div>
                )}
                {activeTab === "settings" && (
                  <div className="flex items-center justify-between w-full animate-fade-in">
                    <h2 className="text-[22px] font-bold tracking-tight font-sans text-[#0f172b] flex items-center justify-start gap-[15px]">
                      {settingsTab === "main" ? (
                        <>
                          <SettingsIcon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5px] text-[#0f172b]" />
                          Pengaturan
                        </>
                      ) : (
                        <>
                          <button onClick={() => setSettingsTab("main")} className="active:scale-95 mr-2">
                            <ChevronLeft className="w-6 h-6 stroke-[3px]" />
                          </button>
                          {settingsTab === "localization" && "Lokalisasi"}
                          {settingsTab === "data" && "Manajemen Data"}
                          {settingsTab === "about" && "Tentang"}
                        </>
                      )}
                    </h2>
                  </div>
                )}
              </div>

              {/* APPLICATION MAIN CONTENT AREA */}
              <div className="flex-grow flex flex-col overflow-y-auto scrollbar-hide pb-[120px]">
            {/* TAB 1: FUEL VIEW */}
            {activeTab === "fuel" && (
              <div className="px-4 flex flex-col gap-5 animate-fade-in relative z-10 pt-4 pb-8">
                <div className="px-4 flex flex-col gap-4">
                  {/* STATUS KENDARAAN SECTION */}
                  <div className="grid grid-cols-[1fr_7fr_2fr] items-stretch gap-3 relative z-10 w-full">
                    {/* Sisa Bar Bensin (Vertical without box) */}
                    <div className="flex flex-col shrink-0 justify-center items-center">
                      <span className="text-[10px] font-bold text-slate-400 leading-none mb-[14px]">
                        F
                      </span>
                      <div className="flex flex-col gap-1 w-4 sm:w-5 h-[94px] sm:h-[108px]">
                        {Array.from({ length: maxBars }).map((_, i) => {
                          const barIdx = maxBars - 1 - i;
                          const isFilled = barIdx < activeBar;
                          return (
                            <div
                              key={barIdx}
                              className={`w-full flex-1 rounded-[2px] transition-all duration-500 ${isFilled ? fuelColorConfig.bg + " " : "bg-slate-200/50"}`}
                            />
                          );
                        })}
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 leading-none mt-[14px]">
                        E
                      </span>
                    </div>

                    {/* 1. Odometer Terkini */}
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl flex flex-col items-center justify-center py-6 gap-1 relative z-10 h-full w-full">
                      <Gauge className="w-10 h-10 text-slate-700 mb-1" />
                      <div className="text-2xl lg:text-3xl font-bold tracking-wider text-slate-900 text-center">
                        {(lastLoggedOdometer || 0).toLocaleString("id-ID")}{" "}
                        <span className="text-base lg:text-lg text-slate-500 font-medium">
                          km
                        </span>
                      </div>
                      <div className="text-[10px] font-bold text-slate-400 tracking-widest uppercase text-center">
                        Odometer Terkini
                      </div>
                    </div>

                    {/* 3. Status Terkini Tangki (Animasi Cairan) */}
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl py-3 px-2 flex flex-col items-center justify-between gap-3 relative overflow-hidden h-full w-full shrink-0">
                      {/* Liquid Fill Background */}
                      <div
                        className={`absolute bottom-0 left-0 right-0 w-full transition-all duration-1000 ease-in-out ${fuelColorConfig.bg}`}
                        style={{ height: `${(activeBar / maxBars) * 100}%` }}
                      />

                      <div className="flex flex-col items-center w-full z-10 -mt-[1px]">
                        <span className={`text-[10px] font-bold uppercase transition-colors duration-500 ${activeBar / maxBars >= 0.75 ? "text-white/80" : "text-slate-500"}`}>
                          Full
                        </span>
                        <span className={`text-lg font-bold font-mono leading-tight mt-[10px] transition-colors duration-500 ${activeBar / maxBars >= 0.75 ? "text-white" : "text-slate-900"}`}>
                          {((activeBar / maxBars) * tankCapacity)
                            .toFixed(1)
                            .replace(".", ",")}
                        </span>
                      </div>

                      <div className="flex flex-col items-center w-full z-10 -mb-[1px]">
                        <span className={`text-lg font-bold font-mono leading-tight mb-[10px] transition-colors duration-500 ${activeBar / maxBars >= 0.25 ? "text-white" : "text-slate-400"}`}>
                          {(((maxBars - activeBar) / maxBars) * tankCapacity)
                            .toFixed(1)
                            .replace(".", ",")}
                        </span>
                        <span className={`text-[10px] font-bold uppercase transition-colors duration-500 ${activeBar / maxBars >= 0.25 ? "text-white/80" : "text-slate-400"}`}>
                          Empty
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ACTIVE FUEL SELECTION */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs uppercase tracking-wider font-bold text-slate-400">
                        {t.active_profile_lbl}
                      </span>
                    </div>

                    <div className="relative">
                      <button
                        id="active-fuel-select"
                        type="button"
                        onClick={() => setIsFuelSelectOpen(!isFuelSelectOpen)}
                        className={`w-full bg-gradient-to-b ${fuelColorConfig.cardBg} border-2 ${fuelColorConfig.border} text-sm font-bold rounded-xl py-3 px-4 outline-none focus:ring-1 focus:ring-slate-800 transition-all overflow-hidden cursor-pointer flex justify-between items-center text-left`}
                      >
                        <span
                          className={`font-bold ${fuelColorConfig.text} truncate pr-2`}
                        >
                          {fuelProfiles[selectedProfileIndex]?.name || "-"}
                        </span>
                        <div className="flex items-center gap-2.5 shrink-0">
                          <span
                            className={`font-mono font-bold ${fuelColorConfig.text}`}
                          >
                            {formatCurrency(
                              fuelProfiles[selectedProfileIndex]?.price || 0,
                            )}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 ${fuelColorConfig.text} transition-transform duration-200 shrink-0 ${isFuelSelectOpen ? "rotate-180" : ""}`}
                          />
                        </div>
                      </button>

                      {isFuelSelectOpen && (
                        <>
                          <div
                            className="fixed inset-0 z-30"
                            onClick={() => setIsFuelSelectOpen(false)}
                          />
                          <div className="absolute left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl z-40 max-h-60 overflow-y-auto animate-fade-in divide-y divide-slate-100">
                            {fuelProfiles.map((p, idx) => {
                              const isSelected = idx === selectedProfileIndex;
                              const pTheme = getFuelTheme(p.name, p.color);
                              return (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => {
                                    setSelectedProfileIndex(idx);
                                    setNominalSelected(0);
                                    setTypedPrice("");
                                    setTypedVolume("");
                                    setPrecisionSliderValue(0);
                                    setIsFuelSelectOpen(false);
                                  }}
                                  className={`w-full py-3 px-4 text-sm flex justify-between items-center text-left transition-all hover:bg-slate-100 cursor-pointer ${
                                    isSelected
                                      ? `bg-gradient-to-r ${pTheme.cardBg} border-l-4 ${pTheme.border} font-bold`
                                      : "font-medium"
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={`w-2.5 h-2.5 rounded-full ${pTheme.dotColor} shrink-0`}
                                    />
                                    <span
                                      className={
                                        isSelected
                                          ? `font-bold ${pTheme.text}`
                                          : "text-slate-700"
                                      }
                                    >
                                      {p.name}
                                    </span>
                                  </div>
                                  <span
                                    className={`font-mono font-bold ${pTheme.text}`}
                                  >
                                    {formatCurrency(p.price)}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* THE PURCHASING TABS (OPTION 1, 2, 3, 4) - BEAUTIFUL INTEGRATION */}
                  <div className="flex flex-col">
                    {/* Selector Header Bar */}
                    <div className="flex w-full text-xs font-bold select-none relative z-10 -mb-[1px]">
                      <button
                        id="purchase-tab-btn-buttons"
                        onClick={() => {
                          setPurchaseTab("buttons");
                          setNominalSelected(nominalButtons[0]);
                        }}
                        className={`flex-1 py-3.5 px-0 text-center transition-all cursor-pointer whitespace-nowrap ${
                          purchaseTab === "buttons"
                            ? "bg-white border-t border-l border-r border-slate-200 rounded-t-[20px] text-slate-900"
                            : "border-t border-l border-r border-transparent text-slate-400 hover:text-slate-700"
                        }`}
                      >
                        {lang === "id" ? "Tombol" : "Btns"}
                      </button>
                      <button
                        id="purchase-tab-btn-price"
                        onClick={() => setPurchaseTab("manualPrice")}
                        className={`flex-1 py-3.5 px-0 text-center transition-all cursor-pointer whitespace-nowrap ${
                          purchaseTab === "manualPrice"
                            ? "bg-white border-t border-l border-r border-slate-200 rounded-t-[20px] text-slate-900"
                            : "border-t border-l border-r border-transparent text-slate-400 hover:text-slate-700"
                        }`}
                      >
                        {lang === "id" ? "Harga" : "Price"}
                      </button>
                      <button
                        id="purchase-tab-btn-volume"
                        onClick={() => setPurchaseTab("manualLiters")}
                        className={`flex-1 py-3.5 px-0 text-center transition-all cursor-pointer whitespace-nowrap ${
                          purchaseTab === "manualLiters"
                            ? "bg-white border-t border-l border-r border-slate-200 rounded-t-[20px] text-slate-900"
                            : "border-t border-l border-r border-transparent text-slate-400 hover:text-slate-700"
                        }`}
                      >
                        {lang === "id" ? (volUnit === "gallon" ? "Galon" : "Liter") : (volUnit === "gallon" ? "Gallon" : "Vol")}
                      </button>
                      <button
                        id="purchase-tab-btn-slider"
                        onClick={() => {
                          setPurchaseTab("slider");
                          setPrecisionSliderValue(Math.round(sliderMaxVal / 2));
                        }}
                        className={`flex-1 py-3.5 px-0 text-center transition-all cursor-pointer whitespace-nowrap ${
                          purchaseTab === "slider"
                            ? "bg-white border-t border-l border-r border-slate-200 rounded-t-[20px] text-slate-900"
                            : "border-t border-l border-r border-transparent text-slate-400 hover:text-slate-700"
                        }`}
                      >
                        {lang === "id" ? "Geser" : "Slider"}
                      </button>
                    </div>

                    <div className={`bg-white border border-slate-200 p-4 h-[212px] flex flex-col justify-center relative z-0 ${
                      purchaseTab === "buttons" ? "rounded-b-[20px] rounded-tr-[20px]" : 
                      purchaseTab === "slider" ? "rounded-b-[20px] rounded-tl-[20px]" : 
                      "rounded-[20px]"
                    }`}>
                      {/* TAP 1: 4 QUICKSILVER PRESETS */}
                      {purchaseTab === "buttons" && (
                        <div
                          className="grid grid-cols-2 gap-4 animate-fade-in"
                          id="purchase-quick-buttons-row"
                        >
                          {nominalButtons.map((nominal, idx) => {
                            const equivalentVolume =
                              nominal / (activeFuelPrice || 1);
                            const isPicked = nominalSelected === nominal;
                            return (
                              <button
                                key={idx}
                                id={`quick-add-nominal-btn-${idx}`}
                                onClick={() => setNominalSelected(nominal)}
                                className={`p-3 border rounded-xl flex flex-col items-center justify-center text-center transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
                                  isPicked
                                    ? "bg-slate-900 border-slate-950 text-white "
                                    : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800"
                                }`}
                              >
                                <span className="text-xs font-bold opacity-60 leading-none">
                                  {currency}
                                </span>
                                <span className="text-sm font-bold tracking-tight my-0.5">
                                  {nominal.toLocaleString(
                                    separator === "dot" ? "id-ID" : "en-US",
                                  )}
                                </span>
                                <span
                                  className={`text-xs font-mono font-medium ${isPicked ? "text-slate-300" : "text-slate-500"}`}
                                >
                                  ± {formatNumber(equivalentVolume, 2)}{" "}
                                  {volUnit === "gallon" ? "Gal" : "L"}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* TAP 2: PRICE INPUT BOX */}
                      {purchaseTab === "manualPrice" && (
                        <div className="flex flex-col gap-3 animate-fade-in">
                          <label className="text-xs font-bold uppercase text-slate-400 text-center block">
                            {lang === "id" ? "MASUKKAN NOMINAL HARGA" : "ENTER PRICE AMOUNT"}
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              id="manual-price-input-element"
                              placeholder={t.placeholder_price}
                              value={typedPrice}
                              onChange={(e) => setTypedPrice(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-lg font-bold rounded-2xl py-3 px-4 text-center placeholder:text-slate-300 outline-none focus:border-slate-800 focus:bg-white focus:ring-1 focus:ring-slate-800"
                            />
                          </div>
                          <div className="text-center">
                            <span className="text-xs text-slate-500 font-mono font-bold">
                              ={" "}
                              {formatNumber(
                                parseFloat(typedPrice)
                                  ? parseFloat(typedPrice) / activeFuelPrice
                                  : 0,
                                2,
                              )}{" "}
                              {volUnit === "gallon" ? "Gallons" : "Liters"}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* TAP 3: LITRE VOLUME INPUT BOX */}
                      {purchaseTab === "manualLiters" && (
                        <div className="flex flex-col gap-3 animate-fade-in">
                          <label
                            className="text-xs font-bold uppercase text-slate-400 text-center block"
                            id="litre-tab-header"
                          >
                            {lang === "id" ? `MASUKKAN NOMINAL ${volUnit === "gallon" ? "GALON" : "LITER"}` : "ENTER VOLUME AMOUNT"}
                          </label>
                          <input
                            type="number"
                            id="manual-liters-input-element"
                            placeholder={t.placeholder_volume}
                            step="0.1"
                            value={typedVolume}
                            onChange={(e) => setTypedVolume(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-lg font-bold rounded-2xl py-3 px-4 text-center placeholder:text-slate-300 outline-none focus:border-slate-800 focus:bg-white focus:ring-1 focus:ring-slate-800"
                          />
                          <div className="text-center">
                            <span className="text-xs text-slate-500 font-mono font-bold">
                              ={" "}
                              {formatCurrency(
                                parseFloat(typedVolume)
                                  ? Math.round(
                                      parseFloat(typedVolume) * activeFuelPrice,
                                    )
                                  : 0,
                              )}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* TAP 4: SLIDER PRECISION */}
                      {purchaseTab === "slider" && (
                        <div className="flex flex-col gap-3 animate-fade-in">
                          <label className="text-xs font-bold uppercase text-slate-400 text-center block">
                            {t.opsi_slider}
                          </label>
                          <div className="flex flex-col gap-4 py-2 px-1">
                            <input
                              type="range"
                              id="precision-slider-input-element"
                              min="0"
                              max={sliderMaxVal}
                              step={lang === "id" ? 500 : 1}
                              value={precisionSliderValue}
                              onChange={(e) =>
                                setPrecisionSliderValue(
                                  parseFloat(e.target.value),
                                )
                              }
                              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-900 border border-slate-200 outline-none"
                            />
                            <div className="flex justify-between items-center bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
                              <span className="font-mono text-sm font-bold text-slate-800">
                                {formatCurrency(precisionSliderValue)}
                              </span>
                              <span className="font-mono text-xs font-bold text-slate-500">
                                ±{" "}
                                {formatNumber(
                                  precisionSliderValue / activeFuelPrice,
                                  2,
                                )}{" "}
                                {volUnit === "gallon" ? "Gal" : "L"}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* LOG CTA ACTION */}
                  <div
                    id="primary-cta-refuel-save-action"
                    className="w-full relative"
                  >
                    <SlideToConfirm
                      onConfirm={handleLogClick}
                      onPlusClick={() => setShowQuickActionPopup(true)}
                      colorClass={fuelColorConfig.bg}
                      text={
                        lang === "en"
                          ? "Slide to fuel check"
                          : "Geser untuk catat"
                      }
                      slideIcon={
                        <Plus
                          className={`w-6 h-6 ${fuelColorConfig.bg.replace("bg-", "text-")}`}
                          strokeWidth={3}
                        />
                      }
                    />

                    {/* QUICk ACTION POPUP */}
                    {showQuickActionPopup && (
                      <>
                        <div
                          className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm"
                          onClick={() => setShowQuickActionPopup(false)}
                        />
                        <div className="absolute bottom-[80px] left-0 right-0 z-50 bg-white rounded-3xl border border-slate-200 p-4 flex flex-col gap-2 animate-fade-in origin-bottom">
                          <button
                            onClick={() => {
                              setShowQuickActionPopup(false);
                              openIncomeModal();
                            }}
                            className="w-full flex items-center justify-between p-4 bg-sky-50 text-sky-700 hover:bg-sky-100 rounded-2xl transition-colors text-left"
                          >
                            <div className="flex items-center gap-3">
                              <Plus className="w-5 h-5" />
                              <span className="font-bold text-sm">
                                Tambahkan Pendapatan
                              </span>
                            </div>
                          </button>
                          <button
                            onClick={() => {
                              setShowQuickActionPopup(false);
                              setShowTripModal(true);
                            }}
                            className="w-full flex items-center justify-between p-4 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-2xl transition-colors text-left"
                          >
                            <div className="flex items-center gap-3">
                              <MapPinned className="w-5 h-5" />
                              <span className="font-bold text-sm">
                                Catat Perjalanan
                              </span>
                            </div>
                          </button>
                          <button
                            onClick={() => {
                              setShowQuickActionPopup(false);
                              openAddPart();
                            }}
                            className="w-full flex items-center justify-between p-4 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-2xl transition-colors text-left"
                          >
                            <div className="flex items-center gap-3">
                              <Wrench className="w-5 h-5" />
                              <span className="font-bold text-sm">
                                Servis Spare Part
                              </span>
                            </div>
                          </button>
                          <button
                            onClick={() => {
                              setShowQuickActionPopup(false);
                              openSyncModal();
                            }}
                            className="w-full flex items-center justify-between p-4 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-2xl transition-colors text-left"
                          >
                            <div className="flex items-center gap-3">
                              <RefreshCw className="w-5 h-5" />
                              <span className="font-bold text-sm">
                                Update Odometer Terkini
                              </span>
                            </div>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: DASHBOARD OVERVIEW */}
            {activeTab === "dashboard" && (
              <div className="px-4 flex flex-col gap-6 animate-fade-in pt-4 pb-8">

                {/* REKAPITULASI & STATS */}
                {(() => {
                  const now = Date.now();
                  let days = 30;
                  if (dashboardMode === "harian") days = 1;
                  else if (dashboardMode === "mingguan") days = 7;
                  else if (dashboardMode === "semesteran") days = 180;
                  else if (dashboardMode === "tahunan") days = 365;

                  const cutoff = now - days * 24 * 3600 * 1000;

                  const dashExpenses = history.filter(
                    (h) => h.timestamp >= cutoff,
                  );
                  const dashGeneralExpenses = expenseHistory.filter(
                    (h) => h.timestamp >= cutoff,
                  );
                  const dashIncome = incomeHistory.filter(
                    (h) => h.timestamp >= cutoff,
                  );

                  const totalBBMPrice = dashExpenses.reduce(
                    (acc, curr) => acc + curr.totalPrice,
                    0,
                  );
                  const totalGeneralCost = dashGeneralExpenses.reduce(
                    (acc, curr) => acc + curr.cost,
                    0,
                  );
                  const totalPengeluaran = totalBBMPrice + totalGeneralCost;

                  const totalBBMVol = dashExpenses.reduce(
                    (acc, curr) => acc + curr.volume,
                    0,
                  );
                  const dashTrips = tripHistory.filter(
                    (h) => h.timestamp >= cutoff,
                  );

                  const sumDistances =
                    dashIncome.reduce(
                      (acc, curr) => acc + (curr.distance || 0),
                      0,
                    ) +
                    dashGeneralExpenses.reduce(
                      (acc, curr) => acc + (curr.distance || 0),
                      0,
                    ) +
                    dashTrips.reduce(
                      (acc, curr) => acc + (curr.distance || 0),
                      0,
                    );

                  const allOdos = [
                    ...dashExpenses
                      .map((h) => h.odoBefore)
                      .filter((o) => o > 0),
                    ...dashGeneralExpenses
                      .map((h) => h.odometer || 0)
                      .filter((o) => o > 0),
                  ];
                  let odoDiff = 0;
                  if (allOdos.length >= 2) {
                    odoDiff = Math.max(...allOdos) - Math.min(...allOdos);
                  }
                  const maxOdo = allOdos.length > 0 ? Math.max(...allOdos) : 0;

                  const totalDistance = Math.max(sumDistances, odoDiff);
                  const avgConsumption =
                    totalBBMVol > 0
                      ? (totalDistance / totalBBMVol).toFixed(1) + " KM/L"
                      : "-";
                  const totalPendapatan = dashIncome.reduce(
                    (acc, curr) => acc + curr.total,
                    0,
                  );

                  const avgPendapatanPerKm =
                    totalDistance > 0 ? totalPendapatan / totalDistance : 0;
                  const avgPengeluaranPerKm =
                    totalDistance > 0 ? totalPengeluaran / totalDistance : 0;

                  return (
                    <>
                      <div className="bg-white rounded-[24px] p-5 border border-slate-200 flex flex-col gap-5 relative overflow-hidden">
                        <div className="text-[10px] sm:text-xs font-bold tracking-widest text-slate-400 capitalize text-center w-full relative z-20">
                          Statistik Perjalanan
                        </div>
                        <div className="flex flex-col gap-4 animate-fade-in relative z-10 w-full">
                          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center relative overflow-hidden">
                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-2.5 flex items-center gap-1 z-10 w-full justify-center px-1 truncate">
                              <Gauge className="w-3 h-3" /> ODOMETER TERKINI
                            </span>
                            <span className="text-xl font-bold text-slate-700 font-mono z-10">
                              {maxOdo.toLocaleString("id-ID")} KM
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center relative overflow-hidden">
                              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-2.5 flex items-center gap-1 z-10 w-full justify-center px-1 truncate">
                                <Milestone className="w-3 h-3" /> TOTAL TEMPUH
                              </span>
                              <span className="text-sm font-bold text-slate-700 font-mono z-10">
                                {totalDistance.toLocaleString("id-ID")} KM
                              </span>
                            </div>
                            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center relative overflow-hidden">
                              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-2.5 flex items-center gap-1 z-10 w-full justify-center px-1 truncate">
                                <Fuel className="w-3 h-3" /> AVG. KM/L
                              </span>
                              <span className="text-sm font-bold text-slate-700 font-mono z-10">
                                {avgConsumption}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <div className="flex w-full text-xs font-bold select-none relative z-10 -mb-[1px] mt-2">
                          <button
                            onClick={() => setDashboardSubTab("pengeluaran")}
                            className={`flex-1 py-3.5 px-0 text-center transition-all cursor-pointer whitespace-nowrap ${dashboardSubTab === "pengeluaran" ? "bg-white border-t border-l border-r border-slate-200 rounded-t-[20px] text-rose-600" : "border-t border-l border-r border-transparent text-slate-400 hover:text-slate-700"}`}
                          >
                            Pengeluaran
                          </button>
                          <button
                            onClick={() => setDashboardSubTab("keuangan")}
                            className={`flex-1 py-3.5 px-0 text-center transition-all cursor-pointer whitespace-nowrap ${dashboardSubTab === "keuangan" ? "bg-white border-t border-l border-r border-slate-200 rounded-t-[20px] text-slate-900" : "border-t border-l border-r border-transparent text-slate-400 hover:text-slate-700"}`}
                          >
                            Keuangan
                          </button>
                          <button
                            onClick={() => setDashboardSubTab("pendapatan")}
                            className={`flex-1 py-3.5 px-0 text-center transition-all cursor-pointer whitespace-nowrap ${dashboardSubTab === "pendapatan" ? "bg-white border-t border-l border-r border-slate-200 rounded-t-[20px] text-emerald-600" : "border-t border-l border-r border-transparent text-slate-400 hover:text-slate-700"}`}
                          >
                            Pendapatan
                          </button>
                        </div>

                        <div className={`bg-white border border-slate-200 p-5 flex flex-col gap-6 relative overflow-hidden ${
                          dashboardSubTab === "pengeluaran" ? "rounded-b-[20px] rounded-tr-[20px]" :
                          dashboardSubTab === "pendapatan" ? "rounded-b-[20px] rounded-tl-[20px]" :
                          "rounded-[20px]"
                        }`}>
                        {dashboardSubTab === "keuangan" && (
                          <div className="flex flex-col gap-5 w-full">
                            <div className="flex flex-col gap-4 animate-fade-in relative z-10 w-full">
                              <div className="grid grid-cols-2 gap-3">
                                <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                                  <span className="text-[10px] text-rose-500 font-bold uppercase tracking-widest mb-2.5 flex items-center gap-1">
                                    <TrendingDown className="w-3 h-3" /> PENGELUARAN
                                  </span>
                                  <span className="text-sm font-bold text-rose-600 font-mono">
                                    {formatCurrency(-totalPengeluaran)}
                                  </span>
                                </div>
                                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                                  <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest mb-2.5 flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3" /> PENDAPATAN
                                  </span>
                                  <span className="text-sm font-bold text-emerald-700 font-mono">
                                    {formatCurrency(totalPendapatan)}
                                  </span>
                                </div>
                                <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4 flex flex-col items-center justify-center text-center relative overflow-hidden">
                                  <span className="text-[10px] text-rose-500 font-bold uppercase tracking-widest mb-2.5 flex items-center gap-1 z-10 w-full justify-center px-1 truncate">
                                    <TrendingDown className="w-3 h-3" /> AVG. / KM
                                  </span>
                                  <span className="text-sm font-bold text-rose-600 font-mono z-10">
                                    {formatCurrency(-avgPengeluaranPerKm)} / km
                                  </span>
                                </div>
                                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex flex-col items-center justify-center text-center relative overflow-hidden">
                                  <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest mb-2.5 flex items-center gap-1 z-10 w-full justify-center px-1 truncate">
                                    <TrendingUp className="w-3 h-3" /> AVG. / KM
                                  </span>
                                  <span className="text-sm font-bold text-emerald-700 font-mono z-10">
                                    {formatCurrency(avgPendapatanPerKm)} / km
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {dashboardSubTab === "pengeluaran" && (
                          <div className="flex flex-col gap-5 w-full">
                            <div className="flex flex-col gap-4 animate-fade-in relative z-10 w-full">
                              <div className="grid grid-cols-2 gap-3">
                                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center relative overflow-hidden">
                                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-2.5 flex items-center gap-1 z-10 w-full justify-center px-1 truncate">
                                    <Fuel className="w-3 h-3" /> BAHAN BAKAR
                                  </span>
                                  <span className="text-sm font-bold text-slate-700 font-mono z-10">
                                    {formatCurrency(-totalBBMPrice)}
                                  </span>
                                </div>
                                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center relative overflow-hidden">
                                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-2.5 flex items-center gap-1 z-10 w-full justify-center px-1 truncate">
                                    <Wrench className="w-3 h-3" /> SUKU CADANG
                                  </span>
                                  <span className="text-sm font-bold text-slate-700 font-mono z-10">
                                    {formatCurrency(-totalGeneralCost)}
                                  </span>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center relative overflow-hidden">
                                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-2.5 flex items-center gap-1 z-10 w-full justify-center px-1 truncate">
                                    <Fuel className="w-3 h-3" /> AVG. / KM
                                  </span>
                                  <span className="text-sm font-bold text-slate-700 font-mono z-10">
                                    {formatCurrency(
                                      -(totalDistance > 0
                                        ? totalBBMPrice / totalDistance
                                        : 0),
                                    )}{" "}
                                    / km
                                  </span>
                                </div>
                                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center relative overflow-hidden">
                                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-2.5 flex items-center gap-1 z-10 w-full justify-center px-1 truncate">
                                    <Wrench className="w-3 h-3" /> AVG. / KM
                                  </span>
                                  <span className="text-sm font-bold text-slate-700 font-mono z-10">
                                    {formatCurrency(
                                      -(totalDistance > 0
                                        ? totalGeneralCost / totalDistance
                                        : 0),
                                    )}{" "}
                                    / km
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {dashboardSubTab === "pendapatan" && (
                          <div className="flex flex-col gap-5 w-full">
                            <div className="flex flex-col gap-4 animate-fade-in relative z-10 w-full">
                              <div className="grid grid-cols-2 gap-3">
                                {dashboardPlatforms[0] &&
                                  (() => {
                                    const p1Name = dashboardPlatforms[0];
                                    const p1Income = dashIncome
                                      .filter((i) => i.platform === p1Name)
                                      .reduce((a, b) => a + b.total, 0);
                                    return (
                                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-2.5 flex items-center gap-1">
                                          <AppDrawerIcon className="w-3 h-3" />{" "}
                                          {p1Name}
                                        </span>
                                        <span className="text-sm font-bold text-slate-700 font-mono">
                                          {formatCurrency(p1Income)}
                                        </span>
                                      </div>
                                    );
                                  })()}
                                {dashboardPlatforms[1] &&
                                  (() => {
                                    const p2Name = dashboardPlatforms[1];
                                    const p2Income = dashIncome
                                      .filter((i) => i.platform === p2Name)
                                      .reduce((a, b) => a + b.total, 0);
                                    return (
                                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-2.5 flex items-center gap-1">
                                          <AppDrawerIcon className="w-3 h-3" />{" "}
                                          {p2Name}
                                        </span>
                                        <span className="text-sm font-bold text-slate-700 font-mono">
                                          {formatCurrency(p2Income)}
                                        </span>
                                      </div>
                                    );
                                  })()}
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                {dashboardPlatforms[0] &&
                                  (() => {
                                    const p1Name = dashboardPlatforms[0];
                                    const p1Income = dashIncome
                                      .filter((i) => i.platform === p1Name)
                                      .reduce((a, b) => a + b.total, 0);
                                    const p1Avg =
                                      totalDistance > 0
                                        ? p1Income / totalDistance
                                        : 0;
                                    return (
                                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center relative overflow-hidden">
                                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-2.5 flex items-center gap-1 z-10 w-full justify-center px-1 truncate">
                                          <AppDrawerIcon className="w-3 h-3" />{" "}
                                          AVG. / KM
                                        </span>
                                        <span className="text-sm font-bold text-slate-700 font-mono z-10">
                                          {formatCurrency(p1Avg)} / km
                                        </span>
                                      </div>
                                    );
                                  })()}
                                {dashboardPlatforms[1] &&
                                  (() => {
                                    const p2Name = dashboardPlatforms[1];
                                    const p2Income = dashIncome
                                      .filter((i) => i.platform === p2Name)
                                      .reduce((a, b) => a + b.total, 0);
                                    const p2Avg =
                                      totalDistance > 0
                                        ? p2Income / totalDistance
                                        : 0;
                                    return (
                                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center relative overflow-hidden">
                                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-2.5 flex items-center gap-1 z-10 w-full justify-center px-1 truncate">
                                          <AppDrawerIcon className="w-3 h-3" />{" "}
                                          AVG. / KM
                                        </span>
                                        <span className="text-sm font-bold text-slate-700 font-mono z-10">
                                          {formatCurrency(p2Avg)} / km
                                        </span>
                                      </div>
                                    );
                                  })()}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}

            {/* TAB: PARTS VIEW */}
            {activeTab === "parts" && (
              <div className="px-4 flex flex-col gap-6 animate-fade-in relative z-10 pt-4 pb-8">
                {/* TIPS/Peringatan Suku Cadang - Minimalist */}
                {(() => {
                  const needsAttention = spareParts.filter((part) => {
                    const kmPassed = (lastLoggedOdometer || 0) - part.lastOdo;
                    const remain = Math.max(0, part.lifespanKm - kmPassed);
                    const percent = part.lifespanKm > 0
                      ? Math.min(100, Math.max(0, Math.round((remain / part.lifespanKm) * 100)))
                      : 0;
                    return percent < 25;
                  });

                  if (needsAttention.length > 0) {
                    return (
                      <div className="flex flex-col gap-2">
                        {needsAttention.slice(0, 3).map((part) => {
                          const kmPassed =
                            (lastLoggedOdometer || 0) - part.lastOdo;
                          const remain = Math.max(
                            0,
                            part.lifespanKm - kmPassed,
                          );
                          const percent = part.lifespanKm > 0
                            ? Math.min(100, Math.max(0, Math.round((remain / part.lifespanKm) * 100)))
                            : 0;
                          
                          const isDanger = percent < 15;
                          const isWarning = percent >= 15 && percent < 25;

                          const cardStyle = isDanger
                            ? "bg-red-50 text-red-600 border-red-100"
                            : isWarning
                              ? "bg-orange-50 text-orange-600 border-orange-100"
                              : "bg-yellow-50 text-yellow-600 border-yellow-100";

                          return (
                            <div
                              key={part.id}
                              className={`flex items-center gap-2.5 text-xs font-medium px-3 py-2.5 rounded-xl border cursor-pointer hover:opacity-80 transition-opacity ${cardStyle}`}
                              onClick={() => setExpandedPartId(part.id)}
                            >
                              {isDanger ? (
                                <div className="w-[18px] h-[18px] shrink-0 rounded-full border-[2.5px] border-current flex items-center justify-center text-[10px] font-black leading-none pb-[1px]">
                                  !
                                </div>
                              ) : (
                                <AlertTriangle
                                  className="w-5 h-5 shrink-0"
                                  strokeWidth={2.5}
                                />
                              )}
                              <span className="flex-1">
                                <strong>{part.name}</strong>{" "}
                                {`Estimasi kondisi (${percent}%)`}
                              </span>
                            </div>
                          );
                        })}
                        {needsAttention.length > 3 && (
                          <div
                            className="text-xs text-slate-500 font-medium px-2 py-1 flex items-center gap-1 cursor-pointer hover:text-slate-700 w-fit"
                            onClick={() => setPartsGrouping("status")}
                          >
                            + Lihat {needsAttention.length - 3} peringatan
                            lainnya <ChevronRight className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>
                    );
                  } else {
                    return (
                      <div className="flex items-center gap-2 text-xs font-medium px-3 py-2.5 rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-600">
                        <Check className="w-4 h-4 shrink-0" />
                        <span className="flex-1">
                          Sip! Semua komponen dalam kondisi prima mantap.
                        </span>
                      </div>
                    );
                  }
                })()}

                <div className="flex flex-col gap-6 relative z-10 w-full">
                  {(() => {
                    const processedParts = spareParts.map((part) => {
                      const kmPassed = (lastLoggedOdometer || 0) - part.lastOdo;
                      const remain = Math.max(0, part.lifespanKm - kmPassed);
                      const estimatedDays = Math.ceil(remain / 20);

                      const percent = part.lifespanKm > 0
                        ? Math.min(100, Math.max(0, Math.round((remain / part.lifespanKm) * 100)))
                        : 0;

                      const isBahaya = percent < 15;
                      const isServis = percent >= 15 && percent < 25;
                      const isPeriksa = percent >= 25 && percent < 40;
                      const isAman = percent >= 40;

                      const statusVal = isBahaya
                        ? 1
                        : isServis
                          ? 2
                          : isPeriksa
                            ? 3
                            : 4;
                      const statusText = `Estimasi kondisi (${percent}%)`;
                      const statusColor = isBahaya
                        ? "text-red-500"
                        : isServis
                          ? "text-orange-500"
                          : isPeriksa
                            ? "text-yellow-500"
                            : "text-emerald-500";
                      const bgClass = isBahaya
                        ? "bg-red-500"
                        : isServis
                          ? "bg-orange-500"
                          : isPeriksa
                            ? "bg-yellow-500"
                            : "bg-emerald-500";

                      return {
                        ...part,
                        remain,
                        estimatedDays,
                        isBahaya,
                        isServis,
                        isPeriksa,
                        isAman,
                        statusVal,
                        statusText,
                        statusColor,
                        bgClass,
                      };
                    });

                    let grouped: { title: string; parts: any[] }[] = [];

                    if (partsGrouping === "semua") {
                      grouped = [{ title: "", parts: processedParts }];
                    } else if (partsGrouping === "status") {
                      const dict: Record<number, any[]> = {
                        1: [],
                        2: [],
                        3: [],
                        4: [],
                      };
                      processedParts.forEach((p) => dict[p.statusVal].push(p));
                      if (dict[1].length)
                        grouped.push({
                          title: "Status: Bahaya",
                          parts: dict[1],
                        });
                      if (dict[2].length)
                        grouped.push({
                          title: "Status: Servis",
                          parts: dict[2],
                        });
                      if (dict[3].length)
                        grouped.push({
                          title: "Status: Periksa",
                          parts: dict[3],
                        });
                      if (dict[4].length)
                        grouped.push({ title: "Status: Aman", parts: dict[4] });
                    } else if (partsGrouping === "kategori") {
                      const dict: Record<string, any[]> = {};
                      processedParts.forEach((p) => {
                        const cat = p.category || "Lainnya";
                        if (!dict[cat]) dict[cat] = [];
                        dict[cat].push(p);
                      });
                      grouped = Object.keys(dict)
                        .sort()
                        .map((k) => ({
                          title: `Kategori: ${k}`,
                          parts: dict[k],
                        }));
                    }

                    return grouped.map((group, gIdx) => (
                      <div key={gIdx} className="flex flex-col gap-3">
                        {group.title && (
                          <div className="flex items-center gap-2 mt-1 mb-1">
                            <div className="h-px bg-slate-200 flex-1"></div>
                            <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                              {group.title}
                            </span>
                            <div className="h-px bg-slate-200 flex-1"></div>
                          </div>
                        )}
                        {group.parts.map((p, idx) => {
                          const IconComp =
                            LucideIcons[p.icon] || LucideIcons.Wrench;

                          return (
                            <div
                              key={p.id}
                              className="relative flex gap-2 items-center w-full group animate-fade-in"
                            >
                              <div className="flex-[1_1_0%] min-w-0 relative">
                                <SlideToConfirm
                                  onConfirm={() => openServiceActionModal(p.id)}
                                  colorClass={p.bgClass}
                                  slideIcon={
                                    <div className="relative flex items-center justify-center">
                                      <IconComp
                                        className={`w-6 h-6 ${p.statusColor}`}
                                        strokeWidth={2}
                                      />
                                    </div>
                                  }
                                  onClickTrack={() => openEditPart(p)}
                                  trackContent={
                                    <div className="absolute inset-0 flex justify-between items-center pl-[68px] pr-4 h-full">
                                      <div className="flex flex-col flex-1 min-w-0 pr-2 pt-[1px]">
                                        <div className="flex items-center gap-1.5 mb-[1px]">
                                          <span className="text-white font-bold text-[15px] leading-tight truncate">
                                            {p.name}
                                          </span>
                                          {p.merk && (
                                            <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-wider truncate shrink-0 max-w-[80px]">
                                              {p.merk}
                                            </span>
                                          )}
                                        </div>
                                        <span className="text-white/80 text-[13px] font-medium capitalize truncate mt-[1px]">
                                          {p.statusText}
                                          {p.notes && ` • ${p.notes}`}
                                        </span>
                                      </div>
                                      <span className="text-white font-mono text-[16px] font-bold tracking-tight shrink-0">
                                        {p.remain.toLocaleString("id-ID")} km
                                      </span>
                                    </div>
                                  }
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ));
                  })()}
                </div>
              </div>
            )}

            {/* TAB 2: TRANSACTION LOGS HISTORY VIEW */}
            {activeTab === "history" && (
              <div className="px-4 flex flex-col gap-5 animate-fade-in pt-4 pb-8">
                <div className="flex flex-col">
                  {/* Sub-tab toggle */}
                  <div className="flex w-full text-xs font-bold select-none relative z-10 -mb-[1px]">
                    <button
                      onClick={() => setHistorySubTab("pengeluaran")}
                      className={`flex-1 py-3.5 px-0 text-center transition-all cursor-pointer whitespace-nowrap ${
                        historySubTab === "pengeluaran"
                          ? "bg-white border-t border-l border-r border-slate-200 rounded-t-[20px] text-rose-600"
                          : "border-t border-l border-r border-transparent text-slate-400 hover:text-slate-700"
                      }`}
                    >
                      Pengeluaran
                    </button>
                    <button
                      onClick={() => setHistorySubTab("riwayat")}
                      className={`flex-1 py-3.5 px-0 text-center transition-all cursor-pointer whitespace-nowrap ${
                        historySubTab === "riwayat"
                          ? "bg-white border-t border-l border-r border-slate-200 rounded-t-[20px] text-slate-900"
                          : "border-t border-l border-r border-transparent text-slate-400 hover:text-slate-700"
                      }`}
                    >
                      Riwayat
                    </button>
                    <button
                      onClick={() => setHistorySubTab("pendapatan")}
                      className={`flex-1 py-3.5 px-0 text-center transition-all cursor-pointer whitespace-nowrap ${
                        historySubTab === "pendapatan"
                          ? "bg-white border-t border-l border-r border-slate-200 rounded-t-[20px] text-emerald-600"
                          : "border-t border-l border-r border-transparent text-slate-400 hover:text-slate-700"
                      }`}
                    >
                      Pendapatan
                    </button>
                  </div>

                  {/* DATA PROCESSING */}
                  {(() => {
                    const now = Date.now();
                  let days = 30;
                  if (historyMode === "harian") days = 1;
                  else if (historyMode === "mingguan") days = 7;
                  else if (historyMode === "semesteran") days = 180;
                  else if (historyMode === "tahunan") days = 365;

                  const cutoff = now - days * 24 * 3600 * 1000;
                  const isAll = historyMode === "semua";

                  // 1. PENGELUARAN (Expenses)
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
                  );

                  // 2. RIWAYAT (History - Volume & Parts)
                  const riwayatByDate: any = {};

                  const latestTrips = isAll
                    ? tripHistory
                    : tripHistory.filter((tp: any) => tp.timestamp >= cutoff);

                  latestTrips.forEach((tp: any) => {
                    const dObj = new Date(tp.timestamp);
                    const dStr = dObj.toLocaleDateString(
                      lang === "id" ? "id-ID" : "en-US",
                      { day: "numeric", month: "long", year: "numeric" },
                    );
                    if (!riwayatByDate[dStr])
                      riwayatByDate[dStr] = {
                        date: dStr,
                        items: [],
                        fallbackTime: tp.timestamp,
                      };
                    riwayatByDate[dStr].items.push({
                      type: "trip",
                      id: tp.id,
                      originName: tp.originName,
                      destinationName: tp.destinationName,
                      distance: tp.distance,
                      estFuelUsed: tp.estFuelUsed,
                      timestamp: tp.timestamp,
                    });
                  });

                  recentFuelExpenses.forEach((fuel: any) => {
                    const dObj = new Date(fuel.timestamp);
                    const dStr = dObj.toLocaleDateString(
                      lang === "id" ? "id-ID" : "en-US",
                      { day: "numeric", month: "long", year: "numeric" },
                    );
                    if (!riwayatByDate[dStr])
                      riwayatByDate[dStr] = { date: dStr, items: [], fallbackTime: fuel.timestamp };
                    riwayatByDate[dStr].items.push({
                      type: "bbm",
                      id: fuel.id,
                      volume: fuel.volume,
                      price: fuel.price,
                      timestamp: fuel.timestamp,
                    });
                  });

                  recentGeneralExpenses.filter((e: any) => e.platform === "Servis & Suku Cadang").forEach((part: any) => {
                    const dObj = new Date(part.timestamp);
                    const dStr = dObj.toLocaleDateString(
                      lang === "id" ? "id-ID" : "en-US",
                      { day: "numeric", month: "long", year: "numeric" },
                    );
                    if (!riwayatByDate[dStr])
                      riwayatByDate[dStr] = { date: dStr, items: [], fallbackTime: part.timestamp };
                    riwayatByDate[dStr].items.push({
                      type: "parts",
                      id: part.id,
                      name: part.name,
                      cost: part.cost,
                      timestamp: part.timestamp,
                    });
                  });

                  const riwayatList = Object.values(riwayatByDate).map((day: any) => {
                    day.items.sort((a: any, b: any) => b.timestamp - a.timestamp);
                    return day;
                  }).sort(
                    (a: any, b: any) => {
                      const tA = a.items[0]?.timestamp || a.fallbackTime;
                      const tB = b.items[0]?.timestamp || b.fallbackTime;
                      return tB - tA;
                    },
                  );

                  // 3. PENDAPATAN (Income)
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
                  );

                  return (
                    <div className={`bg-white border border-slate-200 p-4 flex flex-col gap-4 overflow-y-auto max-h-[600px] scrollbar-hide pb-20 relative z-0 font-sans text-left ${
                      historySubTab === "pengeluaran" ? "rounded-b-[20px] rounded-tr-[20px]" :
                      historySubTab === "pendapatan" ? "rounded-b-[20px] rounded-tl-[20px]" :
                      "rounded-[20px]"
                    }`}>
                      <div className="text-[10px] sm:text-xs font-bold tracking-widest text-slate-400 capitalize text-center w-full relative z-20">
                        {historyMode}
                      </div>

                      {/* PENGELUARAN SECTION */}
                      {historySubTab === "pengeluaran" &&
                        (expList.length === 0 ? (
                          <div className="bg-slate-50 border border-dashed border-slate-300 rounded-3xl p-10 text-center flex flex-col items-center justify-center gap-2">
                            <h4 className="font-bold text-slate-700 text-sm">
                              Belum ada pengeluaran
                            </h4>
                          </div>
                        ) : (
                          expList.map((day: any) => (
                            <div
                              key={day.date}
                              className="flex flex-col gap-2 animate-fade-in"
                            >
                              <div className="flex justify-between items-center px-1">
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                  {formatDateDisplay(day.date)}
                                </span>
                                <span className="text-xs font-bold text-rose-600">
                                  {formatCurrency(day.totalCost)}
                                </span>
                              </div>
                              <div className="flex flex-col gap-2">
                                {day.items.map((item: any) => (
                                  <SwipeActionRow
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
                                                ? `${item.platform} - ${item.notes || "Pengeluaran"}`
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
                                              `BBM ${formatNumber(item.volume, 2)} ${
                                                volUnit === "gallon"
                                                  ? "Gal"
                                                  : "L"
                                              }`
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
                                  </SwipeActionRow>
                                ))}
                              </div>
                            </div>
                          ))
                        ))}

                      {/* RIWAYAT SECTION */}
                      {historySubTab === "riwayat" &&
                        (riwayatList.length === 0 ? (
                          <div className="bg-slate-50 border border-dashed border-slate-300 rounded-3xl p-10 text-center flex flex-col items-center justify-center gap-2">
                            <h4 className="font-bold text-slate-700 text-sm">
                              Belum ada riwayat
                            </h4>
                          </div>
                        ) : (
                          riwayatList.map((day: any) => (
                            <div
                              key={day.date}
                              className="flex flex-col gap-2 animate-fade-in"
                            >
                              <div className="flex justify-between items-center px-1">
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                  {formatDateDisplay(day.date)}
                                </span>
                                {day.totalVol > 0 && (
                                  <span className="text-xs font-bold text-sky-600">
                                    {formatNumber(day.totalVol, 2)}{" "}
                                    {volUnit === "gallon" ? "Gal" : "L"} BBM
                                  </span>
                                )}
                              </div>
                              <div className="flex flex-col gap-2">
                                {day.items.map((item: any, idx: number) => {
                                  if (item.type === "trip") {
                                    return (
                                      <SwipeActionRow
                                        key={item.id || idx}
                                        onEdit={() => {
                                          setSelectedTripForEdit(item);
                                          setShowTripModal(true);
                                        }}
                                        onDelete={() => {
                                          if (confirm("Hapus perjalanan ini?")) {
                                            const updated = tripHistory.filter((t: any) => t.id !== item.id);
                                            setTripHistory(updated);
                                            localStorage.setItem("fc_trip_history", JSON.stringify(updated));
                                          }
                                        }}
                                        onPress={() => {
                                          setSelectedTripForEdit(item);
                                          setShowTripModal(true);
                                        }}
                                      >
                                        <div className="bg-white border border-emerald-100 hover:border-emerald-200 rounded-2xl p-4 flex items-center justify-between transition-all w-full cursor-pointer">
                                          <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                                              <MapPinned className="w-5 h-5" />
                                            </div>
                                            <div>
                                              <div className="text-sm font-bold text-slate-800">
                                                {item.originName &&
                                                item.destinationName
                                                  ? `${item.originName} - ${item.destinationName}`
                                                  : "Perjalanan"}
                                              </div>
                                              <div className="text-[11px] font-bold tracking-wide text-slate-400 uppercase mt-0.5">
                                                {`${item.distance?.toFixed(1)} km`}
                                              </div>
                                            </div>
                                          </div>
                                          <div className="flex items-center gap-3 shrink-0">
                                            <div className="font-mono text-sm font-bold text-emerald-600">
                                              {item.estFuelUsed?.toFixed(2)} L
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
                                          if (confirm("Hapus log BBM ini?")) {
                                            handleDeleteItem(item.id);
                                          }
                                        } else if (item.type === "parts") {
                                          if (confirm("Hapus pengeluaran ini?")) {
                                            deleteExpense(item.id);
                                          }
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
                                          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${item.type === "bbm" ? "bg-sky-50 text-sky-500" : "bg-orange-50 text-orange-500"}`}>
                                            {item.type === "bbm" ? (
                                              <Droplets className="w-5 h-5" />
                                            ) : (
                                              <Wrench className="w-5 h-5" />
                                            )}
                                          </div>
                                          <div className="flex-1 min-w-0">
                                            <div className="text-sm font-bold text-slate-800 truncate">
                                              {item.type === "bbm"
                                                ? "Isi BBM"
                                                : "Servis " + item.name}
                                            </div>
                                            <div className="text-[11px] font-bold tracking-wide text-slate-400 uppercase mt-0.5">
                                              {item.type === "bbm"
                                                ? formatCurrency(item.price)
                                                : formatCurrency(item.cost)}
                                            </div>
                                          </div>
                                          <div className="flex items-center gap-3 shrink-0">
                                            {item.type === "bbm" && (
                                              <div className="font-mono text-sm font-bold text-sky-600">
                                                +{formatNumber(item.volume, 2)}{" "}
                                                {volUnit === "gallon" ? "G" : "L"}
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

                      {/* PENDAPATAN SECTION */}
                      {historySubTab === "pendapatan" && (
                        <>
                          {incList.length === 0 ? (
                            <div className="bg-slate-50 border border-dashed border-slate-300 rounded-3xl p-10 text-center flex flex-col items-center justify-center gap-2">
                              <h4 className="font-bold text-slate-700 text-sm">
                                Belum ada pendapatan
                              </h4>
                            </div>
                          ) : (
                            incList.map((day: any) => (
                              <div
                                key={day.date}
                                className="flex flex-col gap-2 animate-fade-in"
                              >
                                <div className="flex justify-between items-center px-1">
                                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    {formatDateDisplay(day.date)}
                                  </span>
                                  <span className="text-xs font-bold text-emerald-600">
                                    {formatCurrency(day.totalInc)}
                                  </span>
                                </div>
                                <div className="flex flex-col gap-2">
                                  {day.items.map((item: any) => (
                                    <SwipeActionRow
                                      key={item.id}
                                      onEdit={() => openIncomeModal(item)}
                                      onDelete={() => {
                                        if (confirm("Hapus pendapatan ini?")) {
                                          deleteIncome(item.id);
                                        }
                                      }}
                                      onPress={() => openIncomeModal(item)}
                                    >
                                      <div className="bg-white border border-emerald-100 hover:border-emerald-200 rounded-2xl p-4 flex items-center justify-between transition-all w-full cursor-pointer">
                                        <div className="flex items-center gap-3 w-full">
                                          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                                            <TrendingUp className="w-5 h-5" />
                                          </div>
                                          <div className="flex-1 min-w-0">
                                            <div className="text-sm font-bold text-slate-800">
                                              {item.platform
                                                ? item.platform
                                                : "Pendapatan"}
                                            </div>
                                            <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">
                                              {item.distance > 0
                                                ? `${item.distance} km `
                                                : ""}
                                              {item.ratePerKm > 0
                                                ? `@ ${formatCurrency(item.ratePerKm)}/km `
                                                : ""}
                                              {item.otherCost !== 0
                                                ? `| Lain: ${formatCurrency(item.otherCost || 0)}`
                                                : ""}
                                            </div>
                                          </div>
                                          <div className="flex items-center gap-3 shrink-0">
                                            <div className="font-mono text-base font-bold text-emerald-600">
                                              {formatCurrency(item.total)}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </SwipeActionRow>
                                  ))}
                                </div>
                              </div>
                            ))
                          )}
                        </>
                      )}
                    </div>
                  );
                })()}
                </div>
                {/* END OF HISTORY PORTION */}
              </div>
            )}

            {/* TAB 4: APP & VEHICLE INITIALIZATION SETTINGS VIEW */}
            {/* TAB 4: MAP / SPBU LOCATOR */}
            {activeTab === "map" && (
              <div className="px-4 py-5 flex flex-col gap-4 animate-fade-in flex-grow">
                <div className="w-full bg-slate-200 rounded-2xl overflow-hidden border border-slate-300 relative flex-grow min-h-[350px]">
                  {/* Faked Google Maps background (using an embedded iframe wrapper or a generic styling) */}
                  <div className="absolute inset-0 bg-[url('https://maps.gstatic.com/tactile/basemap_styler/v6/roadmap_256_1x.png')] bg-cover bg-center opacity-75 backdrop-contrast-125" />

                  {/* Search Bar overlay */}
                  <div className="absolute top-3 left-3 right-3 bg-white/90 backdrop-blur-md border border-slate-200 rounded-full flex items-center px-4 py-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 mr-3 animate-ping" />
                    <input
                      type="text"
                      placeholder="Cari SPBU Pertamina..."
                      className="bg-transparent border-none outline-none text-xs font-bold text-slate-800 w-full"
                      disabled
                    />
                    <div className="bg-indigo-100 text-indigo-600 p-1.5 rounded-full ml-2">
                      <MapPin className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Map Markers */}
                  <div className="absolute top-[40%] left-[30%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <div className="bg-red-600 text-white p-1 rounded-md border border-red-800 mb-1">
                      <Flame className="w-4 h-4" />
                    </div>
                    <div className="w-2 h-2 rounded-full bg-red-800 border-2 border-white " />
                  </div>

                  <div className="absolute top-[65%] left-[70%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <div className="bg-red-600 text-white p-1 rounded-md border border-red-800 mb-1 scale-75 opacity-70">
                      <Flame className="w-4 h-4" />
                    </div>
                    <div className="w-2 h-2 rounded-full bg-red-800 border-2 border-white " />
                  </div>

                  <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                    <div className="bg-white rounded-xl border border-slate-200 p-3 mx-4 flex gap-3 text-left animate-slide-up">
                      <div className="bg-red-50 p-2 rounded-lg border border-red-100 h-fit self-start shrink-0">
                        <Flame className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 leading-tight">
                          SPBU Pertamina 34.12345
                        </h4>
                        <p className="text-xs font-medium text-slate-500 leading-tight mt-0.5">
                          Jarak: 1.2 KM • Buka 24 Jam
                        </p>

                        <div className="flex gap-1 mt-2">
                          <span className="text-xs bg-green-100 text-green-800 px-1 py-0.5 rounded uppercase font-bold tracking-widest border border-green-200">
                            Pertalite
                          </span>
                          <span className="text-xs bg-indigo-100 text-indigo-800 px-1 py-0.5 rounded uppercase font-bold tracking-widest border border-indigo-200">
                            Pertamax
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="px-4 flex flex-col gap-5 animate-fade-in relative pt-4 pb-8">
                {settingsTab === "main" ? (
                  <>
                    <div className="flex flex-col gap-3 mt-2">
                      <button
                        onClick={() => setSettingsTab("localization")}
                        className="w-full bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between hover: transition-all active:scale-[0.98]"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                            <Droplets className="w-5 h-5" />
                          </div>
                          <div className="text-left">
                            <h3 className="font-bold text-slate-800 text-sm">
                              Lokalisasi & Format
                            </h3>
                            <p className="text-xs text-slate-500 font-medium mt-0.5">
                              Bahasa, mata uang, & unit volume
                            </p>
                          </div>
                        </div>
                        <ChevronDown className="w-5 h-5 text-slate-300 -rotate-90" />
                      </button>

                      <button
                        onClick={() => setSettingsTab("vehicle")}
                        className="w-full bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between hover: transition-all active:scale-[0.98]"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                            <Wrench className="w-5 h-5" />
                          </div>
                          <div className="text-left">
                            <h3 className="font-bold text-slate-800 text-sm">
                              Profil Kendaraan
                            </h3>
                            <p className="text-xs text-slate-500 font-medium mt-0.5">
                              Plat nomor, kapasitas tangki, & efisiensi
                            </p>
                          </div>
                        </div>
                        <ChevronDown className="w-5 h-5 text-slate-300 -rotate-90" />
                      </button>

                      <button
                        onClick={() => setSettingsTab("buttons")}
                        className="w-full bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between hover: transition-all active:scale-[0.98]"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center">
                            <Calculator className="w-5 h-5" />
                          </div>
                          <div className="text-left">
                            <h3 className="font-bold text-slate-800 text-sm">
                              Preset Nominal
                            </h3>
                            <p className="text-xs text-slate-500 font-medium mt-0.5">
                              Atur tombol cepat pengisian BBM
                            </p>
                          </div>
                        </div>
                        <ChevronDown className="w-5 h-5 text-slate-300 -rotate-90" />
                      </button>

                      <button
                        onClick={() => setSettingsTab("platforms")}
                        className="w-full bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between hover: transition-all active:scale-[0.98]"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center">
                            <AppDrawerIcon className="w-5 h-5" />
                          </div>
                          <div className="text-left">
                            <h3 className="font-bold text-slate-800 text-sm">
                              Platform & Akun
                            </h3>
                            <p className="text-xs text-slate-500 font-medium mt-0.5">
                              Kelola daftar layanan/ojol
                            </p>
                          </div>
                        </div>
                        <ChevronDown className="w-5 h-5 text-slate-300 -rotate-90" />
                      </button>

                      <button
                        onClick={() => setSettingsTab("reset")}
                        className="w-full bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between hover: transition-all active:scale-[0.98] mt-4"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5" />
                          </div>
                          <div className="text-left">
                            <h3 className="font-bold text-rose-600 text-sm">
                              Manajemen Data
                            </h3>
                            <p className="text-xs text-slate-500 font-medium mt-0.5">
                              Reset kalibrasi & hapus semua log
                            </p>
                          </div>
                        </div>
                        <ChevronDown className="w-5 h-5 text-slate-300 -rotate-90" />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setSettingsTab("main")}
                        className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 active:scale-95 transition-all"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                        {settingsTab === "localization" &&
                          "Lokalisasi & Format"}
                        {settingsTab === "vehicle" && "Konfigurasi Kendaraan"}
                        {settingsTab === "buttons" && "Preset Nominal"}
                        {settingsTab === "platforms" && "Platform & Akun"}
                        {settingsTab === "reset" && "Manajemen Data"}
                      </h2>
                    </div>

                    {settingsTab === "localization" && (
                      <div className="flex flex-col gap-3 mt-2 animate-fade-in">
                        <span className="text-xs uppercase font-bold tracking-widest text-slate-400 block">
                          {t.sett_lang_format}
                        </span>

                        <div className="bg-white border border-slate-200 rounded-3xl p-4 flex flex-col gap-3 text-xs leading-none">
                          <div className="flex flex-col gap-3.5">
                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-bold text-slate-500 uppercase">
                                {t.sett_lang}
                              </label>
                              <select
                                value={lang}
                                onChange={(e) =>
                                  setLang(e.target.value as "id" | "en")
                                }
                                className="py-2.5 px-3 bg-slate-50 text-slate-800 text-xs font-bold border border-slate-200 rounded-xl outline-none"
                              >
                                <option value="id">Bahasa Indonesia</option>
                                <option value="en">English (US)</option>
                              </select>
                            </div>

                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-bold text-slate-500 uppercase">
                                {t.sett_vol}
                              </label>
                              <select
                                value={volUnit}
                                onChange={(e) =>
                                  setVolUnit(
                                    e.target.value as "liter" | "gallon",
                                  )
                                }
                                className="py-2.5 px-3 bg-slate-50 text-slate-800 text-xs font-bold border border-slate-200 rounded-xl outline-none"
                              >
                                <option value="liter">
                                  Liter (L) - Metric
                                </option>
                                <option value="gallon">
                                  Gallon (Gal) - US
                                </option>
                              </select>
                            </div>

                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-bold text-slate-500 uppercase">
                                {t.sett_currency}
                              </label>
                              <select
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                className="py-2.5 px-3 bg-slate-50 text-slate-800 text-xs font-bold border border-slate-200 rounded-xl outline-none"
                              >
                                <option value="IDR">IDR (Rp)</option>
                                <option value="USD">USD ($)</option>
                                <option value="EUR">EUR (€)</option>
                                <option value="SGD">SGD ($)</option>
                                <option value="MYR">MYR (RM)</option>
                                <option value="THB">THB (฿)</option>
                                <option value="PHP">PHP (₱)</option>
                                <option value="AUD">AUD ($)</option>
                                <option value="JPY">JPY (¥)</option>
                                <option value="GBP">GBP (£)</option>
                              </select>
                            </div>

                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-bold text-slate-500 uppercase">
                                {t.sett_sep}
                              </label>
                              <select
                                value={separator}
                                onChange={(e) =>
                                  setSeparator(
                                    e.target.value as "dot" | "comma",
                                  )
                                }
                                className="py-2.5 px-3 bg-slate-50 text-slate-800 text-xs font-bold border border-slate-200 rounded-xl outline-none"
                              >
                                <option value="dot">{t.sett_sep_dot}</option>
                                <option value="comma">
                                  {t.sett_sep_comma}
                                </option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {settingsTab === "vehicle" && (
                      <div className="flex flex-col gap-3 mt-2 animate-fade-in">
                        <span className="text-xs uppercase font-bold tracking-widest text-slate-400 block">
                          {t.sett_vehicle}
                        </span>

                        <div className="bg-white border border-slate-200 rounded-3xl p-4 flex flex-col gap-3 text-xs leading-none">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase">
                              {lang === "id" ? "Nama Model Kendaraan" : "Vehicle Model Name"}
                            </label>
                            <input
                              type="text"
                              value={vehicleModel}
                              onChange={(e) => setVehicleModel(e.target.value)}
                              placeholder="Contoh: Uwinfly, Honda Beat"
                              className="py-2.5 px-3 bg-slate-50 text-slate-800 font-bold border border-slate-200 rounded-xl outline-none mb-2"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5 mb-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">
                              {lang === "id" ? "Tipe Kendaraan" : "Vehicle Type"}
                            </label>
                            <div className="grid grid-cols-2 gap-2 mt-1">
                              <button
                                onClick={() => setVehicleType("mobil")}
                                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                                  vehicleType === "mobil"
                                    ? "border-blue-500 bg-blue-50 text-blue-600 font-bold"
                                    : "border-slate-200 text-slate-500 hover:border-slate-300 bg-slate-50"
                                }`}
                              >
                                <LucideIcons.Car className="w-4 h-4 stroke-[2]" />
                                <span>{lang === "id" ? "Mobil" : "Car"}</span>
                              </button>
                              <button
                                onClick={() => setVehicleType("motor")}
                                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                                  vehicleType === "motor"
                                    ? "border-blue-500 bg-blue-50 text-blue-600 font-bold"
                                    : "border-slate-200 text-slate-500 hover:border-slate-300 bg-slate-50"
                                }`}
                              >
                                {(() => {
                                  const IconComponent = LucideIcons.Bike;
                                  return IconComponent ? <IconComponent className="w-4 h-4 stroke-[2]" /> : null;
                                })()}
                                <span>Motorbike</span>
                              </button>
                            </div>
                          </div>

                          <div className="flex flex-col gap-1.5 mb-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">
                              {vehicleType === "motor"
                                ? (lang === "id" ? "Tipe Motor" : "Motorbike Type")
                                : (lang === "id" ? "Tipe Mobil" : "Car Type")
                              }
                            </label>
                             <div className={`grid ${vehicleType === "mobil" ? "grid-cols-3" : "grid-cols-2"} gap-2 mt-1`}>
                               <button
                                 onClick={() => setMotorType("bensin")}
                                 className={`flex items-center justify-center gap-2 py-2.5 px-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                                   motorType === "bensin"
                                     ? "border-red-500 bg-red-50 text-red-600 font-bold"
                                     : "border-slate-200 text-slate-500 hover:border-slate-300 bg-slate-50"
                                 }`}
                               >
                                 <LucideIcons.Fuel className="w-4 h-4 stroke-[2]" />
                                 <span>Bensin</span>
                               </button>

                               {vehicleType === "mobil" && (
                                 <button
                                   onClick={() => setMotorType("hybrid")}
                                   className={`flex items-center justify-center gap-2 py-2.5 px-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                                     motorType === "hybrid"
                                       ? "border-red-500 bg-red-50 text-red-600 font-bold"
                                       : "border-slate-200 text-slate-500 hover:border-slate-300 bg-slate-50"
                                   }`}
                                 >
                                   {(() => {
                                     const LeafIcon = (LucideIcons as any).Leaf || LucideIcons.Sprout;
                                     return <LeafIcon className="w-4 h-4 stroke-[2]" />;
                                   })()}
                                   <span>Hybrid</span>
                                 </button>
                               )}

                               <button
                                 onClick={() => setMotorType("ev")}
                                 className={`flex items-center justify-center gap-2 py-2.5 px-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                                   motorType === "ev"
                                     ? "border-red-500 bg-red-50 text-red-600 font-bold"
                                     : "border-slate-200 text-slate-500 hover:border-slate-300 bg-slate-50"
                                 }`}
                               >
                                 <LucideIcons.Zap className="w-4 h-4 stroke-[2]" />
                                 <span>EV</span>
                               </button>
                             </div>
                          </div>

                          <div className="flex flex-col gap-1.5 mb-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">
                              {lang === "id" ? "Tipe Transmisi" : "Transmission Type"}
                            </label>
                            <div className="grid grid-cols-2 gap-2 mt-1">
                              <button
                                onClick={() => setTransmissionType("manual")}
                                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                                  transmissionType === "manual"
                                    ? "border-orange-500 bg-orange-50 text-orange-600 font-bold"
                                    : "border-slate-200 text-slate-500 hover:border-slate-300 bg-slate-50"
                                }`}
                              >
                                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth={2.5}>
                                  <path d="M6 5v14M12 5v14M18 5v14M6 12h12" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Manual</span>
                              </button>
                              <button
                                onClick={() => setTransmissionType("otomatis")}
                                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                                  transmissionType === "otomatis"
                                    ? "border-orange-500 bg-orange-50 text-orange-600 font-bold"
                                    : "border-slate-200 text-slate-500 hover:border-slate-300 bg-slate-50"
                                }`}
                              >
                                <LucideIcons.Gauge className="w-4 h-4 stroke-[2]" />
                                <span>{lang === "id" ? "Otomatis" : "Automatic"}</span>
                              </button>
                            </div>
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase">
                              Nomor Polisi / Plat
                            </label>
                            <input
                              type="text"
                              value={vehiclePlate}
                              onChange={(e) =>
                                setVehiclePlate(e.target.value.toUpperCase())
                              }
                              placeholder="Contoh: B 1234 ABC"
                              className="py-2.5 px-3 bg-slate-50 text-slate-800 font-bold border border-slate-200 rounded-xl outline-none mb-2"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase">
                              Besaran Pajak Tahunan
                            </label>
                            <input
                              type="number"
                              value={taxAmount}
                              onChange={(e) => setTaxAmount(e.target.value)}
                              placeholder={"Contoh: 300000"}
                              className="py-2.5 px-3 bg-slate-50 text-slate-800 font-bold border border-slate-200 rounded-xl outline-none mb-2"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase">
                              Tanggal Jatuh Tempo Pajak
                            </label>
                            <input
                              type="date"
                              value={taxDate}
                              onChange={(e) => setTaxDate(e.target.value)}
                              className="py-2.5 px-3 bg-slate-50 text-slate-800 font-bold border border-slate-200 rounded-xl outline-none mb-2"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase">
                              {t.sett_tank_capacity} (
                              {volUnit === "gallon" ? "Gallons" : "Liters"})
                            </label>
                            <input
                              type="number"
                              step="0.1"
                              value={tankCapacity || ""}
                              id="settings-tank-capacity-element"
                              onChange={(e) =>
                                setTankCapacity(parseFloat(e.target.value) || 0)
                              }
                              className="py-2.5 px-3 bg-slate-50 text-slate-800 font-bold border border-slate-200 rounded-xl outline-none"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase">
                              {t.sett_max_bars}
                            </label>
                            <input
                              type="number"
                              value={maxBars || ""}
                              id="settings-max-bars-element"
                              onChange={(e) =>
                                setMaxBars(parseInt(e.target.value, 10) || 1)
                              }
                              className="py-2.5 px-3 bg-slate-50 text-slate-800 font-bold border border-slate-200 rounded-xl outline-none"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label
                              className="text-xs font-bold text-slate-500 uppercase"
                              id="settings-eff-label"
                            >
                              {t.sett_efficiency_factor.replace(
                                "{unit}",
                                volUnit === "gallon" ? "Gal" : "L",
                              )}
                            </label>
                            <input
                              type="number"
                              value={dashboardEfficiency || ""}
                              id="settings-efficiency-element"
                              onChange={(e) =>
                                setDashboardEfficiency(
                                  parseFloat(e.target.value) || 1,
                                )
                              }
                              className="py-2.5 px-3 bg-slate-50 text-slate-800 font-bold border border-slate-200 rounded-xl outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {settingsTab === "buttons" && (
                      <div className="flex flex-col gap-3 mt-2 animate-fade-in">
                        <span className="text-xs uppercase font-bold tracking-widest text-slate-400 block">
                          {t.sett_quick_buttons} ({currency})
                        </span>

                        <div className="bg-white border border-slate-200 rounded-3xl p-4 flex flex-col gap-3 text-xs leading-none">
                          <div className="grid grid-cols-2 gap-3">
                            {nominalButtons.map((nominal, idx) => (
                              <div key={idx} className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-500 uppercase">
                                  {t.btn_sett} {idx + 1}
                                </label>
                                <input
                                  type="number"
                                  value={nominal || ""}
                                  id={`settings-quick-button-value-${idx}`}
                                  onChange={(e) =>
                                    handleUpdateNominalPreset(
                                      idx,
                                      parseFloat(e.target.value),
                                    )
                                  }
                                  className="py-2.5 px-3 bg-slate-50 text-slate-800 font-mono font-bold border border-slate-200 rounded-xl outline-none"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {settingsTab === "platforms" && (
                      <div className="flex flex-col gap-5 mt-2 animate-fade-in relative pb-10">
                        <div className="bg-sky-50 border border-sky-100 rounded-[20px] p-5">
                          <h3 className="text-sm font-bold text-sky-800 mb-2">
                            Platform Terdaftar
                          </h3>
                          <div className="flex flex-col gap-2">
                            {incomePlatforms.map((plat, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-3 "
                              >
                                <span className="text-sm font-bold text-slate-700">
                                  {plat}
                                </span>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => {
                                      const updated = [...incomePlatforms];
                                      updated.splice(idx, 1);
                                      setIncomePlatforms(updated);
                                    }}
                                    className="w-full bg-white/50 border border-rose-200 hover:bg-rose-50 text-rose-600 font-bold text-xs p-2 rounded-lg transition-all cursor-pointer flex items-center justify-center"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            ))}
                            {incomePlatforms.length === 0 && (
                              <div className="text-sm text-sky-600/70 py-2 font-medium">
                                Belum ada platform terdaftar.
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="bg-slate-50 border border-slate-200 rounded-[20px] p-5">
                          <h3 className="text-sm font-bold text-slate-700 mb-2">
                            Tambah Platform Baru
                          </h3>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="Lalamove"
                              value={newPlatformName}
                              onChange={(e) =>
                                setNewPlatformName(e.target.value)
                              }
                              className="flex-1 bg-white border border-slate-200 text-slate-900 text-sm font-bold py-3 px-4 rounded-xl outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                            />
                            <button
                              onClick={() => {
                                if (
                                  newPlatformName &&
                                  !incomePlatforms.includes(newPlatformName)
                                ) {
                                  setIncomePlatforms([
                                    ...incomePlatforms,
                                    newPlatformName,
                                  ]);
                                  setNewPlatformName("");
                                }
                              }}
                              className="bg-[#0f172b] text-white px-5 rounded-xl font-bold uppercase text-xs hover:bg-slate-800 active:scale-95 transition-all outline-none"
                            >
                              (+)
                            </button>
                          </div>
                        </div>

                        <div className="bg-emerald-50 border border-emerald-100 rounded-[20px] p-5">
                          <h3 className="text-sm font-bold text-emerald-800 mb-1">
                            Platform Dashboard
                          </h3>
                          <p className="text-xs text-emerald-600/80 mb-3 font-medium">
                            Pilih maksimal 2 platform untuk ditampilkan di
                            dashboard
                          </p>
                          <div className="flex flex-col gap-2">
                            {incomePlatforms.map((plat, idx) => (
                              <label
                                key={idx}
                                className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-3 cursor-pointer"
                              >
                                <span className="text-sm font-bold text-slate-700">
                                  {plat}
                                </span>
                                <input
                                  type="checkbox"
                                  className="w-5 h-5 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 accent-emerald-500"
                                  checked={dashboardPlatforms.includes(plat)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      if (dashboardPlatforms.length < 2) {
                                        setDashboardPlatforms([
                                          ...dashboardPlatforms,
                                          plat,
                                        ]);
                                      } else {
                                        alert(
                                          "Maksimal 2 platform yang bisa ditampilkan di dashboard",
                                        );
                                      }
                                    } else {
                                      setDashboardPlatforms(
                                        dashboardPlatforms.filter(
                                          (p) => p !== plat,
                                        ),
                                      );
                                    }
                                  }}
                                />
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {settingsTab === "reset" && (
                      <div className="flex flex-col gap-2.5 mt-2 animate-fade-in">
                        <button
                          id="warning-reset-calibration-action"
                          onClick={handleResetCalibration}
                          className="w-full bg-white/50 border border-orange-200 hover:bg-orange-50 text-orange-700 font-bold text-xs tracking-wider uppercase py-3.5 px-5 rounded-2xl transition-all cursor-pointer hover: flex items-center justify-center gap-2"
                        >
                          <RefreshCw className="w-4 h-4" />
                          {lang === "id"
                            ? "Reset Kalibrasi"
                            : "Reset Calibration"}
                        </button>

                        <div className="grid grid-cols-2 gap-2 mt-4 border-t border-slate-200 pt-4">
                          <button
                            onClick={handleExportData}
                            className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs tracking-wider uppercase py-3.5 px-3 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2"
                          >
                            <Download className="w-4 h-4" />
                            {lang === "id" ? "Backup Data" : "Backup"}
                          </button>
                          <label className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs tracking-wider uppercase py-3.5 px-3 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2 m-0 text-center relative overflow-hidden">
                            <Upload className="w-4 h-4 shrink-0" />
                            <span className="truncate">
                              {lang === "id" ? "Pulihkan Data" : "Restore"}
                            </span>
                            <input
                              type="file"
                              accept=".json"
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              onChange={handleImportData}
                            />
                          </label>
                        </div>

                        {/* SECTION E: RESET DATA BUTTON */}
                        <button
                          id="danger-clear-data-wipe-action"
                          onClick={handleResetWipeData}
                          className="w-full bg-white/50 border border-red-200 hover:bg-rose-50 text-rose-600 font-bold text-xs tracking-wider uppercase py-3.5 px-5 rounded-2xl transition-all cursor-pointer hover: flex items-center justify-center gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          {t.btn_wipe}
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          {/* BOTTOM NAVIGATION TABS CONTROLLER BAR */}
          <div 
            className="mt-auto shrink-0 bg-slate-900 grid grid-cols-5 pt-4 px-1 select-none z-10 font-sans border-t border-slate-800 relative shadow-2xl"
            style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))' }}
          >
            <button
              id="nav-tab-btn-fuel"
              onClick={() => setActiveTab("fuel")}
              className={`flex items-center justify-center transition-all cursor-pointer ${activeTab === "fuel" ? "text-white" : "text-slate-500 hover:text-slate-300"}`}
            >
              <Fuel
                className={`w-6 h-6 sm:w-7 sm:h-7 ${activeTab === "fuel" ? "stroke-[2.5px]" : "stroke-[1.8px] opacity-70"}`}
              />
            </button>

            <button
              id="nav-tab-btn-parts"
              onClick={() => setActiveTab("parts")}
              className={`flex items-center justify-center transition-all cursor-pointer ${activeTab === "parts" ? "text-white" : "text-slate-500 hover:text-slate-300"}`}
            >
              <Wrench
                className={`w-6 h-6 sm:w-7 sm:h-7 ${activeTab === "parts" ? "stroke-[2.5px]" : "stroke-[1.8px] opacity-70"}`}
              />
            </button>

            <button
              id="nav-tab-btn-dashboard"
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center justify-center transition-all cursor-pointer ${activeTab === "dashboard" ? "text-white" : "text-slate-500 hover:text-slate-300"}`}
            >
              <Gauge
                className={`w-6 h-6 sm:w-7 sm:h-7 ${activeTab === "dashboard" ? "stroke-[2.5px]" : "stroke-[1.8px] opacity-70"}`}
              />
            </button>

            <button
              id="nav-tab-btn-history"
              onClick={() => setActiveTab("history")}
              className={`flex items-center justify-center transition-all cursor-pointer ${activeTab === "history" ? "text-white" : "text-slate-500 hover:text-slate-300"}`}
            >
              <MapPinned
                className={`w-6 h-6 sm:w-7 sm:h-7 ${activeTab === "history" ? "stroke-[2.5px]" : "stroke-[1.8px] opacity-70"}`}
              />
            </button>

            <button
              id="nav-tab-btn-settings"
              onClick={() => setActiveTab("settings")}
              className={`flex items-center justify-center transition-all cursor-pointer ${activeTab === "settings" ? "text-white" : "text-slate-500 hover:text-slate-300"}`}
            >
              <SettingsIcon
                className={`w-6 h-6 sm:w-7 sm:h-7 ${activeTab === "settings" ? "stroke-[2.5px]" : "stroke-[1.8px] opacity-70"}`}
              />
            </button>
          </div>
          </>
          )}

          {/* STEP-BY-STEP MODAL OVERLAY */}
          <AnimatePresence>
            {showLogModal && (
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center z-50 p-4">
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 30, scale: 0.95 }}
                  className="bg-white rounded-3xl w-full max-w-sm border border-slate-100 overflow-hidden flex flex-col max-h-[90%] font-sans"
                >
                  {/* Modal Header */}
                  <div className="bg-slate-900 text-white py-4 px-5 flex justify-between items-center select-none">
                    <div className="flex items-center gap-2">
                      <Gauge className="w-4 h-4 text-emerald-400" />
                      <h3 className="font-bold text-xs uppercase tracking-widest leading-none">
                        {t.modal_title}
                      </h3>
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-400 uppercase leading-none">
                      {t.modal_step} {logModalStep} / 3
                    </span>
                  </div>

                  {/* Progress Bar indicator */}
                  <div className="w-full h-1 bg-slate-100 flex">
                    <div
                      className="h-full bg-emerald-400 transition-all duration-300"
                      style={{ width: `${(logModalStep / 3) * 100}%` }}
                    />
                  </div>

                  {/* Modal Body container */}
                  <div className="p-5 flex-grow overflow-y-auto">
                    {/* STEP 1: ODOMETER TRACKING */}
                    {logModalStep === 1 && (
                      <div className="flex flex-col gap-3 animate-fade-in">
                        <label className="text-xs font-bold text-slate-700 leading-tight">
                          {t.modal_prev_odo_label}
                        </label>

                        <div className="relative">
                          <input
                            type="number"
                            id="modal-odo-input"
                            placeholder={t.modal_prev_odo_placeholder}
                            value={logOdoInput}
                            onChange={(e) => setLogOdoInput(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-lg font-bold py-3 px-4 rounded-xl text-center outline-none focus:border-slate-800 focus:bg-white focus:ring-1 focus:ring-slate-800"
                          />
                        </div>

                        {lastLoggedOdometer !== null ? (
                          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex flex-col gap-1 text-xs font-mono text-slate-500 font-bold leading-normal">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                              {t.odo_awal_msg.replace(
                                "{val}",
                                formatNumber(lastLoggedOdometer),
                              )}
                            </span>
                            {logOdoInput &&
                              !isNaN(parseFloat(logOdoInput)) &&
                              parseFloat(logOdoInput) >= lastLoggedOdometer && (
                                <span className="flex items-center gap-1 text-emerald-600 mt-1">
                                  <Check className="w-3.5 h-3.5" />
                                  {lang === "id"
                                    ? "Jarak tempuh perjalanan baru:"
                                    : "New Distance Travel Run:"}{" "}
                                  +
                                  {formatNumber(
                                    parseFloat(logOdoInput) -
                                      lastLoggedOdometer,
                                  )}{" "}
                                  KM
                                </span>
                              )}
                          </div>
                        ) : (
                          <div className="text-xs font-mono font-medium text-orange-600 bg-orange-50 border border-orange-100 rounded-xl p-3 flex items-start gap-1.5 leading-normal">
                            <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-orange-500" />
                            <span>
                              {lang === "id"
                                ? "Pencatatan pertama! Angka ini akan menjadi Odometer Awal Anda."
                                : "This serves as your baseline motorcycle odometer tracking coordinate."}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* STEP 2: FUEL BAR ADJUSTMENT LEVEL */}
                    {logModalStep === 2 && (
                      <div className="flex flex-col gap-3.5 animate-fade-in">
                        <label className="text-xs font-bold text-slate-700 leading-tight">
                          {t.modal_new_bar_label}
                        </label>

                        <div className="flex gap-1.5 w-full">
                          {Array.from({ length: maxBars }).map((_, idx) => {
                            const barVal = idx + 1;
                            const isBeforeSelected = barVal <= activeBar;
                            const isAfterSelected = barVal <= logBarAfter;

                            // Cannot select target bars lower than reference point
                            const isDisabled = barVal < activeBar;

                            return (
                              <button
                                key={idx}
                                id={`modal-bar-cell-${barVal}`}
                                disabled={isDisabled}
                                onClick={() => setLogBarAfter(barVal)}
                                className={`flex-grow h-11 border rounded-lg font-mono text-xs font-bold transition-all relative flex flex-col items-center justify-center ${
                                  isDisabled
                                    ? "bg-slate-100 border-slate-200 text-slate-350 opacity-40 cursor-not-allowed"
                                    : isAfterSelected
                                      ? "bg-slate-900 border-slate-950 text-white font-bold"
                                      : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                                }`}
                              >
                                <span>{barVal}</span>
                                {isBeforeSelected && !isDisabled && (
                                  <span className="absolute bottom-0.5 text-xs font-sans text-emerald-400 block tracking-tight font-bold uppercase">
                                    {lang === "id" ? "Awal" : "Prev"}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>

                        <div className="text-center">
                          <span className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-wide bg-indigo-50 border border-indigo-100 rounded-full px-3 py-1 inline-block">
                            {activeBar} Bar ➔ {logBarAfter} Bar (+
                            {Math.max(0, logBarAfter - activeBar)} bars)
                          </span>
                        </div>
                      </div>
                    )}

                    {/* STEP 3: LOG ACTUAL FUEL EFFICIENCY (OPTIONAL) */}
                    {logModalStep === 3 && (
                      <div className="flex flex-col gap-3 animate-fade-in">
                        <label className="text-xs font-bold text-slate-700 leading-tight">
                          {t.modal_efficiency_label.replace(
                            "{unit}",
                            volUnit === "gallon" ? "Gal" : "L",
                          )}
                        </label>

                        <input
                          type="number"
                          id="modal-efficiency-input"
                          placeholder={t.modal_efficiency_placeholder}
                          value={logEfficiencyInput}
                          onChange={(e) =>
                            setLogEfficiencyInput(e.target.value)
                          }
                          className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-lg font-bold py-3 px-4 rounded-xl text-center outline-none focus:border-slate-800 focus:bg-white focus:ring-1 focus:ring-slate-800"
                        />

                        <p className="text-xs text-slate-400 font-medium font-mono text-center leading-normal">
                          {lang === "id"
                            ? "Membantu menjaga kalibrasi perkiraan tangki terhadap dashboard speedometer spido secara otomatis."
                            : "Keeps tracking accuracy closely synchronized to original instrument readings."}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Modal Footer Controls */}
                  <div className="bg-slate-50 border-t border-slate-100 p-4 flex gap-2.5">
                    <button
                      onClick={() => {
                        if (logModalStep > 1) {
                          setLogModalStep((prev) => prev - 1);
                        } else {
                          setShowLogModal(false);
                        }
                      }}
                      className="flex-grow py-3 px-4 border border-slate-200 bg-white text-slate-700 text-xs font-bold rounded-xl transition-all hover:bg-slate-50 cursor-pointer text-center uppercase"
                    >
                      {logModalStep === 1
                        ? t.modal_cancel
                        : lang === "id"
                          ? "Kembali"
                          : "Back"}
                    </button>

                    <button
                      onClick={() => {
                        if (logModalStep < 3) {
                          setLogModalStep((prev) => prev + 1);
                        } else {
                          handleFinishLog();
                        }
                      }}
                      className="flex-grow py-3 px-4 bg-slate-900 text-white text-xs font-bold rounded-xl transition-all hover:bg-slate-800 cursor-pointer text-center uppercase "
                    >
                      {logModalStep === 3 ? t.modal_finish : t.modal_next}
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showEditModal && (
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center z-50 p-4">
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 30, scale: 0.95 }}
                  className="bg-white rounded-3xl w-full max-w-sm border border-slate-100 overflow-hidden flex flex-col max-h-[90%] font-sans"
                >
                  <div className="bg-slate-900 text-white py-4 px-5 flex justify-between items-center select-none">
                    <div className="flex items-center gap-2">
                      <Edit2 className="w-5 h-5 text-indigo-400" />
                      <span className="font-bold tracking-tight">Edit Log</span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col gap-6 overflow-y-auto">
                    <div className="flex flex-col gap-3">
                      <label className="text-xs font-bold text-slate-700 leading-tight">
                        Jarak Tempuh Dashboard (Odometer):
                      </label>
                      <input
                        type="number"
                        value={editLogOdo}
                        onChange={(e) => setEditLogOdo(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-lg font-bold py-3 px-4 rounded-xl text-center outline-none focus:border-slate-800 focus:bg-white focus:ring-1 focus:ring-slate-800"
                      />
                    </div>

                    <div className="flex flex-col gap-3">
                      <label className="text-xs font-bold text-slate-700 leading-tight">
                        Posisi Indikator Bar BBM (Selesai Pengisian):
                      </label>
                      <div className="flex gap-1.5 w-full mt-1">
                        {Array.from({ length: maxBars }).map((_, idx) => {
                          const barVal = idx + 1;
                          const isAfterSelected = barVal <= editLogBarAfter;
                          return (
                            <button
                              key={idx}
                              onClick={() => setEditLogBarAfter(barVal)}
                              className={`flex-grow h-11 border rounded-lg font-mono text-xs font-bold transition-all relative flex flex-col items-center justify-center ${
                                isAfterSelected
                                  ? "bg-slate-900 border-slate-950 text-white font-bold"
                                  : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                              }`}
                            >
                              <span>{barVal}</span>
                            </button>
                          );
                        })}
                      </div>
                      <div className="text-center mt-2">
                        <span className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-wide bg-indigo-50 border border-indigo-100 rounded-full px-3 py-1 inline-block">
                          {editLogBarAfter} Bar
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 border-t border-slate-100 p-4 flex gap-2.5">
                    {editLogId && (
                      <button
                        onClick={() => {
                          if (confirm("Hapus perjalanan ini?")) {
                            handleDeleteItem(editLogId);
                            setShowEditModal(false);
                          }
                        }}
                        className="py-3 px-4 border border-rose-200 bg-rose-50 text-rose-600 text-xs font-bold rounded-xl transition-all hover:bg-rose-100 cursor-pointer text-center flex items-center justify-center shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => setShowEditModal(false)}
                      className="flex-grow py-3 px-4 border border-slate-200 bg-white text-slate-700 text-xs font-bold rounded-xl transition-all hover:bg-slate-50 cursor-pointer text-center uppercase"
                    >
                      Batal
                    </button>

                    <button
                      onClick={saveEditLog}
                      className="flex-grow py-3 px-4 bg-slate-900 text-white text-xs font-bold rounded-xl transition-all hover:bg-slate-800 cursor-pointer text-center uppercase "
                    >
                      Simpan
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showSyncModal && (
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center z-50 p-4">
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 30, scale: 0.95 }}
                  className="bg-white rounded-3xl w-full max-w-sm border border-slate-100 overflow-hidden flex flex-col max-h-[90%] font-sans"
                >
                  <div className="bg-slate-900 text-white py-4 px-5 flex justify-between items-center select-none">
                    <div className="flex items-center gap-2">
                      <RefreshCw className="w-5 h-5 text-emerald-400" />
                      <span className="font-bold tracking-tight">
                        Sinkronisasi Odometer
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col gap-6 overflow-y-auto bg-slate-50">
                    <div className="flex flex-col gap-1.5">
                      <p className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-1">
                        Update Jarak & Bensin
                      </p>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">
                        Catat jarak tempuh terbaru tanpa menambah histori
                        pengisian bensin. (Sebagai selingan)
                      </p>
                    </div>

                    <div className="flex flex-col gap-3">
                      <label className="text-xs font-bold text-slate-700 leading-tight">
                        Jarak Tempuh Dashboard (Odometer Terkini):
                      </label>
                      <input
                        type="number"
                        value={syncOdoInput}
                        onChange={(e) => setSyncOdoInput(e.target.value)}
                        placeholder="15400"
                        className="w-full bg-white border border-slate-200 text-slate-900 text-lg font-bold py-3 px-4 rounded-xl text-center outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                      />
                    </div>

                    <div className="flex flex-col gap-3">
                      <label className="text-xs font-bold text-slate-700 leading-tight">
                        Posisi Indikator Bar BBM Sekarang:
                      </label>
                      <div className="flex gap-1.5 w-full mt-1">
                        {Array.from({ length: maxBars }).map((_, idx) => {
                          const barVal = idx + 1;
                          const isAfterSelected = barVal <= syncBarAfter;
                          return (
                            <button
                              key={idx}
                              onClick={() => setSyncBarAfter(barVal)}
                              className={`flex-grow h-11 border rounded-lg font-mono text-xs font-bold transition-all relative flex flex-col items-center justify-center ${
                                isAfterSelected
                                  ? "bg-slate-900 border-slate-950 text-white font-bold"
                                  : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                              }`}
                            >
                              <span>{barVal}</span>
                            </button>
                          );
                        })}
                      </div>
                      <div className="text-center mt-2">
                        <span className="text-xs font-mono font-bold text-slate-600 uppercase tracking-wide bg-slate-200 border border-slate-300 rounded-full px-3 py-1 inline-block">
                          {syncBarAfter} Bar
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border-t border-slate-100 p-4 flex gap-2.5">
                    <button
                      onClick={() => setShowSyncModal(false)}
                      className="flex-grow py-3 px-4 border border-slate-200 bg-white text-slate-700 text-xs font-bold rounded-xl transition-all hover:bg-slate-50 cursor-pointer text-center uppercase"
                    >
                      Batal
                    </button>

                    <button
                      onClick={saveSyncOdometer}
                      className="flex-grow py-3 px-4 bg-emerald-600 text-white text-xs font-bold rounded-xl transition-all hover:bg-emerald-500 cursor-pointer text-center uppercase "
                    >
                      Simpan Cek
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showServiceActionModal && (
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center z-50 p-4">
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 30, scale: 0.95 }}
                  className="bg-white rounded-3xl w-full max-w-sm border border-slate-100 overflow-hidden flex flex-col max-h-[90%] font-sans relative"
                >
                  <div className="bg-slate-900 text-white py-4 px-5 flex justify-between items-center select-none">
                    <div className="flex items-center gap-2">
                      <SettingsIcon className="w-5 h-5 text-emerald-400" />
                      <span className="font-bold tracking-tight">
                        Catat Servis
                      </span>
                    </div>
                    <button
                      onClick={() => setShowServiceActionModal(false)}
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors active:scale-95 text-white"
                    >
                      <LucideIcons.X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="p-5 flex flex-col gap-5 overflow-y-auto">
                    <div>
                      <label className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-2 block">
                        Tindakan Servis
                      </label>
                      <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
                        <button
                          onClick={() => setServiceActionType("ganti_baru")}
                          className={`flex-1 py-3 text-center text-xs font-bold capitalize rounded-lg transition-all cursor-pointer ${serviceActionType === "ganti_baru" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                        >
                          Ganti Baru
                        </button>
                        <button
                          onClick={() => setServiceActionType("perbaiki")}
                          className={`flex-1 py-3 text-center text-xs font-bold capitalize rounded-lg transition-all cursor-pointer ${serviceActionType === "perbaiki" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                        >
                          Perbaiki Saja
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-2 block">
                        Biaya (Rp)
                      </label>
                      <input
                        type="number"
                        placeholder="150000"
                        value={serviceActionCost}
                        onChange={(e) => setServiceActionCost(e.target.value)}
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3.5 text-base font-bold text-slate-700 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all placeholder:text-slate-300 placeholder:font-semibold appearance-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-2 block">
                        Merk Baru (Opsional)
                      </label>
                      <input
                        type="text"
                        placeholder="NGK"
                        value={serviceActionMerk}
                        onChange={(e) => setServiceActionMerk(e.target.value)}
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3.5 text-base font-bold text-slate-700 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all placeholder:text-slate-300 placeholder:font-semibold"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-2 block">
                        Catatan (Opsional)
                      </label>
                      <textarea
                        placeholder="Catatan tambahan..."
                        value={serviceActionNotes}
                        onChange={(e) => setServiceActionNotes(e.target.value)}
                        rows={2}
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3.5 text-base font-bold text-slate-700 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all placeholder:text-slate-300 placeholder:font-semibold resize-none"
                      />
                    </div>
                  </div>

                  <div className="p-4 border-t border-slate-100 bg-slate-50">
                    <button
                      onClick={submitServiceAction}
                      className="w-full py-3.5 rounded-xl text-[15px] font-bold text-white transition-all bg-emerald-500 hover:bg-emerald-600 shadow-sm flex items-center justify-center gap-2"
                    >
                      <Check className="w-5 h-5" />
                      Simpan Servis
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showPartModal && (
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center z-50 p-4">
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 30, scale: 0.95 }}
                  className="bg-white rounded-3xl w-full max-w-sm border border-slate-100 overflow-hidden flex flex-col max-h-[90%] font-sans relative"
                >
                  <div className="bg-slate-900 text-white py-4 px-5 flex justify-between items-center select-none">
                    <div className="flex items-center gap-2">
                      <Wrench className="w-5 h-5 text-indigo-400" />
                      <span className="font-bold tracking-tight">
                        {partFormId ? "Edit Komponen" : "Tambah Komponen Baru"}
                      </span>
                    </div>
                    {partFormId && (
                      <button
                        onClick={deletePart}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="p-5 flex flex-col gap-5 overflow-y-auto bg-slate-50">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-700 leading-tight">
                        Nama Komponen:
                      </label>
                      <input
                        type="text"
                        value={partFormName}
                        onChange={(e) => setPartFormName(e.target.value)}
                        placeholder="Busi"
                        className="w-full bg-white border border-slate-200 text-slate-900 text-sm font-bold py-3 px-4 rounded-xl outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-700 leading-tight">
                        Merk:
                      </label>
                      <input
                        type="text"
                        value={partFormMerk}
                        onChange={(e) => setPartFormMerk(e.target.value)}
                        placeholder="NGK"
                        className="w-full bg-white border border-slate-200 text-slate-900 text-sm font-bold py-3 px-4 rounded-xl outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-700 leading-tight">
                        Catatan:
                      </label>
                      <textarea
                        value={partFormNotes}
                        onChange={(e) => setPartFormNotes(e.target.value)}
                        placeholder="Catatan tambahan (opsional)"
                        rows={2}
                        className="w-full bg-white border border-slate-200 text-slate-900 text-sm font-bold py-3 px-4 rounded-xl outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 resize-none"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-700 leading-tight">
                        Usia Komponen (KM):
                      </label>
                      <input
                        type="number"
                        value={partFormLifespan}
                        onChange={(e) => setPartFormLifespan(e.target.value)}
                        placeholder="10000"
                        className="w-full bg-white border border-slate-200 text-slate-900 text-sm font-bold py-3 px-4 rounded-xl outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-700 leading-tight">
                        Servis Terakhir di Odometer (KM):
                      </label>
                      <input
                        type="number"
                        value={partFormLastOdo}
                        onChange={(e) => setPartFormLastOdo(e.target.value)}
                        placeholder="15400"
                        className="w-full bg-white border border-slate-200 text-slate-900 text-sm font-bold py-3 px-4 rounded-xl outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-700 leading-tight">
                        Sisa Usia (KM):
                      </label>
                      <input
                        type="number"
                        value={(() => {
                          const currentOdo = lastLoggedOdometer || 0;
                          const lifespan = parseFloat(partFormLifespan) || 0;
                          const lastOdo = parseFloat(partFormLastOdo) || 0;
                          if (lifespan <= 0) return 0;
                          const kmPassed = currentOdo - lastOdo;
                          return Math.max(0, lifespan - kmPassed).toString();
                        })()}
                        onChange={(e) => {
                          const remainStr = e.target.value;
                          if (remainStr === "") return;
                          const remain = parseFloat(remainStr) || 0;
                          const currentOdo = lastLoggedOdometer || 0;
                          const lifespan = parseFloat(partFormLifespan) || 0;
                          const kmPassed = lifespan - remain;
                          const newLastOdo = Math.round(currentOdo - kmPassed);
                          setPartFormLastOdo(newLastOdo.toString());
                        }}
                        placeholder="Sisa usia dalam KM"
                        className="w-full bg-white border border-slate-200 text-slate-900 text-sm font-bold py-3 px-4 rounded-xl outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-end">
                        <label className="text-xs font-bold text-slate-700 leading-tight">
                          Kondisi Sekarang (%):
                        </label>
                        <span className="text-sm font-bold text-indigo-600">
                          {(() => {
                            const currentOdo = lastLoggedOdometer || 0;
                            const lifespan = parseFloat(partFormLifespan) || 0;
                            const lastOdo = parseFloat(partFormLastOdo) || 0;
                            if (lifespan <= 0) return 0;
                            const kmPassed = currentOdo - lastOdo;
                            const remain = Math.max(0, lifespan - kmPassed);
                            return Math.min(100, Math.round((remain / lifespan) * 100));
                          })()}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={(() => {
                          const currentOdo = lastLoggedOdometer || 0;
                          const lifespan = parseFloat(partFormLifespan) || 0;
                          const lastOdo = parseFloat(partFormLastOdo) || 0;
                          if (lifespan <= 0) return 0;
                          const kmPassed = currentOdo - lastOdo;
                          const remain = Math.max(0, lifespan - kmPassed);
                          return Math.min(100, Math.round((remain / lifespan) * 100));
                        })()}
                        onChange={(e) => {
                          const percent = parseInt(e.target.value) || 0;
                          const currentOdo = lastLoggedOdometer || 0;
                          const lifespan = parseFloat(partFormLifespan) || 0;
                          if (lifespan > 0) {
                            const remain = (percent / 100) * lifespan;
                            const kmPassed = lifespan - remain;
                            const newLastOdo = Math.round(currentOdo - kmPassed);
                            setPartFormLastOdo(newLastOdo.toString());
                          }
                        }}
                        className="w-full accent-indigo-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <p className="text-[10px] text-slate-500 font-medium">
                        Geser untuk ubah kondisi. Odo Servis Terakhir akan otomatis menyesuaikan.
                      </p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-700 leading-tight">
                        Ikon / Kategori:
                      </label>
                      <div className="mt-1 h-[200px] overflow-y-auto w-full bg-slate-50 border border-slate-200 rounded-xl p-2 pb-[80px]">
                        <div className="grid grid-cols-6 gap-2">
                          {SPARE_PART_ICONS.map((ico) => {
                            const IconComponent =
                              LucideIcons[ico] || LucideIcons.Wrench;
                            return (
                              <button
                                key={ico}
                                onClick={() => setPartFormIcon(ico)}
                                className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all shrink-0 ${partFormIcon === ico ? "bg-indigo-500 border-indigo-600 text-white " : "bg-white border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-800"}`}
                                aria-label={ico}
                                title={ico}
                              >
                                <IconComponent className="w-5 h-5" />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border-t border-slate-100 p-4 flex gap-2.5">
                    <button
                      onClick={() => setShowPartModal(false)}
                      className="flex-grow py-3 px-4 border border-slate-200 bg-white text-slate-700 text-xs font-bold rounded-xl transition-all hover:bg-slate-50 cursor-pointer text-center uppercase"
                    >
                      Batal
                    </button>

                    <button
                      onClick={savePart}
                      className="flex-grow py-3 px-4 bg-indigo-600 text-white text-xs font-bold rounded-xl transition-all hover:bg-indigo-500 cursor-pointer text-center uppercase "
                    >
                      Simpan
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Fuel Settings Modal */}
          <AnimatePresence>
            {showFuelSettingsModal && (
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center z-50 p-4">
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 30, scale: 0.95 }}
                  className="bg-white rounded-3xl w-full max-w-sm border border-slate-100 overflow-hidden flex flex-col max-h-[90%] font-sans"
                >
                  <div className="bg-[#0f172b] text-white py-4 px-5 flex justify-between items-center select-none">
                    <div className="flex items-center gap-2">
                      <Fuel className="w-5 h-5 text-emerald-400" />
                      <span className="font-bold tracking-tight">
                        Profil Bahan Bakar
                      </span>
                    </div>
                    <button
                      onClick={() => setShowFuelSettingsModal(false)}
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors active:scale-95 text-white"
                    >
                      <LucideIcons.X className="w-5 h-5" />
                    </button>
                  </div>

                  <div
                    className="p-4 flex flex-col gap-4 overflow-y-auto"
                    style={{ maxHeight: "70vh" }}
                  >
                    <div className="flex flex-col gap-4 text-xs leading-none">
                      {fuelProfiles.map((p, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col gap-3 p-4 bg-slate-50 border border-slate-150 rounded-2xl relative"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex-1">
                              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                                {lang === "id" ? "Nama" : "Name"}
                              </label>
                              <input
                                type="text"
                                value={p.name}
                                placeholder="Label"
                                id={`settings-fuel-profile-name-${idx}`}
                                onChange={(e) =>
                                  handleUpdateProfileData(
                                    idx,
                                    e.target.value,
                                    p.price,
                                    p.color,
                                  )
                                }
                                className="w-full py-2 px-3 bg-white text-slate-800 font-bold border border-slate-200 rounded-xl outline-none"
                              />
                            </div>
                            <div className="w-[110px]">
                              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                                {lang === "id" ? "Harga" : "Price"} ({currency})
                              </label>
                              <input
                                type="number"
                                value={p.price || ""}
                                placeholder="Price"
                                id={`settings-fuel-profile-price-${idx}`}
                                onChange={(e) =>
                                  handleUpdateProfileData(
                                    idx,
                                    p.name,
                                    parseFloat(e.target.value),
                                    p.color,
                                  )
                                }
                                className="w-full py-2 px-3 bg-white text-slate-800 font-mono font-bold border border-slate-200 rounded-xl outline-none"
                              />
                            </div>
                            <div className="self-end pb-1.5 shrink-0">
                              <button
                                onClick={() => handleDeleteProfile(idx)}
                                disabled={fuelProfiles.length <= 1}
                                className="text-slate-400 hover:text-rose-500 disabled:opacity-30 p-2 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 cursor-pointer transition-all"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>

                          <div className="mt-1">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                              {lang === "id" ? "WARNA CAIRAN" : "LIQUID COLOR"}
                            </label>
                            <div className="flex flex-wrap gap-2 items-center">
                              {[
                                {
                                  key: "green",
                                  hex: "#00a282",
                                  label: lang === "id" ? "Hijau" : "Green",
                                },
                                {
                                  key: "lime",
                                  hex: "#84cc16",
                                  label:
                                    lang === "id" ? "Hijau Muda" : "Lime Green",
                                },
                                {
                                  key: "yellow",
                                  hex: "#eab308",
                                  label: lang === "id" ? "Kuning" : "Yellow",
                                },
                                {
                                  key: "blue",
                                  hex: "#0077b6",
                                  label: lang === "id" ? "Biru" : "Blue",
                                },
                                {
                                  key: "red",
                                  hex: "#e11d48",
                                  label: lang === "id" ? "Merah" : "Red",
                                },
                                {
                                  key: "amber",
                                  hex: "#b45309",
                                  label: lang === "id" ? "Cokelat" : "Amber",
                                },
                                {
                                  key: "gold",
                                  hex: "#ea580c",
                                  label: lang === "id" ? "Emas" : "Gold",
                                },
                                {
                                  key: "purple",
                                  hex: "#7c3aed",
                                  label: lang === "id" ? "Ungu" : "Purple",
                                },
                              ].map((colorOpt) => {
                                const isSelected = p.color === colorOpt.key;
                                return (
                                  <button
                                    key={colorOpt.key}
                                    type="button"
                                    onClick={() =>
                                      handleUpdateProfileData(
                                        idx,
                                        p.name,
                                        p.price,
                                        colorOpt.key,
                                      )
                                    }
                                    className={`py-1.5 px-3 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 cursor-pointer ${
                                      isSelected
                                        ? "bg-white border-slate-300 text-slate-800 outline-none ring-1 ring-slate-800/10 shadow-sm"
                                        : "bg-transparent border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-white hover:shadow-sm"
                                    }`}
                                  >
                                    <span
                                      className="w-3 h-3 rounded-full inline-block shrink-0 border border-black/10"
                                      style={{
                                        backgroundColor: colorOpt.hex,
                                      }}
                                    />
                                    <span>{colorOpt.label}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      ))}

                      <button
                        onClick={handleAddCustomProfile}
                        className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs py-3.5 rounded-xl border border-dashed border-slate-300 transition-all cursor-pointer mt-1 flex items-center justify-center gap-2"
                      >
                        <Plus className="w-4 h-4" /> {t.sett_add_profile}
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Calculator Modal */}
          <AnimatePresence>
            {showCalculatorModal && (
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center z-50 p-4">
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 30, scale: 0.95 }}
                  className="bg-white rounded-3xl w-full max-w-sm border border-slate-100 overflow-hidden flex flex-col max-h-[90%] font-sans"
                >
                  <div className="bg-[#0f172b] text-white py-4 px-5 flex justify-between items-center select-none">
                    <div className="flex items-center gap-2">
                      <Calculator className="w-5 h-5 text-sky-400" />
                      <span className="font-bold tracking-tight">
                        {t.trip_title}
                      </span>
                    </div>
                    <button
                      onClick={() => setShowCalculatorModal(false)}
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors active:scale-95 text-white"
                    >
                      <LucideIcons.X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="p-5 flex flex-col gap-4 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                          {t.trip_fuel_type}
                        </span>
                        <span
                          className={`text-xs font-bold ${fuelColorConfig.text} font-sans block bg-gradient-to-r ${fuelColorConfig.cardBg} border ${fuelColorConfig.border} p-2 rounded-xl text-center`}
                        >
                          {fuelProfiles[selectedProfileIndex]?.name || "-"}
                        </span>
                      </div>

                      <div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                          {t.trip_price_unit}{" "}
                          {volUnit === "gallon" ? "Gallon" : "Liter"}
                        </span>
                        <span
                          className={`text-xs font-bold ${fuelColorConfig.text} font-sans block bg-gradient-to-r ${fuelColorConfig.cardBg} border ${fuelColorConfig.border} p-2 rounded-xl text-center`}
                        >
                          {formatCurrency(activeFuelPrice)}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center block mt-1.5">
                        {t.trip_distance_lbl}
                      </label>
                      <input
                        type="number"
                        id="calc-trip-distance-input"
                        placeholder={t.trip_distance_placeholder}
                        value={tripDistanceVal}
                        onChange={(e) => setTripDistanceVal(e.target.value)}
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
                        <div>
                          {lang === "id" ? "Kebutuhan BBM:" : "Fuel Required:"}{" "}
                          <strong className="text-slate-100">
                            ±{" "}
                            {formatNumber(tripCalcDetails.minVolumeRequired, 2)}{" "}
                            s/d{" "}
                            {formatNumber(tripCalcDetails.maxVolumeRequired, 2)}{" "}
                            {volUnit === "gallon" ? "Gallons" : "Liters"}
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
                      </div>
                    ) : (
                      <div className="border border-dashed border-slate-200 rounded-2xl p-4 text-center items-center justify-center text-slate-400 text-xs font-medium bg-slate-50">
                        {t.trip_calc_empty}
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Fuel History Modal */}
          <AnimatePresence>
            {showFuelHistoryModal && (
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center z-50 p-4">
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 30, scale: 0.95 }}
                  className="bg-white rounded-3xl w-full max-w-sm border border-slate-100 overflow-hidden flex flex-col max-h-[90%] font-sans"
                >
                  <div className="bg-[#0f172b] text-white py-4 px-5 flex justify-between items-center select-none">
                    <div className="flex items-center gap-2">
                      <LucideIcons.History className="w-5 h-5 text-indigo-400" />
                      <span className="font-bold tracking-tight">
                        Riwayat Bahan Bakar
                      </span>
                    </div>
                    <button
                      onClick={() => setShowFuelHistoryModal(false)}
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors active:scale-95 text-white"
                    >
                      <LucideIcons.X className="w-5 h-5" />
                    </button>
                  </div>

                  <div
                    className="p-4 flex flex-col gap-3 overflow-y-auto"
                    style={{ maxHeight: "400px" }}
                  >
                    {[...history]
                      .sort((a, b) => b.timestamp - a.timestamp)
                      .slice(0, 5)
                      .map((log) => {
                        const dateObj = new Date(log.timestamp);
                        const dateStr = dateObj.toLocaleDateString(
                          lang === "id" ? "id-ID" : "en-US",
                          { day: "numeric", month: "long", year: "numeric" },
                        );

                        return (
                          <div
                            key={log.id}
                            className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center justify-between shadow-sm"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                                <Fuel className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="text-sm font-bold text-slate-800">
                                  {log.volume.toLocaleString("id-ID", {
                                    maximumFractionDigits: 1,
                                  })}{" "}
                                  Liter
                                </div>
                                <div className="text-[11px] font-bold tracking-wide text-slate-400 uppercase mt-0.5">
                                  {dateStr} • {log.profileName}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-bold text-slate-700">
                                Rp {log.totalPrice.toLocaleString("id-ID")}
                              </div>
                              <div className="text-[11px] font-bold text-slate-400 mt-0.5">
                                Odo{" "}
                                {log.odometer?.toLocaleString("id-ID") || "-"}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    {history.length === 0 && (
                      <div className="text-center py-6 text-slate-400 text-sm font-medium">
                        Belum ada riwayat
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Parts History Modal */}
          <AnimatePresence>
            {showPartsHistoryModal && (
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center z-50 p-4">
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 30, scale: 0.95 }}
                  className="bg-white rounded-3xl w-full max-w-sm border border-slate-100 overflow-hidden flex flex-col max-h-[90%] font-sans"
                >
                  <div className="bg-[#0f172b] text-white py-4 px-5 flex justify-between items-center select-none">
                    <div className="flex items-center gap-2">
                      <LucideIcons.History className="w-5 h-5 text-indigo-400" />
                      <span className="font-bold tracking-tight">
                        Riwayat Suku Cadang
                      </span>
                    </div>
                    <button
                      onClick={() => setShowPartsHistoryModal(false)}
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors active:scale-95 text-white"
                    >
                      <LucideIcons.X className="w-5 h-5" />
                    </button>
                  </div>

                  <div
                    className="p-4 flex flex-col gap-3 overflow-y-auto"
                    style={{ maxHeight: "400px" }}
                  >
                    {[...spareParts]
                      .sort((a, b) => (b.lastDate || 0) - (a.lastDate || 0))
                      .slice(0, 5)
                      .map((part) => {
                        const IconComp =
                          LucideIcons[part.icon] || LucideIcons.Wrench;
                        return (
                          <div
                            key={part.id}
                            className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center justify-between shadow-sm"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-500 flex items-center justify-center shrink-0">
                                <IconComp className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="flex items-center gap-1.5 mb-[1px]">
                                  <div className="text-sm font-bold text-slate-800">
                                    {part.name}
                                  </div>
                                  {part.merk && (
                                    <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate shrink-0 max-w-[80px]">
                                      {part.merk}
                                    </span>
                                  )}
                                </div>
                                <div className="text-[11px] font-bold tracking-wide text-slate-400 uppercase mt-0.5">
                                  {new Date(part.lastDate).toLocaleDateString(
                                    lang === "id" ? "id-ID" : "en-US",
                                    {
                                      day: "numeric",
                                      month: "long",
                                      year: "numeric",
                                    },
                                  )}{" "}
                                  • Odo {part.lastOdo.toLocaleString("id-ID")}{" "}
                                  km
                                  {part.notes && ` • ${part.notes}`}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    {spareParts.length === 0 && (
                      <div className="text-center py-6 text-slate-400 text-sm font-medium">
                        Belum ada riwayat
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showTripModal && (
              <TripModal
                isOpen={showTripModal}
                onClose={() => {
                  setShowTripModal(false);
                  setSelectedTripForEdit(null);
                }}
                onDelete={() => {
                  if (selectedTripForEdit) {
                    const updated = tripHistory.filter((t: any) => t.id !== selectedTripForEdit.id);
                    setTripHistory(updated);
                    localStorage.setItem("fc_trip_history", JSON.stringify(updated));
                    setShowTripModal(false);
                    setSelectedTripForEdit(null);
                  }
                }}
                onSave={(data: any) => {
                  if (selectedTripForEdit) {
                    const updated = tripHistory.map((t: any) =>
                      t.id === selectedTripForEdit.id
                        ? {
                            ...t,
                            originName: data.originName,
                            destinationName: data.destinationName,
                            distance: data.distance,
                            estFuelUsed: data.estFuelUsed,
                            notes: data.notes,
                          }
                        : t,
                    );
                    setTripHistory(updated);
                    localStorage.setItem(
                      "fc_trip_history",
                      JSON.stringify(updated),
                    );
                  } else {
                    const newTrip: TripEntry = {
                      id: Math.random().toString(36).substring(2, 9),
                      date: new Date().toLocaleDateString("en-CA"),
                      timestamp: Date.now(),
                      originName: data.originName,
                      destinationName: data.destinationName,
                      distance: data.distance,
                      estFuelUsed: data.estFuelUsed,
                      notes: data.notes,
                    };
                    const updated = [...tripHistory, newTrip];
                    setTripHistory(updated);
                    localStorage.setItem(
                      "fc_trip_history",
                      JSON.stringify(updated),
                    );
                  }
                  setShowTripModal(false);
                  setSelectedTripForEdit(null);
                }}
                dashboardEfficiency={dashboardEfficiency}
                activeFuelPrice={activeFuelPrice}
                initialData={selectedTripForEdit}
              />
            )}
          </AnimatePresence>

          {/* Income Modal */}
          <AnimatePresence>
            {showIncomeModal && (
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center z-50 p-4">
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 30, scale: 0.95 }}
                  className="bg-white rounded-3xl w-full max-w-sm border border-slate-100 overflow-hidden flex flex-col max-h-[90%] font-sans"
                >
                  <div className="bg-slate-900 text-white py-4 px-5 flex justify-between items-center select-none">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-indigo-400" />
                      <span className="font-bold tracking-tight">
                        {t.income_modal_title}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col gap-5 overflow-y-auto bg-slate-50">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-700 leading-tight">
                        {t.income_rate_label}
                      </label>
                      <input
                        type="number"
                        value={incomeRate}
                        onChange={(e) => handleIncomeRateChange(e.target.value)}
                        placeholder="5000"
                        className="w-full bg-white border border-slate-200 text-slate-900 text-sm font-bold py-3 px-4 rounded-xl outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-700 leading-tight">
                        {t.income_distance_label}
                      </label>
                      <input
                        type="number"
                        value={incomeDistance}
                        onChange={(e) =>
                          handleIncomeDistanceChange(e.target.value)
                        }
                        placeholder="45"
                        className="w-full bg-white border border-slate-200 text-slate-900 text-sm font-bold py-3 px-4 rounded-xl outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-700 leading-tight">
                        {t.income_other_cost_label}
                      </label>
                      <input
                        type="number"
                        value={incomeOtherCost}
                        onChange={(e) =>
                          handleIncomeOtherCostChange(e.target.value)
                        }
                        placeholder="5000 / -5000"
                        className="w-full bg-white border border-slate-200 text-slate-900 text-sm font-bold py-3 px-4 rounded-xl outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-700 leading-tight">
                        {t.income_total_label}
                      </label>
                      <input
                        type="number"
                        value={incomeTotal}
                        onChange={(e) =>
                          handleIncomeTotalChange(e.target.value)
                        }
                        placeholder="Total Pendapatan"
                        className="w-full bg-white border border-slate-200 text-slate-900 text-sm font-bold py-3 px-4 rounded-xl outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-700 leading-tight">
                        Platform / Akun
                      </label>
                      <select
                        value={incomePlatform}
                        onChange={(e) => setIncomePlatform(e.target.value)}
                        className="w-full bg-white border border-slate-200 text-slate-900 text-sm font-bold py-3 px-4 rounded-xl outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 appearance-none"
                      >
                        <option value="">- Tidak Tentu -</option>
                        {incomePlatforms.map((plat, idx) => (
                          <option key={`plat-${idx}`} value={plat}>
                            {plat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-700 leading-tight">
                        {t.income_date_label}
                      </label>
                      <input
                        type="date"
                        value={incomeDate}
                        onChange={(e) => setIncomeDate(e.target.value)}
                        className="w-full bg-white border border-slate-200 text-slate-900 text-sm font-bold py-3 px-4 rounded-xl outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-700 leading-tight">
                        {t.income_notes_label}
                      </label>
                      <input
                        type="text"
                        value={incomeNotes}
                        onChange={(e) => setIncomeNotes(e.target.value)}
                        placeholder="Trip to Jakarta"
                        className="w-full bg-white border border-slate-200 text-slate-900 text-sm font-bold py-3 px-4 rounded-xl outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                      />
                    </div>
                  </div>

                  <div className="bg-white border-t border-slate-100 p-4 flex gap-2.5">
                    {selectedIncomeForEdit && (
                      <button
                        onClick={() => {
                          if (confirm("Hapus pendapatan ini?")) {
                            deleteIncome(selectedIncomeForEdit.id);
                          }
                        }}
                        className="py-3 px-4 border border-rose-200 bg-rose-50 text-rose-600 text-xs font-bold rounded-xl transition-all hover:bg-rose-100 cursor-pointer text-center flex items-center justify-center shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => setShowIncomeModal(false)}
                      className="flex-grow py-3 px-4 border border-slate-200 bg-white text-slate-700 text-xs font-bold rounded-xl transition-all hover:bg-slate-50 cursor-pointer text-center uppercase"
                    >
                      {t.cancel_btn}
                    </button>
                    <button
                      onClick={saveIncome}
                      className="flex-grow py-3 px-4 bg-indigo-600 text-white text-xs font-bold rounded-xl transition-all hover:bg-indigo-500 cursor-pointer text-center uppercase "
                    >
                      {t.save_btn}
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Expense Modal */}
          <AnimatePresence>
            {showExpenseModal && (
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center z-50 p-4">
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 30, scale: 0.95 }}
                  className="bg-white rounded-3xl w-full max-w-sm border border-slate-100 overflow-hidden flex flex-col max-h-[90%] font-sans"
                >
                  <div className="bg-slate-900 text-white py-4 px-5 flex justify-between items-center select-none">
                    <div className="flex items-center gap-2">
                      <TrendingDown className="w-5 h-5 text-rose-400" />
                      <span className="font-bold tracking-tight">
                        {t.expense_modal_title}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col gap-5 overflow-y-auto bg-slate-50">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-700 leading-tight">
                        {t.expense_odo_label}
                      </label>
                      <input
                        type="number"
                        value={expenseOdo}
                        onChange={(e) => setExpenseOdo(e.target.value)}
                        placeholder="15000"
                        className="w-full bg-white border border-slate-200 text-slate-900 text-sm font-bold py-3 px-4 rounded-xl outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-700 leading-tight">
                        {t.expense_distance_label}
                      </label>
                      <input
                        type="number"
                        value={expenseDistance}
                        onChange={(e) => setExpenseDistance(e.target.value)}
                        placeholder="50"
                        className="w-full bg-white border border-slate-200 text-slate-900 text-sm font-bold py-3 px-4 rounded-xl outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-700 leading-tight">
                        {t.expense_other_cost_label}
                      </label>
                      <input
                        type="number"
                        value={expenseOtherCost}
                        onChange={(e) => setExpenseOtherCost(e.target.value)}
                        placeholder="10000"
                        className="w-full bg-white border border-slate-200 text-slate-900 text-sm font-bold py-3 px-4 rounded-xl outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-700 leading-tight">
                        {t.expense_cost_label}
                      </label>
                      <input
                        type="number"
                        value={expenseCost}
                        onChange={(e) => setExpenseCost(e.target.value)}
                        placeholder="Total Pengeluaran"
                        className="w-full bg-white border border-slate-200 text-slate-900 text-sm font-bold py-3 px-4 rounded-xl outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-700 leading-tight">
                        Platform / Akun
                      </label>
                      <select
                        value={expensePlatform}
                        onChange={(e) => setExpensePlatform(e.target.value)}
                        className="w-full bg-white border border-slate-200 text-slate-900 text-sm font-bold py-3 px-4 rounded-xl outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 appearance-none"
                      >
                        <option value="">- Tidak Tentu -</option>
                        {incomePlatforms.map((plat, idx) => (
                          <option key={`plat-${idx}`} value={plat}>
                            {plat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-700 leading-tight">
                        {t.income_date_label}
                      </label>
                      <input
                        type="date"
                        value={expenseDate}
                        onChange={(e) => setExpenseDate(e.target.value)}
                        className="w-full bg-white border border-slate-200 text-slate-900 text-sm font-bold py-3 px-4 rounded-xl outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-700 leading-tight">
                        {t.expense_notes_label}
                      </label>
                      <input
                        type="text"
                        value={expenseNotes}
                        onChange={(e) => setExpenseNotes(e.target.value)}
                        placeholder="Cuci Motor"
                        className="w-full bg-white border border-slate-200 text-slate-900 text-sm font-bold py-3 px-4 rounded-xl outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                      />
                    </div>
                  </div>

                  <div className="bg-white border-t border-slate-100 p-4 flex gap-2.5">
                    {selectedExpenseForEdit && (
                      <button
                        onClick={() => {
                          if (confirm("Hapus pengeluaran ini?")) {
                            deleteExpense(selectedExpenseForEdit.id);
                          }
                        }}
                        className="py-3 px-4 border border-rose-200 bg-rose-50 text-rose-600 text-xs font-bold rounded-xl transition-all hover:bg-rose-100 cursor-pointer text-center flex items-center justify-center shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => setShowExpenseModal(false)}
                      className="flex-grow py-3 px-4 border border-slate-200 bg-white text-slate-700 text-xs font-bold rounded-xl transition-all hover:bg-slate-50 cursor-pointer text-center uppercase"
                    >
                      {t.cancel_btn}
                    </button>
                    <button
                      onClick={handleSaveExpense}
                      className="flex-grow py-3 px-4 bg-rose-600 text-white text-xs font-bold rounded-xl transition-all hover:bg-rose-500 cursor-pointer text-center uppercase "
                    >
                      {t.save_btn}
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
