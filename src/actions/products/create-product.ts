'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth-utils';
import { type AdminProductInput } from '@/lib/validators/product';

export const createProduct = async (data: AdminProductInput) => {
  const authCheck = await requireAdmin();
  if (!authCheck.authorized) {
    return { success: false, message: authCheck.error };
  }

  try {
    const { images, ...productData } = data;

    const product = await prisma.product.create({
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
    const err = error as { code?: string; message?: string };
    if (err.code === 'P2002') {
      return { success: false, message: 'A product with this slug already exists.' };
    }
    return { success: false, message: err.message || 'Failed to create product.' };
  }
};