import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IProduct } from '@/interfaces';

interface IProductCardProps {
  product: IProduct;
}

export const ProductCard: React.FC<IProductCardProps> = ({ product }) => {
  return (
    <div className="group bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col">
      <Link href={`/product/${product.slug}`} className="relative overflow-hidden block">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button 
            className="p-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-full text-blue-600 dark:text-blue-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
            onClick={(e) => {
              e.preventDefault();
              // Add to favorites logic here
            }}
          >
            <Heart className="h-5 w-5" />
          </button>
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-blue-50/30 dark:group-hover:bg-blue-900/10 transition-colors duration-300" />
      </Link>

      <div className="p-4 flex-1 flex flex-col">
        <div className="mb-2">
          <p className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">
            {product.category}
          </p>
          <Link href={`/product/${product.slug}`}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200 line-clamp-1">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              ${product.price}
            </span>
          </div>

          <Button
            size="sm"
            className="flex items-center space-x-2 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 group/btn shadow"
          >
            <ShoppingCart className="h-4 w-4 group-hover/btn:scale-110 transition-transform duration-200" />
            <span>Add</span>
          </Button>
        </div>

        {product.sizes && product.sizes.length > 0 && (
          <div className="mt-auto pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4 text-sm text-gray-700 dark:text-gray-200">
              <span>Size: {product.sizes.join(', ')}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
