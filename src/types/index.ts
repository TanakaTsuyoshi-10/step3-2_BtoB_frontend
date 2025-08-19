export interface User {
  id: number;
  email: string;
  full_name?: string;
  is_active: boolean;
  is_superuser?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Device {
  id: number;
  name: string;
  device_type: string;
  model?: string;
  serial_number?: string;
  capacity?: number;
  efficiency?: number;
  location?: string;
  is_active: boolean;
  installation_date?: string;
  last_maintenance?: string;
  owner_id: number;
  created_at: string;
  updated_at?: string;
}

export interface EnergyRecord {
  id: number;
  timestamp: string;
  energy_produced?: number;
  energy_consumed?: number;
  energy_stored?: number;
  grid_import?: number;
  grid_export?: number;
  voltage?: number;
  current?: number;
  power?: number;
  temperature?: number;
  efficiency?: number;
  status?: string;
  device_id: number;
  user_id: number;
  created_at: string;
}

export interface Token {
  access_token: string;
  token_type: string;
}

export interface LoginFormData {
  username: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
  full_name?: string;
}

export interface DeviceFormData {
  name: string;
  device_type: string;
  model?: string;
  serial_number?: string;
  capacity?: number;
  efficiency?: number;
  location?: string;
  installation_date?: string;
  last_maintenance?: string;
}

export interface EnergyRecordFormData {
  timestamp: string;
  energy_produced?: number;
  energy_consumed?: number;
  energy_stored?: number;
  grid_import?: number;
  grid_export?: number;
  voltage?: number;
  current?: number;
  power?: number;
  temperature?: number;
  efficiency?: number;
  status?: string;
  device_id: number;
}

export interface DailySummary {
  date: string;
  total_produced: number;
  total_consumed: number;
  total_grid_import: number;
  total_grid_export: number;
  avg_efficiency: number;
}