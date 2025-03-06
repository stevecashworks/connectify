import styles from "./chat.module.css";
import { LuMessagesSquare } from "react-icons/lu";
import { BsAirplane, BsThreeDots } from "react-icons/bs";
import chatData from "./chatData";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { ChangeEvent, useEffect, useState } from "react";
import InputEmoji from "react-input-emoji";
import { BiSearch, BiSend } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

import {
  selectChatOpen,
  filterChat,
  selectChatList,
  selectChatType,
  setChatType,
  toggleChat,
  selectCurrentChat,
  setCurrentChat,
} from "@/state/appSlice/appSlice";
import { selectChats, sendMessage } from "@/state/userSlice/userSlice";

const ChatCon = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const chatOpen = useSelector(selectChatOpen);
  const chatType = useSelector(selectChatType);
  const chatList = useSelector(selectChatList);
  const CurrentChat = useSelector(selectCurrentChat);
  const allChats = useSelector(selectChats);
  useEffect(() => {
    document.querySelectorAll(styles.chatHistory).forEach((chat) => {
      chat.scrollTop = chat.scrollHeight;
    });
  }, []);
  function handleOnEnter(text: any) {
    console.log("enter", text);
  }
  console.log(CurrentChat);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    dispatch(filterChat(e.target.value));
  };

  return (
    <>
      <div className={`${styles.container} ${chatOpen && styles.opened}`}>
        <div className={styles.top}>
          <LuMessagesSquare style={{ color: "blueviolet", fontSize: "24px" }} />
          <p>Messenger</p>
          <BsThreeDots className={styles.dots} />
        </div>
        {/* horizontal seperator */}
        <hr className={styles.hr}></hr>
        <div className={styles.options}>
          <p
            className={`${styles.chatType} ${
              chatType === "friends" && styles.active
            }`}
            onClick={() => {
              dispatch(setChatType("friends"));
            }}
          >
            Friends
          </p>
          <p
            className={`${styles.chatType} ${
              chatType === "groups" && styles.active
            }`}
            onClick={() => {
              dispatch(setChatType("groups"));
            }}
          >
            {" "}
            Groups
          </p>
        </div>
        <div className={styles.inputCon}>
          <BiSearch />
          <input
            onChange={(e) => {
              handleChange(e);
            }}
            placeholder={` Search ${chatType}`}
          />
        </div>
        <div className={styles.chats}>
          {chatList.map((chat) => {
            const { username, image } = chat;
            return (
              <div
                onClick={() => {
                  dispatch(
                    setCurrentChat(
                      chatData[chatType].find((x) => x.id === chat.id)
                        ? chatData[chatType].find((x) => x.id === chat.id)
                        : ""
                    )
                  );
                }}
                className={styles.chat}
              >
                <Image
                  className={styles.chatImg}
                  alt={`${username}'s image`}
                  width={45}
                  height={45}
                  src={image}
                />
                <p className={styles.chatName}>{username}</p>
              </div>
            );
          })}
        </div>
        <div className={styles.bottom}>
          <div
            onClick={() => {
              dispatch(toggleChat());
            }}
            className={styles.expand}
          >
            {chatOpen ? <FaChevronRight /> : <FaChevronLeft />}
          </div>
        </div>
      </div>

      {typeof CurrentChat !== "string" && (
        <div className={styles.currentChat}>
          <div className={styles.currentChatTop}>
            <div>
              <Image
                className={styles.chatImg}
                src={CurrentChat.image}
                alt={CurrentChat.username}
                height={40}
                width={40}
              />
              <p>{CurrentChat.username}</p>
            </div>
            <div>
              <p
                onClick={() => {
                  dispatch(setCurrentChat(""));
                }}
              >
                ❌
              </p>
              <p style={{ color: "green" }}>📞</p>
              <p>🎥</p>
            </div>
          </div>
          <div className={styles.chatHistory}>
            {allChats
              .find((x) => x.userId === CurrentChat.id)
              ?.messages.map((message) => (
                <div className={styles.message}>{message}</div>
              ))}
          </div>
          <div className={styles.chatInput}>
            <InputEmoji
              value={text}
              onChange={setText}
              cleanOnEnter
              onEnter={handleOnEnter}
              placeholder="Type a message"
              shouldReturn={false}
              shouldConvertEmojiToImage={false}
            />
            {text.length > 0 && (
              <div
                onClick={() => {
                  dispatch(
                    sendMessage({
                      username: CurrentChat.username,
                      id: CurrentChat.id,
                      message: text,
                      image: CurrentChat.image,
                    })
                  );
                }}
                className={styles.chatLogo}
              >
                <BiSend />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default ChatCon;
