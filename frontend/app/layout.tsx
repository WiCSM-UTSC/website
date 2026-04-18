import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WiCSM UTSC",
  description: "Women in Computer Science, Statistics and Mathematics at UTSC",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} min-h-screen flex flex-col`}>

        <main className="flex-1">
          {children}
        </main>

      </body>
    </html>
  );
}
