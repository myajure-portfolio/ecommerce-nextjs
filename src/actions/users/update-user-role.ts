'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const updateUserRole = async (userId: string, role: string) => {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { role },
    });

    revalidatePath('/admin/users');
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message || 'Failed to update user role.' };
  }
};
