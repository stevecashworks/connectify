import styles from "./center.module.css"
import Top from "./components/top"

const CenterCon=({children}:{children:React.ReactNode})=>{
    return(
        <div className={styles.centerCon}>
            
            <Top/>
        </div>
    )
}
export default CenterCon