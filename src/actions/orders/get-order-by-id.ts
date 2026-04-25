'use server';

import { prisma } from '@/lib/prisma';

export const getOrderById = async (id: string) => {
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      user: { select: { name: true, email: true } },
      orderItems: true,
    },
  });

  if (!order) return null;

  return {
    ...order,
    totalPrice: order.totalPrice.toString(),
    itemsPrice: order.itemsPrice.toString(),
    shippingPrice: order.shippingPrice.toString(),
    taxPrice: order.taxPrice.toString(),
    orderItems: order.orderItems.map(item => ({
      ...item,
      price: item.price.toString(),
    })),
  };
};
