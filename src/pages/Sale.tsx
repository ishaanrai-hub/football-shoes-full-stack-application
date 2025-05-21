
import React from 'react';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';

const Sale = () => {
  // Get only products with discounts
  const discountedProducts = products.filter(product => product.discountPercentage);

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
