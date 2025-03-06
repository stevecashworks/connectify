import styles from "./top.module.css"
import {CiSearch}  from "react-icons/ci"
import {IoPersonAddOutline} from "react-icons/io5"
import { IoIosNotificationsOutline } from "react-icons/io";
import { LuMailOpen } from "react-icons/lu";
import { RiShoppingBag3Line } from "react-icons/ri";
import Image from "next/image"



const icons = [
  {
    name: "Friends",
    Icon: IoPersonAddOutline,
  },
  {
    name: "Notifications",
    Icon: IoIosNotificationsOutline,
  },
  {
    name: "Messages",
    Icon: LuMailOpen,
  },
  {
    name: "Market",
    Icon: RiShoppingBag3Line,
  },
];

const Top=()=>{
return(
    <div className={styles.topCon}>
     <div className={styles.inputCon}>
        <CiSearch/>
        <input className={styles.styledInput} placeholder="start typing to search"/>

     </div>
     <div className={styles.rightCon}>

     <div className={styles.iconsCon}>
      {
        icons.map(icon=>{
          const {Icon, name}=icon
          return (
          <div className={styles.iconCon}>
            <div className={styles.iconLabel}>{name}</div>
          <Icon></Icon>

          </div>
          )
        })
      }

     </div>
     <Image
     className= {styles.profileImage}
     src="/jack.jpg"
     alt="profile image"
     height={40}
     width={40}
     />
          </div>
    </div>
)
}

export default Top