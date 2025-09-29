import mongoose from "mongoose";
import User from "../model/user.js";
import bcrypt from "bcrypt"

export const register = async(req, res)=>{
    const {
        name,
        email,
        password,
    } = req.body;


    if(!name || !email || !password){
        return res.status(400).json({error: "please provided all required fields"})
       
    }

    try{
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({error: "Email already in user"});

        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)


        // Create new user

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({
            message: "Registration successful",
            user: newUser,
        });
    } catch(error){
        console.error("something error", error);
        res.status(500).json({error: "Internal server error"})
    }
}


export const login = async(req,res)=>{
    try{
        const {email, password} = req.body;
        let user = await User.findOne({ email });

        if(!email || !password){
            return res.status(400).json({error: "Please provide email and password"});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({error: "Invalid password"})
        }

        if(!user){
            return res.status(404).json({error: "User not found"})
        }

        await user.save();
        res.status(200).json({user, message: "Login successful"})
    } catch(error){
        console.log("Login Error", error);
        return res.status(500).json({error: "Internal server error"})
    }
}