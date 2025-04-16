import { NextFunction } from "express";
import { Response,Request } from "express";
import jwt from "jsonwebtoken";

const protect =async(req:Request,res:Response,next:NextFunction)=>{
    let token:string;

    const authheader=req.headers.authorization;
    if(authheader && authheader.startsWith('Bearer')){
        try{

            token= authheader.split(' ')[1]
            const verify=jwt.verify(token,process.env.JWT_SECRET as string)
            console.log("the token is verifed")
            next()
        }
        catch(err){
            console.log(err);
            res.status(401).json({"error":" not authorized"})
        }
    }
    else{
         res.status(404).json({"error":"login first"})
         return;
    }
}

export default protect