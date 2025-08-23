'use client'

import { useState, useCallback } from 'react'
import MobileNav from '@/components/mobile/MobileNav'
import { Icon } from '@iconify/react'

interface UploadedFile {
  file: File
  id: number
  name: string
  size: number
  status: 'pending' | 'processing' | 'completed'
  points?: number
}

interface UploadHistoryItem {
  id: number
  filename: string
  uploadDate: string
  status: string
  points: number
}

export default function Upload() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [uploadHistory, setUploadHistory] = useState<UploadHistoryItem[]>([
    { id: 1, filename: 'gas_bill_202412.pdf', uploadDate: '2025-01-10', status: '処理完了', points: 30 },
    { id: 2, filename: 'electricity_bill_202412.pdf', uploadDate: '2025-01-09', status: '処理完了', points: 25 },
    { id: 3, filename: 'water_bill_202412.pdf', uploadDate: '2025-01-08', status: '処理完了', points: 20 },
    { id: 4, filename: 'gas_bill_202411.pdf', uploadDate: '2024-12-10', status: '処理完了', points: 30 },
  ])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files)
    }
  }

  const handleFiles = (files: FileList) => {
    const fileArray = Array.from(files)
    const validFiles = fileArray.filter(file => {
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']
      return validTypes.includes(file.type) && file.size <= 10 * 1024 * 1024 // 10MB
    })

    if (validFiles.length > 0) {
      setUploadedFiles(prev => [...prev, ...validFiles.map(file => ({
        file,
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        status: 'pending' as const
      }))])
    }
  }

  const processFiles = async () => {
    setProcessing(true)
    
    const newUploadedFiles = [...uploadedFiles]
    
    for (let i = 0; i < newUploadedFiles.length; i++) {
      const uploadedFile = newUploadedFiles[i]
      if (uploadedFile.status === 'pending') {
        uploadedFile.status = 'processing'
        setUploadedFiles([...newUploadedFiles])
        
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        const points = Math.floor(Math.random() * 30) + 10
        uploadedFile.status = 'completed'
        uploadedFile.points = points
        
        setUploadHistory(prev => [{
          id: Date.now(),
          filename: uploadedFile.name,
          uploadDate: new Date().toLocaleDateString('ja-JP'),
          status: '処理完了',
          points: points
        }, ...prev])
      }
    }
    
    setProcessing(false)
    setTimeout(() => setUploadedFiles([]), 1000)
  }

  const removeFile = (id: number) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id))
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="min-h-screen bg-white pt-16">
      <MobileNav />

      <div className="container mx-auto px-4 py-4 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">利用明細書アップロード</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="space-y-6">
            <div className="rounded-lg bg-white shadow-lg">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">
                  <Icon icon="carbon:upload" className="text-2xl mr-2" />
                  ファイルアップロード
                </h2>
                
                <div 
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive ? 'border-corporate bg-corporate-50' : 'border-gray-300'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="text-6xl mb-4">
                    <Icon icon="carbon:document" className="text-6xl text-corporate" />
                  </div>
                  <div className="text-xl font-bold mb-2">ファイルをドロップするか、クリックして選択</div>
                  <div className="text-gray-600 mb-4">
                    対応形式: PDF, JPG, PNG (最大10MB)
                  </div>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileInput}
                    className="w-full max-w-xs px-3 py-2 border border-primary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div className="px-4 py-3 rounded border-2 border-corporate bg-transparent mt-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6 text-corporate">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <div>
                    <p className="font-bold text-corporate">アップロード可能な明細書</p>
                    <p className="text-sm text-gray-700">ガス・電気・水道の利用明細書をアップロードできます。OCR技術により自動で使用量を読み取り、Tech0ポイントを獲得できます。</p>
                  </div>
                </div>
              </div>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="rounded-lg bg-white shadow-lg">
                <div className="p-6">
                  <h3 className="text-lg font-bold">アップロード待ちファイル</h3>
                  <div className="space-y-3">
                    {uploadedFiles.map(file => (
                      <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">
                            {file.status === 'completed' ? <Icon icon="carbon:checkmark-filled" className="text-green-600" /> : 
                             file.status === 'processing' ? <Icon icon="carbon:in-progress" className="text-yellow-600" /> : <Icon icon="carbon:document" className="text-corporate" />}
                          </div>
                          <div>
                            <div className="font-medium truncate max-w-xs">{file.name}</div>
                            <div className="text-sm text-gray-600">{formatFileSize(file.size)}</div>
                            {file.points && (
                              <div className="text-sm text-green-600 font-bold">+{file.points} points</div>
                            )}
                          </div>
                        </div>
                        {file.status === 'pending' && (
                          <button 
                            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-1 text-sm rounded font-medium transition-colors"
                            onClick={() => removeFile(file.id)}
                          >
                            <Icon icon="carbon:close" className="text-red-600" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex gap-2 pt-4 justify-end mt-4">
                    <button 
                      className={`px-4 py-2 rounded font-medium transition-colors bg-primary-600 hover:bg-primary-700 text-white ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={processFiles}
                      disabled={processing || uploadedFiles.every(f => f.status !== 'pending')}
                    >
                      {processing ? '処理中...' : 'アップロード開始'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-lg bg-white shadow-lg">
              <div className="p-6">
                <h3 className="text-lg font-bold">
                  <Icon icon="ion:stats-chart" className="text-lg mr-2" />
                  アップロード統計
                </h3>
                <div className="grid gap-4 shadow">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600">今月のアップロード</div>
                    <div className="text-2xl font-bold">3</div>
                    <div className="text-sm text-gray-500">ファイル</div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600">獲得ポイント</div>
                    <div className="text-2xl font-bold text-green-600">75</div>
                    <div className="text-sm text-gray-500">今月合計</div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600">処理精度</div>
                    <div className="text-2xl font-bold text-corporate">98%</div>
                    <div className="text-sm text-gray-500">OCR読み取り精度</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-white shadow-lg">
              <div className="p-6">
                <h3 className="text-lg font-bold mb-4">
                  <Icon icon="carbon:light-bulb" className="text-lg mr-2" />
                  アップロードのコツ
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Icon icon="carbon:camera" className="text-2xl text-corporate" />
                    <div>
                      <div className="font-bold">鮮明な画像で撮影</div>
                      <div className="text-sm text-gray-600">数値部分がはっきり見えるように撮影してください</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Icon icon="carbon:document-pdf" className="text-2xl text-red-600" />
                    <div>
                      <div className="font-bold">PDFファイルを優先</div>
                      <div className="text-sm text-gray-600">PDF形式の方が読み取り精度が高くなります</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Icon icon="ion:trophy" className="text-2xl text-yellow-600" />
                    <div>
                      <div className="font-bold">ポイント獲得</div>
                      <div className="text-sm text-gray-600">正常に処理される〈10-30ポイント獲得できます</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white shadow-lg mt-6 sm:mt-8">
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-6">
              <Icon icon="carbon:list" className="text-2xl mr-2" />
              アップロード履歴
            </h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead className="bg-gray-50">
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left font-medium text-gray-700">ファイル名</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-700">アップロード日</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-700">ステータス</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-700">獲得ポイント</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-700">アクション</th>
                  </tr>
                </thead>
                <tbody>
                  {uploadHistory.map(item => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-3">
                          <Icon icon="carbon:document" className="text-xl text-corporate" />
                          <div className="font-medium">{item.filename}</div>
                        </div>
                      </td>
                      <td className="px-4 py-2">{item.uploadDate}</td>
                      <td className="px-4 py-2">
                        <div className="bg-green-100 text-green-800 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">{item.status}</div>
                      </td>
                      <td className="px-4 py-2">
                        <div className="font-bold text-green-600">+{item.points}pt</div>
                      </td>
                      <td className="px-4 py-2">
                        <button className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-1 text-sm rounded font-medium transition-colors">詳細</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}