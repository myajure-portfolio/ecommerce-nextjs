import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getProductForEdit } from '@/actions/products/get-product-for-edit';
import { getAdminCategories } from '@/actions/categories/get-admin-categories';
import { ProductForm } from '@/components/admin/ProductForm';

export const metadata: Metadata = { title: 'Edit Product — Admin' };

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    getProductForEdit(id),
    getAdminCategories(),
  ]);

  if (!product) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/products" className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground"><ArrowLeft className="w-5 h-5" /></Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Edit Product</h1>
          <p className="text-muted-foreground mt-1 text-sm truncate max-w-md">{product.name}</p>
        </div>
      </div>
      <ProductForm
        categories={categories}
        initialData={product as any}
        isEdit
      />
    </div>
  );
}
