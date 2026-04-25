'use server';

import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import { Size } from '@/generated/prisma/client';
import { calculateTotals } from './utils';

export async function addToCart(productId: string, size?: Size) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { images: true },
    });
    if (!product) {
      return { success: false, message: 'Product not found' };
    }

    let cartId = await getCartId();
    const session = await auth();
    const userId = session?.user?.id;

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

    const existingCart = await prisma.cart.findFirst({
      where: {
        OR: [
          { sessionCartId: cartId },
          ...(userId ? [{ userId }] : []),
        ],
      },
      include: { items: true },
      orderBy: { updatedAt: 'desc' },
    });

    if (existingCart) {
      const existingItem = existingCart.items.find(
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
            cartId: existingCart.id,
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

      const updatedItems = await prisma.cartItem.findMany({
        where: { cartId: existingCart.id },
      });
      const totals = calculateTotals(updatedItems);

      await prisma.cart.update({
        where: { id: existingCart.id },
        data: {
          userId: userId || existingCart.userId,
          ...totals,
        },
      });
    } else {
      const totals = calculateTotals([{ price: product.price, qty: 1 }]);

      await prisma.cart.create({
        data: {
          sessionCartId: cartId,
          userId: userId || null,
          ...totals,
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
      });
    }

    revalidatePath('/', 'layout');
    return { success: true, message: 'Item added to cart' };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to add item to cart';
    return { success: false, message };
  }
}

async function getCartId(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get('sessionCartId')?.value;
}