import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Happy Birthday Mama — From Vanshika",
  description: "A cinematic birthday universe built with love, from Vanshika to her mom.",
  openGraph: {
    title: "Happy Birthday Mama",
    description: "A cinematic birthday universe built with love — from Vanshika",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
