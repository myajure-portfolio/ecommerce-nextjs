'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth-utils';

export const deleteUser = async (userId: string) => {
  const authCheck = await requireAdmin();
  if (!authCheck.authorized) {
    return { success: false, message: authCheck.error };
  }

  try {
    await prisma.user.delete({ where: { id: userId } });
    revalidatePath('/admin/users');
    return { success: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to delete user';
    return { success: false, message };
  }
};
