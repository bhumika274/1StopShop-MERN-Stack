import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/usermodel.js";
import JWT from "jsonwebtoken";


export const  registerController = async(req, res) =>{
    try{
        
        const {name, email, password, phone, address, answer} = req.body;

        if(!name){
            res.send({message: "Name is required!"})
        }
        if(!email){
            res.send({message: "Email is required!"})
        }
        if(!password){
            res.send({message: "Password is required!"})
        }
        if(!phone){
            res.send({message: "Phone is required!"})
        }
        if(!address){
            res.send({message: "address is required!"})
        }
        if(!answer){
            res.send({message: "answer is required!"})
        }

        const existingUser = await userModel.findOne({email})

        if(existingUser){

             return res.status(200).send({
                success:false,
                message:"already registered please login"
            })
        }else{
            const hashedPassword = await hashPassword(password);
            const newUser = await new userModel({name, email, password:hashedPassword , phone, address, answer}).save()

            return res.status(201).send({
                success:true,
                message:"User Registered successfully",
                user: newUser
            })
        }
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Registration",
            error
        })
    }
}

export const loginController = async(req, res) => {
    try {
        
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:"Email or Password invalid"
            })
        }
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Email not registered"
            })
        }
        const match = await comparePassword(password, user.password)
        if(!match){
            return res.status(404).send({
                success:false,
                message:"Incorrect Password"
            })
        }

        // sign will create a secure token representation of user ID, GWT secret and the expiry time, i'm unware of Use of second argument.
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.status(200).send({
            success:true,
            message:"Login Successful",
            user:{
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token
        })
    } catch (error) {

        console.log(error)
        res.status(500).send({
            success:false,
            message:"Login Failed",
            error
        })
    }
}

export const forgotPasswordController = async(req, res) =>{
    try {
        const { email, newPassword, answer} = req.body;
        if(!email){
            res.status(400).send({message: "Email is required"})
        }
        if(!answer){
            res.status(400).send({message: "Answer is required"})
        }
        if(!newPassword){
            res.status(400).send({message: "newPassword is required"})
        }

        const user = await userModel.findOne({email, answer})
        if(!user){
            return res.status(400).send({
                success:false,
                message:"Wrong Email or answer or match"
            })
        }

        const hashedPassword = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id,{password: hashedPassword})
        return res.status(200).send({
            success:true,
            message:"Password Reset Successfully"
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Something went wrong"
        })
    }
}

export const updateProfileController = async(req, res) =>{
    try {
        const {name, email, password, phone, address} = req.body;        
        if(!name){
            res.send({message: "Name is required!"})
        }
        if(!email){
            res.send({message: "Email is required!"})
        }
        if(!password && password.length < 6){
            res.send({message: "Password is required and should be 6 chars long"})
        }
        if(!phone){
            res.send({message: "Phone is required!"})
        }
        if(!address){
            res.send({message: "address is required!"})
        }

        const hashedPassword = await hashPassword(password);
        const updateduser = await userModel.findByIdAndUpdate(req.user._id, {
            name, email, password:hashedPassword, phone, address 
        }, {new:true})
        return res.status(200).send({
            success:true,
            message:"Profile Updated Successfully",
            updateduser
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error while updating profile"
        })
    }
}