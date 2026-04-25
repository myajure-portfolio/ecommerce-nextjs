'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const createCategory = async (name: string) => {
  try {
    const trimmed = name.trim();
    if (!trimmed) return { success: false, message: 'Category name is required.' };

    const category = await prisma.category.create({ data: { name: trimmed } });

    revalidatePath('/admin/categories');
    return { success: true, category };
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string };
    if (err.code === 'P2002') {
      return { success: false, message: 'A category with this name already exists.' };
    }
    return { success: false, message: err.message || 'Failed to create category.' };
  }
};
