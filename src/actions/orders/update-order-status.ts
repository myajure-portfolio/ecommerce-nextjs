'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const updateOrderStatus = async (id: string, status: any) => {
  try {
    await prisma.order.update({
      where: { id },
      data: { status },
    });
    revalidatePath(`/admin/orders/${id}`);
    revalidatePath('/admin/orders');
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
