'use server';

import { prisma } from '@/lib/prisma';

export const getAdminOrders = async ({
  page = '1',
  limit = '10',
}: {
  page?: string;
  limit?: string;
}) => {
  const pageNumber = Number(page) || 1;
  const limitNumber = Number(limit) || 10;
  const skip = (pageNumber - 1) * limitNumber;

  const [orders, count] = await Promise.all([
    prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      skip,
      take: limitNumber,
      include: {
        user: { select: { name: true, email: true } },
      },
    }),
    prisma.order.count(),
  ]);

  return {
    orders: orders.map((o: any) => ({
      ...o,
      totalPrice: o.totalPrice.toString(),
      user: o.user,
    })),
    count,
    totalPages: Math.ceil(count / limitNumber),
    currentPage: pageNumber,
  };
};
