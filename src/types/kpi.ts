export interface KPIData {
  total_users: number;
  total_energy_saved: number;
  total_co2_reduced: number;
  total_points_awarded: number;
  total_redemptions: number;
  total_points_spent: number;
  active_users_this_month: number;
  energy_reduction_percentage: number;
}

export interface MonthlyUsage {
  month: string;
  usage_kwh: number;
  cost_jpy: number;
  co2_kg: number;
}

export interface Co2TrendData {
  date: string;
  co2_kg: number;
  target: number;
}