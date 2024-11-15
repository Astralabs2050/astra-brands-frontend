import AuthLayout from "@/helpers/AuthLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Astra",
  description: "Bring your ideas to life",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthLayout>{children}</AuthLayout>;
}
