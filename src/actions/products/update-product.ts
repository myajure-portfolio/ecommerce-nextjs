'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth-utils';
import { type AdminProductInput } from '@/lib/validators/product';

export const updateProduct = async (id: string, data: AdminProductInput) => {
  const authCheck = await requireAdmin();
  if (!authCheck.authorized) {
    return { success: false, message: authCheck.error };
  }

  try {
    const { images, ...productData } = data;

    await prisma.productImage.deleteMany({ where: { productId: id } });

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...productData,
        images: {
          create: images.map(url => ({ url })),
        },
      },
    });

    revalidatePath('/admin/products');
    revalidatePath('/products');
    return {
      success: true,
      product: {
        ...product,
        price: product.price.toString(),
        rating: product.rating.toString(),
      }
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to update product';
    return { success: false, message };
  }
};