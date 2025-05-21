
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

type Product = Tables<'products'>;

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) throw error;
        
        if (data) {
          setProduct(data);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-screen-xl">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 aspect-square bg-gray-200 animate-pulse rounded-lg"></div>
          <div className="md:w-1/2 space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse"></div>
            <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl">{error || 'Product not found'}</h1>
        <Link to="/products" className="text-brand-blue hover:underline mt-4 inline-block">
          Back to products
        </Link>
      </div>
    );
  }

  // Calculate the discounted price if applicable
  const discountedPrice = product.discount_percentage
    ? Number(product.price) * (1 - Number(product.discount_percentage) / 100)
    : null;

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return;
    
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-screen-xl">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Images */}
        <div className="md:w-1/2 space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img
              src={product.images[currentImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-20 h-20 rounded-md overflow-hidden flex-shrink-0 ${
                  currentImage === index ? "ring-2 ring-brand-blue" : ""
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="md:w-1/2">
          <div className="mb-2">
            <Link to={`/brands/${product.brand.toLowerCase()}`} className="text-brand-blue hover:underline">
              {product.brand}
            </Link>
          </div>
          
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(Number(product.rating)) ? "text-yellow-500" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-gray-500 ml-2">{product.rating} ({Number(product.rating) * 20} reviews)</span>
          </div>

          <div className="mb-6">
            {discountedPrice ? (
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-brand-red">
                  ${discountedPrice.toFixed(2)}
                </span>
                <span className="text-xl text-gray-500 line-through">
                  ${Number(product.price).toFixed(2)}
                </span>
                <Badge className="bg-brand-red text-white">
                  {product.discount_percentage}% OFF
                </Badge>
              </div>
            ) : (
              <span className="text-3xl font-bold">${Number(product.price).toFixed(2)}</span>
            )}
          </div>

          <p className="text-gray-700 mb-6">{product.description}</p>

          <Separator className="my-6" />

          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Size</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(Number(size))}
                  className={`px-3 py-2 border rounded-md ${
                    selectedSize === Number(size)
                      ? "bg-brand-blue text-white border-brand-blue"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {!selectedSize && <p className="text-sm text-red-500 mt-1">Please select a size</p>}
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Color</h3>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-3 py-2 border rounded-md ${
                    selectedColor === color
                      ? "bg-brand-blue text-white border-brand-blue"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
            {!selectedColor && <p className="text-sm text-red-500 mt-1">Please select a color</p>}
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Quantity</h3>
            <div className="flex items-center border border-gray-300 rounded-md w-fit">
              <button
                className="px-3 py-1 text-xl"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className="px-4 py-1 border-l border-r border-gray-300">
                {quantity}
              </span>
              <button
                className="px-3 py-1 text-xl"
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <Button 
            className="w-full mb-4 bg-brand-blue hover:bg-brand-darkBlue"
            size="lg"
            onClick={handleAddToCart}
            disabled={!selectedSize || !selectedColor}
          >
            Add to Cart
          </Button>

          {/* Stock Info */}
          <div className="text-sm text-gray-500">
            {product.stock > 10 ? (
              <span className="text-green-600">In stock</span>
            ) : product.stock > 0 ? (
              <span className="text-amber-600">Low stock - only {product.stock} left</span>
            ) : (
              <span className="text-red-600">Out of stock</span>
            )}
          </div>

          {/* Features */}
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Key Features</h3>
            <ul className="list-disc pl-5 space-y-1">
              {product.features.map((feature, index) => (
                <li key={index} className="text-gray-700">{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
