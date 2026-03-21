// app/lib/auth/auth.ts
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { findOrCreateUser } from "@/app/lib/db";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // ✅ NEW: auto-create user in Supabase on first Google login
    async signIn({ user }) {
      if (user.email) {
        await findOrCreateUser(user.email, {
          name: user.name ?? undefined,
          image: user.image ?? undefined,
        });
      }
      return true;
    },

    // existing — unchanged
    async session({ session, token }) {
      if (session.user && token.sub) {
        (session.user as typeof session.user & { id: string }).id = token.sub;
      }
      return session;
    },
  },
};
