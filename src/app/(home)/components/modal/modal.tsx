import styles from "./modal.module.css"
import { useRouter } from "next/navigation"
type modalProps={
  messages:string[],
  title:string
}
const Modal=({messages,title}:modalProps)=>{
const router= useRouter()
  return (
  <div className={`${styles.container} ${(messages.length===0)&&styles.hidden}`}>
    <p className={styles.title}>{title}</p>
    <hr />
    <div className={styles.messages}>
      {messages.map((message) => (
        <p>{message}</p>
      ))}
    </div>
    <hr></hr>
    <div className={styles.buttons}>
      <button onClick={()=>{router.push("/")}} className={styles.btnSecondary}>Cancel</button>
      <button onClick={()=>{router.refresh()}} className={styles.btnPrimary}>Retry</button>
    </div>
  </div>
);
}
export default Modal