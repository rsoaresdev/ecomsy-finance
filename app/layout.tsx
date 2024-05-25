import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { QueryProvider } from "@/providers/query-provider";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecomsy",
  description: "Track Your Finances, Transform Your Future",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <QueryProvider>{children}</QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
