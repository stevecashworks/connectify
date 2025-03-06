import { NextRequest, NextResponse } from "next/server";
import jwt from  "jsonwebtoken"
import userModel from "@/lib/models/users";

 type userType={
    id:string
 }
export async function POST(req:NextRequest){
    try {
        let response
        const {token}= await req.json()
        // console.log(token)
       await jwt.verify(token as string, process.env.jwt_secret as string,async(err ,user)=>{
if(err){
    console.log(err.message)
    response= NextResponse.json({
        success:false,
        message:err.message,
        data:null

    }, {status:200})
}
else{
     const {id}= user as  userType
     console.log(id)
     const thisUser= await userModel.findById(id)
     const {password, ...others}= thisUser._doc
     response= NextResponse.json({
        success:true,
        message:"user details fetched successfully",
        data:others
    
    }, {status:200})
}
       })
       return response
    

    } catch (error:any) {
        return NextResponse.json({
            success:false,
            message:error.message,
            data:null
        },{status:200})
    } 
    
}