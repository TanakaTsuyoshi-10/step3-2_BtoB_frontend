import { get, post, put, del } from '../apiClient';
import type { Product, CreateProductData, UpdateProductData } from '@/types/product';

export async function fetchProducts(): Promise<Product[]> {
  const endpoints = [
    '/mobile/products',
    '/admin/products',
    '/incentives/products'
  ];

  // 並列で全エンドポイントを試す
  const promises = endpoints.map(async (endpoint) => {
    try {
      const response = await get(endpoint);
      if (response.status === 200) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.warn(`Failed to fetch from ${endpoint}:`, error);
      return null;
    }
  });

  const results = await Promise.allSettled(promises);
  
  // 最初に成功したレスポンスを返す
  for (const result of results) {
    if (result.status === 'fulfilled' && result.value !== null) {
      return result.value;
    }
  }
  
  throw new Error('All product endpoints failed');
}

export async function createProduct(data: CreateProductData): Promise<Product> {
  const response = await post('/admin/products', data);
  return response.data;
}

export async function updateProduct(id: number, data: UpdateProductData): Promise<Product> {
  const response = await put(`/admin/products/${id}`, data);
  return response.data;
}

export async function deleteProduct(id: number): Promise<void> {
  await del(`/admin/products/${id}`);
}