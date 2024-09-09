import { RequestHandler } from "express";
import {z} from "zod";
import { User } from "./db/db";

const signupSchema = z.object({
    username: z.string(),
    password: z.string().min(5).max(15),
    email: z.string().email()
})

export const signupMiddleware:RequestHandler = (req, res, next)=>{
    const check = signupSchema.safeParse(req.body);
    if(!check){
        return res.status(400).json({
            msg:"incorrect inputs"
        })
    }
    next();
}

export const userMiddleware:RequestHandler = async(req, res, next)=>{
    const userauth = req.body;
    const usercheck = await User.findOne({email: userauth.email});
    if(usercheck){
        return res.json({
            msg: "user already exists"
        })
    }
    next();
}

const signinSchema = z.object({
    username: z.string(),
    password: z.string()
})

export const signinMiddleware:RequestHandler = (req, res, next)=>{
    const success = signinSchema.safeParse(req.body);
    if(!success){
        return res.status(400).json({
            msg: "wrong parameters"
        })
    }
    next();
}

export const authMiddleware:RequestHandler = async(req, res, next)=>{
    const found = await User.findOne({username: req.body.username})
    if(!found){
        return res.status(401).json({
            msg: "un-authenticated User"
        })
    }
    next();
}