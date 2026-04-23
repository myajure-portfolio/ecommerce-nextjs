'use server';

import { prisma } from '@/lib/prisma';

export const getCategories = async () => {
  return await prisma.category.findMany({
    orderBy: { name: 'asc' },
  });
};
