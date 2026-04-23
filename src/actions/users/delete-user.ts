'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const deleteUser = async (userId: string) => {
  try {
    await prisma.user.delete({ where: { id: userId } });
    revalidatePath('/admin/users');
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message || 'Failed to delete user.' };
  }
};
