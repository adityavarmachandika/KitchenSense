import express, { Application,Request,Response } from "express";
import cors from "cors"
import userrouter from "./routes/userAuthRoutes";
const app:Application=express()

app.use(express.json())

app.use(cors())

app.get('/',(req:Request,res:Response)=>{
    res.send("hello all my name is aditya")
})

app.use('/api',userrouter)
app.listen(3333,()=>{
    console.log("site is running")
})