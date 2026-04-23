'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const deleteCategory = async (id: string) => {
  try {
    const productCount = await prisma.product.count({ where: { categoryId: id } });

    if (productCount > 0) {
      return {
        success: false,
        message: `Cannot delete: ${productCount} product(s) use this category.`,
      };
    }

    await prisma.category.delete({ where: { id } });

    revalidatePath('/admin/categories');
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message || 'Failed to delete category.' };
  }
};
