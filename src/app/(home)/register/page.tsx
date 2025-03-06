"use client";
import Image from "next/image";
import styles from "./page.module.css";
import React, { useEffect, useState } from "react";
import { CiLaptop } from "react-icons/ci";
import { BiKey, BiSkipNext } from "react-icons/bi";
import inputs, { formStateType } from "../../data/inputs";
import { ImPrevious2 } from "react-icons/im";
import register from "@/lib/register";
import ServerBtn from "../components/serverbtn/ServerBtn";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MessageModal from "../components/modal/modal";
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

const App = () => {
  const [loading,setIsLoading]=useState<boolean>(false)
  const [errors,setErrors]=useState<string[]>([])
  
  const router = useRouter();
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [formData, setFormData] = useState<formStateType>({
    DOB: "",
    firstName: "",
    lastName: "",
    password: "",
    phone: "",
  });
  useEffect(() => {
    const connectify_token = localStorage.getItem("connectify_token");
    if (connectify_token) {
      // router.push("/userdeg");
    }
  }, []);
  const formHasBeenCompleted = Object.keys(formData).every(
    (field) => formData[field as keyof formStateType].length > 0
  );

  const handleInputChange = ({
    field,
    value,
  }: {
    field: keyof formStateType;
    value: string;
  }) => {
    setFormData({ ...formData, [field]: value });
  };

  return (<>
      <MessageModal messages={errors} title="The following error occured" />
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
            {inputs.map((section, index) => {
              const sectionIsActive = index === slideIndex;
              const PreviousButton = () => {
                return (
                  <button
                  onClick={() => {
                    setSlideIndex(slideIndex - 1);
                  }}
                  >
                    <ImPrevious2 /> Previous page
                  </button>
                );
              };
              const nextText =
              index === inputs.length - 1 && formHasBeenCompleted
              ? "Finish"
              : "Previous Page";
              const hasIcon =
              index === inputs.length - 1 && formHasBeenCompleted
              ? false
              : true;
              const finished =
              index === inputs.length - 1 && formHasBeenCompleted;
              const nextFunction =
              index === inputs.length - 1 && formHasBeenCompleted
              ? async () => {
                const { phone, ...others } = formData;
                const newUser = await register({
                  ...others,
                  email: phone,
                });
                console.log(newUser);
                alert("submitted");
              }
              : () => {
                setSlideIndex((prev) => (prev === 0 ? prev : prev - 1));
              };
              const className = sectionIsActive
              ? `${styles.section} ${styles.sectionActive}`
              : styles.section;
              return (
                <div
                className={className}
                // style={{
                  //   transform: `translateX(${sectionIsActive ? "0px" : "350px"})`,
                  // }}
                  >
                  {section.map((inp) => {
                    const { Icon, text, type, field } = inp;
                    return (
                      <div className={styles.inputContainer}>
                        <Icon />
                        <input
                          onChange={(e) => {
                            handleInputChange({ field, value: e.target.value });
                          }}
                          type={type}
                          className={styles.input}
                          placeholder={text}
                        />
                      </div>
                    );
                  })}
                  <Link className={styles.link} href="/login">
                    Login instead
                  </Link>

                  <div className={styles.buttons}>
                    {slideIndex > 0 && (
                      <>
                        {/* <ServerBtn  formdata={formData} />  */}

                        {finished ? (
                          <ServerBtn errors={errors} setErrors={setErrors} formdata={formData} />
                        ) : (
                          <PreviousButton />
                        )}
                      </>
                    )}
                    {slideIndex < inputs.length - 1 && (
                      <>
                        <button
                          onClick={() => {
                            setSlideIndex((prev) =>
                              prev === inputs.length - 1 ? prev : prev + 1
                          );
                        }}
                        >
                          Next <BiSkipNext />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
                    </>
  
  );
};
export default App;
