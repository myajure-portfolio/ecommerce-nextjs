export type { IProduct } from './product';

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

export interface ProductSummary {
  id: string;
  name: string;
  slug: string;
  price: string;
  category: string;
  images: string[];
}

export interface Category {
  id: string;
  name: string;
}

export interface AdminCategory extends Category {
  productCount?: number;
}

export type UserRole = 'user' | 'admin';

export interface UserSummary {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  image?: string | null;
  createdAt: Date;
}

export interface UserWithStats extends UserSummary {
  cartCount: number;
}