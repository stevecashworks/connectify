import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import chatData, { chatGroupType, singleChatType } from "@/app/(user)/components/chat/chatData";

type stateType={
    chatOpen:boolean;
    chatType:"friends"|"groups",
    chatList:chatGroupType
    currentChat:singleChatType|""
    errors:string[]
}
const initialState:stateType={
    chatOpen:false,
    chatType:"friends",
    chatList:chatData["friends"], 
    currentChat:"",
    errors:[]
}
const appSlice=createSlice({name:"app",initialState,reducers:{
    toggleChat:(state)=>{
        state.chatOpen=!state.chatOpen
    },
    setChatType:(state,action:{payload:"friends"|"groups"})=>{
        state.chatType=action.payload
        state.chatList=chatData[action.payload]
    },
    filterChat:(state, action:{payload:string})=>{
        if(action.payload.length>0){
            state.chatList=state.chatList.filter(chat=>chat.username.includes(action.payload))
        }
        else{
            state.chatList=chatData[state.chatType]
        }
    }, 
    setCurrentChat:(state,action)=>{
        state.currentChat=action.payload
    },
setErrors:(state,action)=>{
    state.errors=action.payload
}    
    
}})
export const  {toggleChat,setChatType, filterChat, setCurrentChat}=  appSlice.actions
export  const selectChatType=(state:RootState)=>state.app.chatType
export  const selectChatOpen=(state:RootState)=>state.app.chatOpen
export const selectChatList=(state:RootState)=>state.app.chatList
export const selectCurrentChat= (state:RootState)=>state.app.currentChat


export default appSlice.reducer