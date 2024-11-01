import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Astra Dashboard for Brands",
  description: "Welcome to the future of fashion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
