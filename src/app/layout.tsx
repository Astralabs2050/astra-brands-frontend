import type { Metadata } from "next";
import "./globals.css";

import { Toaster } from "react-hot-toast";
import { Providers } from "@/helpers/QueryClientWrapper";
import { FWalletProvider } from "@/context/WalletProvider";

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
      <body className="bg-astraOffWhite">
        <FWalletProvider>
          <Providers>
            <Toaster position="top-center" />
            {children}
          </Providers>
        </FWalletProvider>
      </body>
    </html>
  );
}
