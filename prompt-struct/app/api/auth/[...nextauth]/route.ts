import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { findOrCreateUser, getUserByEmail } from "@/app/lib/db";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;
      await findOrCreateUser(user.email, { name: user.name ?? undefined });
      return true;
    },
    async session({ session }) {
      if (session?.user?.email) {
        const dbUser = await getUserByEmail(session.user.email);
        (session.user as any).id = dbUser.id;
        (session.user as any).plan = dbUser.plan;
        (session.user as any).requests_used = dbUser.requests_used;
        (session.user as any).daily_requests_used = dbUser.daily_requests_used;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

