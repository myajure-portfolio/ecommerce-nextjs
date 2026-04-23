import { Metadata } from 'next';
import { getFilteredProducts } from '@/actions/products/get-filtered-products';
import { getCategories } from '@/actions/categories/get-categories';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductFilters } from '@/components/shared/products/ProductFilters';
import { MobileFilters } from '@/components/shared/products/MobileFilters';
import { ProductSort } from '@/components/shared/products/ProductSort';
import { IProduct } from '@/interfaces';

export const metadata: Metadata = {
  title: 'Products | Modern Ecommerce',
  description: 'Browse our complete collection of products.',
};

interface SearchParams {
  q?: string;
  category?: string;
  gender?: string;
  size?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
  page?: string;
}

interface ProductsPageProps {
  searchParams: Promise<SearchParams>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  // Await the searchParams as required in recent Next.js versions
  const params = await searchParams;

  const [productsData, categories] = await Promise.all([
    getFilteredProducts({
      ...params,
      limit: '12',
    }),
    getCategories(),
  ]);

  const { products, totalPages, count, currentPage } = productsData;

  // Render pagination manually or use a component if you have one.
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 border-b border-gray-200 dark:border-gray-800 pb-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
              Shop All Products
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
              Explore our curated collection of premium items. Showing{' '}
              <span className="font-medium text-gray-900 dark:text-gray-300">
                {products.length}
              </span>{' '}
              of <span className="font-medium text-gray-900 dark:text-gray-300">{count}</span>{' '}
              results.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <MobileFilters categories={categories} />
            <ProductSort />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Filters (Desktop) */}
          <div className="hidden lg:block w-64 shrink-0 relative z-100">
            <div className="sticky top-24 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
              <ProductFilters categories={categories} />
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {products.length === 0 ? (
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-12 text-center border border-gray-100 dark:border-gray-800">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                  No products found
                </h3>
                <p className="text-gray-500">Try adjusting your filters or search query.</p>
              </div>
            ) : (
              <>
                <div
                  key={new URLSearchParams(params as any).toString()}
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out"
                >
                  {products.map(product => (
                    <ProductCard key={product.id} product={product as any} />
                  ))}
                </div>

                {/* Basic Pagination - can be replaced with a robust component */}
                {totalPages > 1 && (
                  <div className="mt-12 flex justify-center gap-2">
                    {pages.map(page => (
                      <a
                        key={page}
                        href={`?${new URLSearchParams({ ...params, page: page.toString() }).toString()}`}
                        className={`px-4 py-2 rounded-md transition-colors ${
                          currentPage === page
                            ? 'bg-blue-600 text-white font-medium'
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        {page}
                      </a>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
