
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const brands = [
  {
    name: "Nike",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    slug: "nike"
  },
  {
    name: "Adidas",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5",
    slug: "adidas"
  },
  {
    name: "Puma",
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
    slug: "puma"
  }
];

const BrandsSection = () => {
  return (
    <section className="py-12 bg-brand-lightGray">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Shop By Brand</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {brands.map(brand => (
            <Link to={`/brands/${brand.slug}`} key={brand.name}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-[16/9] relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <h3 className="text-white text-2xl md:text-3xl font-bold">{brand.name}</h3>
                  </div>
                  <img
                    src={brand.image}
                    alt={`${brand.name} football boots`}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
