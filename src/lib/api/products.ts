import { api, path } from '../apiClient';
import type { Product, CreateProductData, UpdateProductData } from '@/types/product';

export async function fetchProducts(): Promise<Product[]> {
  const endpoints = [
    '/mobile/products',
    '/admin/products',
    '/incentives/products'
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await api.get(path(endpoint));
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
  const response = await api.post(path('/admin/products'), data);
  return response.data;
}

export async function updateProduct(id: number, data: UpdateProductData): Promise<Product> {
  const response = await api.put(path(`/admin/products/${id}`), data);
  return response.data;
}

export async function deleteProduct(id: number): Promise<void> {
  await api.delete(path(`/admin/products/${id}`));
}