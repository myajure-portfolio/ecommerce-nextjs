'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth-utils';

export const deleteProduct = async (id: string) => {
  const authCheck = await requireAdmin();
  if (!authCheck.authorized) {
    return { success: false, message: authCheck.error };
  }

  try {
    await prisma.product.delete({ where: { id } });

    revalidatePath('/admin/products');
    revalidatePath('/products');
    return { success: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to delete product';
    return { success: false, message };
  }
};
