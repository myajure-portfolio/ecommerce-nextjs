"use server";
import prisma, { signUpFormSchema } from "@/lib";
import { hashSync } from "bcryptjs";
import { signIn } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import z from "zod";
import { getUserByEmail } from "../user/get-user.action";

export const signUpUser = async (prevState: unknown, formData: FormData) => {
  try {
    const user = await signUpFormSchema.parseAsync({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    const existingUser = await getUserByEmail(user.email);

    if (existingUser) {
      return { success: false, message: "Email already in use" };
    }

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashSync(user.password, 10),
      },
    });

    await signIn("credentials", {
      email: user.email,
      password: user.password,
    });

    return { success: true, message: "Sign up successful" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    if (error instanceof z.ZodError) {
      return { success: false, message: error.issues[0].message };
    }

    return { success: false, message: "Sign up failed" };
  }
};
