'use server';

import { prisma } from '@/lib/prisma';

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: { category: true, images: true },
    });

    if (!product) return null;

    return {
      ...product,
      images: product.images.map(img => img.url),
      price: Number(product.price),
      rating: Number(product.rating),
      category: product.category.name,
    };
  } catch (error) {
    return null;
  }
};
