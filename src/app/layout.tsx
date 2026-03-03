import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OpenClaw Setup - 15-Minute AI Assistant Configuration",
  description: "Get your fully automated OpenClaw installation in just 15 minutes. Skip weeks of setup - get $50 one-time pricing with custom agents and integrations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}