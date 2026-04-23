import { Metadata } from 'next';
import Link from 'next/link';
import { Plus, Search, Pencil } from 'lucide-react';
import { getAdminProducts } from '@/actions/products/get-admin-products';
import { deleteProduct } from '@/actions/products/delete-product';
import { DeleteProductButton } from '@/components/admin/DeleteProductButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export const metadata: Metadata = { title: 'Products — Admin' };

export default async function AdminProductsPage({ searchParams }: { searchParams: Promise<{ q?: string; page?: string }> }) {
  const params = await searchParams;
  const { products, count, totalPages, currentPage } = await getAdminProducts(params);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Products</h1>
          <p className="text-muted-foreground mt-1 text-sm">{count} products total</p>
        </div>
        <Link href="/admin/products/new">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2"><Plus className="w-4 h-4" />New Product</Button>
        </Link>
      </div>

      <form method="GET" className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input name="q" defaultValue={params.q} placeholder="Search products..." className="pl-9 bg-card border-border text-foreground focus-visible:ring-indigo-500" />
      </form>

      <div className="rounded-2xl bg-card border border-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-accent/20">
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-widest">Product</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-widest hidden sm:table-cell">Category</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-widest">Price</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-widest hidden md:table-cell">Stock</th>
                <th className="px-4 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map(product => (
                <tr key={product.id} className="hover:bg-accent/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent overflow-hidden shrink-0">
                        {product.images[0] && <img src={product.images[0]} alt="" className="w-full h-full object-cover" />}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-foreground truncate max-w-[200px]">{product.name}</p>
                        <p className="text-xs text-muted-foreground font-mono">{product.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden sm:table-cell"><span className="text-xs font-medium text-muted-foreground bg-accent px-2 py-1 rounded-md">{product.category}</span></td>
                  <td className="px-4 py-4 font-semibold text-foreground">${product.price}</td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className={cn("text-sm font-medium", product.stock === 0 ? 'text-red-400' : product.stock <= 5 ? 'text-amber-400' : 'text-emerald-400')}>{product.stock}</span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/admin/products/${product.id}/edit`}><Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-indigo-500 dark:hover:text-indigo-400"><Pencil className="w-4 h-4" /></Button></Link>
                      <DeleteProductButton productId={product.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
