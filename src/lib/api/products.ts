import { api } from './client';
import type { Product, CreateProductData, UpdateProductData } from '@/types/product';

export async function fetchProducts(): Promise<Product[]> {
  const endpoints = [
    '/api/v1/mobile/products',
    '/api/v1/admin/products',
    '/api/v1/incentives/products'
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await api.get(endpoint);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.warn(`Failed to fetch from ${endpoint}:`, error);
      continue;
    }
  }
  
  throw new Error('All product endpoints failed');
}

export async function createProduct(data: CreateProductData): Promise<Product> {
  const response = await api.post('/api/v1/admin/products', data);
  return response.data;
}

export async function updateProduct(id: number, data: UpdateProductData): Promise<Product> {
  const response = await api.put(`/api/v1/admin/products/${id}`, data);
  return response.data;
}

export async function deleteProduct(id: number): Promise<void> {
  await api.delete(`/api/v1/admin/products/${id}`);
}