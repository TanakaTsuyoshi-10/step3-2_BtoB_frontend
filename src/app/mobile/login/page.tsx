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
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="rounded-lg w-full max-w-md bg-white shadow-2xl">
        <div className="p-6">
          <div className="text-center mb-6">
            <Link href="/mobile" className="text-2xl font-bold text-primary hover:text-primary/80">
              Carbon Mate
            </Link>
            <p className="text-gray-600 mt-2">企業向けエネルギー管理</p>
          </div>

          <div className="flex bg-gray-200 rounded-lg p-1 mb-6">
            <button 
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors text-gray-600 hover:text-gray-900 text-sm sm:text-base ${loginType === 'general' ? 'bg-white text-primary-600 shadow-sm' : ''}`}
              onClick={() => setLoginType('general')}
            >
              一般ログイン
            </button>
            <button 
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors text-gray-600 hover:text-gray-900 text-sm sm:text-base ${loginType === 'tokyogas' ? 'bg-white text-primary-600 shadow-sm' : ''}`}
              onClick={() => setLoginType('tokyogas')}
            >
              <span className="hidden sm:inline">東京ガス連携</span>
              <span className="sm:hidden">東京ガス</span>
            </button>
          </div>

          {error && (
            <div className="px-4 py-3 rounded bg-red-100 border border-red-400 text-red-700 mb-4">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {loginType === 'tokyogas' ? (
              <>
                <div className="mb-4">
                  <p className="text-center text-primary font-medium">
                    東京ガスのお客さま番号でログインできます
                  </p>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">お客さま番号</label>
                  <input 
                    type="text" 
                    name="customerNumber"
                    placeholder="お客さま番号を入力"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                    value={formData.customerNumber || ''}
                    onChange={handleInputChange}
                    required 
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">パスワード</label>
                  <input 
                    type="password" 
                    name="password"
                    placeholder="パスワードを入力"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                    value={formData.password}
                    onChange={handleInputChange}
                    required 
                  />
                </div>

                <button 
                  type="submit" 
                  className="px-4 py-2 sm:px-6 sm:py-3 sm:text-lg rounded font-medium transition-colors bg-primary-600 hover:bg-primary-700 text-white w-full flex justify-center items-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="animate-spin rounded-full border-b-2 h-4 w-4"></span>
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
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">メールアドレス</label>
                  <input 
                    type="email" 
                    name="email"
                    placeholder="メールアドレスを入力"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">パスワード</label>
                  <input 
                    type="password" 
                    name="password"
                    placeholder="パスワードを入力"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                    value={formData.password}
                    onChange={handleInputChange}
                    required 
                  />
                </div>

                <button 
                  type="submit" 
                  className="px-4 py-2 sm:px-6 sm:py-3 sm:text-lg rounded font-medium transition-colors bg-primary-600 hover:bg-primary-700 text-white w-full flex justify-center items-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="animate-spin rounded-full border-b-2 h-4 w-4"></span>
                  ) : (
                    <>
                      <Icon icon="carbon:login" className="text-lg mr-2" />
                      ログイン
                    </>
                  )}
                </button>
              </>
            )}

            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                アカウントをお持ちでない方は管理者にお問い合わせください
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}