import { Application, Router } from "express";
import express,{ Express } from "express";
import signInAuth from "../controllers/signInAuth";
import protect from "../middleware/authware";

import logInAuth from "../controllers/loginAuth";

const  router = express.Router();

router.post('/signIn',signInAuth)
router.post('/logIn', protect,logInAuth)
export default router