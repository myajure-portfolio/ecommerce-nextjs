import prisma from "@/lib/prisma";
import NextAuth, { CredentialsSignin, NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import { compareSync } from "bcryptjs";
import { ZodError } from "zod";
import { getUserByEmail } from "@/actions";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      authorize: async (credentials) => {
        if (credentials == null) return null;

        try {
          const user = await getUserByEmail(credentials.email as string);
          if (!user) throw new CustomError("Email not found");

          const passMatch = compareSync(
            credentials.password as string,
            user.password
          );
          if (!passMatch) throw new CustomError("Invalid password");

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (error: any) {
          if (error instanceof ZodError) {
            throw new CustomError("invalid_schema");
          }
          throw new CustomError(error.message);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, user, trigger, token }) {
      session.user.id = token.sub as string;

      if (trigger === "update") {
        session.user.name = user.name;
      }

      return session;
    },
  },
} satisfies NextAuthConfig);

class CustomError extends CredentialsSignin {
  constructor(code: string) {
    super();
    this.code = code;
    this.message = code;
    this.stack = undefined;
  }
}
