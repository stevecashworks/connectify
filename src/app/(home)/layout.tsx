"use client"
import { Inter } from "next/font/google";
import "./layout.css"
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";



const inter = Inter({subsets: ["latin"]});
;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <div>
    <Header/>
    {children}
    <Footer/>
   </div>
  );
}
