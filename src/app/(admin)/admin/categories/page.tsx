import { Metadata } from 'next';
import { getAdminCategories } from '@/actions/categories/get-admin-categories';
import { deleteCategory } from '@/actions/categories/delete-category';
import { DeleteCategoryButton } from '@/components/admin/DeleteCategoryButton';
import { CreateCategoryForm } from '@/components/admin/CreateCategoryForm';
import { Tags, Package } from 'lucide-react';

export const metadata: Metadata = { title: 'Categories — Admin' };

export default async function AdminCategoriesPage() {
  const categories = await getAdminCategories();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Categories</h1>
        <p className="text-gray-400 mt-1 text-sm">{categories.length} categories in your store</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="rounded-2xl bg-gray-900 border border-gray-800 p-6 sticky top-24">
            <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-widest mb-5">New Category</h2>
            <CreateCategoryForm />
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="rounded-2xl bg-gray-900 border border-gray-800 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-800">
              <h2 className="text-sm font-semibold text-gray-300">All Categories</h2>
            </div>
            <div className="divide-y divide-gray-800">
              {categories.length === 0 && (
                <div className="px-6 py-12 text-center text-gray-500">No categories found.</div>
              )}
              {categories.map(cat => (
                <div key={cat.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-800/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-800 rounded-lg">
                      <Tags className="w-4 h-4 text-gray-500" />
                    </div>
                    <p className="text-sm font-medium text-gray-200">{cat.name}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Package className="w-3.5 h-3.5" />
                      <span>{cat.productCount} products</span>
                    </div>
                    <DeleteCategoryButton
                      categoryId={cat.id}
                      description={
                        cat.productCount > 0
                          ? `Cannot delete "${cat.name}" — it has ${cat.productCount} products.`
                          : `This will permanently delete the category "${cat.name}".`
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
