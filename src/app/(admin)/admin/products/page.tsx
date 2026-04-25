import { Metadata } from 'next';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { getAdminProducts } from '@/actions/products/get-admin-products';
import { getAdminCategories } from '@/actions/categories/get-admin-categories';
import { AdminProductsClient } from './AdminProductsClient';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = { title: 'Products — Admin' };

interface SearchParams {
  q?: string;
  page?: string;
  category?: string;
  gender?: string;
  inStock?: string;
}

interface PageProps {
  searchParams: Promise<SearchParams>;
}

export default async function AdminProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const { products, count, totalPages, currentPage } = await getAdminProducts(params);
  const categories = await getAdminCategories();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Products</h1>
          <p className="text-muted-foreground mt-1 text-sm">{count} products total</p>
        </div>
        <Link href="/admin/products/new">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
            <Plus className="w-4 h-4" />New Product
          </Button>
        </Link>
      </div>

      <AdminProductsClient
        initialProducts={products}
        initialCategories={categories}
        initialCount={count}
        initialTotalPages={totalPages}
        initialCurrentPage={currentPage}
        initialSearchParams={params}
      />
    </div>
  );
}