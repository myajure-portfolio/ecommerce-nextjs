import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getAdminCategories } from '@/actions/categories/get-admin-categories';
import { ProductForm } from '@/components/admin/ProductForm';

export const metadata: Metadata = { title: 'New Product — Admin' };

export default async function NewProductPage() {
  const categories = await getAdminCategories();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/products" className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground"><ArrowLeft className="w-5 h-5" /></Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">New Product</h1>
          <p className="text-muted-foreground mt-1 text-sm">Add a new product to your catalog.</p>
        </div>
      </div>
      <ProductForm categories={categories} />
    </div>
  );
}
