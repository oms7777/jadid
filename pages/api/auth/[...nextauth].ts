import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email et mot de passe requis.");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email.trim() }, // ✅ Ensure trimmed email
        });

        if (!user || !user.hashedPassword) {
          throw new Error("Identifiants incorrects.");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isPasswordValid) {
          throw new Error("Identifiants incorrects.");
        }

        return user;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email?.trim() || "" },
        });
  
        if (dbUser) {
          token.id = dbUser.id;
          token.isProvider = Boolean(dbUser.isProvider); // ✅ Store isProvider as boolean
        }
      }
      return token;
    },
  
    async session({ session, token }) {
      console.log("🔍 Session Before Update:", session); 
  
      if (session.user) {
        session.user.id = token.id as string;
        session.user.isProvider = Boolean(token.isProvider); // ✅ Ensure correct type
      }
  
      console.log("✅ Session Updated:", session); 
      return session;
    },
  },
  

  pages: {
    signIn: "/",
  },

  debug: process.env.NODE_ENV === "development",
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
