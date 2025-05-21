
export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  discountPercentage?: number;
  images: string[];
  description: string;
  category: string;
  features: string[];
  sizes: number[];
  colors: string[];
  rating: number;
  stock: number;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Phantom GT Elite",
    brand: "Nike",
    price: 249.99,
    discountPercentage: 10,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5",
    ],
    description: "The Nike Phantom GT Elite FG features a grippy texture and specialized Flyknit to deliver exceptional ball control designed for precise play.",
    category: "Firm-Ground",
    features: ["All Conditions Control (ACC) technology", "Flyknit construction", "Hyperquick System"],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    colors: ["Black/Volt", "White/Crimson", "Blue/Silver"],
    rating: 4.8,
    stock: 15
  },
  {
    id: "2",
    name: "Predator Freak.1",
    brand: "Adidas",
    price: 279.99,
    images: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5",
    ],
    description: "The Adidas Predator Freak.1 FG delivers outstanding control and powerful strikes with its Demonskin 2.0 rubber spikes.",
    category: "Firm-Ground",
    features: ["Demonskin 2.0 technology", "Primeknit collar", "Split outsole"],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    colors: ["Core Black/White", "Blue/White", "Red/Black"],
    rating: 4.7,
    stock: 12
  },
  {
    id: "3",
    name: "Future Z 1.1",
    brand: "Puma",
    price: 199.99,
    discountPercentage: 15,
    images: [
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
    ],
    description: "The Puma Future Z 1.1 FG/AG features an adaptive FUZIONFIT+ compression band for outstanding lockdown and playmaking ability.",
    category: "Firm-Ground/Artificial-Grass",
    features: ["FUZIONFIT+ compression band", "GripControl Pro coating", "Dynamic Motion System outsole"],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11],
    colors: ["Yellow/Black", "Black/White", "Blue/Neon"],
    rating: 4.5,
    stock: 8
  },
  {
    id: "4",
    name: "Mercurial Vapor 14 Elite",
    brand: "Nike",
    price: 249.99,
    images: [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa",
    ],
    description: "The Nike Mercurial Vapor 14 Elite FG brings speed and aggressive traction with a specialized plate and innovative upper.",
    category: "Firm-Ground",
    features: ["Nike Aerotrak zone", "Nike Flyknit", "Avanced Speed System"],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    colors: ["Bright Crimson/Metallic Silver", "Black/Cyber", "White/Solar Red"],
    rating: 4.9,
    stock: 10
  },
  {
    id: "5",
    name: "Copa Sense.1",
    brand: "Adidas",
    price: 225.99,
    images: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5",
    ],
    description: "The Adidas Copa Sense.1 FG delivers the ultimate touch with innovative sensepods and Fusionskin technology for a seamless fit.",
    category: "Firm-Ground",
    features: ["Sensepod foam elements", "Fusionskin technology", "Touchpods"],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11],
    colors: ["White/Gold", "Core Black/Red", "Blue/White"],
    rating: 4.6,
    stock: 7
  },
  {
    id: "6",
    name: "Ultra 1.2",
    brand: "Puma",
    price: 189.99,
    discountPercentage: 5,
    images: [
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
    ],
    description: "The Puma Ultra 1.2 FG/AG delivers lightning speed with its lightweight MATRYXEVO upper and SpeedUnit outsole.",
    category: "Firm-Ground/Artificial-Grass",
    features: ["MATRYXEVO upper", "SpeedUnit outsole", "GripControl Pro coating"],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11],
    colors: ["Shocking Orange/Black", "White/Red", "Yellow/Blue"],
    rating: 4.3,
    stock: 14
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getProductsByBrand = (brand: string): Product[] => {
  return products.filter(product => product.brand === brand);
};
