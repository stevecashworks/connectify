import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
type initialStateType={
    username:string,
    isLogged:boolean,
    img:string,
    chats:{userId:string, messages:string[],image:string, username:string}[]
    
}
const initialState:initialStateType={
    username:"",
    isLogged:false,
    img:"",
    chats:[]
}

const userReducer=createSlice({initialState,name:"user", reducers:{

    log_in:(state,action)=>{
        state.username=action.payload;
        state.isLogged=true;
    },
    sendMessage:(state,action:{payload:{id:string,image:string,username:string,message:string}})=>{
       const {id,message,username,image}=action.payload
        // do this only if there are previous chats from the user
        if(state.chats.find(x=>x.userId===action.payload.id)){
state.chats=state.chats.map(chat=>{
            if(action.payload.id===chat.userId){

                return {...chat, messages:[...chat.messages, message,]}
            }       
            return chat
        })
        }
        else{
            state.chats=[...state.chats,{userId:id,username,image,messages:[message]}]
        }

        
    }
}})
export const {log_in,sendMessage}= userReducer.actions
export const selectChats=(state:RootState)=>state.user.chats

export default  userReducer.reducer