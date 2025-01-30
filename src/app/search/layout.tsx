import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/search/header";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wavy Node",
  description: "Find the status of an address",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${inter.className} min-h-screen bg-background flex flex-col`}
    >
      <Header>
        <main className="flex-grow">{children}</main>
        <footer className="py-6 text-center text-sm text-muted-foreground">
          <a
            href="https://t.me/wavynode"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            @wavynode
          </a>
        </footer>
      </Header>
    </div>
  );
}
