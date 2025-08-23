import { api } from './apiClient';
import { User, Device, EnergyRecord, DeviceFormData, EnergyRecordFormData, DailySummary } from '@/types';

export const authAPI = {
  async login({ username, password }: { username: string; password: string }) {
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    return api.post('/login/access-token', body, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).then(r => r.data);
  },
  async register(userData: { email: string; password: string; full_name?: string }) {
    return api.post('/users/', userData).then(r => r.data);
  },
  async me(token: string) {
    return api.get('/users/me', {
      headers: { Authorization: `Bearer ${token}` },
    }).then(r => r.data);
  },
  async getCurrentUser() {
    return api.get('/users/me').then(r => r.data);
  }
};

// Users API
export const usersAPI = {
  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await api.put('/users/me', data);
    return response.data;
  },
};

// Devices API
export const devicesAPI = {
  getAll: async (skip = 0, limit = 100): Promise<Device[]> => {
    const response = await api.get(`/devices/?skip=${skip}&limit=${limit}`);
    return response.data;
  },

  getById: async (id: number): Promise<Device> => {
    const response = await api.get(`/devices/${id}`);
    return response.data;
  },

  create: async (data: DeviceFormData): Promise<Device> => {
    const response = await api.post('/devices/', data);
    return response.data;
  },

  update: async (id: number, data: Partial<DeviceFormData>): Promise<Device> => {
    const response = await api.put(`/devices/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<Device> => {
    const response = await api.delete(`/devices/${id}`);
    return response.data;
  },
};

// Energy Records API
export const energyRecordsAPI = {
  getAll: async (params?: {
    skip?: number;
    limit?: number;
    device_id?: number;
    start_date?: string;
    end_date?: string;
  }): Promise<EnergyRecord[]> => {
    const queryParams = new URLSearchParams();
    if (params?.skip !== undefined) queryParams.append('skip', params.skip.toString());
    if (params?.limit !== undefined) queryParams.append('limit', params.limit.toString());
    if (params?.device_id) queryParams.append('device_id', params.device_id.toString());
    if (params?.start_date) queryParams.append('start_date', params.start_date);
    if (params?.end_date) queryParams.append('end_date', params.end_date);

    const response = await api.get(`/energy-records/?${queryParams}`);
    return response.data;
  },

  getById: async (id: number): Promise<EnergyRecord> => {
    const response = await api.get(`/energy-records/${id}`);
    return response.data;
  },

  create: async (data: EnergyRecordFormData): Promise<EnergyRecord> => {
    const response = await api.post('/energy-records/', data);
    return response.data;
  },

  update: async (id: number, data: Partial<EnergyRecordFormData>): Promise<EnergyRecord> => {
    const response = await api.put(`/energy-records/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<EnergyRecord> => {
    const response = await api.delete(`/energy-records/${id}`);
    return response.data;
  },

  getDailySummary: async (date: string): Promise<DailySummary> => {
    const response = await api.get(`/energy-records/daily-summary?date=${date}`);
    return response.data;
  },
};

// Rewards API (Admin)
export const rewardsAPI = {
  getAll: async (): Promise<any[]> => {
    const response = await api.get('/rewards/');
    return response.data;
  },

  create: async (data: {
    title: string;
    description?: string;
    category: string;
    points_required: number;
    stock: number;
    active?: boolean;
    image_url?: string;
  }): Promise<any> => {
    const response = await api.post('/rewards/', data);
    return response.data;
  },

  update: async (id: number, data: Partial<{
    title: string;
    description: string;
    category: string;
    points_required: number;
    stock: number;
    active: boolean;
    image_url: string;
  }>): Promise<any> => {
    const response = await api.put(`/rewards/${id}`, data);
    return response.data;
  },

  getPopularity: async (): Promise<any[]> => {
    const response = await api.get('/rewards/admin/popularity');
    return response.data;
  },

  getRedemptions: async (): Promise<any[]> => {
    const response = await api.get('/rewards/my-redemptions');
    return response.data;
  }
};

// Incentives API (Admin)
export const incentivesAPI = {
  getRewards: async (): Promise<any[]> => {
    const response = await api.get('/incentives/rewards');
    return response.data;
  },

  createReward: async (data: {
    title: string;
    description?: string;
    category: string;
    points_required: number;
    stock: number;
    active?: boolean;
  }): Promise<any> => {
    const response = await api.post('/incentives/rewards', data);
    return response.data;
  },

  updateReward: async (id: number, data: any): Promise<any> => {
    const response = await api.put(`/incentives/rewards/${id}`, data);
    return response.data;
  },

  toggleRewardStatus: async (id: number, active: boolean): Promise<any> => {
    const response = await api.patch(`/incentives/rewards/${id}/publish?active=${active}`);
    return response.data;
  },

  getRedemptionSummary: async (): Promise<any> => {
    const response = await api.get('/incentives/redemptions/summary');
    return response.data;
  }
};