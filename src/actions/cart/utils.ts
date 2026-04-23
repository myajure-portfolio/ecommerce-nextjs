import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

export async function getCartId() {
  const cookieStore = await cookies();
  return cookieStore.get('sessionCartId')?.value;
}

export type CartWithItems = NonNullable<Awaited<ReturnType<typeof prisma.cart.findFirst<{ include: { items: true } }>>>>;

export function serializeCart(cart: CartWithItems) {
  return {
    ...cart,
    itemsPrice: Number(cart.itemsPrice),
    shippingPrice: Number(cart.shippingPrice),
    taxPrice: Number(cart.taxPrice),
    totalPrice: Number(cart.totalPrice),
    items: cart.items.map((item) => ({
      ...item,
      price: Number(item.price),
    })),
  };
}

export const calculateTotals = (items: any[]) => {
  const itemsPrice = items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 9.99;
  const taxPrice = 0;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  return { itemsPrice, shippingPrice, taxPrice, totalPrice };
};
