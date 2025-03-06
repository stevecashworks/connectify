"use client";
import { Inter } from "next/font/google";
import "./layout.css";
import Navbar from "./components/navbar/navbar";
import CenterCon from "./components/center/center";
import ChatCon from "./components/chat/chat";
import {useSelector} from "react-redux"
import {useEffect} from "react"
const inter = Inter({ subsets: ["latin"] });
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <div className="userLayoutContainer">
    <Navbar/>
    <CenterCon>

    {children}
    </CenterCon>
    <ChatCon/>

  </div>
      

  );
}
