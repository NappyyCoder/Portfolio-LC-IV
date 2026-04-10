import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Leonard Clay IV — Full-Stack Developer & Creative Director",
  description:
    "Purdue University senior graduating May/July 2026. Full-Stack Developer specializing in React, Next.js, TypeScript, and AI integrations. Creative Director at Nard Shop.",
  keywords: [
    "Leonard Clay IV",
    "Full-Stack Developer",
    "Creative Director",
    "React",
    "Next.js",
    "TypeScript",
    "Purdue University",
    "Nard Shop",
  ],
  authors: [{ name: "Leonard Clay IV" }],
  openGraph: {
    title: "Leonard Clay IV — Full-Stack Developer & Creative Director",
    description:
      "Purdue University senior. Building at the intersection of code, creativity, and culture.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="noise bg-bg text-text-primary antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
