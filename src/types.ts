export interface FuelProfile {
  name: string;
  price: number;
  color: string;
}

export interface FuelLog {
  id: string;
  date: string;
  timestamp: number;
  fuelType: string;
  pricePerUnit: number;
  totalPrice: number;
  volume: number;
  odoBefore: number;
  barBefore: number;
  barAfter: number;
  observedEfficiency?: number;
}

export interface IncomeEntry {
  id: string;
  date: string;
  timestamp: number;
  ratePerKm: number;
  distance: number;
  otherCost?: number;
  total: number;
  notes: string;
  platform: string;
}

export interface ExpenseEntry {
  id: string;
  date: string;
  timestamp: number;
  odometer?: number;
  distance?: number;
  otherCost?: number;
  cost: number;
  notes: string;
  platform: string;
}

export interface TripEntry {
  id: string;
  date: string;
  timestamp: number;
  originName: string;
  destinationName: string;
  distance: number;
  estFuelUsed: number;
  notes: string;
}
