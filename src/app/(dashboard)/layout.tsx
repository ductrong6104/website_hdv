
import type { Metadata } from "next";
import { Inter } from "next/font/google"; 

import HeaderPage from "@/components/header/header";
const inter = Inter({ subsets: ["latin"] });
import "./global.css"
import {UserProvider} from "@/providers/userContext"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      

      <body className={`${inter.className} bg-white`}>
        
          <HeaderPage></HeaderPage>
          {children}
        
      </body>
    </html>
  );
}
