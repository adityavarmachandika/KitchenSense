import { Request,Response } from "express"
import { PrismaClient } from '@prisma/client';
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()


 const prisma = new PrismaClient()
export const signInAuth= async (req:Request,res:Response):Promise<void>=>{

    const jwt_secret= process.env.JWT_SECRET
    if (!jwt_secret) {
        console.error("JWT_SECRET is undefined");
         res.status(500).json({ error: "Internal server error" });
         return;
      }

    const {name,email,phoneNumber,password,role}=req.body

    if(!name || !email|| !phoneNumber|| !password || !role){
        res.status(400).json({"error":"missing feilds"})
        return ;
    }

    const existaccount=await prisma.account.findUnique({
        where:{
            email:email
        }
    })


    const existuser=await prisma.user.findUnique({
        where:{
            phoneNumber:phoneNumber
        }
    })
    if(existuser){
         res.status(409).json({"error":"the phone number already exists "})
         return;
    }
    let acc_id;
    let createAcc
    if(!existaccount){
        createAcc= await prisma.account.create({
            data:{
                email,
                password
            }
        })
        acc_id=createAcc.id
    }
    else{
        acc_id=existaccount.id
    }

    const createUser=await prisma.user.create({
        data:{
            name,
            phoneNumber,
            role,
            accountId:acc_id
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