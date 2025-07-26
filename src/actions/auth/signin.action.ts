"use server";

import { signIn } from "@/auth";
import { signInFormSchema } from "@/lib";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import z from "zod";

export const signInWithCredentials = async (
  prevState: unknown,
  formData: FormData
) => {
  try {
    const user = await signInFormSchema.parseAsync({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", user);

    return { success: true, message: "Sign in successful" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    if (error instanceof z.ZodError) {
      return { success: false, message: error.issues[0].message };
    }

    return { success: false, message: "Invalid credentials" };
  }
};
