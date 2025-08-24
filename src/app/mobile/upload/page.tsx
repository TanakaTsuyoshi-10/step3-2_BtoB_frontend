'use client'

import { useState, useCallback } from 'react'
import { Icon } from '@iconify/react'
import MobileNav from '@/components/mobile/MobileNav'

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
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-green-50 relative overflow-hidden">
      <MobileNav />
      
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-6 w-16 h-16 bg-primary-200/20 rounded-full animate-float"></div>
        <div className="absolute top-60 right-8 w-12 h-12 bg-green-200/30 rounded-full animate-float" style={{animationDelay: '3s'}}></div>
        <div className="absolute bottom-80 left-12 w-20 h-20 bg-blue-200/20 rounded-full animate-float" style={{animationDelay: '5s'}}></div>
        <div className="absolute bottom-40 right-6 w-14 h-14 bg-purple-200/25 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
      </div>


      <div className="relative max-w-none mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-6 sm:py-8 pt-20">
        <div className="text-center mb-8 animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary-600 via-green-500 to-blue-600 bg-clip-text text-transparent animate-gradient">
            利用明細書アップロード
          </h1>
          <div className="mt-2 h-1 w-24 mx-auto bg-gradient-to-r from-primary-400 to-green-400 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <div className="space-y-8">
            <div className="rounded-xl bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl">
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-8 flex items-center">
                  <Icon icon="carbon:upload" className="text-2xl mr-3 text-primary-600" />
                  ファイルアップロード
                </h2>
                
                <div 
                  className={`border-2 border-dashed rounded-xl p-10 text-center transition-all duration-300 shadow-inner ${
                    dragActive ? 'border-primary-400 bg-primary-50/50 scale-105' : 'border-gray-300 bg-white/50'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="text-7xl mb-6">
                    <Icon icon="carbon:document" className="text-7xl text-primary-600" />
                  </div>
                  <div className="text-xl font-bold mb-3 text-gray-800">ファイルをドロップするか、クリックして選択</div>
                  <div className="text-gray-600 mb-6">
                    対応形式: PDF, JPG, PNG (最大10MB)
                  </div>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileInput}
                    className="w-full max-w-xs px-4 py-3 border border-gray-200 rounded-xl bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-300"
                  />
                </div>

                <div className="px-6 py-4 rounded-xl border border-primary-200/50 bg-gradient-to-r from-primary-50 to-blue-50 mt-6">
                  <div className="flex items-start space-x-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6 text-primary-600">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div>
                      <p className="font-bold text-primary-700">アップロード可能な明細書</p>
                      <p className="text-sm text-gray-700 mt-1">ガス・電気・水道の利用明細書をアップロードできます。OCR技術により自動で使用量を読み取り、Tech0ポイントを獲得できます。</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="rounded-xl bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">アップロード待ちファイル</h3>
                  <div className="space-y-3">
                    {uploadedFiles.map(file => (
                      <div key={file.id} className="flex items-center justify-between p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-100/50 hover:bg-white/70 transition-all duration-300 hover:shadow-md">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">
                            {file.status === 'completed' ? <Icon icon="carbon:checkmark-filled" className="text-green-600" /> : 
                             file.status === 'processing' ? <Icon icon="carbon:in-progress" className="text-yellow-600" /> : <Icon icon="carbon:document" className="text-primary-600" />}
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
                  
                  <div className="flex gap-2 pt-6 justify-end mt-4">
                    <button 
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 ${processing ? 'opacity-50 cursor-not-allowed transform-none' : ''}`}
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

          <div className="space-y-8">
            <div className="rounded-xl bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <Icon icon="ion:stats-chart" className="text-xl mr-3 text-green-600" />
                  アップロード統計
                </h3>
                <div className="grid gap-4">
                  <div className="p-5 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200/50 shadow-sm">
                    <div className="text-sm text-blue-600 font-medium">今月のアップロード</div>
                    <div className="text-3xl font-bold text-blue-700 mt-1">3</div>
                    <div className="text-sm text-blue-600 mt-1">ファイル</div>
                  </div>
                  
                  <div className="p-5 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200/50 shadow-sm">
                    <div className="text-sm text-green-600 font-medium">獲得ポイント</div>
                    <div className="text-3xl font-bold text-green-700 mt-1">75</div>
                    <div className="text-sm text-green-600 mt-1">今月合計</div>
                  </div>
                  
                  <div className="p-5 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200/50 shadow-sm">
                    <div className="text-sm text-purple-600 font-medium">処理精度</div>
                    <div className="text-3xl font-bold text-purple-700 mt-1">98%</div>
                    <div className="text-sm text-purple-600 mt-1">OCR読み取り精度</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <Icon icon="carbon:light-bulb" className="text-xl mr-3 text-yellow-600" />
                  アップロードのコツ
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-4 p-4 bg-white/50 backdrop-blur-sm rounded-xl">
                    <Icon icon="carbon:camera" className="text-2xl text-primary-600" />
                    <div>
                      <div className="font-bold text-gray-800">鮮明な画像で撮影</div>
                      <div className="text-sm text-gray-600 mt-1">数値部分がはっきり見えるように撮影してください</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 bg-white/50 backdrop-blur-sm rounded-xl">
                    <Icon icon="carbon:document-pdf" className="text-2xl text-red-600" />
                    <div>
                      <div className="font-bold text-gray-800">PDFファイルを優先</div>
                      <div className="text-sm text-gray-600 mt-1">PDF形式の方が読み取り精度が高くなります</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 bg-white/50 backdrop-blur-sm rounded-xl">
                    <Icon icon="ion:trophy" className="text-2xl text-yellow-600" />
                    <div>
                      <div className="font-bold text-gray-800">ポイント獲得</div>
                      <div className="text-sm text-gray-600 mt-1">正常に処理される10-30ポイント獲得できます</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl mt-8 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <div className="p-8">
            <h3 className="text-2xl font-bold mb-8 flex items-center">
              <Icon icon="carbon:list" className="text-2xl mr-3 text-purple-600" />
              アップロード履歴
            </h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead className="bg-white/50 backdrop-blur-sm">
                  <tr className="border-b border-gray-200/50">
                    <th className="px-6 py-4 text-left font-semibold text-gray-800">ファイル名</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-800">アップロード日</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-800">ステータス</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-800">獲得ポイント</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-800">アクション</th>
                  </tr>
                </thead>
                <tbody>
                  {uploadHistory.map(item => (
                    <tr key={item.id} className="border-b border-gray-100/50 hover:bg-white/30 transition-colors duration-300">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Icon icon="carbon:document" className="text-xl text-primary-600" />
                          <div className="font-medium text-gray-800">{item.filename}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{item.uploadDate}</td>
                      <td className="px-6 py-4">
                        <div className="bg-green-100/80 text-green-800 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium">{item.status}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">+{item.points}pt</div>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-gray-600 hover:text-primary-600 hover:bg-primary-50 px-4 py-2 text-sm rounded-lg font-medium transition-all duration-300">詳細</button>
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