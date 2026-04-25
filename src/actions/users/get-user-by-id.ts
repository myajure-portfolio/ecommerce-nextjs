'use server';

import { prisma } from '@/lib/prisma';
import type { UserSummary } from '@/interfaces';

export const getUserById = async (id: string): Promise<UserSummary | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        createdAt: true,
      },
    });

    if (!user) return null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role as 'user' | 'admin',
      image: user.image,
      createdAt: user.createdAt,
    };
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};