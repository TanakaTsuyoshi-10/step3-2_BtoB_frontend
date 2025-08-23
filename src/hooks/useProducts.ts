import useSWR from 'swr';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '@/lib/api/products';
import { SWR_KEYS } from '@/lib/swr';
import type { Product, CreateProductData, UpdateProductData } from '@/types/product';

export function useProducts() {
  const { data, error, isLoading, mutate } = useSWR(SWR_KEYS.products, fetchProducts, {
    revalidateOnFocus: true,
    dedupingInterval: 2000,
  });

  const createProductMutation = async (productData: CreateProductData) => {
    try {
      const newProduct = await createProduct(productData);
      await mutate();
      return newProduct;
    } catch (error) {
      console.error('Failed to create product:', error);
      throw error;
    }
  };

  const updateProductMutation = async (id: number, productData: UpdateProductData) => {
    try {
      const updatedProduct = await updateProduct(id, productData);
      await mutate();
      return updatedProduct;
    } catch (error) {
      console.error('Failed to update product:', error);
      throw error;
    }
  };

  const deleteProductMutation = async (id: number) => {
    try {
      await deleteProduct(id);
      await mutate();
    } catch (error) {
      console.error('Failed to delete product:', error);
      throw error;
    }
  };

  return {
    products: data || [],
    isLoading,
    error,
    refetch: mutate,
    createProduct: createProductMutation,
    updateProduct: updateProductMutation,
    deleteProduct: deleteProductMutation,
  };
}