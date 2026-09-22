export type StationStatus = 'good' | 'fair' | 'monitoring' | 'alert';

export interface WaterParameter {
  name: string;
  key: 'ph' | 'turbidity' | 'tds' | 'temperature';
  value: number;
  unit: string;
  status: 'Normal' | 'Clear' | 'Ideal' | 'Ambient' | 'Alert' | 'Caution';
  statusType: 'good' | 'fair' | 'warning' | 'info';
  targetLabel: string;
  min: number;
  max: number;
  optimalRange?: [number, number];
  targetMax?: number;
  currentPercent: number; // 0 to 100 for visual bar
  description: string;
}

export interface HistoryDataPoint {
  time: string;
  fullTime: string;
  score: number;
  thresholdMin: number;
  thresholdMax: number;
  turbidity: number;
  ph: number;
  tds: number;
}

export interface WaterStation {
  id: string;
  stationNumber: string;
  name: string;
  hubName: string;
  locationSubtitle: string;
  catchment: string;
  isPrimary?: boolean;
  status: StationStatus;
  statusLabel: string;
  scoreDisplay: string; // e.g. "XX"
  calculatedScore: number; // e.g. 94
  scoreNote: string;
  clarityPercent: number;
  recirculationActive: boolean;
  recirculationStatus: string;
  recircCyclesDone: number;
  updatedAgo: string;
  lastUpdatedTimestamp: string;
  heroImage: string;
  coordinates: {
    x: number; // map coordinates percent
    y: number;
    lat: number;
    lng: number;
  };
  parameters: WaterParameter[];
  history24h: HistoryDataPoint[];
  history7d: HistoryDataPoint[];
  history30d: HistoryDataPoint[];
  assessmentSummary: string;
  evaluatedParametersText: string;
  referenceAssessmentText: string;
  lastVerificationDate: string;
}

export type ActiveTab = 'explore' | 'how-it-works' | 'about';
