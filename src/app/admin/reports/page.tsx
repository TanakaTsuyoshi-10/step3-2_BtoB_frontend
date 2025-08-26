'use client';

import React, { useState } from 'react';
import Layout from '@components/layout/Layout';
import { FileText, Download, Eye, Clock, CheckCircle, AlertCircle, Calendar } from 'lucide-react';

// Mock components for build
const Card = ({ children, className }: any) => <div className={`bg-white rounded-lg shadow ${className}`}>{children}</div>;
const CardContent = ({ children, className }: any) => <div className={`p-6 ${className}`}>{children}</div>;
const CardDescription = ({ children, className }: any) => <p className={`text-gray-600 ${className}`}>{children}</p>;
const CardHeader = ({ children, className }: any) => <div className={`p-6 pb-2 ${className}`}>{children}</div>;
const CardTitle = ({ children, className }: any) => <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>;
const Button = ({ children, className, ...props }: any) => <button className={`px-4 py-2 bg-blue-600 text-white rounded ${className}`} {...props}>{children}</button>;
const Input = ({ className, ...props }: any) => <input className={`border rounded px-3 py-2 ${className}`} {...props} />;
const Select = ({ children, ...props }: any) => <select className="border rounded px-3 py-2" {...props}>{children}</select>;
const Badge = ({ children, className }: any) => <span className={`px-2 py-1 text-xs rounded ${className}`}>{children}</span>;
const Progress = ({ value, className }: any) => <div className={`w-full bg-gray-200 rounded ${className}`}><div className="bg-blue-600 h-2 rounded" style={{ width: `${value}%` }}></div></div>;

// Mock Tabs components
const Tabs = ({ children, value, onValueChange, className }: any) => <div className={className} data-value={value}>{children}</div>;
const TabsList = ({ children, className }: any) => <div className={`flex space-x-1 ${className}`}>{children}</div>;
const TabsTrigger = ({ children, value, className, onClick }: any) => <button className={`px-4 py-2 rounded ${className}`} onClick={() => onClick?.(value)}>{children}</button>;
const TabsContent = ({ children, value, className }: any) => <div className={className}>{children}</div>;

interface AutoReportRequest {
  start_date: string;
  end_date: string;
  format: string;
  include_charts: boolean;
  report_type: string;
}

// Mock API functions
const generateReport = async (data: any) => ({ task_id: '123' });
const getReportStatus = async (taskId: string) => ({ status: 'completed', progress: 100 });
const downloadReport = async (taskId: string) => new Blob();
const previewReport = async (data: any) => ({ 
  title: 'Sample Report', 
  period: '2024年1月-12月', 
  summary: 'Sample summary', 
  key_metrics: {}, 
  content_preview: 'Preview content' 
});

export default function Page() {
  const [activeTab, setActiveTab] = useState('create');
  const [formData, setFormData] = useState<AutoReportRequest>({
    start_date: '',
    end_date: '',
    format: 'pdf',
    include_charts: true,
    report_type: 'monthly'
  });
  const [taskId, setTaskId] = useState<string | null>(null);
  const [reportStatus, setReportStatus] = useState<any>(null);
  const [previewData, setPreviewData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await generateReport(formData);
      setTaskId(response.task_id);
      setActiveTab('status');
    } catch (error) {
      console.error('Report generation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = async () => {
    try {
      setLoading(true);
      const preview = await previewReport(formData);
      setPreviewData(preview);
      setActiveTab('preview');
    } catch (error) {
      console.error('Preview generation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">自動レポート作成</h1>
          <p className="text-gray-600">AI搭載の自動レポート生成システムでCO₂削減レポートを効率的に作成できます</p>
        </div>

        <Tabs value={activeTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger 
              value="create" 
              className={`whitespace-nowrap ${activeTab === 'create' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setActiveTab('create')}
            >
              レポート作成
            </TabsTrigger>
            <TabsTrigger 
              value="preview" 
              className={`whitespace-nowrap ${activeTab === 'preview' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setActiveTab('preview')}
            >
              プレビュー
            </TabsTrigger>
            <TabsTrigger 
              value="status" 
              className={`whitespace-nowrap ${activeTab === 'status' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setActiveTab('status')}
            >
              進捗状況
            </TabsTrigger>
            <TabsTrigger 
              value="history" 
              className={`whitespace-nowrap ${activeTab === 'history' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setActiveTab('history')}
            >
              作成履歴
            </TabsTrigger>
          </TabsList>

          {activeTab === 'create' && (
          <TabsContent value="create" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>レポート設定</CardTitle>
                <CardDescription>
                  レポートの対象期間と出力形式を設定してください
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      開始日
                    </label>
                    <Input
                      type="date"
                      value={formData.start_date}
                      onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      終了日
                    </label>
                    <Input
                      type="date"
                      value={formData.end_date}
                      onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      出力形式
                    </label>
                    <Select
                      value={formData.format}
                      onChange={(e) => setFormData({...formData, format: e.target.value})}
                    >
                      <option value="pdf">PDF</option>
                      <option value="excel">Excel</option>
                      <option value="word">Word</option>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="include_charts"
                      checked={formData.include_charts}
                      onChange={(e) => setFormData({...formData, include_charts: e.target.checked})}
                    />
                    <label htmlFor="include_charts" className="text-sm text-gray-700">
                      グラフ・チャートを含める
                    </label>
                  </div>

                  <div className="flex space-x-4">
                    <Button type="button" onClick={handlePreview} disabled={loading}>
                      <Eye className="w-4 h-4 mr-2" />
                      プレビュー
                    </Button>
                    <Button type="submit" disabled={loading}>
                      <FileText className="w-4 h-4 mr-2" />
                      {loading ? '生成中...' : 'レポート生成'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          )}

          {activeTab === 'preview' && (
          <TabsContent value="preview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>レポートプレビュー</CardTitle>
                <CardDescription>生成されるレポートのプレビューです</CardDescription>
              </CardHeader>
              <CardContent>
                {previewData ? (
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">{previewData.title}</h3>
                    <p className="text-gray-600">対象期間: {previewData.period}</p>
                    <div className="bg-gray-50 p-4 rounded">
                      <h4 className="font-medium mb-2">概要</h4>
                      <p>{previewData.summary}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded">
                      <h4 className="font-medium mb-2">内容プレビュー</h4>
                      <p>{previewData.content_preview}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>プレビューするには「プレビュー」ボタンを押してください</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          )}

          {activeTab === 'status' && (
          <TabsContent value="status" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>生成状況</CardTitle>
                <CardDescription>レポート生成の進捗状況を確認できます</CardDescription>
              </CardHeader>
              <CardContent>
                {taskId ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-blue-500" />
                      <span>タスクID: {taskId}</span>
                    </div>
                    <Progress value={75} className="w-full" />
                    <p className="text-sm text-gray-600">生成中... 75%完了</p>
                    <Button>
                      <Download className="w-4 h-4 mr-2" />
                      完了後にダウンロード
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Clock className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>レポート生成を開始してください</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          )}

          {activeTab === 'history' && (
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>作成履歴</CardTitle>
                <CardDescription>過去に作成したレポートの一覧です</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium">月次削減レポート_2024年1月</p>
                        <p className="text-sm text-gray-500">2024/02/01 作成</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-100 text-green-800">完了</Badge>
                      <Button size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium">年次サステナビリティレポート_2023</p>
                        <p className="text-sm text-gray-500">2024/01/15 作成</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-100 text-green-800">完了</Badge>
                      <Button size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          )}
        </Tabs>
      </div>
    </Layout>
  );
}