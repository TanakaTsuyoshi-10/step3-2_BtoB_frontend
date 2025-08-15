import api from './axios';
import {
  User,
  Device,
  EnergyRecord,
  Token,
  LoginFormData,
  RegisterFormData,
  DeviceFormData,
  EnergyRecordFormData,
  DailySummary,
} from '@/types';

// Auth API
export const authAPI = {
  login: async (data: LoginFormData): Promise<Token> => {
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('password', data.password);
    
    const response = await api.post('/login/access-token', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  },

  register: async (data: RegisterFormData): Promise<User> => {
    const response = await api.post('/users/', data);
    return response.data;
  },

  testToken: async (): Promise<User> => {
    const response = await api.post('/login/test-token');
    return response.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/users/me');
    return response.data;
  },
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