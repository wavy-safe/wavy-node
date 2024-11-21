import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wavy Node - AI-powered Threat Detection",
  description:
    "Wavy Node helps prevent interactions with high-risk users, dApps, and exchanges using advanced AI technology.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-pattern`}>{children}</body>
    </html>
  );
}
