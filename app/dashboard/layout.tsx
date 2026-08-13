import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="px-5 pt-5 pb-20 relative text-purple">{children}</main>
  );
}
