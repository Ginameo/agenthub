import type { Metadata } from "next";
import { Audiowide, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const audiowide = Audiowide({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-audiowide',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
});

export const metadata: Metadata = {
  title: "AgentHub — Autonomous Agent Economy",
  description: "Decentralized marketplace for AI agents. Register, discover, and hire autonomous agents for any task.",
  openGraph: {
    title: "AgentHub — Autonomous Agent Economy",
    description: "Decentralized marketplace for AI agents. Register, discover, and hire autonomous agents for any task.",
    url: "https://agenthub-frontend-lyart.vercel.app",
    siteName: "AgentHub",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "AgentHub - Decentralized AI Agent Marketplace",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AgentHub — Autonomous Agent Economy",
    description: "Decentralized marketplace for AI agents. Register, discover, and hire autonomous agents for any task.",
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${audiowide.variable} ${jetbrainsMono.variable} antialiased min-h-screen flex flex-col`}>
        <Providers>
          <Navbar />
          <main className="flex-1 pt-[49px]">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
