'use server';

import { prisma } from '@/lib/prisma';

export const getAdminProducts = async ({
  q = '',
  page = '1',
  limit = '10',
}: {
  q?: string;
  page?: string;
  limit?: string;
}) => {
  const pageNumber = Number(page) || 1;
  const limitNumber = Number(limit) || 10;
  const skip = (pageNumber - 1) * limitNumber;

  const where = q
    ? {
        OR: [
          { name: { contains: q, mode: 'insensitive' as const } },
          { category: { name: { contains: q, mode: 'insensitive' as const } } },
        ],
      }
    : {};

  const [products, count] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { category: true, images: true },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limitNumber,
    }),
    prisma.product.count({ where }),
  ]);

  return {
    products: products.map(p => ({
      ...p,
      price: p.price.toString(),
      rating: p.rating.toString(),
      category: p.category.name,
      categoryId: p.categoryId,
      images: p.images.map(img => img.url),
    })),
    count,
    totalPages: Math.ceil(count / limitNumber),
    currentPage: pageNumber,
  };
};
