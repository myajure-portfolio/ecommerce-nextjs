import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ShoppingCart, Heart, Star, Truck, Shield, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { getProductBySlug } from '@/actions/products/get-product-by-slug';
import { ProductGallery } from '@/components/product/ProductGallery';
import { AddToCart } from '@/components/product/AddToCart';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: 'Product Not Found' };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb / Back */}
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Gallery */}
          <ProductGallery images={product.images} productName={product.name} />

          {/* Right: Details */}
          <div className="flex flex-col">
            {/* Category & Title */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <Badge
                  variant="secondary"
                  className="bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 hover:bg-indigo-100 uppercase tracking-wide text-xs"
                >
                  {product.category}
                </Badge>
                <div className="flex items-center text-yellow-500 text-sm font-medium">
                  <Star className="w-4 h-4 fill-current mr-1" />
                  <span>{product.rating}</span>
                  <span className="text-gray-400 dark:text-gray-500 ml-1">
                    ({product.numReviews} reviews)
                  </span>
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
                {product.name}
              </h1>
              {/* Price & Stock Card - Premium Alternative */}
              <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] p-6">
                {/* Decorative subtle gradient background */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-linear-to-br from-blue-400/20 to-indigo-400/20 dark:from-blue-600/10 dark:to-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    {product.stock > 0 ? (
                      <div className="inline-flex items-center px-3 py-1 rounded-full border border-green-200 dark:border-green-800/50 bg-green-50 dark:bg-green-900/20 shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                        <span className="text-xs font-bold text-green-700 dark:text-green-400 uppercase tracking-widest">
                          In Stock <span className="opacity-70 font-medium">({product.stock})</span>
                        </span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center px-3 py-1 rounded-full border border-red-200 dark:border-red-800/50 bg-red-50 dark:bg-red-900/20 shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2"></span>
                        <span className="text-xs font-bold text-red-700 dark:text-red-400 uppercase tracking-widest">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-extrabold tracking-tighter text-gray-900 dark:text-white">
                      ${product.price}
                    </span>
                    <span className="text-sm font-semibold text-gray-400 dark:text-gray-500">
                      USD
                    </span>
                  </div>

                  <p className="mt-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                    Local taxes included (where applicable).
                  </p>
                </div>
              </div>
            </div>

            <Separator className="my-6 dark:bg-gray-800" />

            {/* Description */}
            <div className="mb-8 prose prose-sm sm:prose-base dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>{product.description}</p>
            </div>

            {/* Actions & Selection */}
            <AddToCart productId={product.id} stock={product.stock} sizes={product.sizes as any} />

            {/* Trust Badges */}
            <div className="mt-8 grid grid-cols-2 gap-4 py-6 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
                  <Truck className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Free Shipping
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    On orders over $100
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-indigo-600 dark:text-indigo-400">
                  <Shield className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Secure Payment
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">100% protected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
