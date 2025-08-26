import "./globals.css";
import React from "react";

export default function MobileLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto w-full max-w-full lg:max-w-screen-lg min-h-dvh bg-gray-50">
      {children}
    </main>
  );
}