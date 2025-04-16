import { Request,Response } from "express"
import { PrismaClient } from "@prisma/client"
import  jwt from "jsonwebtoken"
const prisma=new PrismaClient()
const logInAuth=async (req:Request,res:Response)=>{
    const {email,phoneNumber,password}=req.body

    const userDetails=await prisma.user.findFirst({
        where:{
            phoneNumber,
            account:{
                email,
                password
            }
        },
        include:{
            account:true
        }
    });

    if(!userDetails){
         res.status(401).json({"error":"user not found "})
         return;
    }
    const payload={
        id:userDetails.id,
        phoneNumber:userDetails.phoneNumber
    }   
    const jwt_secret=process.env.JWT_SECRET;
    if (!jwt_secret) {
        console.error("JWT_SECRET is undefined");
         res.status(500).json({ error: "Internal server error" });
         return;
      }
    const jsonToken=jwt.sign(payload,jwt_secret,{expiresIn:'1d'})
     res.status(200).json({
        "name":userDetails.name,
        "accountId":userDetails.accountId,
        "role":userDetails.role,
        "userId":userDetails.id,
        "jwtToken":jsonToken
    })
}

export default logInAuth
