import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { MainNav } from "@/components/main-nav";
import { Providers } from "./providers";

import { cn } from "@/lib/utils"

const fontSans = FontSans({ 
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "WeChat Group Finder",
  description: "Find your community in China",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>
          <MainNav />
          {children}
        </Providers>
      </body>
    </html>
  );
}
