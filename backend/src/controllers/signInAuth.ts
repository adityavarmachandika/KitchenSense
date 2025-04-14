import { Request,Response } from "express"
import { PrismaClient } from '@prisma/client';
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()


 const prisma = new PrismaClient()
const signInAuth= async (req:Request,res:Response)=>{

    const jwt_secret= process.env.JWT_SECRET
    if (!jwt_secret) {
        console.error("JWT_SECRET is undefined");
        return res.status(500).json({ error: "Internal server error" });
      }

    const {name,email,phoneNumber,password,role}=req.body

    if(!name || !email|| !phoneNumber|| !password || !role){
        return res.status(400).json({"error":"missing feilds"})
    }

    const existaccount=await prisma.account.findUnique({
        where:{
            email:email
        }
    })

    if(existaccount){
        return res.status(409).json({"error":"the email already exists"})
    }

    const existuser=await prisma.user.findUnique({
        where:{
            phoneNumber:phoneNumber
        }
    })
    if(existuser){
        return res.status(409).json({"error":"the phone number already exists "})
    }

    const createAcc= await prisma.account.create({
        data:{
            email,
            password
        }
    })
    const createUser=await prisma.user.create({
        data:{
            name,
            phoneNumber,
            role,
            accountId:createAcc.id
        }
    })
    const payload={
        id:createUser.id,
        phoneNumber:createUser.phoneNumber
    }
    const jwtToken= jwt.sign(payload,jwt_secret,{expiresIn:"1d"})

    res.status(201).json({createAcc,createUser,jwtToken})
}
export default signInAuth