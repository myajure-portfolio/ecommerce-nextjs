'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { getCartId, serializeCart } from './utils';

export async function getCart() {
  const cartId = await getCartId();
  const session = await auth();
  const userId = session?.user?.id as string | undefined;

  let cart = null;

  if (cartId) {
    cart = await prisma.cart.findFirst({
      where: { sessionCartId: cartId },
      include: { items: true },
    });
  }

  if (!cart && userId) {
    cart = await prisma.cart.findFirst({
      where: { userId },
      include: { items: true },
      orderBy: { updatedAt: 'desc' },
    });
  }

  if (cart && userId && !cart.userId) {
    if (cart.sessionCartId === cartId) {
      cart = await prisma.cart.update({
        where: { id: cart.id },
        data: { userId },
        include: { items: true },
      });
    }
  }

  if (!cart) return null;

  return serializeCart(cart);
}
