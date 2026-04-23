'use server';

import { prisma } from '@/lib/prisma';

export const getAdminUsers = async ({
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
          { email: { contains: q, mode: 'insensitive' as const } },
        ],
      }
    : {};

  const [users, count] = await Promise.all([
    prisma.user.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limitNumber,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        image: true,
        _count: { select: { carts: true } },
      },
    }),
    prisma.user.count({ where }),
  ]);

  return {
    users,
    count,
    totalPages: Math.ceil(count / limitNumber),
    currentPage: pageNumber,
  };
};
