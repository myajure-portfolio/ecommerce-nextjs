'use server';

import { prisma } from '@/lib/prisma';
import type { UserWithStats } from '@/interfaces';

export const getAdminUsers = async ({
  q = '',
  page = '1',
  limit = '10',
}: {
  q?: string;
  page?: string;
  limit?: string;
}): Promise<{
  users: UserWithStats[];
  count: number;
  totalPages: number;
  currentPage: number;
}> => {
  try {
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
      users: users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role as 'user' | 'admin',
        image: user.image,
        createdAt: user.createdAt,
        cartCount: user._count.carts,
      })),
      count,
      totalPages: Math.ceil(count / limitNumber),
      currentPage: pageNumber,
    };
  } catch (error) {
    console.error('Error fetching admin users:', error);
    return {
      users: [],
      count: 0,
      totalPages: 0,
      currentPage: 1,
    };
  }
};