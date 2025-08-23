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
    <div className="min-h-screen bg-custom flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-white shadow-2xl">
        <div className="card-body">
          <div className="text-center mb-6">
            <Link href="/mobile" className="text-2xl font-bold text-primary hover:text-primary/80">
              Tech0 by scope3
            </Link>
            <p className="text-gray-600 mt-2">企業向けエネルギー管理</p>
          </div>

          <div className="tabs tabs-custom mb-6">
            <button 
              className={`tab tab-sm sm:tab-lg flex-1 ${loginType === 'general' ? 'tab-active' : ''}`}
              onClick={() => setLoginType('general')}
            >
              一般ログイン
            </button>
            <button 
              className={`tab tab-sm sm:tab-lg flex-1 ${loginType === 'tokyogas' ? 'tab-active' : ''}`}
              onClick={() => setLoginType('tokyogas')}
            >
              <span className="hidden sm:inline">東京ガス連携</span>
              <span className="sm:hidden">東京ガス</span>
            </button>
          </div>

          {error && (
            <div className="alert alert-error mb-4">
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
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">お客さま番号</span>
                  </label>
                  <input 
                    type="text" 
                    name="customerNumber"
                    placeholder="お客さま番号を入力"
                    className="input input-bordered" 
                    value={formData.customerNumber || ''}
                    onChange={handleInputChange}
                    required 
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">パスワード</span>
                  </label>
                  <input 
                    type="password" 
                    name="password"
                    placeholder="パスワードを入力"
                    className="input input-bordered" 
                    value={formData.password}
                    onChange={handleInputChange}
                    required 
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary w-full btn-md sm:btn-lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <>
                      <Icon icon="carbon:connect" className="text-lg" />
                      <span className="hidden sm:inline">東京ガスアカウントで</span>ログイン
                    </>
                  )}
                </button>
              </>
            ) : (
              <>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">メールアドレス</span>
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    placeholder="メールアドレスを入力"
                    className="input input-bordered" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">パスワード</span>
                  </label>
                  <input 
                    type="password" 
                    name="password"
                    placeholder="パスワードを入力"
                    className="input input-bordered" 
                    value={formData.password}
                    onChange={handleInputChange}
                    required 
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary w-full btn-md sm:btn-lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <>
                      <Icon icon="carbon:login" className="text-lg" />
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