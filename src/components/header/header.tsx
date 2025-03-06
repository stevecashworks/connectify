"use client"
import Image from "next/image"
import styles from "./header.module.css"
import { CgShoppingBag,CgMenuLeft } from "react-icons/cg";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import Link from "next/link";

const Header=()=>{
    const [scrollY, setScrollY]=useState<number>(0)
    const [menuOpen,setMenuOpen]=useState<boolean>(false)
    const Icon = menuOpen ? IoClose : CgMenuLeft;
    const toggleMenu=()=>{
      setMenuOpen(!menuOpen)
    }

    useEffect(()=>{
        window.addEventListener("scroll",()=>{
            setScrollY(window.scrollY)
        })
    },[])
   return (
     <div className={`${styles.header} ${scrollY > 0 && styles.active}`}>
       <div className={`${styles.menu} ${!menuOpen && styles.closed}`}></div>
       <div className={styles.logo}>
         <Image
           className={styles.hiddenOnMobile}
           alt="connectify-logo"
           src="/logo.png"
           width={200}
           height={200}
         />
       </div>
       <div className={styles.nav}>
         <div className={`${styles.iconCon} ${styles.hiddenOnMobile}`}>
           <CgShoppingBag />
         </div>
         <Link href="/login"className={styles.hiddenOnMobile}>Login</Link>
         <div className={styles.navIconCon} onClick={toggleMenu}>
           <Icon
             className={`${styles.navIcon} ${menuOpen && styles.open}`}
             size={25}
             color="var(--brand-color)"
           />
         </div>
       </div>
     </div>
   );
}
export default Header