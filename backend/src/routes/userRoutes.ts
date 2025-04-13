import { Application, Router } from "express";
import express,{ Express } from "express";
import signInAuth from "../controllers/signInAuth";


const  router = express.Router();

router.post('/signIn',signInAuth)

export default router