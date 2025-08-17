import axios from './axios';

export interface ReportItem {
  id?: string;
  site_name: string;
  device_name: string;
  scope: 'scope1' | 'scope2' | 'scope3';
  amount_kg: number;
}

export interface ReportFormData {
  name: string;
  period_start: string; // YYYY-MM-DD
  period_end: string;   // YYYY-MM-DD
  methodology: 'ghg_protocol' | 'internal' | 'other';
  notes?: string;
  items: ReportItem[];
}

export interface ReportSummary {
  id: string;
  name: string;
  period_start: string;
  period_end: string;
  total_reduction_kg: number;
  status: 'draft' | 'published';
  created_by: string;
  created_at: string;
  total_reduction_tonnes: number; // 計算プロパティ
}

export interface Report extends ReportFormData {
  id: string;
  company_id?: string;
  scope1_reduction_kg: number;
  scope2_reduction_kg: number;
  scope3_reduction_kg: number;
  total_reduction_kg: number;
  status: 'draft' | 'published';
  created_by: string;
  created_at: string;
  updated_at: string;
  items: ReportItem[];
  total_reduction_tonnes: number; // 計算プロパティ
}

export interface ReportListParams {
  skip?: number;
  limit?: number;
  search?: string;
  period_start?: string;
  period_end?: string;
}

export const reportsAPI = {
  // レポート一覧取得
  async getReports(params?: ReportListParams): Promise<ReportSummary[]> {
    const queryParams = new URLSearchParams();
    if (params?.skip !== undefined) queryParams.append('skip', params.skip.toString());
    if (params?.limit !== undefined) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.period_start) queryParams.append('period_start', params.period_start);
    if (params?.period_end) queryParams.append('period_end', params.period_end);

    const response = await axios.get(`/reports?${queryParams}`);
    return response.data;
  },

  // レポート詳細取得
  async getReport(id: string): Promise<Report> {
    const response = await axios.get(`/reports/${id}`);
    return response.data;
  },

  // レポート作成
  async createReport(data: ReportFormData): Promise<Report> {
    const response = await axios.post('/reports', data);
    return response.data;
  },

  // レポート更新
  async updateReport(id: string, data: ReportFormData): Promise<Report> {
    const response = await axios.put(`/reports/${id}`, data);
    return response.data;
  },

  // レポート発行
  async publishReport(id: string): Promise<Report> {
    const response = await axios.post(`/reports/${id}/publish`);
    return response.data;
  },

  // CSVエクスポート
  async exportCSV(id: string): Promise<Blob> {
    const response = await axios.get(`/reports/${id}/export?format=csv`, {
      responseType: 'blob'
    });
    return response.data;
  },

  // PDFエクスポート（HTML）
  async exportPDF(id: string): Promise<Blob> {
    const response = await axios.get(`/reports/${id}/export?format=pdf`, {
      responseType: 'blob'
    });
    return response.data;
  }
};

// ユーティリティ関数
export const formatTonnes = (kg: number): string => {
  return (kg / 1000).toFixed(1);
};

export const downloadFile = (blob: Blob, filename: string) => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};