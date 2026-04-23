'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { Gender, Size } from '@/generated/prisma/client';

export interface AdminProductInput {
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  gender: Gender;
  sizes: Size[];
  isFeatured: boolean;
  banner?: string | null;
  images: string[];
}

export const updateProduct = async (id: string, data: AdminProductInput) => {
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
    return { success: true, product };
  } catch (error: any) {
    return { success: false, message: error.message || 'Failed to update product.' };
  }
};
