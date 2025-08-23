'use client';

import React, { useState } from 'react';
import { FileText, Download, Calendar, Filter, BarChart, Users, Coins, Package } from '@iconify/react/icons/heroicons';
import Layout from '@/components/layout/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '@admin-ui/card';
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType } from 'docx';

// Dynamically import pdfMake only on client side
const loadPdfMake = async () => {
  if (typeof window !== 'undefined') {
    const pdfMake = await import('pdfmake/build/pdfmake');
    const pdfFonts = await import('pdfmake/build/vfs_fonts');
    (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
    return pdfMake;
  }
  return null;
};

interface ReportConfig {
  type: 'csr' | 'points' | 'products' | 'users';
  period: 'monthly' | 'quarterly' | 'yearly';
  startDate: string;
  endDate: string;
  departments: string[];
  format: 'pdf' | 'docx' | 'csv';
}

interface ReportData {
  totalCO2Reduction: number;
  totalPointsIssued: number;
  totalPointsRedeemed: number;
  activeUsers: number;
  topPerformers: Array<{
    name: string;
    department: string;
    reduction: number;
    points: number;
  }>;
  departmentStats: Array<{
    name: string;
    members: number;
    avgReduction: number;
    totalPoints: number;
  }>;
  productStats: Array<{
    name: string;
    category: string;
    redemptions: number;
    popularity: number;
  }>;
}

export default function AdminReportsPage() {
  const [reportConfig, setReportConfig] = useState<div>({
    type: 'csr',
    period: 'monthly',
    startDate: '2025-01-01',
    endDate: '2025-01-31',
    departments: [],
    format: 'pdf'
  })

  const [isGenerating, setIsGenerating] = useState(false)
  const [reportHistory, setReportHistory] = useState([
    {
      id: 1,
      title: 'CSR月次レポート (2025年1月)',
      type: 'CSRレポート',
      period: '2025-01',
      format: 'PDF',
      createdAt: '2025-01-15T10:00:00Z',
      size: '2.3 MB'
    },
    {
      id: 2,
      title: 'ポイント利用実績レポート',
      type: 'ポイントレポート',
      period: '2025-01',
      format: 'DOCX',
      createdAt: '2025-01-10T14:30:00Z',
      size: '1.8 MB'
    }
  ])

  const departments = ['営業部', '開発部', '人事部', '総務部', 'マーケティング部']

  // Mock report data
  const getMockReportData = (): ReportData => ({
    totalCO2Reduction: 2847.5,
    totalPointsIssued: 28475,
    totalPointsRedeemed: 15230,
    activeUsers: 1247,
    topPerformers: [
      { name: '田中 太郎', department: '営業部', reduction: 15.2, points: 1250 },
      { name: '佐藤 花子', department: 'マーケティング部', reduction: 12.8, points: 1180 },
      { name: '鈴木 一郎', department: '開発部', reduction: 11.5, points: 1120 }
    ],
    departmentStats: [
      { name: '営業部', members: 25, avgReduction: 13.4, totalPoints: 12500 },
      { name: 'マーケティング部', members: 18, avgReduction: 11.9, totalPoints: 9800 },
      { name: '開発部', members: 32, avgReduction: 10.7, totalPoints: 15600 }
    ],
    productStats: [
      { name: '社内カフェ利用券', category: '社内サービス', redemptions: 78, popularity: 9.2 },
      { name: 'Amazonギフトカード', category: 'ギフトカード', redemptions: 45, popularity: 8.9 },
      { name: 'スターバックスチケット', category: '商品', redemptions: 32, popularity: 7.8 }
    ]
  })

  const generatePDFReport = async (data: ReportData) => {
    const pdfMake = await loadPdfMake();
    if (!pdfMake) {
      alert('PDF生成機能は現在ご利用いただけません');
      return;
    }

    const docDefinition = {
      content: [
        {
          text: `${getReportTitle()} - ${reportConfig.period.toUpperCase()}レポート`,
          style: 'title',
          margin: [0, 0, 0, 20]
        },
        {
          text: `期間1: ${reportConfig.startDate} ~ ${reportConfig.endDate}`,
          style: 'subtitle',
          margin: [0, 0, 0, 20]
        },
        {
          text: '概要',
          style: 'header',
          margin: [0, 20, 0, 10]
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*'],
            body: [
              ['総 CO2 削減量', '総発行ポイント', '総利用ポイント', 'アクティブユーザー'],
              [`${data.totalCO2Reduction} kg`, `${data.totalPointsIssued.toLocaleString()} pt`, `${data.totalPointsRedeemed.toLocaleString()} pt`, `${data.activeUsers.toLocaleString()} 人`]
            ]
          },
          margin: [0, 0, 0, 20]
        },
        {
          text: 'トップパフォーマー',
          style: 'header',
          margin: [0, 20, 0, 10]
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*'],
            body: [
              ['氏名', '部署', '削減率 (%)', 'ポイント'],
              ...data.topPerformers.map(p => [p.name, p.department, `${p.reduction}%`, `${p.points} pt`])
            ]
          },
          margin: [0, 0, 0, 20]
        },
        {
          text: '部署別統計',
          style: 'header',
          margin: [0, 20, 0, 10]
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*'],
            body: [
              ['部署名', '人数', '平均削減率 (%)', '総ポイント'],
              ...data.departmentStats.map(d => [d.name, `${d.members}人`, `${d.avgReduction}%`, `${d.totalPoints.toLocaleString()} pt`])
            ]
          }
        }
      ],
      styles: {
        title: {
          fontSize: 20,
          bold: true,
          alignment: 'center'
        },
        subtitle: {
          fontSize: 14,
          alignment: 'center'
        },
        header: {
          fontSize: 16,
          bold: true
        }
      },
      defaultStyle: {
        font: 'Helvetica'
      }
    }

    (pdfMake as any).createPdf(docDefinition).download(`${getReportTitle()}_${reportConfig.period}_${Date.now()}.pdf`)
  }

  const generateDOCXReport = async (data: ReportData) => {
    const doc = new Document({
      sections: [{
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: `${getReportTitle()} - ${reportConfig.period.toUpperCase()}レポート`,
                bold: true,
                size: 24
              })
            ],
            alignment: 'center'
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `期間2: ${reportConfig.startDate} ~ ${reportConfig.endDate}`,
                size: 20
              })
            ],
            alignment: 'center'
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: '概要',
                bold: true,
                size: 20
              })
            ]
          }),
          new Table({
            width: {
              size: 100,
              type: WidthType.PERCENTAGE
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph('総 CO2 削減量')] }),
                  new TableCell({ children: [new Paragraph('総発行ポイント')] }),
                  new TableCell({ children: [new Paragraph('総利用ポイント')] }),
                  new TableCell({ children: [new Paragraph('アクティブユーザー')] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph(`${data.totalCO2Reduction} kg`)] }),
                  new TableCell({ children: [new Paragraph(`${data.totalPointsIssued.toLocaleString()} pt`)] }),
                  new TableCell({ children: [new Paragraph(`${data.totalPointsRedeemed.toLocaleString()} pt`)] }),
                  new TableCell({ children: [new Paragraph(`${data.activeUsers.toLocaleString()} 人`)] })
                ]
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'トップパフォーマー',
                bold: true,
                size: 18
              })
            ]
          }),
          new Table({
            width: {
              size: 100,
              type: WidthType.PERCENTAGE
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph('氏名')] }),
                  new TableCell({ children: [new Paragraph('部署')] }),
                  new TableCell({ children: [new Paragraph('削減率 (%)')] }),
                  new TableCell({ children: [new Paragraph('ポイント')] })
                ]
              }),
              ...data.topPerformers.map(p => 
                new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph(p.name)] }),
                    new TableCell({ children: [new Paragraph(p.department)] }),
                    new TableCell({ children: [new Paragraph(`${p.reduction}%`)] }),
                    new TableCell({ children: [new Paragraph(`${p.points} pt`)] })
                  ]
                })
              )
            ]
          })
        ]
      }]
    })

    const buffer = await Packer.toBuffer(doc)
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = url
    a.download = `${getReportTitle()}_${reportConfig.period}_${Date.now()}.docx`
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const generateCSVReport = async (data: ReportData) => {
    let csvContent = '"概要"\n'
    csvContent += `"総 CO2 削減量","${data.totalCO2Reduction} kg"\n`
    csvContent += `"総発行ポイント","${data.totalPointsIssued.toLocaleString()} pt"\n`
    csvContent += `"総利用ポイント","${data.totalPointsRedeemed.toLocaleString()} pt"\n`
    csvContent += `"アクティブユーザー","${data.activeUsers.toLocaleString()} 人"\n\n`
    
    csvContent += '"トップパフォーマー"\n'
    csvContent += '"氏名","部署","削減率 (%)","ポイント"\n'
    data.topPerformers.forEach(p => {
      csvContent += `"${p.name}","${p.department}","${p.reduction}%","${p.points} pt"\n`
    })
    
    csvContent += '\n"部署別統計"\n'
    csvContent += '"部署名","人数","平均削減率 (%)","総ポイント"\n'
    data.departmentStats.forEach(d => {
      csvContent += `"${d.name}","${d.members}人","${d.avgReduction}%","${d.totalPoints.toLocaleString()} pt"\n`
    })

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = url
    a.download = `${getReportTitle()}_${reportConfig.period}_${Date.now()}.csv`
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleGenerateReport = async () => {
    setIsGenerating(true)
    try {
      const data = getMockReportData()
      
      if (reportConfig.format === 'pdf') {
        await generatePDFReport(data)
      } else if (reportConfig.format === 'docx') {
        await generateDOCXReport(data)
      } else if (reportConfig.format === 'csv') {
        await generateCSVReport(data)
      }

      // Add to history (in real app, this would be saved to backend)
      const newReport = {
        id: reportHistory.length + 1,
        title: `${getReportTitle()} (${reportConfig.startDate} ~ ${reportConfig.endDate})`,
        type: getReportTitle(),
        period: `${reportConfig.startDate} ~ ${reportConfig.endDate}`,
        format: reportConfig.format.toUpperCase(),
        createdAt: new Date().toISOString(),
        size: '2.1 MB'
      }
      setReportHistory(prev => [newReport, ...prev])
    } catch (error) {
      console.error('Report generation error:', error)
      alert('レポートの生成に失敗しました')
    } finally {
      setIsGenerating(false)
    }
  }

  const getReportTitle = () => {
    const titles = {
      csr: 'CSRレポート',
      points: 'ポイント利用実績レポート',
      products: '商品人気度レポート',
      users: 'ユーザー活動レポート'
    }
    return titles[reportConfig.type]
  }

  const handleDepartmentToggle = (department: string) => {
    setReportConfig(prev => ({
      ...prev,
      departments: prev.departments.includes(department)
        ? prev.departments.filter(d => d !== department)
        : [...prev.departments, department]
    }))
  }

  return (
    <div>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">レポート生成</h1>
            <p className="text-gray-600 mt-1">
              CSRレポートと各種実績レポートの生成
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* レポート設定 */}
          <div className="lg:col-span-2">
            <div>
              <div>
                <div>レポート設定</div>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">レポート種別</label>
                    <select
                      value={reportConfig.type}
                      onChange={(e) => setReportConfig(prev => ({...prev, type: e.target.value as any}))}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    >
                      <option value="csr">CSRレポート</option>
                      <option value="points">ポイント利用実績</option>
                      <option value="products">商品人気度</option>
                      <option value="users">ユーザー活動</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">期間</label>
                    <select
                      value={reportConfig.period}
                      onChange={(e) => setReportConfig(prev => ({...prev, period: e.target.value as any}))}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    >
                      <option value="monthly">月次</option>
                      <option value="quarterly">四半期</option>
                      <option value="yearly">年次</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">開始日</label>
                    <input
                      type="date"
                      value={reportConfig.startDate}
                      onChange={(e) => setReportConfig(prev => ({...prev, startDate: e.target.value}))}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">終了日</label>
                    <input
                      type="date"
                      value={reportConfig.endDate}
                      onChange={(e) => setReportConfig(prev => ({...prev, endDate: e.target.value}))}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">部署フィルター</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {departments.map(dept => (
                      <label key={dept} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={reportConfig.departments.includes(dept)}
                          onChange={() => handleDepartmentToggle(dept)}
                          className="rounded"
                        />
                        <span className="text-sm">{dept}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">出力形式</label>
                  <div className="flex space-x-4">
                    {[{value: 'pdf', label: 'PDF'}, {value: 'docx', label: 'Word'}, {value: 'csv', label: 'CSV'}].map(format => (
                      <label key={format.value} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          value={format.value}
                          checked={reportConfig.format === format.value}
                          onChange={(e) => setReportConfig(prev => ({...prev, format: e.target.value as any}))}
                        />
                        <span className="text-sm">{format.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleGenerateReport}
                  disabled={isGenerating}
                  className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2 disabled:bg-gray-400"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>生成中...</span>
                    </>
                  ) : (
                    <>
                      <div className="w-5 h-5" />
                      <span>レポート生成</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* レポート統計 */}
          <div className="space-y-6">
            <div>
              <div>
                <div>レポート統計</div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-900">今月生成</span>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">12</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-900">総ダウンロード</span>
                  </div>
                  <span className="text-2xl font-bold text-green-600">1,247</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 text-purple-600" />
                    <span className="font-medium text-purple-900">最終更新</span>
                  </div>
                  <span className="text-sm font-medium text-purple-600">2025-01-15</span>
                </div>
              </div>
            </div>

            <div>
              <div>
                <div>人気レポート</div>
              </div>
              <div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">CSRレポート</span>
                    <span className="text-sm font-medium text-green-600">348 DL</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">ポイント実績</span>
                    <span className="text-sm font-medium text-blue-600">275 DL</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">商品人気度</span>
                    <span className="text-sm font-medium text-purple-600">198 DL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* レポート履歴 */}
        <div>
          <div>
            <div>レポート履歴</div>
          </div>
          <div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4">レポート名</th>
                    <th className="text-left py-3 px-4">種別</th>
                    <th className="text-left py-3 px-4">期間2</th>
                    <th className="text-left py-3 px-4">形式</th>
                    <th className="text-left py-3 px-4">サイズ</th>
                    <th className="text-left py-3 px-4">作成日</th>
                    <th className="text-left py-3 px-4">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {reportHistory.map((report) => (
                    <tr key={report.id} className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium text-gray-900">{report.title}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                          {report.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{report.period}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                          {report.format}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{report.size}</td>
                      <td className="py-3 px-4 text-gray-600">
                        {new Date(report.createdAt).toLocaleDateString('ja-JP')}
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-primary-600 hover:text-primary-800 flex items-center space-x-1">
                          <div className="w-4 h-4" />
                          <span>再ダウンロード</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}