'use server';

import { prisma } from '@/lib/prisma';

export const getProductBySlug = async (slug: string) => {
  const product = await prisma.product.findUnique({
    where: {
      slug,
    },
    include: {
      images: true,
      category: true,
    },
  });

  if (!product) return null;

  return {
    ...product,
    images: product.images.map(image => image.url),
    price: product.price.toString(),
    rating: product.rating.toString(),
    category: product.category.name,
  };
};
