
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Trash2 } from 'lucide-react';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalItems, getTotalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="flex justify-center mb-4">
            <ShoppingCart className="h-16 w-16 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-500 mb-8">Looks like you haven't added any products to your cart yet.</p>
          <Button asChild>
            <Link to="/products">Browse Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          {cart.map((item) => {
            const discountedPrice = item.product.discountPercentage
              ? item.product.price * (1 - item.product.discountPercentage / 100)
              : item.product.price;
            
            return (
              <Card key={`${item.product.id}-${item.size}-${item.color}`} className="mb-4">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-1/4 mb-4 sm:mb-0">
                      <Link to={`/product/${item.product.id}`}>
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-32 object-cover rounded-md"
                        />
                      </Link>
                    </div>
                    <div className="sm:w-3/4 sm:pl-6 flex flex-col">
                      <div className="flex justify-between mb-2">
                        <Link to={`/product/${item.product.id}`}>
                          <h3 className="text-lg font-medium hover:text-brand-blue">
                            {item.product.name}
                          </h3>
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-gray-500 hover:text-red-500"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                      
                      <p className="text-sm text-gray-500 mb-2">{item.product.brand}</p>
                      
                      <div className="text-sm mb-4">
                        <span className="text-gray-600">Size: </span>
                        <span className="font-medium">{item.size}</span>
                        <span className="mx-2">•</span>
                        <span className="text-gray-600">Color: </span>
                        <span className="font-medium">{item.color}</span>
                      </div>
                      
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button
                            className="px-3 py-1 text-lg"
                            onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                          >
                            -
                          </button>
                          <span className="px-3 py-1 border-l border-r border-gray-300">
                            {item.quantity}
                          </span>
                          <button
                            className="px-3 py-1 text-lg"
                            onClick={() => updateQuantity(item.product.id, Math.min(item.product.stock, item.quantity + 1))}
                          >
                            +
                          </button>
                        </div>
                        
                        <div>
                          {item.product.discountPercentage ? (
                            <div className="text-right">
                              <span className="font-bold text-brand-red">
                                ${(discountedPrice * item.quantity).toFixed(2)}
                              </span>
                              <div className="text-sm text-gray-500 line-through">
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </div>
                            </div>
                          ) : (
                            <span className="font-bold">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          
          <div className="flex justify-between items-center mt-6">
            <Button 
              variant="outline"
              onClick={clearCart}
            >
              Clear Cart
            </Button>
            <Button asChild>
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal ({getTotalItems()} items)</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Taxes (estimated)</span>
                  <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${(getTotalPrice() * 1.08).toFixed(2)}</span>
                </div>
              </div>
              
              <Button 
                className="w-full mt-6 bg-brand-blue hover:bg-brand-darkBlue"
                size="lg"
              >
                Proceed to Checkout
              </Button>
              
              <div className="mt-4 text-sm text-gray-500 text-center">
                Secure checkout powered by Stripe
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;
