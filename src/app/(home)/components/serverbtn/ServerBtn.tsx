"use client";
import inputs, { formStateType } from "@/app/data/inputs";
import { useState } from "react";
import ButtonSpinner from "../spinner/spinner";
import { useRouter } from "next/navigation";
import MessageModal from "../modal/modal";
type serverBtnProps = {
  formdata: formStateType;
  errors: string[];
  setErrors: React.Dispatch<React.SetStateAction<string[]>>;
};
const ServerBtn = ({ formdata, errors, setErrors }: serverBtnProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const handleClick = () => {
    console.log("clicked");
    setLoading(true);
    console.log(loading);
    if (!loading) {
      fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      })
        .then((res) => res.json())
        .then((data: any) => {
          if (data.success) {
            setLoading(false);
            console.log(data);
            localStorage.setItem("connectify_token", data.data);
            router.push("/");
          } else {
            setErrors([...errors, data.message]);
          }
        });
    }
  };

  return (
    <>
      <button
        disabled={loading}
        style={{ boxSizing: "border-box", cursor: "pointer" }}
        onClick={handleClick}
      >
        Finish{loading && <ButtonSpinner />}
      </button>
    </>
  );
};

export default ServerBtn;
