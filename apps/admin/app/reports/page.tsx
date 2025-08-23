'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@admin-ui/card';
import { Button } from '@admin-ui/button';
import { Input } from '@admin-ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@admin-ui/select';
import { Badge } from '@admin-ui/badge';
import { Progress } from '@admin-ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@admin-ui/tabs';
import { FileText, Download, Eye, Clock, CheckCircle, AlertCircle, Calendar } from '@iconify/react/icons/heroicons';
import Layout from '@/components/layout/Layout';
import { generateReport, getReportStatus, downloadReport, previewReport } from '@/lib/api/reports';

interface AutoReportRequest {
  start_date: string;
  end_date: string;
  format: string;
  include_charts: boolean;
  report_type: string;
}

interface AutoReportPreview {
  title: string;
  period: string;
  summary: string;
  key_metrics: Record<string, any>;
  content_preview: string;
}

interface AutoReportStatus {
  report_id: string;
  status: string;
  progress: number;
  message?: string;
  created_at: string;
  completed_at?: string;
}

interface ReportHistoryItem {
  id: string;
  name: string;
  format: string;
  created_at: string;
  status: string;
}

const ReportsPage: React.FC = () => {
  const [formData, setFormData] = useState<div>({
    start_date: '',
    end_date: '',
    format: 'pdf',
    include_charts: true,
    report_type: 'summary'
  });
  
  const [preview, setPreview] = useState<div | null>(null);
  const [reportStatus, setReportStatus] = useState<div | null>(null);
  const [reportHistory, setReportHistory] = useState<div[]>([]);
  const [loading, setLoading] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('create');

  // プリセット期間設定
  const setPresetPeriod = (preset: 'thisMonth' | 'lastMonth' | 'thisQuarter' | 'thisYear') => {
    const now = new Date();
    let start: Date, end: Date;

    switch (preset) {
      case 'thisMonth':
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        break;
      case 'lastMonth':
        start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        end = new Date(now.getFullYear(), now.getMonth(), 0);
        break;
      case 'thisQuarter':
        const quarter = Math.floor(now.getMonth() / 3);
        start = new Date(now.getFullYear(), quarter * 3, 1);
        end = new Date(now.getFullYear(), quarter * 3 + 3, 0);
        break;
      case 'thisYear':
        start = new Date(now.getFullYear(), 0, 1);
        end = new Date(now.getFullYear(), 11, 31);
        break;
    }

    setFormData(prev => ({
      ...prev,
      start_date: start.toISOString().split('T')[0],
      end_date: end.toISOString().split('T')[0]
    }));
  };

  const handlePreview = async () => {
    if (!formData.start_date || !formData.end_date) {
      alert('開始日と終了日を入力してください');
      return;
    }

    try {
      setPreviewLoading(true);
      
      // ダミーデータでプレビュー表示
      setPreview({
        title: `エネルギー管理レポート (${formData.start_date} 〜 ${formData.end_date})`,
        period: `${formData.start_date} 〜 ${formData.end_date}`,
        summary: '期間中の総消費電力量 15,240 kWh、CO2削減量 5,180 kg-CO2',
        key_metrics: {
          total_consumption: 15240,
          co2_reduction: 5180,
          active_employees: 38,
          total_points: 12400
        },
        content_preview: `# エネルギー管理レポート

## 対象期間
${formData.start_date}から${formData.end_date}まで

## エグゼクティブサマリー
当期間において、当社のエネルギー管理システムから以下の成果が確認されました。

### 主要指標
- 総消費電力量: 15,240 kWh
- CO2削減量: 5,180 kg-CO2
- 参加従業員数: 38 名
- 獲得ポイント総計: 12,400 ポイント

### 分析結果
当期間中のエネルギー使用量は前期比で削減しており、従業員の省エネ意識向上が着実に進んでいることが確認できます。`
      });
      setActiveTab('preview');
    } catch (error) {
      console.error('Failed to generate preview:', error);
      alert('プレビューの生成に失敗しました');
    } finally {
      setPreviewLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (!formData.start_date || !formData.end_date) {
      alert('開始日と終了日を入力してください');
      return;
    }

    try {
      setLoading(true);
      
      // レポート生成開始（ダミー）
      const reportId = `report_${Date.now()}`;
      setReportStatus({
        report_id: reportId,
        status: 'processing',
        progress: 0,
        message: 'レポート生成を開始しました',
        created_at: new Date().toISOString()
      });
      
      setActiveTab('status');
      
      // 進捗シミュレーション
      const progressInterval = setInterval(() => {
        setReportStatus(prev => {
          if (!prev || prev.progress >= 100) {
            clearInterval(progressInterval);
            return prev;
          }
          
          const newProgress = Math.min(prev.progress + 20, 100);
          const messages = [
            'データを収集中...',
            'レポートを生成中...',
            'グラフを作成中...',
            'ファイルを準備中...',
            'レポート生成完了'
          ];
          
          return {
            ...prev,
            progress: newProgress,
            message: messages[Math.floor(newProgress / 20)] || 'レポート生成完了',
            status: newProgress === 100 ? 'completed' : 'processing',
            completed_at: newProgress === 100 ? new Date().toISOString() : prev.completed_at
          };
        });
      }, 1000);
      
    } catch (error) {
      console.error('Failed to generate report:', error);
      alert('レポート生成に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!reportStatus || reportStatus.status !== 'completed') return;
    
    // ダミーダウンロード
    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,レポートファイル（ダミー）';
    link.download = `energy_report_${new Date().getTime()}.${formData.format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // 履歴に追加
    const newReport: ReportHistoryItem = {
      id: reportStatus.report_id,
      name: `エネルギーレポート_${formData.start_date}`,
      format: formData.format,
      created_at: new Date().toISOString(),
      status: 'completed'
    };
    setReportHistory(prev => [newReport, ...prev].slice(0, 10));
  };

  return (
    <div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">自動レポート作成</h1>
          <p className="text-gray-600">期間を指定してエネルギー使用量レポートを自動生成・CSR/IR対応</p>
        </div>

        <div value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="grid grid-cols-4 w-full max-w-2xl">
            <div value="create" className="whitespace-nowrap">レポート作成</TabsTrigger>
            <div value="preview" className="whitespace-nowrap">プレビュー</TabsTrigger>
            <div value="status" className="whitespace-nowrap">進捗状況</TabsTrigger>
            <div value="history" className="whitespace-nowrap">作成履歴</TabsTrigger>
          </TabsList>

          <div value="create" className="space-y-6">
            <div>
              <div>
                <div>レポート設定</div>
                <div>
                  レポートの対象期間と出力形式を設定してください
                </CardDescription>
              </div>
              <div className="space-y-6">
                {/* プリセット期間 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    期間プリセット
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div variant="outline" size="sm" onClick={() => setPresetPeriod('thisMonth')}>
                      今月
                    </Button>
                    <div variant="outline" size="sm" onClick={() => setPresetPeriod('lastMonth')}>
                      先月
                    </Button>
                    <div variant="outline" size="sm" onClick={() => setPresetPeriod('thisQuarter')}>
                      四半期
                    </Button>
                    <div variant="outline" size="sm" onClick={() => setPresetPeriod('thisYear')}>
                      年度
                    </Button>
                  </div>
                </div>

                {/* 期間設定 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      開始日 *
                    </label>
                    <div
                      type="date"
                      value={formData.start_date}
                      onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      終了日 *
                    </label>
                    <div
                      type="date"
                      value={formData.end_date}
                      onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* 出力形式・オプション */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      出力形式
                    </label>
                    <div
                      value={formData.format}
                      onValueChange={(value) => setFormData({ ...formData, format: value })}
                    >
                      <div>
                        <div />
                      </SelectTrigger>
                      <div>
                        <div value="pdf">PDF（推奨）</SelectItem>
                        <div value="docx">Word文書 (.docx)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      レポートタイプ
                    </label>
                    <div
                      value={formData.report_type}
                      onValueChange={(value) => setFormData({ ...formData, report_type: value })}
                    >
                      <div>
                        <div />
                      </SelectTrigger>
                      <div>
                        <div value="summary">サマリーレポート</SelectItem>
                        <div value="detailed">詳細レポート</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* アクションボタン */}
                <div className="flex space-x-4">
                  <div
                    onClick={handlePreview}
                    disabled={previewLoading}
                    variant="outline"
                    className="flex-1"
                  >
                    <div className="w-4 h-4 mr-2" />
                    {previewLoading ? 'プレビュー生成中...' : 'プレビュー'}
                  </Button>
                  <div
                    onClick={handleGenerate}
                    disabled={loading}
                    className="flex-1"
                  >
                    <div className="w-4 h-4 mr-2" />
                    {loading ? 'レポート生成中...' : 'レポート生成'}
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* その他のタブコンテンツは省略 */}
          <div value="preview">
            {preview ? (
              <div>
                <div>
                  <div>{preview.title}</div>
                  <div>対象期間: {preview.period}</CardDescription>
                </div>
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                      {preview.content_preview}
                    </pre>
                  </div>
                  <div onClick={handleGenerate} disabled={loading}>
                    <div className="w-4 h-4 mr-2" />
                    このレポートを生成
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <div className="p-8 text-center">
                  <p className="text-gray-500">まず「プレビュー」ボタンをクリックしてください</p>
                </div>
              </div>
            )}
          </TabsContent>

          <div value="status">
            {reportStatus ? (
              <div>
                <div>
                  <div>レポート生成状況</div>
                </div>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">進捗</span>
                      <span className="text-sm text-gray-600">{reportStatus.progress}%</span>
                    </div>
                    <div value={reportStatus.progress} className="w-full" />
                    <p className="text-sm text-gray-600">{reportStatus.message}</p>
                  </div>
                  
                  {reportStatus.status === 'completed' && (
                    <div onClick={handleDownload} className="w-full">
                      <div className="w-4 h-4 mr-2" />
                      レポートをダウンロード
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <div className="p-8 text-center">
                  <p className="text-gray-500">レポートを生成してください</p>
                </div>
              </div>
            )}
          </TabsContent>

          <div value="history">
            <div>
              <div>
                <div>生成履歴</div>
              </div>
              <div>
                {reportHistory.length > 0 ? (
                  <div className="space-y-4">
                    {reportHistory.map((report) => (
                      <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{report.name}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(report.created_at).toLocaleString('ja-JP')}
                          </p>
                        </div>
                        <div variant="default">{report.format.toUpperCase()}</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">まだレポートが生成されていません</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ReportsPage;