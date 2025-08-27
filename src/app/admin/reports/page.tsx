'use client';

import React, { useState } from 'react';
import Layout from '@components/layout/Layout';
import { FileText, Download, Eye, Clock, CheckCircle, AlertCircle, Calendar, BarChart3, TrendingDown, DollarSign, Lightbulb, Target, Building2, Factory, Truck, TrendingUp, Clipboard } from 'lucide-react';

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

// Report Preview Component
const ReportPreview = () => {
  return (
    <div className="space-y-6">
      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="font-bold text-lg mb-3 text-green-800 flex items-center gap-2">
          <BarChart3 className="w-5 h-5" /> 従業員家庭CO₂削減実績サマリー（ESG報告用）
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">-22.5%</div>
            <div className="text-sm text-gray-600">従業員家庭CO₂削減率</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">856</div>
            <div className="text-sm text-gray-600">平均削減量 (kWh/世帯)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">245</div>
            <div className="text-sm text-gray-600">平均ガス削減量 (㎥/世帯)</div>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-4">
        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" /> 従業員家庭の月別CO₂削減推移
        </h3>
        <div className="bg-gray-100 h-32 rounded flex items-center justify-center mb-2">
          <span className="text-gray-500">[グラフエリア] 従業員家庭の月別電力・ガス使用量とCO₂削減量の推移</span>
        </div>
        <p className="text-sm text-gray-600">※ 全従業員880世帯の平均値。5月・10月に大幅削減達成。企業のScope3削減目標に大きく貢献。</p>
      </div>

      <div className="bg-white border rounded-lg p-4">
        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
          <Clipboard className="w-5 h-5" /> 従業員家庭の用途別エネルギー削減実績
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left">用途</th>
                <th className="px-3 py-2 text-center">削減率</th>
                <th className="px-3 py-2 text-center">削減量(kg-CO₂/世帯)</th>
                <th className="px-3 py-2 text-center">全社貢献度</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="px-3 py-2">電力（照明・家電）</td>
                <td className="px-3 py-2 text-center font-bold text-green-600">-28.5%</td>
                <td className="px-3 py-2 text-center">142.8</td>
                <td className="px-3 py-2 text-center">
                  <span className="inline-flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-green-500" /> 高
                  </span>
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-3 py-2">電力（冷暖房）</td>
                <td className="px-3 py-2 text-center font-bold text-green-600">-18.2%</td>
                <td className="px-3 py-2 text-center">89.3</td>
                <td className="px-3 py-2 text-center">
                  <span className="inline-flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-green-500" /> 高
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2">ガス（給湯・調理）</td>
                <td className="px-3 py-2 text-center font-bold text-green-600">-15.7%</td>
                <td className="px-3 py-2 text-center">64.2</td>
                <td className="px-3 py-2 text-center">
                  <span className="inline-flex items-center gap-1">
                    <AlertCircle className="w-4 h-4 text-yellow-500" /> 中
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-600 mt-2">※ 全880世帯平均値。LED電球交換とエアコン最適化により企業のScope3削減に大きく寄与</p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-bold text-lg mb-2 text-yellow-800 flex items-center gap-2">
          <Lightbulb className="w-5 h-5" /> 従業員家庭での主な削減活動と企業への貢献
        </h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start space-x-2">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span><strong>LED電球への交換（実施率78%）:</strong> 全社Scope3で年間125.6t-CO₂削減効果</span>
          </li>
          <li className="flex items-start space-x-2">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span><strong>エアコン温度設定最適化（実施率85%）:</strong> 全社で年間98.4t-CO₂削減に貢献</span>
          </li>
          <li className="flex items-start space-x-2">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span><strong>節水・省エネ給湯（実施率62%）:</strong> ガス使用量削減で年間56.5t-CO₂削減</span>
          </li>
          <li className="flex items-start space-x-2">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span><strong>待機電力削減活動（実施率91%）:</strong> 企業のESG目標達成に大きく貢献</span>
          </li>
        </ul>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-bold text-lg mb-2 text-blue-800 flex items-center gap-2">
          <Target className="w-5 h-5" /> 2025年度の目標と企業ESG戦略への貢献計画
        </h3>
        <div className="space-y-2 text-sm">
          <p><strong>全社目標:</strong> 従業員家庭でのさらなる15%削減（企業Scope3削減目標達成）</p>
          <p><strong>重点施策:</strong></p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>従業員向け太陽光発電導入支援制度（補助金制度新設）</li>
            <li>省エネ家電買替え支援プログラム（エコポイント制度拡充）</li>
            <li>家庭エネルギー診断サービス提供（年2回実施）</li>
            <li>ESG投資家向け報告書での従業員活動成果発信</li>
            <li>カーボンニュートラル達成企業認定取得へ向けた取組み強化</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

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
  title: '従業員家庭CO₂削減実績レポート（ESG報告書用）', 
  period: '2024年1月-12月', 
  summary: '2024年度において、従業員家庭でのエネルギー削減活動を通じて、企業全体のScope3削減に大きく貢献。全従業員の家庭で合計22.5%のCO₂削減を達成し、企業のESG目標達成に寄与しました。', 
  key_metrics: {
    co2_reduction: '22.5%',
    energy_savings: '856 kWh（従業員1世帯平均）',
    gas_savings: '245 ㎥（従業員1世帯平均）'
  }
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
                      <ReportPreview />
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