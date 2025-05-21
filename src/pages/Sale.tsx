
import React, { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/data/products';

const Sale = () => {
  const [discountedProducts, setDiscountedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiscountedProducts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .not('discount_percentage', 'is', null);
        
        if (error) throw error;
        setDiscountedProducts(data || []);
      } catch (err) {
        console.error('Error fetching discounted products:', err);
        setError('Failed to load sale products');
      } finally {
        setLoading(false);
      }
    };

    fetchDiscountedProducts();
  }, []);
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-200 rounded-lg p-8 mb-8 animate-pulse h-40"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="h-64 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-brand-red text-white rounded-lg p-8 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Special Deals</h1>
        <p className="text-lg md:text-xl opacity-90">
          Limited time offers on premium football boots
        </p>
      </div>

      {discountedProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">No products on sale at the moment</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {discountedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Sale;
