"use client"
import { LineWave } from "react-loader-spinner"

const Loading=()=>{
    return(
        <LineWave
  visible={true}
  height="100"
  width="100"
  color="#4fa94d"
  ariaLabel="line-wave-loading"
  wrapperStyle={{}}
  wrapperClass=""
  firstLineColor=""
  middleLineColor=""
  lastLineColor=""/>
    )    
}
export default Loading