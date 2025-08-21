'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createProduct, updateProduct } from '@/lib/api/incentives';

interface Product {
  id?: number;
  name: string;
  description: string;
  category: string;
  points_required: number;
  stock: number;
  active: boolean;
}

interface ProductEditorProps {
  product?: Product | null;
  onSave: () => void;
}

const CATEGORIES = [
  'ギフトカード',
  '食品・飲料',
  '生活用品',
  '電子機器',
  'エンターテイメント',
  'その他'
];

const ProductEditor: React.FC<ProductEditorProps> = ({ product, onSave }) => {
  const [formData, setFormData] = useState<Product>({
    name: '',
    description: '',
    category: '',
    points_required: 0,
    stock: 0,
    active: true
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = '商品名は必須です';
    }
    
    if (!formData.category) {
      newErrors.category = 'カテゴリを選択してください';
    }
    
    if (formData.points_required <= 0) {
      newErrors.points_required = '必要ポイントは1以上である必要があります';
    }
    
    if (formData.stock < 0) {
      newErrors.stock = '在庫数は0以上である必要があります';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      
      if (product?.id) {
        await updateProduct(product.id, formData);
      } else {
        await createProduct(formData);
      }
      
      onSave();
    } catch (error) {
      console.error('Failed to save product:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            商品名 *
          </label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="商品の名前を入力"
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            説明
          </label>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="商品の詳細説明を入力"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            カテゴリ *
          </label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData({ ...formData, category: value })}
          >
            <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
              <SelectValue placeholder="カテゴリを選択" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            必要ポイント *
          </label>
          <Input
            type="number"
            value={formData.points_required}
            onChange={(e) => setFormData({ ...formData, points_required: parseInt(e.target.value) || 0 })}
            placeholder="100"
            min="1"
            className={errors.points_required ? 'border-red-500' : ''}
          />
          {errors.points_required && (
            <p className="text-red-500 text-sm mt-1">{errors.points_required}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            在庫数 *
          </label>
          <Input
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
            placeholder="10"
            min="0"
            className={errors.stock ? 'border-red-500' : ''}
          />
          {errors.stock && (
            <p className="text-red-500 text-sm mt-1">{errors.stock}</p>
          )}
        </div>

        <div className="flex items-center space-x-3">
          <Switch
            checked={formData.active}
            onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
          />
          <label className="text-sm font-medium text-gray-700">
            公開状態にする
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-6 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={() => onSave()}
          disabled={loading}
        >
          キャンセル
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? '保存中...' : product?.id ? '更新' : '作成'}
        </Button>
      </div>
    </div>
  );
};

export default ProductEditor;