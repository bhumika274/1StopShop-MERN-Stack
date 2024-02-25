import express from "express";
import {loginController,
        registerController, 
        forgotPasswordController, 
        updateProfileController} from "../controlleres/authController.js";
import { isAdmin, loginmdw } from "../middleware/authmiddleware.js";

const router = express.Router()

router.post("/register", registerController)

router.post("/login", loginController)

router.post("/forgot-password",forgotPasswordController)

router.get("/user-auth", loginmdw, (req, res)=>{
    res.status(200).send({ok:true})
})

router.get("/admin-auth", loginmdw, isAdmin, (req, res)=>{
    res.status(200).send({ok:true})
})

router.put("/profile-update",loginmdw, updateProfileController )



export default router;