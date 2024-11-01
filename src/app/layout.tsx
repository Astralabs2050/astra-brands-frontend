// import type { Metadata } from "next";
// import "./globals.css";
// import QueryClientProviderWrapper from "@/helpers/QueryClientWrapper";
// import { Toaster } from "react-hot-toast";

// export const metadata: Metadata = {
//   title: "Astra Dashboard for Brands",
//   description: "Welcome to the future of fashion",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body>
//         <QueryClientProviderWrapper>
//           <Toaster position="top-center" />
//           {children}
//         </QueryClientProviderWrapper>
//         {children}
//       </body>
//     </html>
//   );
// }

import type { Metadata } from "next";
import "./globals.css";
import QueryClientProviderWrapper from "@/helpers/QueryClientWrapper";
import { Toaster } from "react-hot-toast";

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
      <body className=" bg-astraOffWhite">
        {" "}
        <QueryClientProviderWrapper>
          <Toaster position="top-center" />
          {children}
        </QueryClientProviderWrapper>
      </body>
    </html>
  );
}
