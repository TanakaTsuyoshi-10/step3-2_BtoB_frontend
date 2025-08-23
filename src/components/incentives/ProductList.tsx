'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@admin-ui/card';
import { Button } from '@admin-ui/button';
import { Input } from '@admin-ui/input';
import { Badge } from '@admin-ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@admin-ui/dialog';
import { Switch } from '@admin-ui/switch';
import { Plus, Edit, Eye, EyeOff, Package, Search, AlertTriangle } from 'lucide-react';
import ProductEditor from './ProductEditor';
import { useProducts } from '@/hooks/useProducts';
import type { Product } from '@/types/product';

const CATEGORIES = [
  'ギフトカード',
  '食品・飲料',
  '生活用品',
  '電子機器',
  'エンターテイメント',
  'その他'
];

const ProductList: React.FC = () => {
  const { products, isLoading, createProduct, updateProduct, deleteProduct } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleToggleActive = async (productId: number, active: boolean) => {
    try {
      await updateProduct(productId, { active });
    } catch (error) {
      console.error('Failed to toggle product status:', error);
    }
  };

  const handleProductSaved = () => {
    setIsCreateDialogOpen(false);
    setEditingProduct(null);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 検索・作成ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-4 flex-1">
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-gray-600" />
            <Input
              placeholder="商品名・カテゴリで検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="all">全カテゴリ</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="whitespace-nowrap">
              <Plus className="w-4 h-4 mr-2" />
              新しい商品を追加
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>新しい商品を作成</DialogTitle>
            </DialogHeader>
            <ProductEditor onSave={handleProductSaved} />
          </DialogContent>
        </Dialog>
      </div>

      {/* 統計サマリー */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900">{products.length}</div>
            <div className="text-sm text-gray-600">総商品数</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {products.filter(p => p.active).length}
            </div>
            <div className="text-sm text-gray-600">公開中</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">
              {products.filter(p => p.stock <= 5).length}
            </div>
            <div className="text-sm text-gray-600">在庫警告</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {products.reduce((sum, p) => sum + p.stock, 0)}
            </div>
            <div className="text-sm text-gray-600">総在庫数</div>
          </CardContent>
        </Card>
      </div>

      {/* 商品一覧 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="relative">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg truncate pr-2">
                    {product.title}
                  </CardTitle>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="secondary" className="whitespace-nowrap">
                      {product.category}
                    </Badge>
                    <Badge
                      variant={product.active ? "default" : "destructive"}
                      className="whitespace-nowrap"
                    >
                      {product.active ? '公開中' : '非公開'}
                    </Badge>
                    {product.stock <= 5 && (
                      <Badge variant="destructive" className="whitespace-nowrap">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        在庫僅少
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Switch
                    checked={product.active}
                    onCheckedChange={(checked) => handleToggleActive(product.id, checked)}
                    size="sm"
                  />
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {product.description}
              </p>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">必要ポイント</span>
                  <span className="font-bold text-blue-600">
                    {product.points_required.toLocaleString()}pt
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">在庫</span>
                  <div className="flex items-center space-x-2">
                    <Package className="w-4 h-4 text-gray-400" />
                    <span className={`font-bold ${
                      product.stock <= 0 ? 'text-red-600' : 
                      product.stock <= 5 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {product.stock}
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">作成日</span>
                  <span className="font-bold text-purple-600 text-xs">
                    {new Date(product.created_at).toLocaleDateString('ja-JP')}
                  </span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <Dialog 
                  open={editingProduct?.id === product.id} 
                  onOpenChange={(open) => !open && setEditingProduct(null)}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingProduct(product)}
                      className="w-full"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      編集
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>商品を編集</DialogTitle>
                    </DialogHeader>
                    <ProductEditor product={editingProduct} onSave={handleProductSaved} />
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">
            {searchTerm || selectedCategory !== 'all' 
              ? '検索条件に一致する商品が見つかりません' 
              : '商品がまだ登録されていません'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductList;