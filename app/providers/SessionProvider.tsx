"use client";

import { SessionProvider as AuthProvider } from "next-auth/react";

const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default SessionProvider;
