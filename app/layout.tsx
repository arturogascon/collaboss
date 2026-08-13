import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/header/header";
import { auth } from "@/auth";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });

export const metadata: Metadata = {
  title: "CollaBoss",
  description: "The best app in the world to collab with friends",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${dmSans.variable} font-body`}>
        <Header session={session} />
        {children}
      </body>
    </html>
  );
}
