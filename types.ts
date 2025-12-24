export interface Coordinates {
  latitude: number;
  longitude: number;
  timestamp: number;
}

export interface Journey {
  id: string;
  startTime: number;
  endTime?: number;
  path: Coordinates[];
  totalDistanceKm: number; // Calculated distance
  status: 'active' | 'completed';
}

export interface Expense {
  id: string;
  journeyId?: string;
  description: string;
  amount: number;
  date: number;
  category: 'Fuel' | 'Food' | 'Toll' | 'Maintenance' | 'Other';
  aiFlagged: boolean; // True if AI thinks this is over-budget
  aiReason?: string;
  estimatedCost?: number;
}

export interface AIAnalysisResponse {
  isFlagged: boolean;
  reason: string;
  estimatedCost: number;
}

export type ThemeMode = 'light' | 'dark';