
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { getTotalItems } = useCart();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-xl font-bold text-brand-blue">FootballGear</h1>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-brand-blue font-medium transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-brand-blue font-medium transition-colors">
              All Products
            </Link>
            <Link to="/brands" className="text-gray-700 hover:text-brand-blue font-medium transition-colors">
              Brands
            </Link>
            <Link to="/sale" className="text-brand-red hover:text-red-700 font-medium transition-colors">
              Sale
            </Link>
          </div>
          
          {/* Shopping Cart Button */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <Badge 
                    className="absolute -top-2 -right-2 bg-brand-red text-white"
                    variant="destructive"
                  >
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </Link>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={toggleMenu}>
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fadeIn">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-brand-blue font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="text-gray-700 hover:text-brand-blue font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                All Products
              </Link>
              <Link 
                to="/brands" 
                className="text-gray-700 hover:text-brand-blue font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Brands
              </Link>
              <Link 
                to="/sale" 
                className="text-brand-red hover:text-red-700 font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Sale
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
