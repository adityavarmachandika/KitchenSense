import { Response,Request } from "express";
import { PrismaClient } from "@prisma/client";


const prisma=new PrismaClient();
const deleteProductInstance =async(req:Request,res:Response)=>{

    const instanceId=parseInt(req.query.id as string)
    if(isNaN(instanceId))
        res.send("Id of the product instance is misssing")
    try{
        const isdeleted=await prisma.productInstance.delete({
            where:{ 
                id:instanceId,
            }
        })
    
        res.json(isdeleted)
    }
    catch(error){
        res.status(404).send("there is a error while deleting")
    }
    
}
export default deleteProductInstance