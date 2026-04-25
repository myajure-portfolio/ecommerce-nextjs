'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, Pencil, ChevronLeft, ChevronRight, Loader2, Filter, X } from 'lucide-react';
import { getAdminProducts } from '@/actions/products/get-admin-products';
import { DeleteProductButton } from '@/components/admin/DeleteProductButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  price: string;
  stock: number;
  category: string;
  categoryId: string;
  images: string[];
}

interface AdminProductsClientProps {
  initialProducts: Product[];
  initialCategories: Category[];
  initialCount: number;
  initialTotalPages: number;
  initialCurrentPage: number;
  initialSearchParams: {
    q?: string;
    page?: string;
    category?: string;
    gender?: string;
    inStock?: string;
  };
}

export function AdminProductsClient({
  initialProducts,
  initialCategories,
  initialCount,
  initialTotalPages,
  initialCurrentPage,
  initialSearchParams,
}: AdminProductsClientProps) {
  const router = useRouter();

  const [products, setProducts] = useState(initialProducts);
  const [count, setCount] = useState(initialCount);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [currentPage, setCurrentPage] = useState(initialCurrentPage);

  const [isPending, startTransition] = useTransition();

  const [filters, setFilters] = useState({
    q: initialSearchParams.q || '',
    category: initialSearchParams.category || '',
    gender: initialSearchParams.gender || '',
    inStock: initialSearchParams.inStock || '',
  });

  const [showFilters, setShowFilters] = useState(false);

  const buildUrl = (newFilters: Partial<typeof filters>, page?: number) => {
    const params = new URLSearchParams();
    const allFilters = { ...filters, ...newFilters };

    if (allFilters.q) params.set('q', allFilters.q);
    if (allFilters.category) params.set('category', allFilters.category);
    if (allFilters.gender) params.set('gender', allFilters.gender);
    if (allFilters.inStock) params.set('inStock', allFilters.inStock);
    if (page && page > 1) params.set('page', page.toString());

    return `?${params.toString()}`;
  };

  const fetchProducts = async (newFilters: Partial<typeof filters>, page = 1) => {
    startTransition(async () => {
      const params = { ...filters, ...newFilters, page: page.toString() };
      const result = await getAdminProducts(params);

      setProducts(result.products);
      setCount(result.count);
      setTotalPages(result.totalPages);
      setCurrentPage(result.currentPage);

      if (page > 1) {
        router.push(`/admin/products?${new URLSearchParams({ ...params }).toString()}`, { scroll: false });
      } else {
        router.replace(`/admin/products?${new URLSearchParams({ ...params }).toString()}`, { scroll: false });
      }
    });
  };

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    fetchProducts(newFilters, 1);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      fetchProducts(filters, page);
    }
  };

  const clearFilters = () => {
    const emptyFilters = { q: '', category: '', gender: '', inStock: '' };
    setFilters(emptyFilters);
    fetchProducts(emptyFilters, 1);
  };

  const activeFiltersCount = [
    filters.category,
    filters.gender,
    filters.inStock,
  ].filter(Boolean).length;

  const hasActiveFilters =
    filters.q ||
    filters.category ||
    filters.gender ||
    filters.inStock;

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchProducts(filters, 1);
        }}
        className="flex gap-3"
      >
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            name="q"
            value={filters.q}
            onChange={(e) => setFilters({ ...filters, q: e.target.value })}
            placeholder="Search products..."
            className="pl-9 bg-card border-border text-foreground"
          />
        </div>
        <Button
          type="button"
          variant="outline"
          className="gap-2 border-border"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="w-4 h-4" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </form>

      {/* Filters Panel */}
      {showFilters && (
        <div className="rounded-xl border border-border bg-card p-4 space-y-4 animate-in slide-in-from-top-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Filters</h3>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select
              value={filters.category}
              onValueChange={(v) => handleFilterChange('category', v)}
            >
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {initialCategories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.gender}
              onValueChange={(v) => handleFilterChange('gender', v)}
            >
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="All Genders" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genders</SelectItem>
                <SelectItem value="men">Men</SelectItem>
                <SelectItem value="women">Women</SelectItem>
                <SelectItem value="kid">Kid</SelectItem>
                <SelectItem value="unisex">Unisex</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.inStock}
              onValueChange={(v) => handleFilterChange('inStock', v)}
            >
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Stock Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Products</SelectItem>
                <SelectItem value="in">In Stock</SelectItem>
                <SelectItem value="low">Low Stock</SelectItem>
                <SelectItem value="out">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Results Info */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Showing {products.length} of {count} products
          {hasActiveFilters && ' (filtered)'}
        </span>
      </div>

      {/* Products Table */}
      <div className="rounded-2xl bg-card border border-border overflow-hidden shadow-sm relative">
        {isPending && (
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm z-10 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
              <span className="text-sm text-muted-foreground">Loading products...</span>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-accent/20">
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                  Product
                </th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-widest hidden sm:table-cell">
                  Category
                </th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                  Price
                </th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-widest hidden md:table-cell">
                  Stock
                </th>
                <th className="px-4 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-widest text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                        <Search className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground">No products found</p>
                      {hasActiveFilters && (
                        <Button variant="outline" size="sm" onClick={clearFilters}>
                          Clear filters
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-accent/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-accent overflow-hidden shrink-0">
                          {product.images[0] && (
                            <img
                              src={product.images[0]}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-foreground truncate max-w-[200px]">
                            {product.name}
                          </p>
                          <p className="text-xs text-muted-foreground font-mono">
                            {product.slug}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden sm:table-cell">
                      <span className="text-xs font-medium text-muted-foreground bg-accent px-2 py-1 rounded-md">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-semibold text-foreground">
                      ${product.price}
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span
                        className={cn(
                          'text-sm font-medium',
                          product.stock === 0
                            ? 'text-red-400'
                            : product.stock <= 5
                            ? 'text-amber-400'
                            : 'text-emerald-400'
                        )}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/admin/products/${product.id}/edit`}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-indigo-500 dark:hover:text-indigo-400"
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </Link>
                        <DeleteProductButton productId={product.id} onDeleted={() => {
                          setProducts(products.filter(p => p.id !== product.id));
                          setCount(count - 1);
                        }} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || isPending}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? 'default' : 'ghost'}
                    size="sm"
                    className="w-9"
                    onClick={() => handlePageChange(pageNum)}
                    disabled={isPending}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || isPending}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}