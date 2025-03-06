"use client";
import Image from "next/image";
import styles from "./page.module.css";
import React, { useState } from "react";
import { CiLaptop } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import Link from "next/link";
import { BiKey } from "react-icons/bi";
import { useRouter } from "next/navigation";
import ErrorModal from "@/app/(home)/components/modal/modal"

type featureProp = {
  Icon: React.FC;
  name: string;
  description: string;
};

const Feature = ({ Icon, name, description }: featureProp) => {
  return (
    
    <div className={styles.feature}>
      <div className={styles.iconCon}>{Icon && <Icon />}</div>
      <div className={styles.details}>
        <p>{name}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};
 
const features = [
  {
    Icon: CiLaptop,
    name: "Community",
    description: "Join our large community of friends",
  },
  {
    Icon: CiLaptop,
    name: "Community",
    description: "Join our large community of friends",
  },
  {
    Icon: CiLaptop,
    name: "Community",
    description: "Join our large community of friends",
  },
];

const Login = () => {
  const [errors,setErrors]= useState<string[]>([])
  const router=useRouter()
const [email,setEmail]=useState<string>("")
const [password,setPassword]=useState<string>("")
 const handleClick=()=>{
 if(password&&email){
  fetch("/api/login",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({email,password})
  }).then(res=>res.json()).then(res=>{
    if(res.success){
      localStorage.setItem("connectify_token", res.data)
      router.push("/user")
    }
else{
  setErrors([...errors,res.message])
}

  })
 }
 else{
  alert("fill out the form to proceed")
 }
 }

 

  return ( <>
  <ErrorModal title="hello" messages={errors}/>
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.intro}>
          <div className={styles.welcome}>Join Connectify</div>
          <p>
            Connectify: Bringing Everyone Together, One Connection at a Time!
          </p>
          {features.map((feature) => (
            <Feature
            Icon={feature.Icon}
            name={feature.name}
            description={feature.description}
            />
          ))}
        </div>

        <div className={styles.formCon}>
          <div className={styles.logoCon}>
            <Image fill objectFit="cover" alt="logo" src="/shape-logo.png" />
          </div>

          <div className={styles.form}>
            <div className={styles.section}>
              <div className={styles.inputContainer}>
                <input 
                className={styles.input} 
                placeholder="Your email here"
                onChange={(e)=>{setEmail(e.target.value)}}
                />
                <MdOutlineEmail />
              </div>
              <div className={styles.inputContainer}>
                <input
                  type="password"
                  className={styles.input}
                  placeholder="Your password here"
                  onChange={(e)=>{setPassword(e.target.value)}}
                />
                <BiKey />
              </div>
              <Link className={styles.link} href="/register">
                Signup instead
              </Link>

              <div className={styles.buttons}>
                <button onClick={handleClick}>login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
                </>
  );
};
export default Login;
