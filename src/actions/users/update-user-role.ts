'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth-utils';

export const updateUserRole = async (userId: string, role: string) => {
  const authCheck = await requireAdmin();
  if (!authCheck.authorized) {
    return { success: false, message: authCheck.error };
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { role },
    });

    revalidatePath('/admin/users');
    return { success: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to update user role';
    return { success: false, message };
  }
};
