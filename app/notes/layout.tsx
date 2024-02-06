import React from "react";
import { NavBar } from "./NavBar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      <main className="p-4 max-w-7xl">
        {children}
      </main>
    </>
  );
}
