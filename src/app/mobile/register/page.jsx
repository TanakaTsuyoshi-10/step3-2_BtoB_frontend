'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Icon } from '@iconify/react'
import { authAPI } from '@lib/api'

export default function Register() {
  const router = useRouter()
  const [registerType, setRegisterType] = useState('general')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    companyCode: '',
    companyName: '',
    employeeId: '',
    userName: '',
    department: '',
    position: '',
    customerNumber: ''
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Clear error when user starts typing
    if (error) setError('')
  }

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('パスワードが一致しません')
      return false
    }
    if (formData.password.length < 6) {
      setError('パスワードは6文字以上で入力してください')
      return false
    }
    return true
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    if (!validateForm()) {
      setIsLoading(false)
      return
    }

    try {
      // Prepare registration data based on register type
      const registrationData = registerType === 'tokyogas' 
        ? {
            customerNumber: formData.customerNumber,
            password: formData.password,
            userName: formData.userName,
            registerType: 'tokyogas'
          }
        : {
            email: formData.email,
            password: formData.password,
            companyCode: formData.companyCode,
            companyName: formData.companyName,
            employeeId: formData.employeeId,
            userName: formData.userName,
            department: formData.department,
            position: formData.position,
            registerType: 'general'
          }

      // Call API register
      const response = await authAPI.register(registrationData)
      
      setSuccess('アカウントが正常に作成されました。ログインページに移動します...')
      
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        router.push('/login')
      }, 2000)
      
    } catch (err) {
      setError(err.message || 'アカウント作成に失敗しました')
      console.error('Register error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl border border-gray-200">
        <div className="p-8">
          <div className="text-center mb-6">
            <Link href="/" className="text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors">
              Carbon Mate
            </Link>
            <p className="text-gray-600 mt-2">アカウント作成</p>
          </div>

          <div className="flex bg-gray-200 rounded-lg p-1 mb-6">
            <button 
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors text-sm ${
                registerType === 'general' 
                  ? 'bg-white text-primary-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setRegisterType('general')}
            >
              一般登録
            </button>
            <button 
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors text-sm ${
                registerType === 'tokyogas' 
                  ? 'bg-white text-primary-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setRegisterType('tokyogas')}
            >
              <span className="hidden sm:inline">東京ガス連携</span>
              <span className="sm:hidden">東京ガス</span>
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg mb-4">
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg mb-4">
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            {registerType === 'tokyogas' ? (
              <>
                <div className="mb-4">
                  <p className="text-center text-primary font-medium text-sm">
                    東京ガス連携アカウント登録
                  </p>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    東京ガスお客さま番号
                  </label>
                  <input 
                    type="text" 
                    name="customerNumber"
                    placeholder="お客さま番号を入力"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" 
                    value={formData.customerNumber}
                    onChange={handleInputChange}
                    required 
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    会社コード
                  </label>
                  <input 
                    type="text" 
                    name="companyCode"
                    placeholder="会社コードを入力"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" 
                    value={formData.companyCode}
                    onChange={handleInputChange}
                    required 
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    社員番号
                  </label>
                  <input 
                    type="text" 
                    name="employeeId"
                    placeholder="社員番号を入力"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" 
                    value={formData.employeeId}
                    onChange={handleInputChange}
                    required 
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    メールアドレス
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    placeholder="メールアドレスを入力"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    お名前
                  </label>
                  <input 
                    type="text" 
                    name="userName"
                    placeholder="お名前を入力"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" 
                    value={formData.userName}
                    onChange={handleInputChange}
                    required 
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      部署
                    </label>
                    <input 
                      type="text" 
                      name="department"
                      placeholder="部署名"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" 
                      value={formData.department}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      役職
                    </label>
                    <input 
                      type="text" 
                      name="position"
                      placeholder="役職名"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" 
                      value={formData.position}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    パスワード
                  </label>
                  <input 
                    type="password" 
                    name="password"
                    placeholder="パスワードを入力（6文字以上）"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" 
                    value={formData.password}
                    onChange={handleInputChange}
                    required 
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    パスワード確認
                  </label>
                  <input 
                    type="password" 
                    name="confirmPassword"
                    placeholder="パスワードを再入力"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" 
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required 
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <>
                      <Icon icon="carbon:connect" className="text-lg" />
                      <span className="hidden sm:inline">東京ガス連携で</span>アカウント作成
                    </>
                  )}
                </button>
              </>
            ) : (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    会社コード
                  </label>
                  <input 
                    type="text" 
                    name="companyCode"
                    placeholder="会社コードを入力"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" 
                    value={formData.companyCode}
                    onChange={handleInputChange}
                    required 
                  />
                </div>


                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    社員番号
                  </label>
                  <input 
                    type="text" 
                    name="employeeId"
                    placeholder="社員番号を入力"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" 
                    value={formData.employeeId}
                    onChange={handleInputChange}
                    required 
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    お名前
                  </label>
                  <input 
                    type="text" 
                    name="userName"
                    placeholder="お名前を入力"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" 
                    value={formData.userName}
                    onChange={handleInputChange}
                    required 
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      部署
                    </label>
                    <input 
                      type="text" 
                      name="department"
                      placeholder="部署名"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" 
                      value={formData.department}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      役職
                    </label>
                    <input 
                      type="text" 
                      name="position"
                      placeholder="役職名"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" 
                      value={formData.position}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    メールアドレス
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    placeholder="メールアドレスを入力"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    パスワード
                  </label>
                  <input 
                    type="password" 
                    name="password"
                    placeholder="パスワードを入力（6文字以上）"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" 
                    value={formData.password}
                    onChange={handleInputChange}
                    required 
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    パスワード確認
                  </label>
                  <input 
                    type="password" 
                    name="confirmPassword"
                    placeholder="パスワードを再入力"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" 
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required 
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <>
                      <Icon icon="carbon:user-plus" className="text-lg" />
                      アカウント作成
                    </>
                  )}
                </button>
              </>
            )}

            <div className="text-center mt-6">
              <Link href="/login" className="text-primary-600 hover:text-primary-700 transition-colors underline">
                すでにアカウントをお持ちの方はこちら
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}