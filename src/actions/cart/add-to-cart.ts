'use server';

import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import { Size } from '@/generated/prisma/client';
import { getCartId, calculateTotals, serializeCart } from './utils';
import { getCart } from './get-cart';

export async function addToCart(productId: string, size?: Size) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { images: true },
    });
    if (!product) throw new Error('Product not found');

    let cartId = await getCartId();

    if (!cartId) {
      cartId = crypto.randomUUID();
      const cookieStore = await cookies();
      cookieStore.set('sessionCartId', cartId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
      });
    }

    let cart = await getCart();
    const session = await auth();
    const userId = session?.user?.id as string | undefined;

    if (!cart) {
      const { itemsPrice, shippingPrice, taxPrice, totalPrice } = calculateTotals([
        { price: product.price, qty: 1 },
      ]);

      const newCart = await prisma.cart.create({
        data: {
          sessionCartId: cartId,
          userId,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
          items: {
            create: {
              productId: product.id,
              qty: 1,
              price: product.price,
              name: product.name,
              slug: product.slug,
              image: product.images?.[0]?.url || '',
              size: size || null,
            },
          },
        },
        include: { items: true },
      });
      cart = serializeCart(newCart);
    } else {
      const existingItem = cart.items.find(
        item => item.productId === productId && item.size === (size || null)
      );

      if (existingItem) {
        await prisma.cartItem.update({
          where: { id: existingItem.id },
          data: { qty: existingItem.qty + 1 },
        });
      } else {
        await prisma.cartItem.create({
          data: {
            cartId: cart.id,
            productId: product.id,
            qty: 1,
            price: product.price,
            name: product.name,
            slug: product.slug,
            image: product.images?.[0]?.url || '',
            size: size || null,
          },
        });
      }

      const updatedItems = await prisma.cartItem.findMany({ where: { cartId: cart.id } });
      const { itemsPrice, shippingPrice, taxPrice, totalPrice } = calculateTotals(updatedItems);

      await prisma.cart.update({
        where: { id: cart.id },
        data: { itemsPrice, shippingPrice, taxPrice, totalPrice },
      });
    }

    revalidatePath('/', 'layout');
    return { success: true, message: 'Item added to cart' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
