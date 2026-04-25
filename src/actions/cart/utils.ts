import { cookies } from 'next/headers';

export async function getCartId() {
  const cookieStore = await cookies();
  return cookieStore.get('sessionCartId')?.value;
}

interface CartItemInput {
  price: unknown;
  qty: number;
}

interface CartItemData {
  id: string;
  productId: string;
  qty: number;
  price: unknown;
  name: string;
  slug: string;
  image: string;
  size: string | null;
}

interface SerializeCartInput {
  id: string;
  sessionCartId: string;
  userId: string | null;
  itemsPrice: unknown;
  shippingPrice: unknown;
  taxPrice: unknown;
  totalPrice: unknown;
  items: CartItemData[];
}

export function serializeCart(cart: SerializeCartInput) {
  return {
    id: cart.id,
    sessionCartId: cart.sessionCartId,
    userId: cart.userId,
    itemsPrice: Number(cart.itemsPrice),
    shippingPrice: Number(cart.shippingPrice),
    taxPrice: Number(cart.taxPrice),
    totalPrice: Number(cart.totalPrice),
    items: cart.items.map(item => ({
      id: item.id,
      productId: item.productId,
      qty: item.qty,
      price: Number(item.price),
      name: item.name,
      slug: item.slug,
      image: item.image,
      size: item.size,
    })),
  };
}

export const calculateTotals = (items: CartItemInput[]) => {
  const itemsPrice = items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 9.99;
  const taxPrice = itemsPrice * 0.1;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  return { itemsPrice, shippingPrice, taxPrice, totalPrice };
};