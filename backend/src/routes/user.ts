import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import { authMiddleware, signinMiddleware, signupMiddleware } from "../middleware";
import { userMiddleware } from "../middleware";
import { User } from "../db/db";
dotenv.config();

export const route = express.Router();
const secret = "testing";

route.post("/signup", signupMiddleware, userMiddleware, async(req, res)=>{

 try{
    const user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })

    const username = req.body.username;
    const userId = user._id;
    const token = jwt.sign({userId}, process.env.JWT_SECRET as string);

    res.status(201).json({
        msg: "user created successfully",
        username,
        token
    })
 }
 catch(err){
    res.status(411).json({
        msg : err
    })
 }
})

route.post("/signin",signinMiddleware, authMiddleware, async(req, res)=>{
    try{
        const user = await User.findOne({username: req.body.username});
        const userid = user?._id;
        const token = jwt.sign({userid}, process.env.JWT_SECRET  as string);
        res.status(200).json({
            msg: "Logged In successfully",
            userid,
            token
        })
    }
    catch(err){
        return res.status(500).json({
            error:{
                msg: err
            }
        })
    }
})