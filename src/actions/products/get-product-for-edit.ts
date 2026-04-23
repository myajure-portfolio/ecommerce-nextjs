'use server';

import { prisma } from '@/lib/prisma';

export const getProductForEdit = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true, images: true },
  });

  if (!product) return null;

  return {
    ...product,
    price: product.price.toNumber(),
    rating: product.rating.toNumber(),
    categoryId: product.categoryId,
    category: product.category.name,
    images: product.images.map(img => img.url),
  };
};
