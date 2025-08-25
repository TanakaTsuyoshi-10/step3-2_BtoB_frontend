'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Zap, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { setAuthToken, setCurrentUser } from '@/lib/auth';
// import { authAPI } from '@lib/api';
// import { LoginFormData } from '@/types';

// Temporary mock types and functions for build
type LoginFormData = {
  username: string;
  password: string;
};

const authAPI = {
  login: async (data: LoginFormData) => {
    // モックの遅延を追加してリアルな動作をシミュレート
    await new Promise(resolve => setTimeout(resolve, 500));
    return Promise.resolve({ access_token: 'mock-token' });
  },
  me: async (token: string) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return Promise.resolve({ id: '1', username: 'admin', email: 'admin@example.com' });
  }
};


export default function Page() {
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const tokenResponse = await authAPI.login(formData);
      setAuthToken(tokenResponse.access_token);
      
      const userResponse = await authAPI.me(tokenResponse.access_token);
      setCurrentUser(userResponse);
      router.push('/admin/dashboard');
    } catch (err: any) {
      // Axios ネットワーク/サーバー/バリデーションの切り分け
      const isAxios = !!err?.isAxiosError;
      if (isAxios) {
        const status = err?.response?.status;
        const data = err?.response?.data;
        const url = err?.config?.baseURL ? (err?.config?.baseURL + (err?.config?.url || '')) : (err?.config?.url || '');
        console.error('[ログイン失敗]', { status, data, url, err });
        if (!err?.response) {
          setError('ネットワークエラーが発生しました。接続状況を確認してから再度お試しください。');
        } else if (status === 401) {
          setError('メールアドレスまたはパスワードが正しくありません。');
        } else if (status === 400) {
          setError(data?.detail || 'アカウントが無効になっています。');
        } else if (status >= 500) {
          setError('サーバーエラーが発生しました。しばらく時間をおいてから再度お試しください。');
        } else {
          setError(data?.detail || 'ログインに失敗しました。再度お試しください。');
        }
      } else {
        console.error('[ログイン失敗:不明]', err);
        setError('予期しないエラーが発生しました。');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Zap className="w-12 h-12 text-primary-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">CarbonMate 管理システム</h1>
            <p className="text-gray-600 mt-2">管理者アカウントでログイン</p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-danger-50 border border-danger-200 rounded-lg">
              <p className="text-danger-800 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                メールアドレス
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="username"
                  name="username"
                  type="email"
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                  className="input-field pl-10"
                  placeholder="メールアドレスを入力"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                パスワード
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="input-field pl-10 pr-10"
                  placeholder="パスワードを入力"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'ログイン中...' : 'ログイン'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              アカウントをお持ちでない方は{' '}
              <Link href="/register" className="font-medium text-primary-600 hover:text-primary-500">
                新規登録
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

