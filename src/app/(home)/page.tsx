"use client"
import { useEffect } from "react";
import styles from "./page.module.css"
import { BallTriangle } from "react-loader-spinner";
const token= localStorage.getItem("connectify_token")
import { useRouter } from "next/navigation";
const UserDetailsLoading=()=>{
  const router =useRouter()
  useEffect(()=>{
    console.log(token)
const fetchUserDetails = () => {
  fetch("/api/loginwithsavedtoken", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      router.push("/user")
    });
};
if(!token){
router.push("/register")
}
else{
  fetchUserDetails()
} 
  },[])
    return (
      <div className={styles.container}>
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#338afc"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
}

export default UserDetailsLoading
