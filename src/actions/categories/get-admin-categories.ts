'use server';

import { prisma } from '@/lib/prisma';

export const getAdminCategories = async () => {
  const categories = await prisma.category.findMany({
    include: {
      _count: { select: { products: true } },
    },
    orderBy: { name: 'asc' },
  });

  return categories.map(c => ({
    id: c.id,
    name: c.name,
    productCount: c._count.products,
  }));
};
