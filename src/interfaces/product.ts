import { Gender, Size } from '@/generated/prisma/enums';

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  rating: string;
  images: string[];
  sizes: Size[];
  gender: Gender;
  stock: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}
