import React from 'react';
import Link from 'next/link';
import { Heart, ArrowRight } from 'lucide-react';
import { IProduct } from '@/interfaces';

interface IProductCardProps {
  product: IProduct;
}

export const ProductCard: React.FC<IProductCardProps> = ({ product }) => {
  const isOutOfStock = product.stock === 0;

  return (
    <div className="group relative bg-white dark:bg-gray-900 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-800 flex flex-col hover:-translate-y-1">
      {/* Image container */}
      <Link
        href={`/product/${product.slug}`}
        className="relative overflow-hidden block aspect-4/5 bg-gray-50 dark:bg-gray-800"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out ${isOutOfStock ? 'opacity-70 grayscale-50%' : ''}`}
        />

        {/* Floating Tags */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          <span className="px-3 py-1 bg-white/90 dark:bg-black/80 backdrop-blur-md text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider rounded-full shadow-xs w-fit">
            {product.category}
          </span>
          {isOutOfStock && (
            <span className="px-3 py-1 bg-red-500/90 backdrop-blur-md text-xs font-semibold text-white uppercase tracking-wider rounded-full shadow-xs w-fit">
              Out of Stock
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
          <button
            className="p-2.5 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-full text-gray-400 hover:text-red-500 hover:scale-110 transition-all duration-300 shadow-xs"
            onClick={e => {
              e.preventDefault();
              // Add to favorites logic here
            }}
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </Link>

      <div className="p-5 flex-1 flex flex-col gap-3">
        <div className="flex-1">
          <Link href={`/product/${product.slug}`}>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xl font-semibold text-gray-900 dark:text-white tracking-tight">
              ${product.price}
            </span>
            {!isOutOfStock && (
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-medium text-green-600 dark:text-green-400">
                  In Stock
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Sizes */}
        <div className="min-h-[32px]">
          {product.sizes && product.sizes.length > 0 ? (
            <div className="flex flex-wrap gap-1.5 mt-1">
              {product.sizes.map(size => (
                <span
                  key={size}
                  className="inline-flex items-center justify-center min-w-[28px] h-7 px-1.5 text-[10px] font-semibold rounded-md border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800"
                >
                  {size}
                </span>
              ))}
            </div>
          ) : (
            <div className="mt-1 h-7 flex items-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">One size</span>
            </div>
          )}
        </div>

        {/* Separator */}
        <div className="w-full h-1px bg-gray-100 dark:bg-gray-800 my-1" />

        <div className="flex items-center justify-between mt-auto">
          <Link
            href={`/product/${product.slug}`}
            className="w-full relative overflow-hidden group/btn flex items-center justify-center space-x-2 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white dark:bg-white dark:hover:bg-gray-100 dark:text-white px-5 py-2.5 rounded-full font-medium transition-all duration-300 shadow-xs hover:shadow-md"
          >
            <div className="absolute inset-0 bg-linear-to-r from-indigo-600 to-blue-600 opacity-0 group-hover/btn:opacity-10 transition-opacity duration-300" />
            <span>View Product</span>
            <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
};
