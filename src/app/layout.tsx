import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WaitlistPro - Beautiful Waitlists That Convert",
  description: "Create stunning waitlist pages in minutes. Capture emails, track referrals, and launch your product with a built-in audience.",
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
