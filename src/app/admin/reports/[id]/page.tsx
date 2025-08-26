'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Download, FileText, Calendar, User } from 'lucide-react';
// import { reportsAPI, Report, formatTonnes, downloadFile } from '@lib/reportingApi';

// Temporary types and mock functions for build
type Report = {
  id: string;
  name: string;
  status: 'draft' | 'published';
  period_start: string;
  period_end: string;
  created_by: string;
  created_at: string;
  scope1_reduction_kg: number;
  scope2_reduction_kg: number;
  scope3_reduction_kg: number;
  total_reduction_tonnes: string;
  methodology: string;
  notes?: string;
  items: Array<{
    site_name: string;
    device_name: string;
    scope: string;
    amount_kg: number;
  }>;
};

const formatTonnes = (kg: number) => (kg / 1000).toFixed(2);
const downloadFile = (blob: Blob, filename: string) => {};
const reportsAPI = {
  getReport: async (id: string): Promise<Report> => ({ 
    id, name: 'Sample Report', status: 'draft' as const, 
    period_start: '2024-01-01', period_end: '2024-12-31',
    created_by: 'Admin', created_at: '2024-01-01',
    scope1_reduction_kg: 1000, scope2_reduction_kg: 2000, scope3_reduction_kg: 3000,
    total_reduction_tonnes: '6.00', methodology: 'ghg_protocol',
    items: []
  }),
  exportCSV: async (id: string): Promise<Blob> => new Blob(),
  exportPDF: async (id: string): Promise<Blob> => new Blob(),
  publishReport: async (id: string): Promise<Report> => ({ 
    id, name: 'Sample Report', status: 'published' as const,
    period_start: '2024-01-01', period_end: '2024-12-31',
    created_by: 'Admin', created_at: '2024-01-01',
    scope1_reduction_kg: 1000, scope2_reduction_kg: 2000, scope3_reduction_kg: 3000,
    total_reduction_tonnes: '6.00', methodology: 'ghg_protocol',
    items: []
  })
};

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [downloading, setDownloading] = useState<string | null>(null);

  const reportId = params.id as string;

  const loadReport = useCallback(async () => {
    try {
      setLoading(true);
      const data = await reportsAPI.getReport(reportId);
      setReport(data);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'レポートの取得に失敗しました');
    } finally {
      setLoading(false);
    }
  }, [reportId]);

  useEffect(() => {
    loadReport();
  }, [loadReport]);

  const handleDownload = async (format: 'csv' | 'pdf') => {
    if (!report) return;
    
    try {
      setDownloading(format);
      const blob = format === 'csv' 
        ? await reportsAPI.exportCSV(report.id)
        : await reportsAPI.exportPDF(report.id);
      
      const filename = `report_${report.name}_${report.period_start}_${report.period_end}.${format}`;
      downloadFile(blob, filename);
    } catch (err: any) {
      setError(`${format.toUpperCase()}ダウンロードに失敗しました`);
    } finally {
      setDownloading(null);
    }
  }

  const handlePublish = async () => {
    if (!report) return;
    
    try {
      const updatedReport = await reportsAPI.publishReport(report.id);
      setReport(updatedReport);
    } catch (err: any) {
      setError('レポートの発行に失敗しました');
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP');
  }

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 text-sm font-medium rounded-full";
    if (status === 'published') {
      return `${baseClasses} bg-green-100 text-green-800`;
    }
    return `${baseClasses} bg-yellow-100 text-yellow-800`;
  }

  const getStatusText = (status: string) => {
    return status === 'published' ? '確定' : '下書き';
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">レポートを読み込み中...</p>
        </div>
      </div>
    );
  }

  if (error && !report) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">レポートが見つかりません</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link 
            href="/reports"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
          >
            レポート一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  if (!report) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Link 
                  href="/reports"
                  className="mr-4 p-2 rounded-md text-gray-400 hover:text-gray-600"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{report.name}</h1>
                  <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(report.period_start)} - {formatDate(report.period_end)}
                    </div>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {report.created_by}
                    </div>
                    <span className={getStatusBadge(report.status)}>
                      {getStatusText(report.status)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                {report.status === 'draft' && (
                  <button
                    onClick={handlePublish}
                    className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                  >
                    確定発行
                  </button>
                )}
                <button
                  onClick={() => handleDownload('csv')}
                  disabled={downloading === 'csv'}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {downloading === 'csv' ? '...' : 'CSV'}
                </button>
                <button
                  onClick={() => handleDownload('pdf')}
                  disabled={downloading === 'pdf'}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {downloading === 'pdf' ? '...' : 'PDF'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* エラー表示 */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* KPIカード */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">S1</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Scope1</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {formatTonnes(report.scope1_reduction_kg)}
                </p>
                <p className="text-xs text-gray-500">t-CO₂</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-semibold text-sm">S2</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Scope2</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {formatTonnes(report.scope2_reduction_kg)}
                </p>
                <p className="text-xs text-gray-500">t-CO₂</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 font-semibold text-sm">S3</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Scope3</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {formatTonnes(report.scope3_reduction_kg)}
                </p>
                <p className="text-xs text-gray-500">t-CO₂</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-primary-500">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                  <span className="text-primary-600 font-semibold text-sm">計</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">合計削減量</p>
                <p className="text-2xl font-semibold text-primary-600">
                  {report.total_reduction_tonnes}
                </p>
                <p className="text-xs text-gray-500">t-CO₂</p>
              </div>
            </div>
          </div>
        </div>

        {/* 内訳表 */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">削減量内訳</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    サイト名
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    設備名
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Scope
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    削減量(kg)
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    削減量(t-CO₂)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {report.items.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.site_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.device_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                        {item.scope}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      {Number(item.amount_kg).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                      {formatTonnes(item.amount_kg)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* メタデータ */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">レポート情報</h3>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">方法論</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {report.methodology === 'ghg_protocol' ? 'GHG Protocol' : 
                 report.methodology === 'internal' ? '社内基準' : 'その他'}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">作成日</dt>
              <dd className="mt-1 text-sm text-gray-900">{formatDate(report.created_at)}</dd>
            </div>
            {report.notes && (
              <div className="md:col-span-2">
                <dt className="text-sm font-medium text-gray-500">備考</dt>
                <dd className="mt-1 text-sm text-gray-900">{report.notes}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
}

