import { Inter } from 'next/font/google';
import './admin/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Energy Management System - BtoB Frontend',
  description: 'Comprehensive energy management system for businesses',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <div id="__next">
          {children}
        </div>
      </body>
    </html>
  );
}