import axios from '@/lib/axios';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000';

export interface PointsSummary {
  total_points_distributed: number;
  monthly_distributed: number;
  total_unused_balance: number;
  utilization_rate: number;
  period_start: string;
  period_end: string;
}

export interface PointsDistribution {
  department: string;
  total_distributed: number;
  employees_count: number;
  average_per_employee: number;
  utilization_rate: number;
}

export interface Employee {
  id: number;
  name: string;
  department: string;
  grade: string;
  points_distributed: number;
  points_used: number;
  points_balance: number;
  utilization_rate: number;
  last_activity: string;
}

export interface EmployeesResponse {
  employees: Employee[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export const getPointsSummary = async (): Promise<PointsSummary> => {
  const response = await axios.get(`${API_BASE}/api/v1/admin/points/summary`);
  return response.data;
};

export const getPointsDistribution = async (by: 'department' | 'grade' = 'department'): Promise<PointsDistribution[]> => {
  const response = await axios.get(`${API_BASE}/api/v1/admin/points/distribution?by=${by}`);
  return response.data;
};

export const getPointsEmployees = async (params?: {
  offset?: number;
  limit?: number;
  query?: string;
  department?: string;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}): Promise<EmployeesResponse> => {
  const searchParams = new URLSearchParams();
  
  if (params?.offset) searchParams.append('offset', params.offset.toString());
  if (params?.limit) searchParams.append('limit', params.limit.toString());
  if (params?.query) searchParams.append('query', params.query);
  if (params?.department) searchParams.append('department', params.department);
  if (params?.sort_by) searchParams.append('sort_by', params.sort_by);
  if (params?.sort_order) searchParams.append('sort_order', params.sort_order);
  
  const response = await axios.get(`${API_BASE}/api/v1/admin/points/employees?${searchParams}`);
  return response.data;
};