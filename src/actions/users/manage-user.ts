'use server';

import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth-utils';
import type { AdminUserInput, UpdateUserInput } from '@/lib/validators/user';

export const createUser = async (data: AdminUserInput & { password: string }) => {
  const authCheck = await requireAdmin();
  if (!authCheck.authorized) {
    return { success: false, message: authCheck.error };
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return { success: false, message: 'Email already in use' };
    }

    const hashedPassword = await hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role,
      },
    });

    revalidatePath('/admin/users');
    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to create user';
    return { success: false, message };
  }
};

export const updateUser = async (id: string, data: UpdateUserInput) => {
  const authCheck = await requireAdmin();
  if (!authCheck.authorized) {
    return { success: false, message: authCheck.error };
  }

  try {
    const user = await prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        role: data.role,
        email: data.email,
      },
    });

    revalidatePath('/admin/users');
    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to update user';
    return { success: false, message };
  }
};