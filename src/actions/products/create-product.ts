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

export const createProduct = async (data: AdminProductInput) => {
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
  } catch (error: any) {
    if (error.code === 'P2002') {
      return { success: false, message: 'A product with this slug already exists.' };
    }
    return { success: false, message: error.message || 'Failed to create product.' };
  }
};
