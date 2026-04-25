export interface CartItem {
  id: string;
  productId: string;
  qty: number;
  price: number;
  name: string;
  slug: string;
  image: string;
  size: string | null;
}

export interface Cart {
  id: string;
  sessionCartId: string;
  userId: string | null;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  items: CartItem[];
}

export interface User {
  id: string;
  name: string | null;
  email: string;
  role: string;
}

export interface Session {
  user?: User;
}

export interface ProductSummary {
  id: string;
  name: string;
  slug: string;
  price: string;
  category: string;
  images: string[];
}