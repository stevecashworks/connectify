import userModel from "@/lib/models/users";
import jwt from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){
    try {
        const {email, password}= await req.json()
        const thisUser= await userModel.findOne({email})
    
        if(thisUser){
            const dbPassword=thisUser.password
            if(password===dbPassword){
                const id= thisUser._id 
                const token= await jwt.sign({id}, process.env.jwt_secret as string)
                return NextResponse.json({
                    success:true,
                    message:"User logged in successfully",
                    data:token
                },{status:200})
            }
            else{
                return NextResponse.json({
                    success:false,
                    message:"incorrect password",
                    data:null
                }, {status:403})
            }
        }

        else{
             return NextResponse.json({
                success:false,
                message:"user was not found please check email",
                data:null
             },{status:500})
        }
    } catch (error) {
        
    }

}