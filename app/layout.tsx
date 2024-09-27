import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Footer } from "@/components/home/Footer";
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/providers/query-provider";
import { SheetProvider } from "@/providers/sheet-provider";

import { ClerkProvider } from "@clerk/nextjs";
import ClerkPT from "@/public/clerk-pt";


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
    <ClerkProvider localization={ClerkPT}>
      <html lang="en">
        <body className={inter.className}>
          <QueryProvider>
            <SheetProvider />
            <Toaster />
            {children}
            <Footer />
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
