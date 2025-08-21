import axios from '@/lib/axios';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000';

export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  points_required: number;
  stock: number;
  active: boolean;
  created_at: string;
  redemption_count?: number;
}

export interface ProductCreate {
  name: string;
  description: string;
  category: string;
  points_required: number;
  stock: number;
  active: boolean;
}

export interface RedemptionStats {
  total_redemptions: number;
  monthly_redemptions: number;
  total_points_used: number;
  low_stock_alerts: number;
  period_start: string;
  period_end: string;
}

export interface PopularityItem {
  product_name: string;
  category: string;
  redemption_count: number;
  selection_rate: number;
  points_per_redemption: number;
}

export const getProducts = async (params?: {
  search?: string;
  category?: string;
  active?: boolean;
}): Promise<Product[]> => {
  const searchParams = new URLSearchParams();
  
  if (params?.search) searchParams.append('search', params.search);
  if (params?.category) searchParams.append('category', params.category);
  if (params?.active !== undefined) searchParams.append('active', params.active.toString());
  
  const response = await axios.get(`${API_BASE}/api/v1/admin/incentives/products?${searchParams}`);
  return response.data;
};

export const createProduct = async (product: ProductCreate): Promise<Product> => {
  const response = await axios.post(`${API_BASE}/api/v1/admin/incentives/products`, product);
  return response.data;
};

export const updateProduct = async (id: number, product: Partial<ProductCreate>): Promise<Product> => {
  const response = await axios.put(`${API_BASE}/api/v1/admin/incentives/products/${id}`, product);
  return response.data;
};

export const toggleProduct = async (id: number, active: boolean): Promise<void> => {
  await axios.patch(`${API_BASE}/api/v1/admin/incentives/products/${id}/toggle`, { active });
};

export const getRedemptionStats = async (period: 'month' | 'quarter' | 'year' = 'month'): Promise<RedemptionStats> => {
  const response = await axios.get(`${API_BASE}/api/v1/admin/incentives/stats?period=${period}`);
  return response.data;
};

export const getPopularity = async (period: 'month' | 'quarter' | 'year' = 'month'): Promise<PopularityItem[]> => {
  const response = await axios.get(`${API_BASE}/api/v1/admin/incentives/popularity?period=${period}`);
  return response.data;
};