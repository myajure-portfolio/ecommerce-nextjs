'use server';

import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import { Size } from '@/generated/prisma/client';

// Generate or get the cart ID
async function getCartId() {
  const cookieStore = await cookies();
  return cookieStore.get('sessionCartId')?.value;
}

const calculateTotals = (items: any[]) => {
  const itemsPrice = items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 9.99;
  const taxPrice = 0; // Customize based on requirements
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  return { itemsPrice, shippingPrice, taxPrice, totalPrice };
};

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

  // If user is logged in but cart not found by session ID, try to find user's cart
  // (We don't set cookie here because getCart might be called in Server Component)
  if (!cart && userId) {
    cart = await prisma.cart.findFirst({
      where: { userId },
      include: { items: true },
      orderBy: { updatedAt: 'desc' },
    });
  }

  // Link cart to user if they just logged in and the cart is not linked yet
  if (cart && userId && !cart.userId) {
    // Only update if it's the current session cart
    if (cart.sessionCartId === cartId) {
      cart = await prisma.cart.update({
        where: { id: cart.id },
        data: { userId },
        include: { items: true },
      });
    }
  }

  return cart;
}

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
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }

    let cart = await getCart();

    const session = await auth();
    const userId = session?.user?.id as string | undefined;

    if (!cart) {
      // Create new cart
      const { itemsPrice, shippingPrice, taxPrice, totalPrice } = calculateTotals([
        { price: product.price, qty: 1 },
      ]);

      cart = await prisma.cart.create({
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
    } else {
      // Check if item already exists in cart with same size
      const existingItem = cart.items.find(
        item => item.productId === productId && item.size === (size || null)
      );

      if (existingItem) {
        // Update quantity
        await prisma.cartItem.update({
          where: { id: existingItem.id },
          data: { qty: existingItem.qty + 1 },
        });
      } else {
        // Add new item
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

      // Re-fetch items and update totals
      const updatedItems = await prisma.cartItem.findMany({ where: { cartId: cart.id } });
      const { itemsPrice, shippingPrice, taxPrice, totalPrice } = calculateTotals(updatedItems);

      await prisma.cart.update({
        where: { id: cart.id },
        data: { itemsPrice, shippingPrice, taxPrice, totalPrice },
      });
    }

    revalidatePath('/');
    return { success: true, message: 'Item added to cart' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function removeFromCart(cartItemId: string) {
  try {
    const item = await prisma.cartItem.findUnique({ where: { id: cartItemId } });
    if (!item) throw new Error('Item not found');

    await prisma.cartItem.delete({ where: { id: cartItemId } });

    // Update totals
    const updatedItems = await prisma.cartItem.findMany({ where: { cartId: item.cartId } });
    const { itemsPrice, shippingPrice, taxPrice, totalPrice } = calculateTotals(updatedItems);

    await prisma.cart.update({
      where: { id: item.cartId },
      data: { itemsPrice, shippingPrice, taxPrice, totalPrice },
    });

    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

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

    // Update totals
    const updatedItems = await prisma.cartItem.findMany({ where: { cartId: item.cartId } });
    const { itemsPrice, shippingPrice, taxPrice, totalPrice } = calculateTotals(updatedItems);

    await prisma.cart.update({
      where: { id: item.cartId },
      data: { itemsPrice, shippingPrice, taxPrice, totalPrice },
    });

    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
