import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      isProvider: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    isProvider: boolean;
  }
}
