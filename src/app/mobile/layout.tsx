import "./globals.css";
import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-dvh bg-gray-50">
        <main className="mx-auto w-full max-w-full lg:max-w-screen-lg">{children}</main>
      </body>
    </html>
  );
}