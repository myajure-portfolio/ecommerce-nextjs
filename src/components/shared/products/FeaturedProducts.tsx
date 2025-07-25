"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { Button } from '@/components';

const products = [
  {
    id: 1,
    name: "Elegant Summer Dress",
    price: 89.99,
    image:
      "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Dresses",
    size: "M",
    color: "Blue",
  },
  {
    id: 2,
    name: "Classic Denim Jacket",
    price: 129.99,
    image:
      "https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Jackets",
    size: "L",
    color: "Blue",
  },
  {
    id: 3,
    name: "Casual Striped Tee",
    price: 34.99,
    image:
      "https://images.pexels.com/photos/2065200/pexels-photo-2065200.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "T-Shirts",
    size: "S",
    color: "White",
  },
  {
    id: 4,
    name: "Premium Wool Sweater",
    price: 159.99,
    image:
      "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Sweaters",
    size: "M",
    color: "Gray",
  },
];

export const FeaturedProducts = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <>
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-200 max-w-2xl mx-auto">
              Discover our handpicked selection of trending fashion pieces
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" className="w-80 h-13 group inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105">
              <span>View All Products</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};
