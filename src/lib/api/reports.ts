import { api, path } from '../apiClient';

export interface AutoReportRequest {
  start_date: string;
  end_date: string;
  format: 'pdf' | 'docx';
  include_charts: boolean;
  report_type: 'summary' | 'detailed';
}

export interface AutoReportPreview {
  title: string;
  period: string;
  summary: string;
  key_metrics: Record<string, any>;
  content_preview: string;
}

export interface AutoReportResponse {
  report_id: string;
  file_url: string;
  file_name: string;
  format: string;
  created_at: string;
  size_bytes?: number;
}

export interface AutoReportStatus {
  report_id: string;
  status: 'processing' | 'completed' | 'failed';
  progress: number;
  message?: string;
  created_at: string;
  completed_at?: string;
}

export const previewReport = async (request: AutoReportRequest): Promise<AutoReportPreview> => {
  const response = await api.post(path('/reports/generate/preview'), request);
  return response.data;
};

export const generateReport = async (request: AutoReportRequest): Promise<AutoReportResponse> => {
  const response = await api.post(path('/reports/generate'), request);
  return response.data;
};

export const getReportStatus = async (reportId: string): Promise<AutoReportStatus> => {
  const response = await api.get(path(`/reports/generate/status/${reportId}`));
  return response.data;
};

export const downloadReport = async (reportId: string): Promise<Blob> => {
  const response = await api.get(path(`/reports/generate/download/${reportId}`), {
    responseType: 'blob'
  });
  return response.data;
};