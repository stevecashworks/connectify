import styles from "./navbar.module.css"
import Image from "next/image"
import {Roboto } from "next/font/google"
import links from "./Icons";
import Link from "next/link";
const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["vietnamese"],
});
const  Navbar=()=>{
return (
  <div className={`${styles.container} ${roboto.className}`}>
    <div className={styles.top}>
      <div className={styles.logoCon}>
        <Image fill src="/shape-logo.png" alt="logo" />
      </div>
      <p className={styles.text1}>connectify</p>
      <p className={styles.text2}>Chat here</p>
      <div className={styles.card}>
        <div className={styles.navImg}>
          <Image
            width={60}
            height={60}
            className={styles.logoImg}
            
            src="/person1.jpg"
            alt="nav image"
          />
        </div>
        <p className={styles.username}>Test user</p>
        <p className={styles.role}>member</p>
        {/* horizontal seperator line */}
        <hr className={styles.hr}></hr>
        {/* stats */}
        <div className={styles.stats}>
          <div className={styles.stat}>
            <p className={styles.statValue}>5</p>
            <p className={styles.statName}>Friends</p>
          </div>

          <div className={styles.stat}>
            <p className={styles.statValue}>2</p>
            <p className={styles.statName}>Groups</p>
          </div>

        </div>
      </div>
    </div>
    <div className={styles.bottom}>
        <div className={styles.linksWithIcon}>

        {links.map(link=>{
            const {Icon, path}=link
            return(
                <Link href={path } className={styles.linkCon}>
                    <Icon className={styles.icon}/>
                    <p>{path}</p>
                </Link>
            )
        })}

    </div>
        </div>
    
  </div>
);
}
export default Navbar