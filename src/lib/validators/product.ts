import { z } from 'zod';

export const GENDERS = ['men', 'women', 'kid', 'unisex'] as const;
export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'] as const;

export const genderEnum = z.enum(GENDERS);
export const sizeEnum = z.enum(SIZES);

export const productSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  slug: z.string().min(2, 'Slug must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.coerce.number().min(0.01, 'Price must be greater than 0'),
  stock: z.coerce.number().int().min(0, 'Stock cannot be negative'),
  categoryId: z.string().min(1, 'Please select a category'),
  gender: genderEnum,
  sizes: z.array(sizeEnum).min(1, 'Select at least one size'),
  isFeatured: z.boolean(),
  banner: z.string().nullable().optional(),
  images: z.array(z.string()).min(1, 'Add at least one image'),
});

export type ProductFormValues = z.infer<typeof productSchema>;

export interface AdminProductInput {
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  gender: 'men' | 'women' | 'kid' | 'unisex';
  sizes: ('XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL')[];
  isFeatured: boolean;
  banner?: string | null;
  images: string[];
}