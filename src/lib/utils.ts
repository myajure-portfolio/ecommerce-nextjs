import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import z from "zod";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formatError = async (error: unknown) => {
  if (error instanceof z.ZodError) {
    return error.issues.map((issue) => issue.message).join(". ");
  } else if (
    typeof error === "object" &&
    error !== null &&
    "name" in error &&
    "code" in error &&
    (error as { name: string }).name === "PrismaClientKnownRequestError" &&
    (error as { code: string }).code === "P2002"
  ) {
    const field =
      (error as { meta?: { target?: string[] } }).meta?.target?.toString() ||
      "Field";
    return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
  } else {
    return "An unexpected error occurred";
  }
};
