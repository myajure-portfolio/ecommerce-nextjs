'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { calculateTotals } from './utils';
import { removeFromCart } from './remove-from-cart';

export async function updateCartItemQuantity(cartItemId: string, qty: number) {
  try {
    const item = await prisma.cartItem.findUnique({ where: { id: cartItemId } });
    if (!item) throw new Error('Item not found');

    if (qty <= 0) {
      return removeFromCart(cartItemId);
    }

    await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { qty },
    });

    const updatedItems = await prisma.cartItem.findMany({ where: { cartId: item.cartId } });
    const { itemsPrice, shippingPrice, taxPrice, totalPrice } = calculateTotals(updatedItems);

    await prisma.cart.update({
      where: { id: item.cartId },
      data: { itemsPrice, shippingPrice, taxPrice, totalPrice },
    });

    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to update quantity';
    return { success: false, message };
  }
}
