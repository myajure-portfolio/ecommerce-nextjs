'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { calculateTotals } from './utils';

export async function removeFromCart(cartItemId: string) {
  try {
    const item = await prisma.cartItem.findUnique({ where: { id: cartItemId } });
    if (!item) throw new Error('Item not found');

    await prisma.cartItem.delete({ where: { id: cartItemId } });

    const updatedItems = await prisma.cartItem.findMany({ where: { cartId: item.cartId } });
    const { itemsPrice, shippingPrice, taxPrice, totalPrice } = calculateTotals(updatedItems);

    await prisma.cart.update({
      where: { id: item.cartId },
      data: { itemsPrice, shippingPrice, taxPrice, totalPrice },
    });

    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
