"use client";

import { TOKEN_NAME } from "@/network/constant";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UnAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isLoggedIn =
    typeof window !== "undefined" ? sessionStorage.getItem(TOKEN_NAME) : ``;
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  return <main>{children}</main>;
}
