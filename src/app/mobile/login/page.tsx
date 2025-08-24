'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Icon } from '@iconify/react'
import { authAPI, setAuthToken, setCurrentUser } from '@/lib/api/mobile'

export default function Login() {
  const router = useRouter()
  const [loginType, setLoginType] = useState('general')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    companyCode: '',
    employeeId: '',
    userName: '',
    department: '',
    customerNumber: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // For now, use email and password with existing backend
      const credentials = {
        email: formData.email,
        password: formData.password
      }

      const response = await authAPI.login(credentials)
      
      if (response.access_token) {
        setAuthToken(response.access_token)
        
        // Get user info and store it
        const userInfo = await authAPI.getCurrentUser()
        setCurrentUser(userInfo)
        
        router.push('/mobile/dashboard')
      } else {
        throw new Error('認証トークンが取得できませんでした')
      }
    } catch (err: any) {
      setError(err.message || 'ログインに失敗しました')
      console.error('Login error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 relative overflow-hidden flex items-center justify-center p-4">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-200/30 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-green-200/40 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-blue-200/30 rounded-full animate-float" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-20 right-10 w-18 h-18 bg-purple-200/40 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative rounded-xl w-full max-w-md bg-white/80 backdrop-blur-lg border border-white/20 shadow-2xl animate-fade-in-up">
        <div className="p-6">
          <div className="text-center mb-8">
            <Link href="/mobile" className="inline-block">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 via-green-500 to-blue-600 bg-clip-text text-transparent animate-gradient hover:scale-105 transition-transform duration-300">
                Carbon Mate
              </h1>
            </Link>
            <p className="text-gray-600 mt-3 text-lg">企業向けエネルギー管理</p>
            <div className="mt-4 h-1 w-20 mx-auto bg-gradient-to-r from-primary-400 to-green-400 rounded-full"></div>
          </div>

          <div className="flex bg-gray-100/80 backdrop-blur-sm rounded-xl p-1 mb-8 shadow-inner">
            <button 
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base ${loginType === 'general' ? 'bg-white text-primary-600 shadow-lg transform scale-105' : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'}`}
              onClick={() => setLoginType('general')}
            >
              一般ログイン
            </button>
            <button 
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base ${loginType === 'tokyogas' ? 'bg-white text-primary-600 shadow-lg transform scale-105' : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'}`}
              onClick={() => setLoginType('tokyogas')}
            >
              <span className="hidden sm:inline">東京ガス連携</span>
              <span className="sm:hidden">東京ガス</span>
            </button>
          </div>

          {error && (
            <div className="px-4 py-3 rounded-xl bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700 mb-6 animate-fade-in-up">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            {loginType === 'tokyogas' ? (
              <>
                <div className="mb-6">
                  <div className="text-center p-4 bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl border border-primary-200/50">
                    <p className="text-primary-700 font-medium">
                      東京ガスのお客さま番号でログインできます
                    </p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">お客さま番号</label>
                  <input 
                    type="text" 
                    name="customerNumber"
                    placeholder="お客さま番号を入力"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent focus:bg-white transition-all duration-300 shadow-sm hover:shadow-md" 
                    value={formData.customerNumber || ''}
                    onChange={handleInputChange}
                    required 
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">パスワード</label>
                  <input 
                    type="password" 
                    name="password"
                    placeholder="パスワードを入力"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent focus:bg-white transition-all duration-300 shadow-sm hover:shadow-md" 
                    value={formData.password}
                    onChange={handleInputChange}
                    required 
                  />
                </div>

                <button 
                  type="submit" 
                  className="px-6 py-4 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white w-full flex justify-center items-center shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="animate-spin rounded-full border-b-2 h-5 w-5"></span>
                  ) : (
                    <>
                      <Icon icon="carbon:connect" className="text-lg mr-2" />
                      <span className="hidden sm:inline">東京ガスアカウントで</span>ログイン
                    </>
                  )}
                </button>
              </>
            ) : (
              <>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">メールアドレス</label>
                  <input 
                    type="email" 
                    name="email"
                    placeholder="メールアドレスを入力"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent focus:bg-white transition-all duration-300 shadow-sm hover:shadow-md" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">パスワード</label>
                  <input 
                    type="password" 
                    name="password"
                    placeholder="パスワードを入力"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent focus:bg-white transition-all duration-300 shadow-sm hover:shadow-md" 
                    value={formData.password}
                    onChange={handleInputChange}
                    required 
                  />
                </div>

                <button 
                  type="submit" 
                  className="px-6 py-4 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white w-full flex justify-center items-center shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="animate-spin rounded-full border-b-2 h-5 w-5"></span>
                  ) : (
                    <>
                      <Icon icon="carbon:login" className="text-lg mr-2" />
                      ログイン
                    </>
                  )}
                </button>
              </>
            )}

            <div className="text-center mt-8">
              <p className="text-sm text-gray-600 bg-gray-50/80 backdrop-blur-sm rounded-lg py-3 px-4">
                アカウントをお持ちでない方は管理者にお問い合わせください
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}