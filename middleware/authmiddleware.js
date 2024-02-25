import JWT from "jsonwebtoken";
import userModel from "../models/usermodel.js";

export const loginmdw = (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET) //verify client sent jwt (authorization) against jwt in backend (JWT_SECRET)
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
    }
}

export const isAdmin = async (req, res, next) => {

    try {
        const user = await userModel.findById(req.user._id)
        if( user.role !== 1){
            return res.status(200).send({
                success:false,
                message:"UnAuthorised Access"
            })
        }else{
            next();
        }
    } catch (error) {
        console.log("isAdmin error",error);
        res.status(401).send({
            success:false,
            error,
            message:"Error in Middleware"
        })
    }
}