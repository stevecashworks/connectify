
import { Inter } from "next/font/google";
import "./globals.css"
import ConnectToDb from "../lib/connect";
import Wrapper from "@/components/wrapper/wrapper";

const inter = Inter({ subsets: ["latin"] });
const   RootLayout= async({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) =>{
    await  ConnectToDb()
       
  return (
    <html lang="en">
      <body className={inter.className}>
       <Wrapper children={children}/>
      </body>
      
    </html>
  );
}
export default RootLayout