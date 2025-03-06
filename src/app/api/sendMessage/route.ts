// import userModel from "../../../lib/models/users"
import jwt from "jsonwebtoken"
import {NextRequest, NextResponse} from "next/server"
const  sendMessage=async(req:NextRequest)=>{
    const requestData= await req.json()
    const {token,recipient, time, content}= requestData
    const userDetails= await jwt.verify(token,process.env.jwt_secret as string)
    return   NextResponse.json(({success:true, result:userDetails}))
    
    

}
export const POST=sendMessage