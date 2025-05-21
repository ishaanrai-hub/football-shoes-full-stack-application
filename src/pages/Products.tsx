
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/data/products';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
  const [allBrands, setAllBrands] = useState<string[]>([]);
  const [allCategories, setAllCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*');
          
        if (error) throw error;
        
        if (data) {
          setProducts(data);
          // Extract unique brands and categories
          setAllBrands([...new Set(data.map(product => product.brand))]);
          setAllCategories([...new Set(data.map(product => product.category))]);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  const toggleBrandFilter = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const toggleCategoryFilter = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Filter products based on search and filters
  const filteredProducts = products.filter(product => {
    // Filter by search query
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Filter by selected brands
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
      return false;
    }

    // Filter by selected categories
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
      return false;
    }

    // Filter by price range
    const price = product.discount_percentage
      ? product.price * (1 - product.discount_percentage / 100)
      : product.price;
    
    if (price < priceRange[0] || price > priceRange[1]) {
      return false;
    }

    return true;
  });

  // Sort filtered products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low-high':
        return (a.price * (1 - (a.discount_percentage || 0) / 100)) - 
               (b.price * (1 - (b.discount_percentage || 0) / 100));
      case 'price-high-low':
        return (b.price * (1 - (b.discount_percentage || 0) / 100)) - 
               (a.price * (1 - (a.discount_percentage || 0) / 100));
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        // Assuming we would have a date field in a real app
        return 0;
      default: // featured
        return b.rating - a.rating;
    }
  });

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Football Boots</h1>
        <div className="animate-pulse">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="w-full sm:w-2/3 h-10 bg-gray-200 rounded"></div>
            <div className="w-full sm:w-1/3 h-10 bg-gray-200 rounded"></div>
          </div>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/4 h-96 bg-gray-200 rounded"></div>
            <div className="lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Football Boots</h1>

      {/* Search and Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="w-full sm:w-2/3">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="w-full sm:w-1/3">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low-high">Price: Low to High</SelectItem>
              <SelectItem value="price-high-low">Price: High to Low</SelectItem>
              <SelectItem value="rating">Best Rating</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            
            {/* Brand Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Brands</h3>
              <div className="space-y-2">
                {allBrands.map(brand => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`brand-${brand}`} 
                      checked={selectedBrands.includes(brand)} 
                      onCheckedChange={() => toggleBrandFilter(brand)}
                    />
                    <label 
                      htmlFor={`brand-${brand}`}
                      className="text-sm cursor-pointer"
                    >
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator className="my-4" />
            
            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Categories</h3>
              <div className="space-y-2">
                {allCategories.map(category => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => toggleCategoryFilter(category)}
                    />
                    <label 
                      htmlFor={`category-${category}`}
                      className="text-sm cursor-pointer"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator className="my-4" />
            
            {/* Price Range Filter */}
            <div>
              <h3 className="font-medium mb-2">Price Range</h3>
              <div className="flex items-center space-x-2 mb-4">
                <Input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="w-24"
                  min={0}
                  max={priceRange[1]}
                />
                <span>to</span>
                <Input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-24"
                  min={priceRange[0]}
                />
              </div>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setSelectedBrands([]);
                  setSelectedCategories([]);
                  setPriceRange([0, 300]);
                  setSearchQuery('');
                }}
              >
                Reset Filters
              </Button>
            </div>
          </div>
        </div>
        
        {/* Product Grid */}
        <div className="lg:w-3/4">
          {sortedProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500">No products found matching your criteria</p>
              <Button 
                variant="link" 
                className="mt-2"
                onClick={() => {
                  setSelectedBrands([]);
                  setSelectedCategories([]);
                  setPriceRange([0, 300]);
                  setSearchQuery('');
                }}
              >
                Clear all filters
              </Button>
            </div>
          ) : (
            <>
              <p className="mb-4 text-gray-500">{sortedProducts.length} products found</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
