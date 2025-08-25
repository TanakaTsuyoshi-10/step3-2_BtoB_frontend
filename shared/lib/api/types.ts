// API Response types
export interface APIResponse<T = any> {
  data?: T;
  message?: string;
  error?: string;
}

// Core data types
export interface Metrics {
  id: string;
  value: number;
  type: string;
  timestamp: string;
}

export interface Points {
  id: string;
  userId: string;
  points: number;
  earnedAt: string;
  reason?: string;
}

export interface Incentive {
  id: string;
  title: string;
  description: string;
  points: number;
  active: boolean;
  createdAt: string;
}

export interface Device {
  id: string;
  name: string;
  type: string;
  status: 'online' | 'offline' | 'maintenance';
  lastSeen: string;
}

export interface EnergyRecord {
  id: string;
  deviceId: string;
  consumption: number;
  timestamp: string;
  cost?: number;
}

// Request/Response wrapper types
export type MetricsResponse = APIResponse<Metrics[]>;
export type PointsResponse = APIResponse<Points[]>;
export type IncentivesResponse = APIResponse<Incentive[]>;
export type DevicesResponse = APIResponse<Device[]>;
export type EnergyRecordsResponse = APIResponse<EnergyRecord[]>;

// Error types
export interface APIError {
  message: string;
  status?: number;
  code?: string;
}