import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from '@/app/components/header/header';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'CollaBoss',
  description: 'The best app in the world to collab with friends',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
