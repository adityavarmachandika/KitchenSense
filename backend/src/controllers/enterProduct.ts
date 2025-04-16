import { PrismaClient } from "@prisma/client";
import { Response,Request } from "express";

const prisma= new PrismaClient()
const enterProduct =async (req:Request,res:Response)=>{
    const productDetails=req.body
    
    //check wether the category is available or not 
    let categoryId=await prisma.category.findFirst({
        where:{
            name:productDetails.category
        }
    })
    if(!categoryId){
        categoryId=await prisma.category.create({
            data:{
                name:productDetails.category
            }
        })
    }

    //check wether the product details are available or not
    let productId=await prisma.product.findFirst({
        where:{
            name:productDetails.name
        }
    })

    if(!productId){
        productId=await prisma.product.create({
            data:{
                name:productDetails.name,
                measurment:productDetails.measurment,
                categoryId:categoryId.id
            }
        })
    }

    //enter the isntance of the product that user entered

    const productinstance=await prisma.productInstance.create({
        data:{
            storage_location:productDetails.storage_location,
            quantity:productDetails.quantity,
            expiry_date:productDetails.expiry_date,
            productId:productId.id,
            accountId:productDetails.account_id,
            userId:productDetails.user_id
        }
    })
    console.log(productinstance)
    res.json(productinstance)
}

export default enterProduct