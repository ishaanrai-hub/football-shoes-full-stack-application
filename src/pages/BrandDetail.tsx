
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/data/products';

// Brand descriptions
const brandDetails = {
  nike: {
    name: "Nike",
    description: "Nike football boots are renowned for their innovation, combining lightweight materials with cutting-edge technology to maximize player performance. From the speed-oriented Mercurial to the touch-focused Phantom series, Nike offers specialized footwear for every playing style.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
  },
  adidas: {
    name: "Adidas",
    description: "Adidas brings German engineering excellence to football boots with its iconic models like Predator and Copa. With a perfect blend of tradition and innovation, Adidas footwear delivers precision control, superior comfort, and unmatched durability for the modern player.",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5"
  },
  puma: {
    name: "Puma",
    description: "Puma revolutionizes football footwear with bold designs and performance-enhancing features. The Future and Ultra series combine aggressive traction patterns with adaptive fit systems, offering speed, agility, and style for the attacking player.",
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d"
  }
};

const BrandDetail = () => {
  const { brandSlug } = useParams<{ brandSlug: string }>();
  const [brandProducts, setBrandProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const brandName = brandSlug ? 
    Object.keys(brandDetails).find(key => key === brandSlug) || "" : 
    "";
  
  // @ts-ignore - we know the brandName exists in brandDetails
  const brand = brandName ? brandDetails[brandName] : null;
  
  const capitalizedBrandName = brandName.charAt(0).toUpperCase() + brandName.slice(1);
  
  useEffect(() => {
    const fetchBrandProducts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('brand', capitalizedBrandName);
        
        if (error) throw error;
        setBrandProducts(data || []);
      } catch (err) {
        console.error('Error fetching brand products:', err);
        setError('Failed to load products for this brand');
      } finally {
        setLoading(false);
      }
    };

    if (brandName) {
      fetchBrandProducts();
    }
  }, [brandName, capitalizedBrandName]);

  if (!brand) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl">Brand not found</h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-64 md:h-80 bg-gray-200 rounded-lg mb-8"></div>
          <div className="h-8 bg-gray-200 rounded mb-4 w-1/4 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded mb-2 w-3/4 mx-auto"></div>
          <div className="h-8 bg-gray-200 rounded mb-6 w-1/3 mx-auto"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-64 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl text-red-500">{error}</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Brand Header */}
      <div className="relative w-full h-64 md:h-80 mb-8 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">{brand.name}</h1>
        </div>
        <img 
          src={brand.image} 
          alt={brand.name} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Brand Description */}
      <div className="max-w-3xl mx-auto mb-12">
        <p className="text-lg text-center">{brand.description}</p>
      </div>

      {/* Brand Products */}
      <h2 className="text-2xl font-bold mb-6">{brand.name} Football Boots</h2>
      
      {brandProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">No products available from this brand</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {brandProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BrandDetail;
