"use client";
import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

const Provider = ({
  children,
  session,
}: {
  children: ReactNode;
  session?: any;
}) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
