'use server';

import { signIn } from '@/auth';
import { signUpFormSchema } from '@/lib/validators/user';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import z from 'zod';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

export const signUp = async (prevState: unknown, formData: FormData) => {
  try {
    const data = await signUpFormSchema.parseAsync({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    });

    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return { success: false, message: 'User with this email already exists' };
    }

    const hashedPassword = await hash(data.password, 10);

    await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });

    await signIn('credentials', {
      email: data.email,
      password: data.password,
    });

    return { success: true, message: 'Sign up successful' };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    if (error instanceof z.ZodError) {
      return { success: false, message: error.issues[0].message };
    }

    return { success: false, message: 'Could not create account' };
  }
};