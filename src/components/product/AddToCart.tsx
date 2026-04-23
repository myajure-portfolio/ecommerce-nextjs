'use client';

import { useState, useTransition } from 'react';
import { ShoppingCart, Heart, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Size } from '@/generated/prisma/client';
import { addToCart } from '@/actions/cart/add-to-cart';
import { toast } from 'react-toastify';

interface AddToCartProps {
  productId: string;
  stock: number;
  sizes?: Size[];
}

export function AddToCart({ productId, stock, sizes }: AddToCartProps) {
  const [selectedSize, setSelectedSize] = useState<Size | null>(sizes?.[0] || null);
  const [isPending, startTransition] = useTransition();

  const handleAddToCart = () => {
    if (sizes && sizes.length > 0 && !selectedSize) {
      toast.error('Please select a size');
      return;
    }

    startTransition(async () => {
      const result = await addToCart(productId, selectedSize || undefined);
      if (!result.success) {
        toast.error(result.message);
      } else {
        toast.success(result.message || 'Item added to cart');
      }
    });
  };

  return (
    <>
      {/* Selection (Sizes if applicable) */}
      {sizes && sizes.length > 0 && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Select Size</h3>
            <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
              Size Guide
            </button>
          </div>
          <div className="flex flex-wrap gap-3">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-12 h-12 flex items-center justify-center rounded-lg border font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950 ${
                  selectedSize === size
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:border-indigo-400 dark:bg-indigo-900/40 dark:text-indigo-300'
                    : 'border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:border-indigo-600 hover:bg-indigo-50 dark:hover:border-indigo-400 dark:hover:bg-indigo-900/20'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-row gap-3 sm:gap-4 mt-auto pt-6 sm:pt-8">
        <Button
          size="lg"
          onClick={handleAddToCart}
          disabled={stock === 0 || isPending}
          className="flex-1 h-14 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-base sm:text-lg font-semibold rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          ) : (
            <ShoppingCart className="w-5 h-5 mr-2" />
          )}
          {stock > 0 ? (isPending ? 'Adding...' : 'Add to Cart') : 'Out of Stock'}
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="h-14 w-14 shrink-0 rounded-xl border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-red-500 dark:hover:text-red-400 transition-colors"
          aria-label="Add to wishlist"
        >
          <Heart className="w-6 h-6" />
        </Button>
      </div>
    </>
  );
}
