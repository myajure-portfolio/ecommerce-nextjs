'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { OrderStatus } from '@/generated/prisma/client';
import { requireAdmin } from '@/lib/auth-utils';

export const updateOrderStatus = async (id: string, status: OrderStatus) => {
  const authCheck = await requireAdmin();
  if (!authCheck.authorized) {
    return { success: false, message: authCheck.error };
  }

  try {
    await prisma.order.update({
      where: { id },
      data: { status },
    });
    revalidatePath(`/admin/orders/${id}`);
    revalidatePath('/admin/orders');
    return { success: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to update order status';
    return { success: false, message };
  }
};
