export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  points_required: number;
  stock: number;
  active: boolean;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateProductData {
  title: string;
  description: string;
  category: string;
  points_required: number;
  stock: number;
  active?: boolean;
  image_url?: string;
}

export interface UpdateProductData extends Partial<CreateProductData> {}