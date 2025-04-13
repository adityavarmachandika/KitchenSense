import { Request,Response } from "express"
import { PrismaClient } from '@prisma/client';

 const prisma = new PrismaClient()
const signInAuth= async (req:Request,res:Response)=>{
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
    res.status(201).json({"status":"user is created"})
}
export default signInAuth