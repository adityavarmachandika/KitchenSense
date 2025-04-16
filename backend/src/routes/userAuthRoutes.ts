import { Application, Router } from "express";
import express,{ Express } from "express";
import signInAuth from "../controllers/signInAuth";

import logInAuth from "../controllers/loginAuth";
import enterProduct from "../controllers/enterProduct";
import protect from "../middleware/authware";
import deleteProductInstance from "../controllers/deleteProductInstance";

const  router = express.Router();

router.post('/signIn',signInAuth)
router.post('/logIn',logInAuth)


router.post("/product",protect,enterProduct)
router.delete("/product/delete",protect,deleteProductInstance)

export default router