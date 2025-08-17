import axios from './axios';
import { User, Device, EnergyRecord, DeviceFormData, EnergyRecordFormData, DailySummary } from '@/types';

// Use the same axios instance for all APIs
const api = axios;

export const authAPI = {
  async login({ username, password }: { username: string; password: string }) {
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    return axios.post('/login/access-token', body, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).then(r => r.data);
  },
  async register(userData: { email: string; password: string; full_name?: string }) {
    return axios.post('/users/', userData).then(r => r.data);
  },
  async me(token: string) {
    return axios.get('/login/test-token', {
      headers: { Authorization: `Bearer ${token}` },
    }).then(r => r.data);
  },
  async getCurrentUser() {
    return axios.get('/users/me').then(r => r.data);
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