'use server';

import { prisma } from '@/lib/prisma';

export const getAdminStats = async () => {
  const [
    totalProducts,
    totalUsers,
    totalCategories,
    totalOrders,
    recentProducts,
    lowStockProducts,
    recentOrders,
  ] = await Promise.all([
    prisma.product.count(),
    prisma.user.count(),
    prisma.category.count(),
    prisma.order.count(),
    prisma.product.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { category: true, images: true },
    }),
    prisma.product.findMany({
      where: { stock: { lte: 5 } },
      take: 5,
      orderBy: { stock: 'asc' },
      include: { category: true, images: true },
    }),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { name: true } } },
    }),
  ]);

  const salesData = await prisma.order.aggregate({
    _sum: { totalPrice: true },
  });

  const totalRevenue = Number(salesData._sum.totalPrice ?? 0);

  return {
    totalProducts,
    totalUsers,
    totalCategories,
    totalOrders,
    totalRevenue,
    recentProducts: recentProducts.map(p => ({
      ...p,
      price: p.price.toString(),
      category: p.category.name,
      images: p.images.map(img => img.url),
    })),
    lowStockProducts: lowStockProducts.map(p => ({
      ...p,
      price: p.price.toString(),
      category: p.category.name,
      images: p.images.map(img => img.url),
    })),
    recentOrders: recentOrders.map(o => ({
      ...o,
      totalPrice: o.totalPrice.toString(),
      userName: o.user.name,
    })),
  };
};
